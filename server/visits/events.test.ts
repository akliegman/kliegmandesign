import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { hasOptOutSignal, requiresConsent } from "./consent";
import { parsePayload, sanitizePath } from "./events";
import { describeUserAgent, isAutomatedUserAgent } from "./userAgent";

const SESSION = "0f8e7d6c-5b4a-4321-8765-0123456789ab";

describe("parsePayload", () => {
  it("keeps allowlisted fields and drops everything else", () => {
    const payload = parsePayload({
      sessionId: SESSION,
      consent: "notice",
      event: { type: "pageview", path: "/work/spellbook", previousEngagedMs: 1234.6, keystrokes: "secret" },
      attribution: { referrerHost: "www.linkedin.com", utmSource: "linkedin", ref: "K7F3Q", email: "a@b.c" },
      fingerprint: "canvas-hash",
    });
    assert.deepEqual(payload, {
      sessionId: SESSION,
      consent: "notice",
      event: { type: "pageview", path: "/work/spellbook", previousEngagedMs: 1235 },
      attribution: {
        referrerHost: "linkedin.com",
        utmSource: "linkedin",
        utmMedium: null,
        utmCampaign: null,
        utmContent: null,
        utmTerm: null,
      },
    });
  });

  it("strips query strings and fragments from paths", () => {
    assert.equal(sanitizePath("/about?email=someone@example.com#top"), "/about");
    assert.equal(sanitizePath("/Work/"), "/work");
    assert.equal(sanitizePath("/../etc/passwd"), null);
    assert.equal(sanitizePath("https://evil.example/"), null);
  });

  it("rejects unknown event types, contact targets, and bad sessions", () => {
    const base = { sessionId: SESSION, consent: "notice" };
    assert.equal(parsePayload({ ...base, event: { type: "keypress", path: "/" } }), null);
    assert.equal(parsePayload({ ...base, event: { type: "contact_click", path: "/", target: "twitter" } }), null);
    assert.equal(parsePayload({ ...base, sessionId: "short", event: { type: "pageview", path: "/" } }), null);
    assert.equal(parsePayload({ ...base, consent: "yes", event: { type: "pageview", path: "/" } }), null);
    assert.equal(parsePayload("not an object"), null);
  });

  it("drops attribution values that don't fit the allowlist pattern", () => {
    const payload = parsePayload({
      sessionId: SESSION,
      consent: "granted",
      event: { type: "pageview", path: "/" },
      attribution: { utmCampaign: "<b>@channel</b>", referrerHost: "javascript:alert(1)" },
    });
    assert.equal(payload?.attribution?.utmCampaign, null);
    assert.equal(payload?.attribution?.referrerHost, null);
  });

  it("caps engaged time at an hour", () => {
    const payload = parsePayload({
      sessionId: SESSION,
      consent: "notice",
      event: { type: "leave", path: "/", engagedMs: 99_999_999 },
    });
    assert.deepEqual(payload?.event, { type: "leave", path: "/", engagedMs: 3_600_000 });
  });
});

describe("consent", () => {
  it("requires opt-in in the EEA, UK, and Switzerland, and when the country is unknown", () => {
    for (const country of ["DE", "FR", "IE", "NO", "GB", "CH", null, "XX", "T1"]) {
      assert.equal(requiresConsent(country), true, String(country));
    }
    for (const country of ["US", "CA", "IN", "BR"]) assert.equal(requiresConsent(country), false, country);
  });

  it("honors Global Privacy Control and Do Not Track", () => {
    assert.equal(hasOptOutSignal({ "sec-gpc": "1" }), true);
    assert.equal(hasOptOutSignal({ dnt: "1" }), true);
    assert.equal(hasOptOutSignal({ dnt: "0" }), false);
  });
});

describe("user agents", () => {
  it("flags crawlers, previewers, monitors, and automation", () => {
    for (const ua of [
      "Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)",
      "LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)",
      "facebookexternalhit/1.1",
      "Mozilla/5.0 (compatible; UptimeRobot/2.0; http://www.uptimerobot.com/)",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/120.0 Safari/537.36",
      "curl/8.4.0",
      undefined,
    ]) {
      assert.equal(isAutomatedUserAgent(ua), true, String(ua));
    }
  });

  it("reduces a real browser to coarse families", () => {
    const ua =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";
    assert.equal(isAutomatedUserAgent(ua), false);
    assert.deepEqual(describeUserAgent(ua), { browser: "Chrome", os: "macOS", device: "desktop" });
    assert.deepEqual(
      describeUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"),
      { browser: "Safari", os: "iOS", device: "mobile" },
    );
  });
});
