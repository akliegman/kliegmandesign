import type { Cidr } from "./ip";
import { parseCidrList } from "./ip";

export interface VisitsConfig {
  enabled: boolean;
  behindHerokuRouter: boolean;
  allowedHosts: string[];
  ignoreNetworks: Cidr[];
  ipRetentionDays: number;
  visitRetentionDays: number;
  startDelaySeconds: number;
  inactivityMinutes: number;
  startCooldownMinutes: number;
  maxNotificationsPerHour: number;
  /** Full addresses go to Slack unless this is set; masked ones are /24 (IPv4) or /48 (IPv6). */
  maskIp: boolean;
  timeZone: string;
  slack: { token: string; channel: string } | null;
}

type Env = Record<string, string | undefined>;

function list(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function positiveNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function readVisitsConfig(env: Env = process.env): VisitsConfig {
  const token = env.VISITS_SLACK_BOT_TOKEN;
  const channel = env.VISITS_SLACK_CHANNEL_ID;
  return {
    enabled: env.VISITS_ENABLED === "true",
    behindHerokuRouter: Boolean(env.DYNO),
    allowedHosts: list(env.VISITS_ALLOWED_HOSTS ?? "adamkliegman.com,www.adamkliegman.com"),
    ignoreNetworks: parseCidrList(list(env.VISITS_IGNORE_NETWORKS)),
    ipRetentionDays: positiveNumber(env.VISITS_IP_RETENTION_DAYS, 7),
    visitRetentionDays: positiveNumber(env.VISITS_RETENTION_DAYS, 30),
    startDelaySeconds: positiveNumber(env.VISITS_START_DELAY_SECONDS, 20),
    inactivityMinutes: positiveNumber(env.VISITS_INACTIVITY_MINUTES, 30),
    startCooldownMinutes: positiveNumber(env.VISITS_START_COOLDOWN_MINUTES, 360),
    maxNotificationsPerHour: positiveNumber(env.VISITS_MAX_NOTIFICATIONS_PER_HOUR, 20),
    maskIp: env.VISITS_MASK_IP === "true",
    timeZone: env.VISITS_TIME_ZONE ?? "America/New_York",
    slack: token && channel ? { token, channel } : null,
  };
}
