import type * as React from "react";

import { cn } from "@/lib/utils";

export interface DocsLayoutProps {
  /** Section navigation, shown as a sticky sidebar from 1024px. */
  sidebar: React.ReactNode;
  /** Optional in-page links, shown as a right rail from 1280px. */
  aside?: React.ReactNode;
  children: React.ReactNode;
}

const sticky =
  "sticky top-[calc(var(--header-height)+2.5rem)] max-h-[calc(100dvh-var(--header-height)-4rem)] overflow-y-auto";

/**
 * The documentation layout used by case studies and /system: sidebar, a content column at a
 * readable width, and an optional on-this-page rail.
 */
export function DocsLayout({ sidebar, aside, children }: DocsLayoutProps) {
  return (
    <div
      className={cn(
        "container-page grid gap-16 pt-14 lg:grid-cols-[13rem_minmax(0,1fr)] lg:pt-20",
        aside && "xl:grid-cols-[13rem_minmax(0,1fr)_12rem]",
      )}
    >
      <div className="hidden lg:block">
        <div className={sticky}>{sidebar}</div>
      </div>
      <div className="min-w-0">{children}</div>
      {aside && (
        <div className="hidden xl:block">
          <div className={sticky}>{aside}</div>
        </div>
      )}
    </div>
  );
}
