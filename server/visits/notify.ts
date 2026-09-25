import { WebClient } from "@slack/web-api";
import type { NetworkInfo } from "./network";
import type { EventRow, VisitRow } from "./store";

export interface Notifier {
  post(text: string): Promise<{ ts: string }>;
  reply(threadTs: string, text: string): Promise<void>;
}

export interface MessageInput {
  kind: "start" | "summary";
  visit: VisitRow;
  events: EventRow[];
  network: NetworkInfo;
  maskIp: boolean;
  timeZone: string;
}

/** Slack treats &, <, and > as control characters; escaping them also defuses @channel-style mentions. */
export function escapeSlack(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const PAGE_NAMES: Record<string, string> = {
  "/": "Home",
  "/work": "Work",
  "/ai": "AI",
  "/system": "Design system",
  "/about": "About",
  "/resume": "Résumé",
  "/privacy-policy": "Privacy policy",
  "/terms-of-use": "Terms",
};

export function pageName(path: string): string {
  const named = PAGE_NAMES[path];
  if (named) return named;
  const slug = /^\/work\/([a-z0-9-]+)$/.exec(path)?.[1];
  return slug ? `Case study: ${slug.replace(/-/g, " ")}` : path;
}

const NETWORK_TYPES: Record<NetworkInfo["type"], string> = {
  isp: "ISP",
  mobile: "mobile carrier",
  hosting: "cloud or hosting",
  "security-proxy": "corporate security proxy",
  vpn: "VPN or proxy",
  other: "other",
  unknown: "unknown",
};

function formatDuration(ms: number): string {
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

/** Pairs each page view with its engaged time, which arrives with the next event. */
export function pageSequence(events: EventRow[], withTimes: boolean): string {
  const views = events.filter((event) => event.type === "pageview");
  if (views.length === 0) return "none recorded";
  return views
    .map((view, index) => {
      const later = events.filter((event) => event.at >= view.at && event !== view);
      const next = views[index + 1];
      const engaged =
        next?.engaged_ms ??
        later.find((event) => event.type === "leave" && event.path === view.path)?.engaged_ms ??
        null;
      const name = pageName(view.path);
      return withTimes && engaged !== null ? `${name} (~${formatDuration(engaged)})` : name;
    })
    .join(" → ");
}

export function actionList(events: EventRow[]): string {
  const actions = events.flatMap((event) => {
    if (event.type === "resume_download") return ["Résumé download"];
    if (event.type === "contact_click") {
      const target = event.target === "email" ? "email" : event.target === "linkedin" ? "LinkedIn" : "GitHub";
      return [`Contact click (${target})`];
    }
    return [];
  });
  return actions.length > 0 ? [...new Set(actions)].join(", ") : "none";
}

function formatTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone,
    timeZoneName: "short",
  }).format(date);
}

/** Builds the Slack message. Every line is observed data or a labeled estimate. */
export function formatMessage(input: MessageInput): string {
  const { visit, events, network } = input;
  const lines: string[] = [];

  lines.push(input.kind === "start" ? "*New portfolio visit*" : "*Portfolio visit summary*");
  lines.push(`Time: ${formatTime(visit.started_at, input.timeZone)}`);
  if (input.kind === "summary") {
    const minutes = Math.max(1, Math.round((visit.last_seen_at.getTime() - visit.started_at.getTime()) / 60000));
    lines.push(`Active span: about ${minutes} min (first to last event)`);
  }

  const place = [visit.city, visit.region, visit.country].filter(Boolean).join(", ");
  lines.push(`Approximate location: ${place || "unknown"}`);
  const networkParts = [
    network.organization ?? "unknown organization",
    network.asn !== null ? `AS${network.asn}` : null,
    NETWORK_TYPES[network.type],
  ].filter(Boolean);
  lines.push(`Network: ${networkParts.join(" / ")}`);
  const ip = input.maskIp ? visit.ip_masked : (visit.ip ?? visit.ip_masked);
  lines.push(`IP: ${ip ?? "unknown"}${input.maskIp || !visit.ip ? " (masked)" : ""}`);
  lines.push(`Device: ${[visit.browser, visit.os, visit.device].filter(Boolean).join(", ") || "unknown"}`);

  const source = [
    visit.referrer_host ? `referrer ${visit.referrer_host}` : null,
    visit.utm_source ? `utm_source ${visit.utm_source}` : null,
    visit.utm_medium ? `utm_medium ${visit.utm_medium}` : null,
    visit.utm_campaign ? `utm_campaign ${visit.utm_campaign}` : null,
    visit.utm_content ? `utm_content ${visit.utm_content}` : null,
    visit.utm_term ? `utm_term ${visit.utm_term}` : null,
  ].filter(Boolean);
  lines.push(`Arrived via: ${source.length > 0 ? source.join(", ") : "direct or unknown"}`);

  const withTimes = input.kind === "summary";
  lines.push(`Pages${withTimes ? "" : " so far"}: ${pageSequence(events, withTimes)}`);
  lines.push(`Actions: ${actionList(events)}`);
  if (withTimes) lines.push("Times are estimated visible time per page, not proof of attention.");
  if (network.type === "hosting") {
    lines.push("Note: cloud or hosting network; this may be a VPN, link scanner, or automation.");
  }

  return lines.map(escapeSlack).join("\n");
}

export class NotifyError extends Error {
  constructor(
    readonly code: string,
    readonly retryAfterSeconds: number | null,
  ) {
    super(`Slack delivery failed: ${code}`);
  }
}

/**
 * Posts to a Slack channel with a bot token (chat:write), which lets the summary thread under the
 * start notice. The client's own retries are off; the durable job queue owns retries.
 */
export function createSlackNotifier(token: string, channel: string): Notifier {
  const client = new WebClient(token, { retryConfig: { retries: 0 }, rejectRateLimitedCalls: true });

  const call = async (args: { text: string; thread_ts?: string }) => {
    try {
      const result = await client.chat.postMessage({ channel, unfurl_links: false, unfurl_media: false, ...args });
      return result.ts ?? "";
    } catch (error: unknown) {
      const details = error as { code?: string; data?: { error?: string }; retryAfter?: number };
      throw new NotifyError(details.data?.error ?? details.code ?? "unknown", details.retryAfter ?? null);
    }
  };

  return {
    post: async (text) => ({ ts: await call({ text }) }),
    reply: async (threadTs, text) => {
      await call({ text, thread_ts: threadTs });
    },
  };
}
