import type { VisitsConfig } from "./config";
import { parseIp } from "./ip";
import type { AsnTable } from "./network";
import { UNKNOWN_NETWORK, lookupNetwork } from "./network";
import type { Notifier } from "./notify";
import { NotifyError, formatMessage } from "./notify";
import type { NotificationJob, VisitStore } from "./store";

export interface WorkerDeps {
  store: VisitStore;
  config: VisitsConfig;
  notifier: Notifier | null;
  /** The current ASN table, or null while it loads. */
  network: () => AsnTable | null;
  log: (message: string) => void;
}

/** Backoff between delivery attempts; after the last one the job is marked failed. */
export const RETRY_DELAYS_SECONDS = [60, 300, 900, 3600];

async function processJob(job: NotificationJob, deps: WorkerDeps): Promise<string> {
  const { store, config } = deps;
  const visit = await store.getVisit(job.visit_id);
  if (!visit) return "visit-deleted";

  const events = await store.getEvents(visit.id);
  const ip = visit.ip ? parseIp(visit.ip) : null;
  const table = deps.network();
  const network = ip && table ? lookupNetwork(table, ip) : UNKNOWN_NETWORK;
  const pageviews = events.filter((event) => event.type === "pageview");
  const interactions = events.filter((event) => event.type === "resume_download" || event.type === "contact_click");

  if (job.kind === "summary") await store.closeVisit(visit.id);

  // Single-page visits from cloud networks are most often link scanners and previewers.
  if (job.kind === "start" && network.type === "hosting") return "hosting-network";
  if (job.kind === "summary" && network.type === "hosting" && pageviews.length <= 1 && interactions.length === 0) {
    return "likely-automated";
  }
  if (
    job.kind === "start" &&
    visit.ip_masked &&
    (await store.recentStartForNetwork(visit.ip_masked, visit.id, config.startCooldownMinutes))
  ) {
    return "cooldown";
  }
  if ((await store.sentInLastHour()) >= config.maxNotificationsPerHour) return "rate-limited";
  if (!deps.notifier) return "no-notifier";

  const text = formatMessage({
    kind: job.kind,
    visit,
    events,
    network,
    maskIp: config.maskIp,
    timeZone: config.timeZone,
  });

  if (job.kind === "start") {
    const { ts } = await deps.notifier.post(text);
    await store.setStartMessage(visit.id, ts);
  } else if (visit.start_message_ts) {
    await deps.notifier.reply(visit.start_message_ts, text);
  } else {
    await deps.notifier.post(text);
  }
  return "sent";
}

/** Processes due notification jobs. Logs carry job ids and outcome codes only, never visitor data. */
export async function runDueJobs(deps: WorkerDeps, limit = 10): Promise<void> {
  const jobs = await deps.store.claimDueJobs(limit);
  for (const job of jobs) {
    try {
      const outcome = await processJob(job, deps);
      if (outcome === "sent") await deps.store.finishJob(job.id, "sent");
      else await deps.store.finishJob(job.id, "skipped", outcome);
      deps.log(`visits: job ${job.id} ${job.kind} ${outcome}`);
    } catch (error: unknown) {
      const attempts = job.attempts + 1;
      const code = error instanceof NotifyError ? error.code : "internal-error";
      const retryAfter = error instanceof NotifyError ? error.retryAfterSeconds : null;
      const step = RETRY_DELAYS_SECONDS[attempts - 1];
      const delay = step === undefined ? null : Math.max(retryAfter ?? 0, step);
      await deps.store.failJob(job.id, attempts, code, delay);
      deps.log(`visits: job ${job.id} ${job.kind} attempt ${attempts} failed (${code})${delay === null ? ", giving up" : ""}`);
    }
  }
}
