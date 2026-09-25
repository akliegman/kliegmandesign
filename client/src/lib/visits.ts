import { useCallback, useSyncExternalStore } from "react";

/**
 * First-party visit analytics: page views and a few link clicks, sent to the site's own server.
 * The server enforces the same consent rules independently.
 */

export type VisitConsent = "granted" | "denied" | "unset";

export interface VisitPolicy {
  enabled: boolean;
  consentRequired: boolean;
}

export type VisitEvent =
  | { type: "pageview"; path: string; previousEngagedMs: number | null }
  | { type: "leave"; path: string; engagedMs: number }
  | { type: "resume_download"; path: string }
  | { type: "contact_click"; path: string; target: "email" | "linkedin" | "github" };

const CONSENT_KEY = "visit-analytics";
const SESSION_KEY = "visit-session";
const SESSION_IDLE_MS = 30 * 60 * 1000;
const ENDPOINT = "/api/visits/events";
const CAMPAIGN_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const listeners = new Set<() => void>();

function readConsent(): VisitConsent {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored === "granted" || stored === "denied" ? stored : "unset";
  } catch {
    return "unset";
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useVisitConsent() {
  const consent = useSyncExternalStore(subscribe, readConsent, () => "unset" as const);
  const setConsent = useCallback((next: Exclude<VisitConsent, "unset">) => {
    try {
      localStorage.setItem(CONSENT_KEY, next);
    } catch {
      // Without storage the choice lasts for this page only.
    }
    for (const listener of listeners) listener();
  }, []);
  return [consent, setConsent] as const;
}

/** Global Privacy Control or Do Not Track. Either one turns collection off, with no prompt. */
export function hasOptOutSignal(): boolean {
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  return nav.globalPrivacyControl === true || nav.doNotTrack === "1";
}

/** Collection runs only on the production site, never in development or previews. */
export function isProductionHost(hostname: string = window.location.hostname): boolean {
  return import.meta.env.PROD && /(^|\.)adamkliegman\.com$/.test(hostname);
}

export function shouldCollect(policy: VisitPolicy | null, consent: VisitConsent): boolean {
  if (!policy?.enabled || consent === "denied" || hasOptOutSignal()) return false;
  return policy.consentRequired ? consent === "granted" : true;
}

export async function fetchPolicy(): Promise<VisitPolicy | null> {
  try {
    const response = await fetch("/api/visits/policy", { credentials: "omit" });
    return response.ok ? ((await response.json()) as VisitPolicy) : null;
  } catch {
    return null;
  }
}

/**
 * A random id that groups one visit's events. It lives in sessionStorage, so it ends with the tab,
 * and it rotates after 30 idle minutes.
 */
export function visitSessionId(now: number = Date.now()): string {
  try {
    const stored = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? "null") as {
      id: string;
      lastActive: number;
    } | null;
    const id =
      stored && now - stored.lastActive < SESSION_IDLE_MS ? stored.id : crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id, lastActive: now }));
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

/** The referring site (host only) and campaign parameters, read once on landing. */
export function landingAttribution(
  location: Location = window.location,
  referrer: string = document.referrer,
) {
  const params = new URLSearchParams(location.search);
  let referrerHost: string | null = null;
  try {
    const host = referrer ? new URL(referrer).hostname : "";
    referrerHost = host && host !== location.hostname ? host : null;
  } catch {
    referrerHost = null;
  }
  return {
    referrerHost,
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
    utmContent: params.get("utm_content"),
    utmTerm: params.get("utm_term"),
  };
}

/** Removes campaign parameters from the address bar so a copied link doesn't carry them on. */
export function stripCampaignParams() {
  const url = new URL(window.location.href);
  const had = CAMPAIGN_PARAMS.some((param) => url.searchParams.has(param));
  if (!had) return;
  for (const param of CAMPAIGN_PARAMS) url.searchParams.delete(param);
  window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
}

/** Maps a clicked link to one of the tracked interactions, or null for everything else. */
export function linkEvent(href: string, path: string): VisitEvent | null {
  if (href.startsWith("mailto:")) return { type: "contact_click", path, target: "email" };
  try {
    const url = new URL(href, window.location.origin);
    if (url.origin === window.location.origin && url.pathname.endsWith(".pdf")) {
      return { type: "resume_download", path };
    }
    if (/(^|\.)linkedin\.com$/.test(url.hostname))
      return { type: "contact_click", path, target: "linkedin" };
    if (/(^|\.)github\.com$/.test(url.hostname))
      return { type: "contact_click", path, target: "github" };
  } catch {
    return null;
  }
  return null;
}

export function sendVisitEvent(
  event: VisitEvent,
  consent: VisitConsent,
  attribution: ReturnType<typeof landingAttribution> | null = null,
  beacon = false,
) {
  const body = JSON.stringify({
    sessionId: visitSessionId(),
    consent: consent === "granted" ? "granted" : "notice",
    event,
    attribution,
  });
  try {
    if (beacon && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "text/plain" }));
      return;
    }
    void fetch(ENDPOINT, {
      method: "POST",
      body,
      keepalive: true,
      credentials: "omit",
      headers: { "content-type": "text/plain" },
    }).catch(() => undefined);
  } catch {
    // Analytics never interrupts the page.
  }
}
