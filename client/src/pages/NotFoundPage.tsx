import { Link } from "react-router";

import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="container-page flex flex-col items-start gap-5 py-24 md:py-32">
      <PageMeta title="Page not found" />
      <p className="type-eyebrow">404</p>
      <h1 className="type-title">Page not found</h1>
      <p className="type-lede max-w-[48ch]">
        This page doesn't exist or has moved. The case studies are all on the work page.
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <Button asChild>
          <Link to="/work" viewTransition>
            See the work
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/" viewTransition>
            Go home
          </Link>
        </Button>
      </div>
    </div>
  );
}
