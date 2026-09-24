import { PageMeta } from "@/components/PageMeta";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

/** Shown when a route throws while rendering. It keeps the header so the visitor can move on. */
export function RouteErrorPage() {
  return (
    <>
      <PageMeta title="Something went wrong" />
      <SiteHeader />
      <main id="main" className="container-page flex flex-col items-start gap-5 py-24 md:py-32">
        <p className="type-eyebrow">Error</p>
        <h1 className="type-title">Something went wrong</h1>
        <p className="type-lede max-w-[48ch]">
          This page hit an error while loading. Reloading usually fixes it.
        </p>
        <Button onClick={() => window.location.reload()}>Reload the page</Button>
      </main>
    </>
  );
}
