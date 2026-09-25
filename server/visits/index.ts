import type { Application } from "express";
import type { Sequelize } from "sequelize";
import type { VisitsConfig } from "./config";
import type { AsnTable } from "./network";
import { downloadAsnTable } from "./network";
import { createSlackNotifier } from "./notify";
import { visitRoutes } from "./routes";
import { createStore } from "./store";
import { runDueJobs } from "./worker";

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Mounts the collector and starts the notification worker on the web dyno. The queue lives in
 * Postgres, so pending notifications survive restarts; the timers only decide when to look.
 * Every failure here is logged and contained, so analytics can never take the site down.
 */
export function startVisits(app: Application, sequelize: Sequelize, config: VisitsConfig, log: (message: string) => void) {
  const store = createStore(sequelize);
  app.use("/api/visits", visitRoutes({ store, config, log }));
  if (!config.enabled) {
    log("visits: disabled (set VISITS_ENABLED=true to collect)");
    return;
  }
  if (!config.slack) log("visits: no Slack credentials; visits are recorded but not sent");

  let network: AsnTable | null = null;
  const loadNetwork = () =>
    downloadAsnTable()
      .then((table) => {
        network = table;
        log("visits: network data loaded");
      })
      .catch((error: Error) => log(`visits: network data unavailable (${error.message})`));

  const deps = {
    store,
    config,
    notifier: config.slack ? createSlackNotifier(config.slack.token, config.slack.channel) : null,
    network: () => network,
    log,
  };

  let working = false;
  const tick = async () => {
    if (working) return;
    working = true;
    try {
      await runDueJobs(deps);
    } catch {
      log("visits: worker tick failed");
    } finally {
      working = false;
    }
  };
  const sweep = () =>
    store
      .applyRetention(config.ipRetentionDays, config.visitRetentionDays)
      .catch(() => log("visits: retention sweep failed"));

  store
    .migrate()
    .then(() => store.requeueStuckJobs())
    .then(() => {
      void loadNetwork();
      void sweep();
      setInterval(tick, 10_000).unref();
      setInterval(sweep, 60 * 60 * 1000).unref();
      setInterval(loadNetwork, DAY_MS).unref();
      log("visits: worker started");
    })
    .catch(() => log("visits: schema setup failed; collector is recording nothing"));
}
