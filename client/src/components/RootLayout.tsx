import { useEffect, useRef, useState } from "react";
import { Outlet, ScrollRestoration, useLocation, useNavigationType } from "react-router";

import { ConsentNotice } from "@/components/ConsentNotice";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { trackPageview, useAnalyticsConsent } from "@/lib/analytics";

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
  const [consent, setConsent] = useAnalyticsConsent();
  const [showConsent, setShowConsent] = useState(false);

  useRouteFocus();

  useEffect(() => {
    if (consent === "granted") trackPageview(pathname);
  }, [consent, pathname]);

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
      {(consent === "unset" || showConsent) && (
        <ConsentNotice
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
