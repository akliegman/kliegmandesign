import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";

import { cn } from "@/lib/utils";

interface PagerLink {
  to: string;
  title: string;
}

export interface PagerProps {
  previous?: PagerLink;
  next?: PagerLink;
  className?: string;
}

const linkClass =
  "gradient-stroke group flex flex-col gap-1 rounded-xl border bg-card p-4 transition-shadow hover:shadow-raised";

/** Previous and next links at the end of a sequence of pages, such as the case studies. */
export function Pager({ previous, next, className }: PagerProps) {
  return (
    <nav aria-label="Previous and next" className={cn("grid gap-3 sm:grid-cols-2", className)}>
      {previous ? (
        <Link to={previous.to} viewTransition className={linkClass}>
          <span className="type-eyebrow inline-flex items-center gap-1.5">
            <ArrowLeftIcon
              aria-hidden="true"
              className="size-3.5 transition-transform group-hover:-translate-x-0.5"
            />
            Previous
          </span>
          <span className="font-medium">{previous.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link to={next.to} viewTransition className={cn(linkClass, "sm:items-end sm:text-right")}>
          <span className="type-eyebrow inline-flex items-center gap-1.5">
            Next
            <ArrowRightIcon
              aria-hidden="true"
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
            />
          </span>
          <span className="font-medium">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
