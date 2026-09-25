/**
 * End-to-end tests against a real Postgres database, with synthetic visitors on documentation
 * address space (RFC 5737 / RFC 3849) and a fake Slack that records messages instead of sending.
 * Set VISITS_TEST_DATABASE_URL to run them; the tables in that database are dropped and recreated.
 * Set VISITS_TEST_PRINT=1 to print each notification as Slack would receive it, and
 * VISITS_TEST_SLACK_BOT_TOKEN plus VISITS_TEST_SLACK_CHANNEL_ID to also post them to a real
 * Slack channel, prefixed with [test]. Variables can also come from the gitignored .env file.
 */
import "dotenv/config";
import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import { after, before, beforeEach, describe, it } from "node:test";
import express from "express";
import type { Server } from "http";
import { Sequelize } from "sequelize";
import type { VisitsConfig } from "./config";
import { parseCidrList } from "./ip";
import type { AsnTable } from "./network";
import { createAsnTableBuilder } from "./network";
import type { Notifier } from "./notify";
import { NotifyError, createSlackNotifier } from "./notify";
import { visitRoutes } from "./routes";
import type { VisitStore } from "./store";
import { createStore } from "./store";
import { runDueJobs } from "./worker";

const DATABASE_URL = process.env.VISITS_TEST_DATABASE_URL;
const PRINT = process.env.VISITS_TEST_PRINT === "1";
const LIVE_SLACK =
  process.env.VISITS_TEST_SLACK_BOT_TOKEN && process.env.VISITS_TEST_SLACK_CHANNEL_ID
    ? createSlackNotifier(process.env.VISITS_TEST_SLACK_BOT_TOKEN, process.env.VISITS_TEST_SLACK_CHANNEL_ID)
    : null;

const CLOUDFLARE_EDGE = "172.70.1.1";
const CHROME_MAC =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

function asnTable(): AsnTable {
  const builder = createAsnTableBuilder();
  builder.add("192.0.2.0\t192.0.2.255\t16509\tUS\tAMAZON-02");
  builder.add("198.51.100.0\t198.51.100.255\t7922\tUS\tCOMCAST-7922");
  builder.add("203.0.113.0\t203.0.113.255\t64500\tUS\tEXAMPLE-CORP-AS");
  builder.add("2001:db8::\t2001:db8:ffff:ffff:ffff:ffff:ffff:ffff\t64501\tDE\tEXAMPLE-EU-NET");
  return builder.build();
}

function config(overrides: Partial<VisitsConfig> = {}): VisitsConfig {
  return {
    enabled: true,
    behindHerokuRouter: true,
    allowedHosts: ["www.adamkliegman.com"],
    ignoreNetworks: [],
    ipRetentionDays: 7,
    visitRetentionDays: 30,
    startDelaySeconds: 1,
    inactivityMinutes: 30,
    startCooldownMinutes: 360,
    maxNotificationsPerHour: 20,
    maskIp: false,
    timeZone: "America/New_York",
    slack: null,
    ...overrides,
  };
}

interface Sent {
  kind: "post" | "reply";
  text: string;
  ts?: string;
  threadTs?: string;
}

function fakeSlack(failures: NotifyError[] = []) {
  const sent: Sent[] = [];
  let counter = 0;
  const maybeFail = () => {
    const failure = failures.shift();
    if (failure) throw failure;
  };
  const notifier: Notifier = {
    async post(text) {
      maybeFail();
      counter += 1;
      const ts = LIVE_SLACK ? (await LIVE_SLACK.post(`[test] ${text}`)).ts : `1700000000.00000${counter}`;
      sent.push({ kind: "post", text, ts });
      if (PRINT) console.log(`\n--- Slack post ---\n${text}`);
      return { ts };
    },
    async reply(threadTs, text) {
      maybeFail();
      if (LIVE_SLACK) await LIVE_SLACK.reply(threadTs, `[test] ${text}`);
      sent.push({ kind: "reply", text, threadTs });
      if (PRINT) console.log(`\n--- Slack thread reply to ${threadTs} ---\n${text}`);
    },
  };
  return { notifier, sent };
}

describe("visit analytics end to end", { skip: DATABASE_URL ? false : "set VISITS_TEST_DATABASE_URL" }, () => {
  let sequelize: Sequelize;
  let store: VisitStore;
  let server: Server;
  let baseUrl: string;
  let currentConfig: VisitsConfig;

  const table = asnTable();
  const deps = (notifier: Notifier | null, overrides: Partial<VisitsConfig> = {}) => ({
    store,
    config: { ...currentConfig, ...overrides },
    notifier,
    network: () => table,
    log: () => undefined,
  });

  const query = <T extends object>(sql: string, bind: unknown[] = []) =>
    sequelize.query<T>(sql, { bind, type: "SELECT" as never }) as unknown as Promise<T[]>;

  async function send(
    visitor: { ip: string; country?: string; city?: string; region?: string; ua?: string; headers?: Record<string, string> },
    body: Record<string, unknown>,
  ) {
    const response = await fetch(`${baseUrl}/api/visits/events`, {
      method: "POST",
      headers: {
        "content-type": "text/plain;charset=UTF-8",
        origin: "https://www.adamkliegman.com",
        "user-agent": visitor.ua ?? CHROME_MAC,
        "x-forwarded-for": `10.9.9.9, ${CLOUDFLARE_EDGE}`,
        "cf-connecting-ip": visitor.ip,
        "cf-ipcountry": visitor.country ?? "US",
        ...(visitor.city ? { "cf-ipcity": visitor.city } : {}),
        ...(visitor.region ? { "cf-region": visitor.region } : {}),
        ...visitor.headers,
      },
      body: JSON.stringify(body),
    });
    assert.equal(response.status, 204);
    // The collector answers before it writes, so give the write a moment to land.
    await new Promise((resolve) => setTimeout(resolve, 60));
  }

  const pageview = (sessionId: string, path: string, extra: Record<string, unknown> = {}) => ({
    sessionId,
    consent: "notice",
    event: { type: "pageview", path, ...extra },
  });

  async function makeDue(kind?: "start" | "summary") {
    await sequelize.query(
      `UPDATE visit_notifications SET run_at = now() - interval '1 second' WHERE status = 'pending'${kind ? ` AND kind = '${kind}'` : ""}`,
    );
  }

  async function count(tableName: string) {
    const [row] = await query<{ count: string }>(`SELECT count(*) FROM ${tableName}`);
    return Number(row?.count);
  }

  before(async () => {
    sequelize = new Sequelize(DATABASE_URL as string, { logging: false });
    store = createStore(sequelize);
    currentConfig = config();
    const app = express();
    app.use("/api/visits", (request, response, next) =>
      visitRoutes({ store, config: currentConfig, log: () => undefined })(request, response, next),
    );
    server = app.listen(0);
    baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  });

  beforeEach(async () => {
    currentConfig = config();
    await sequelize.query("DROP TABLE IF EXISTS visit_notifications, visit_events, visits CASCADE");
    await store.migrate();
  });

  after(async () => {
    server.close();
    await sequelize.close();
  });

  it("notifies at the start of a visit and threads a summary after inactivity", async () => {
    const recruiter = { ip: "203.0.113.40", city: "New York", region: "New York" };
    const session = "a1b2c3d4-0000-4000-8000-000000000001";
    await send(recruiter, {
      ...pageview(session, "/"),
      attribution: { referrerHost: "www.linkedin.com", utmSource: "linkedin", utmMedium: "social" },
    });
    await send(recruiter, pageview(session, "/work/spellbook", { previousEngagedMs: 42_000 }));

    const slack = fakeSlack();
    await makeDue("start");
    await runDueJobs(deps(slack.notifier));
    assert.equal(slack.sent.length, 1);
    const start = slack.sent[0]?.text ?? "";
    assert.match(start, /^\*New portfolio visit\*/);
    assert.match(start, /Approximate location: New York, New York, US/);
    assert.match(start, /Network: EXAMPLE-CORP-AS \/ AS64500 \/ other/);
    assert.match(start, /IP: 203\.0\.113\.40\n/);
    assert.match(start, /Device: Chrome, macOS, desktop/);
    assert.match(start, /Arrived via: referrer linkedin\.com, utm_source linkedin, utm_medium social/);
    assert.match(start, /Pages so far: Home → Case study: spellbook/);
    assert.doesNotMatch(start, /company|confidence/i);

    await send(recruiter, pageview(session, "/system", { previousEngagedMs: 95_000 }));
    await send(recruiter, { sessionId: session, consent: "notice", event: { type: "resume_download", path: "/system" } });
    await send(recruiter, { sessionId: session, consent: "notice", event: { type: "contact_click", path: "/system", target: "email" } });
    await send(recruiter, { sessionId: session, consent: "notice", event: { type: "leave", path: "/system", engagedMs: 30_000 } });

    await runDueJobs(deps(slack.notifier));
    assert.equal(slack.sent.length, 1, "summary waits for the inactivity window");

    await makeDue("summary");
    await runDueJobs(deps(slack.notifier));
    assert.equal(slack.sent.length, 2);
    const summary = slack.sent[1];
    assert.equal(summary?.kind, "reply");
    assert.equal(summary?.threadTs, slack.sent[0]?.ts);
    assert.match(summary?.text ?? "", /Pages: Home \(~42s\) → Case study: spellbook \(~1m 35s\) → Design system \(~30s\)/);
    assert.match(summary?.text ?? "", /Actions: Résumé download, Contact click \(email\)/);

    await makeDue();
    await runDueJobs(deps(slack.notifier));
    assert.equal(slack.sent.length, 2, "nothing is sent twice");
  });

  it("labels ISP networks and masks addresses when configured to", async () => {
    await send({ ip: "198.51.100.23" }, pageview("a1b2c3d4-0000-4000-8000-000000000002", "/about"));
    const slack = fakeSlack();
    await makeDue("start");
    await runDueJobs(deps(slack.notifier, { maskIp: true }));
    const text = slack.sent[0]?.text ?? "";
    assert.match(text, /Network: COMCAST-7922 \/ AS7922 \/ ISP/);
    assert.match(text, /IP: 198\.51\.100\.0\/24 \(masked\)/);
    assert.doesNotMatch(text, /198\.51\.100\.23/);
  });

  it("records nothing without consent in opt-in regions, and records after consent", async () => {
    const eu = { ip: "2001:db8::1", country: "DE" };
    await send(eu, pageview("a1b2c3d4-0000-4000-8000-000000000003", "/"));
    assert.equal(await count("visits"), 0);
    await send(eu, { ...pageview("a1b2c3d4-0000-4000-8000-000000000003", "/"), consent: "granted" });
    assert.equal(await count("visits"), 1);
  });

  it("drops opt-out signals, bots, foreign origins, ignored networks, and a disabled collector", async () => {
    const session = "a1b2c3d4-0000-4000-8000-000000000004";
    await send({ ip: "198.51.100.5", headers: { "sec-gpc": "1" } }, pageview(session, "/"));
    await send({ ip: "198.51.100.5", headers: { dnt: "1" } }, pageview(session, "/"));
    await send({ ip: "198.51.100.5", ua: "Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)" }, pageview(session, "/"));
    await send({ ip: "198.51.100.5", headers: { origin: "https://evil.example" } }, pageview(session, "/"));
    currentConfig = config({ ignoreNetworks: parseCidrList(["198.51.100.0/24"]) });
    await send({ ip: "198.51.100.5" }, pageview(session, "/"));
    currentConfig = config({ enabled: false });
    await send({ ip: "203.0.113.9" }, pageview(session, "/"));
    assert.equal(await count("visits"), 0);
  });

  it("rejects malformed and oversized bodies without recording", async () => {
    await send({ ip: "198.51.100.6" }, { junk: "x".repeat(4000) });
    const response = await fetch(`${baseUrl}/api/visits/events`, {
      method: "POST",
      headers: { "content-type": "application/json", origin: "https://www.adamkliegman.com" },
      body: "{not json",
    });
    assert.equal(response.status, 204);
    assert.equal(await count("visit_events"), 0);
  });

  it("retries failed deliveries with backoff and gives up after the last attempt", async () => {
    await send({ ip: "198.51.100.7" }, pageview("a1b2c3d4-0000-4000-8000-000000000005", "/"));
    const slack = fakeSlack([new NotifyError("ratelimited", 30)]);
    await makeDue("start");
    await runDueJobs(deps(slack.notifier));
    const [job] = await query<{ status: string; attempts: number; last_error: string; delay: number }>(
      "SELECT status, attempts, last_error, extract(epoch FROM run_at - now())::int AS delay FROM visit_notifications WHERE kind = 'start'",
    );
    assert.deepEqual({ status: job?.status, attempts: job?.attempts, error: job?.last_error }, {
      status: "pending",
      attempts: 1,
      error: "ratelimited",
    });
    assert.ok((job?.delay ?? 0) >= 55, "waits at least the first backoff step");

    await makeDue("start");
    await runDueJobs(deps(slack.notifier));
    assert.equal(slack.sent.length, 1);

    await send({ ip: "203.0.113.8" }, pageview("a1b2c3d4-0000-4000-8000-000000000006", "/"));
    const broken = fakeSlack(Array.from({ length: 5 }, () => new NotifyError("channel_not_found", null)));
    for (let attempt = 0; attempt < 5; attempt++) {
      await makeDue("start");
      await runDueJobs(deps(broken.notifier));
    }
    const [failed] = await query<{ status: string; attempts: number }>(
      "SELECT n.status, n.attempts FROM visit_notifications n JOIN visits v ON v.id = n.visit_id WHERE v.session_id = $1 AND n.kind = 'start'",
      ["a1b2c3d4-0000-4000-8000-000000000006"],
    );
    assert.deepEqual(failed, { status: "failed", attempts: 5 });
  });

  it("applies the start cooldown per network and the hourly cap", async () => {
    const slack = fakeSlack();
    await send({ ip: "198.51.100.9" }, pageview("a1b2c3d4-0000-4000-8000-000000000007", "/"));
    await makeDue("start");
    await runDueJobs(deps(slack.notifier));
    await send({ ip: "198.51.100.10" }, pageview("a1b2c3d4-0000-4000-8000-000000000008", "/"));
    await makeDue("start");
    await runDueJobs(deps(slack.notifier));
    assert.equal(slack.sent.length, 1, "same /24 inside the cooldown gets no second start notice");

    await send({ ip: "203.0.113.77" }, pageview("a1b2c3d4-0000-4000-8000-000000000009", "/"));
    await makeDue("start");
    await runDueJobs(deps(slack.notifier, { maxNotificationsPerHour: 1 }));
    assert.equal(slack.sent.length, 1, "hourly cap holds");
    const reasons = await query<{ last_error: string }>(
      "SELECT last_error FROM visit_notifications WHERE status = 'skipped' ORDER BY id",
    );
    assert.deepEqual(reasons.map((row) => row.last_error), ["cooldown", "rate-limited"]);
  });

  it("skips single-page visits from cloud networks as likely scanners", async () => {
    await send({ ip: "192.0.2.10" }, pageview("a1b2c3d4-0000-4000-8000-000000000010", "/"));
    const slack = fakeSlack();
    await makeDue();
    await runDueJobs(deps(slack.notifier));
    assert.equal(slack.sent.length, 0);
  });

  it("deletes full addresses after the IP window and whole visits after the retention window", async () => {
    await send({ ip: "198.51.100.11" }, pageview("a1b2c3d4-0000-4000-8000-000000000011", "/"));
    await send({ ip: "198.51.100.12" }, pageview("a1b2c3d4-0000-4000-8000-000000000012", "/"));
    await sequelize.query(
      "UPDATE visits SET started_at = now() - interval '8 days' WHERE session_id = 'a1b2c3d4-0000-4000-8000-000000000011'",
    );
    await sequelize.query(
      "UPDATE visits SET started_at = now() - interval '31 days' WHERE session_id = 'a1b2c3d4-0000-4000-8000-000000000012'",
    );
    await store.applyRetention(7, 30);
    const rows = await query<{ session_id: string; ip: string | null; ip_masked: string }>(
      "SELECT session_id, ip, ip_masked FROM visits",
    );
    assert.deepEqual(rows, [{ session_id: "a1b2c3d4-0000-4000-8000-000000000011", ip: null, ip_masked: "198.51.100.0/24" }]);
    assert.equal(await count("visit_events"), 1);
    assert.equal(await count("visit_notifications"), 2);
  });

  it("starts a new visit when the same session returns after its summary", async () => {
    const session = "a1b2c3d4-0000-4000-8000-000000000013";
    await send({ ip: "198.51.100.13" }, pageview(session, "/"));
    await makeDue();
    await runDueJobs(deps(fakeSlack().notifier));
    await send({ ip: "198.51.100.13" }, pageview(session, "/work"));
    const visits = await query<{ closed: boolean }>(
      "SELECT closed_at IS NOT NULL AS closed FROM visits WHERE session_id = $1 ORDER BY id",
      [session],
    );
    assert.deepEqual(visits, [{ closed: true }, { closed: false }]);
  });
});
