import type * as React from "react";

import { cn } from "@/lib/utils";

export interface MetaListProps {
  items: { label: string; value: React.ReactNode }[];
  className?: string;
}

/** Label and value pairs as a definition list, with labels set as mono eyebrows. */
export function MetaList({ items, className }: MetaListProps) {
  return (
    <dl className={cn("grid border-t sm:grid-cols-[9rem_1fr]", className)}>
      {items.map(({ label, value }) => (
        <div
          key={label}
          className="grid gap-1 border-b py-3 sm:col-span-2 sm:grid-cols-subgrid sm:gap-4"
        >
          <dt className="type-eyebrow pt-0.5">{label}</dt>
          <dd className="m-0 text-sm">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
