import { useCallback, useSyncExternalStore } from "react";

export type AnalyticsConsent = "granted" | "denied" | "unset";

const MEASUREMENT_ID = "G-EQ38B6FGRR";
const STORAGE_KEY = "analytics-consent";
const listeners = new Set<() => void>();
let analytics: Promise<typeof import("react-ga4").default> | undefined;

function readConsent(): AnalyticsConsent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : "unset";
  } catch {
    return "unset";
  }
}

/** Deletes Google Analytics cookies (`_ga`, `_ga_<id>`) on this host and its parent domains. */
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim() ?? "")
    .filter((name) => name.startsWith("_ga"));
  const labels = window.location.hostname.split(".");
  const domains = labels.map((_, index) => labels.slice(index).join(".")).slice(0, -1);
  for (const name of names) {
    for (const domain of ["", ...domains.map((domain) => `; domain=.${domain}`)]) {
      // biome-ignore lint/suspicious/noDocumentCookie: the Cookie Store API is not available in every browser the site supports
      document.cookie = `${name}=; max-age=0; path=/${domain}`;
    }
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * The visitor's analytics choice. Google Analytics loads only after it is "granted", and never on
 * localhost, so development traffic stays out of the reports.
 */
export function useAnalyticsConsent() {
  const consent = useSyncExternalStore(subscribe, readConsent, () => "unset" as const);

  const setConsent = useCallback((next: Exclude<AnalyticsConsent, "unset">) => {
    const revoking = next === "denied" && readConsent() === "granted";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Without storage the choice applies to this visit only.
    }
    for (const listener of listeners) listener();
    if (revoking) {
      // Google Analytics can't be unloaded from a running page, so withdrawing consent clears its
      // cookies and reloads; the fresh page never loads it.
      clearAnalyticsCookies();
      window.location.reload();
    }
  }, []);

  return [consent, setConsent] as const;
}

/** Records a page view. The analytics library is only downloaded once consent is granted. */
export function trackPageview(path: string) {
  if (import.meta.env.DEV || window.location.hostname === "localhost") return;
  analytics ??= import("react-ga4").then(({ default: ReactGA }) => {
    ReactGA.initialize(MEASUREMENT_ID);
    return ReactGA;
  });
  void analytics.then((ReactGA) => ReactGA.send({ hitType: "pageview", page: path }));
}
