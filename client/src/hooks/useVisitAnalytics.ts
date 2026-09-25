import { useEffect, useRef, useState } from "react";

import {
  fetchPolicy,
  isProductionHost,
  landingAttribution,
  linkEvent,
  sendVisitEvent,
  shouldCollect,
  stripCampaignParams,
  type VisitConsent,
  type VisitPolicy,
} from "@/lib/visits";

/** Tracks time the current page spends in a visible tab. */
function useEngagedTime() {
  const accrued = useRef(0);
  const visibleSince = useRef<number | null>(null);

  useEffect(() => {
    visibleSince.current = document.visibilityState === "visible" ? performance.now() : null;
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        visibleSince.current = performance.now();
      } else if (visibleSince.current !== null) {
        accrued.current += performance.now() - visibleSince.current;
        visibleSince.current = null;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /** Returns the time on the page so far and starts counting the next one. */
  return () => {
    const now = performance.now();
    const total =
      accrued.current + (visibleSince.current === null ? 0 : now - visibleSince.current);
    accrued.current = 0;
    visibleSince.current = document.visibilityState === "visible" ? now : null;
    return Math.round(total);
  };
}

/**
 * Sends page views, leave times, and résumé and contact clicks when the policy and the visitor's
 * choice allow it. Returns the server's policy so the layout knows whether to ask for consent.
 */
export function useVisitAnalytics(pathname: string, consent: VisitConsent) {
  const [policy, setPolicy] = useState<VisitPolicy | null>(null);
  const takeEngaged = useEngagedTime();
  const previousPath = useRef<string | null>(null);
  const landed = useRef(false);
  const collecting = shouldCollect(policy, consent);

  useEffect(() => {
    if (!isProductionHost()) return;
    let cancelled = false;
    void fetchPolicy().then((result) => {
      if (!cancelled) setPolicy(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: takeEngaged reads refs and is stable in effect
  useEffect(() => {
    if (!collecting) return;
    const engaged = takeEngaged();
    const attribution = landed.current ? null : landingAttribution();
    landed.current = true;
    if (attribution) stripCampaignParams();
    sendVisitEvent(
      {
        type: "pageview",
        path: pathname,
        previousEngagedMs: previousPath.current === null ? null : engaged,
      },
      consent,
      attribution,
    );
    previousPath.current = pathname;
  }, [collecting, pathname, consent]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: takeEngaged reads refs and is stable in effect
  useEffect(() => {
    if (!collecting) return;
    const onPageHide = () => {
      if (previousPath.current) {
        sendVisitEvent(
          { type: "leave", path: previousPath.current, engagedMs: takeEngaged() },
          consent,
          null,
          true,
        );
      }
    };
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      const href = link?.getAttribute("href");
      const tracked = href ? linkEvent(href, window.location.pathname) : null;
      if (tracked) sendVisitEvent(tracked, consent);
    };
    window.addEventListener("pagehide", onPageHide);
    document.addEventListener("click", onClick, { capture: true });
    return () => {
      window.removeEventListener("pagehide", onPageHide);
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, [collecting, consent]);

  return policy;
}
