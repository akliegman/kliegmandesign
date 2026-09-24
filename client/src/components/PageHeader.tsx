import type * as React from "react";

import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  /** Breadcrumb or eyebrow content shown above the title. */
  kicker?: React.ReactNode;
  title: string;
  lede?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/** The title block every inner page opens with: kicker, h1, and lede at a readable measure. */
export function PageHeader({ kicker, title, lede, children, className }: PageHeaderProps) {
  return (
    <header className={cn("flex animate-rise flex-col gap-4", className)}>
      {kicker}
      <h1 className="type-title max-w-[22ch]">{title}</h1>
      {lede && <p className="type-lede max-w-[64ch]">{lede}</p>}
      {children}
    </header>
  );
}
