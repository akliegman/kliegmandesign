import { useEffect, useRef, useState } from "react";
import { Outlet, ScrollRestoration, useLocation, useNavigationType } from "react-router";

import { ConsentNotice } from "@/components/ConsentNotice";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { useVisitAnalytics } from "@/hooks/useVisitAnalytics";
import { hasOptOutSignal, useVisitConsent } from "@/lib/visits";

/**
 * After an in-app navigation, moves focus to the new page's h1 so keyboard and screen reader users
 * start at the top of the new content. Back and forward, hash links, and the first load are left to
 * the browser.
 */
function useRouteFocus() {
  const { key, hash } = useLocation();
  const navigationType = useNavigationType();
  const handledKey = useRef(key);

  useEffect(() => {
    if (handledKey.current === key) return;
    handledKey.current = key;
    if (navigationType === "POP" || hash) return;
    const heading = document.querySelector<HTMLElement>("main h1");
    if (!heading) return;
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }, [key, hash, navigationType]);
}

export function RootLayout() {
  const { pathname } = useLocation();
  const [consent, setConsent] = useVisitConsent();
  const [showConsent, setShowConsent] = useState(false);
  const policy = useVisitAnalytics(pathname, consent);
  // Visitors where consent is required are asked once; everyone else can change it from the footer.
  const askForConsent =
    policy?.enabled && policy.consentRequired && consent === "unset" && !hasOptOutSignal();

  useRouteFocus();

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow-overlay focus-visible:not-sr-only focus-visible:fixed focus-visible:top-2 focus-visible:left-2 focus-visible:z-50"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter onAnalyticsSettings={() => setShowConsent(true)} />
      {(askForConsent || showConsent) && (
        <ConsentNotice
          consent={consent}
          optedOutByBrowser={hasOptOutSignal()}
          onClose={() => setShowConsent(false)}
          onChoose={(choice) => {
            setConsent(choice);
            setShowConsent(false);
          }}
        />
      )}
      <ScrollRestoration />
    </>
  );
}
