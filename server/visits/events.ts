export const CONTACT_TARGETS = ["email", "linkedin", "github"] as const;
export type ContactTarget = (typeof CONTACT_TARGETS)[number];

export type VisitEvent =
  | { type: "pageview"; path: string; previousEngagedMs: number | null }
  | { type: "leave"; path: string; engagedMs: number }
  | { type: "resume_download"; path: string }
  | { type: "contact_click"; path: string; target: ContactTarget };

export interface Attribution {
  referrerHost: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
}

export interface VisitPayload {
  sessionId: string;
  consent: "granted" | "notice";
  event: VisitEvent;
  /** Sent with the first page view of a session only. */
  attribution: Attribution | null;
}

const SESSION_ID = /^[A-Za-z0-9-]{16,64}$/;
const PATH = /^\/[a-z0-9\-/]{0,120}$/;
const HOST = /^(?=.{1,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;
const CAMPAIGN_VALUE = /^[A-Za-z0-9._+ -]{1,64}$/;
/** Engaged time is capped at an hour; anything longer is a tab left open. */
const MAX_ENGAGED_MS = 60 * 60 * 1000;

function record(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/** Only the path is kept. Query strings and fragments never reach storage. */
export function sanitizePath(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const path = value.split(/[?#]/)[0]?.toLowerCase().replace(/\/+$/, "") || "/";
  return PATH.test(path) ? path : null;
}

function sanitizeHost(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const host = value.toLowerCase().replace(/^www\./, "");
  return HOST.test(host) ? host : null;
}

function sanitizeCampaign(value: unknown): string | null {
  return typeof value === "string" && CAMPAIGN_VALUE.test(value) ? value : null;
}

function sanitizeDuration(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? Math.min(Math.round(value), MAX_ENGAGED_MS)
    : null;
}

function sanitizeEvent(value: unknown): VisitEvent | null {
  const event = record(value);
  if (!event) return null;
  const path = sanitizePath(event.path);
  if (!path) return null;
  switch (event.type) {
    case "pageview":
      return { type: "pageview", path, previousEngagedMs: sanitizeDuration(event.previousEngagedMs) };
    case "leave": {
      const engagedMs = sanitizeDuration(event.engagedMs);
      return engagedMs === null ? null : { type: "leave", path, engagedMs };
    }
    case "resume_download":
      return { type: "resume_download", path };
    case "contact_click":
      return CONTACT_TARGETS.includes(event.target as ContactTarget)
        ? { type: "contact_click", path, target: event.target as ContactTarget }
        : null;
    default:
      return null;
  }
}

function sanitizeAttribution(value: unknown): Attribution | null {
  const attribution = record(value);
  if (!attribution) return null;
  return {
    referrerHost: sanitizeHost(attribution.referrerHost),
    utmSource: sanitizeCampaign(attribution.utmSource),
    utmMedium: sanitizeCampaign(attribution.utmMedium),
    utmCampaign: sanitizeCampaign(attribution.utmCampaign),
    utmContent: sanitizeCampaign(attribution.utmContent),
    utmTerm: sanitizeCampaign(attribution.utmTerm),
  };
}

/**
 * Validates a collector payload against an explicit allowlist. Unknown fields are dropped, and a
 * payload with an invalid session, consent state, or event is rejected whole.
 */
export function parsePayload(value: unknown): VisitPayload | null {
  const payload = record(value);
  if (!payload) return null;
  if (typeof payload.sessionId !== "string" || !SESSION_ID.test(payload.sessionId)) return null;
  if (payload.consent !== "granted" && payload.consent !== "notice") return null;
  const event = sanitizeEvent(payload.event);
  if (!event) return null;
  return {
    sessionId: payload.sessionId,
    consent: payload.consent,
    event,
    attribution: event.type === "pageview" ? sanitizeAttribution(payload.attribution) : null,
  };
}
