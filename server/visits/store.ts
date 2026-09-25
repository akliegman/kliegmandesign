import { QueryTypes } from "sequelize";
import type { Sequelize } from "sequelize";
import type { VisitEvent, VisitPayload } from "./events";

/**
 * Visit data lives in three tables. Full addresses sit in `visits.ip` only until the IP retention
 * window passes; everything else is deleted after the visit retention window.
 */
export const SCHEMA = `
CREATE TABLE IF NOT EXISTS visits (
  id bigserial PRIMARY KEY,
  session_id text NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  closed_at timestamptz,
  consent text NOT NULL,
  ip text,
  ip_masked text,
  country text,
  region text,
  city text,
  browser text,
  os text,
  device text,
  referrer_host text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  start_message_ts text
);
CREATE UNIQUE INDEX IF NOT EXISTS visits_open_session ON visits (session_id) WHERE closed_at IS NULL;
CREATE INDEX IF NOT EXISTS visits_started_at ON visits (started_at);

CREATE TABLE IF NOT EXISTS visit_events (
  id bigserial PRIMARY KEY,
  visit_id bigint NOT NULL REFERENCES visits (id) ON DELETE CASCADE,
  at timestamptz NOT NULL DEFAULT now(),
  type text NOT NULL,
  path text NOT NULL,
  target text,
  engaged_ms integer
);
CREATE INDEX IF NOT EXISTS visit_events_visit ON visit_events (visit_id, at);

CREATE TABLE IF NOT EXISTS visit_notifications (
  id bigserial PRIMARY KEY,
  visit_id bigint NOT NULL REFERENCES visits (id) ON DELETE CASCADE,
  kind text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  run_at timestamptz NOT NULL,
  attempts integer NOT NULL DEFAULT 0,
  last_error text,
  sent_at timestamptz,
  UNIQUE (visit_id, kind)
);
CREATE INDEX IF NOT EXISTS visit_notifications_due ON visit_notifications (run_at) WHERE status = 'pending';
`;

export interface VisitContext {
  ip: string | null;
  ipMasked: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  browser: string;
  os: string;
  device: string;
}

export interface VisitRow {
  id: string;
  session_id: string;
  started_at: Date;
  last_seen_at: Date;
  ip: string | null;
  ip_masked: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  browser: string | null;
  os: string | null;
  device: string | null;
  referrer_host: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  start_message_ts: string | null;
}

export interface EventRow {
  at: Date;
  type: VisitEvent["type"];
  path: string;
  target: string | null;
  engaged_ms: number | null;
}

export interface NotificationJob {
  id: string;
  visit_id: string;
  kind: "start" | "summary";
  attempts: number;
}

export function createStore(sequelize: Sequelize) {
  const select = <T extends object>(sql: string, bind: unknown[] = []) =>
    sequelize.query<T>(sql, { bind, type: QueryTypes.SELECT });
  const run = (sql: string, bind: unknown[] = []) => sequelize.query(sql, { bind });

  return {
    migrate: () => run(SCHEMA),

    /**
     * Records one event, opening a visit for the session if none is open, and schedules the
     * notifications: the start notice once per visit, and the summary pushed back after each event
     * until the visitor has been inactive for the whole window.
     */
    async recordEvent(
      payload: VisitPayload,
      context: VisitContext,
      options: { startDelaySeconds: number; inactivityMinutes: number },
    ): Promise<void> {
      await sequelize.transaction(async (transaction) => {
        const attribution = payload.attribution;
        const [visit] = await sequelize.query<{ id: string }>(
          `INSERT INTO visits (session_id, consent, ip, ip_masked, country, region, city, browser, os, device,
             referrer_host, utm_source, utm_medium, utm_campaign, utm_content, utm_term)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
           ON CONFLICT (session_id) WHERE closed_at IS NULL
           DO UPDATE SET last_seen_at = now()
           RETURNING id`,
          {
            bind: [
              payload.sessionId,
              payload.consent,
              context.ip,
              context.ipMasked,
              context.country,
              context.region,
              context.city,
              context.browser,
              context.os,
              context.device,
              attribution?.referrerHost ?? null,
              attribution?.utmSource ?? null,
              attribution?.utmMedium ?? null,
              attribution?.utmCampaign ?? null,
              attribution?.utmContent ?? null,
              attribution?.utmTerm ?? null,
            ],
            type: QueryTypes.SELECT,
            transaction,
          },
        );
        if (!visit) throw new Error("visit upsert returned no row");

        const event = payload.event;
        const target = event.type === "contact_click" ? event.target : null;
        const engaged =
          event.type === "leave" ? event.engagedMs : event.type === "pageview" ? event.previousEngagedMs : null;
        await sequelize.query(
          "INSERT INTO visit_events (visit_id, type, path, target, engaged_ms) VALUES ($1, $2, $3, $4, $5)",
          { bind: [visit.id, event.type, event.path, target, engaged], transaction },
        );
        await sequelize.query(
          `INSERT INTO visit_notifications (visit_id, kind, run_at)
           VALUES ($1, 'start', now() + make_interval(secs => $2)),
                  ($1, 'summary', now() + make_interval(mins => $3))
           ON CONFLICT (visit_id, kind) DO UPDATE SET run_at = EXCLUDED.run_at
             WHERE visit_notifications.kind = 'summary' AND visit_notifications.status = 'pending'`,
          { bind: [visit.id, options.startDelaySeconds, options.inactivityMinutes], transaction },
        );
      });
    },

    /** Claims due jobs so concurrent workers never process the same one. */
    claimDueJobs: (limit: number) =>
      select<NotificationJob>(
        `UPDATE visit_notifications SET status = 'running'
         WHERE id IN (
           SELECT id FROM visit_notifications
           WHERE status = 'pending' AND run_at <= now()
           ORDER BY run_at LIMIT $1 FOR UPDATE SKIP LOCKED
         )
         RETURNING id, visit_id, kind, attempts`,
        [limit],
      ),

    /** Jobs left 'running' by a dyno restart go back in the queue. */
    requeueStuckJobs: () =>
      run("UPDATE visit_notifications SET status = 'pending' WHERE status = 'running'"),

    finishJob: (id: string, status: "sent" | "skipped", reason: string | null = null) =>
      run(
        `UPDATE visit_notifications SET status = $2, last_error = $3,
           sent_at = CASE WHEN $2 = 'sent' THEN now() ELSE NULL END
         WHERE id = $1`,
        [id, status, reason],
      ),

    /** Reschedules a failed job with backoff, or marks it failed after the last attempt. */
    failJob: (id: string, attempts: number, error: string, retryInSeconds: number | null) =>
      run(
        `UPDATE visit_notifications SET attempts = $2, last_error = $3,
           status = CASE WHEN $4::int IS NULL THEN 'failed' ELSE 'pending' END,
           run_at = CASE WHEN $4::int IS NULL THEN run_at ELSE now() + make_interval(secs => $4::int) END
         WHERE id = $1`,
        [id, attempts, error, retryInSeconds],
      ),

    async getVisit(id: string) {
      const [visit] = await select<VisitRow>("SELECT * FROM visits WHERE id = $1", [id]);
      return visit ?? null;
    },

    getEvents: (visitId: string) =>
      select<EventRow>(
        "SELECT at, type, path, target, engaged_ms FROM visit_events WHERE visit_id = $1 ORDER BY at, id",
        [visitId],
      ),

    setStartMessage: (visitId: string, ts: string) =>
      run("UPDATE visits SET start_message_ts = $2 WHERE id = $1", [visitId, ts]),

    closeVisit: (visitId: string) =>
      run("UPDATE visits SET closed_at = now() WHERE id = $1 AND closed_at IS NULL", [visitId]),

    /** Whether a start notice already went out for this network within the cooldown. */
    async recentStartForNetwork(ipMasked: string, visitId: string, cooldownMinutes: number) {
      const rows = await select<{ id: string }>(
        `SELECT n.id FROM visit_notifications n JOIN visits v ON v.id = n.visit_id
         WHERE n.kind = 'start' AND n.status = 'sent' AND v.ip_masked = $1 AND v.id <> $2
           AND n.sent_at > now() - make_interval(mins => $3)
         LIMIT 1`,
        [ipMasked, visitId, cooldownMinutes],
      );
      return rows.length > 0;
    },

    async sentInLastHour() {
      const [row] = await select<{ count: string }>(
        "SELECT count(*) FROM visit_notifications WHERE status = 'sent' AND sent_at > now() - interval '1 hour'",
      );
      return Number(row?.count ?? 0);
    },

    /**
     * Deletes expired data: full addresses after the IP window, whole visits
     * (with their events and notification records) after the visit window.
     */
    async applyRetention(ipRetentionDays: number, visitRetentionDays: number) {
      await run(
        "UPDATE visits SET ip = NULL WHERE ip IS NOT NULL AND started_at < now() - make_interval(days => $1)",
        [ipRetentionDays],
      );
      await run("DELETE FROM visits WHERE started_at < now() - make_interval(days => $1)", [
        visitRetentionDays,
      ]);
    },
  };
}

export type VisitStore = ReturnType<typeof createStore>;
