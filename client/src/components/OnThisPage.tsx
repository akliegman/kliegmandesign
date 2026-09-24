import { useMemo } from "react";
import { Link } from "react-router";

import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export interface OnThisPageProps {
  sections: { id: string; heading: string }[];
}

/** In-page links for the current document, highlighting the section being read. */
export function OnThisPage({ sections }: OnThisPageProps) {
  const ids = useMemo(() => sections.map((section) => section.id), [sections]);
  const activeId = useActiveSection(ids);

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="type-eyebrow mb-3">On this page</p>
      <ul className="border-l">
        {sections.map(({ id, heading }) => (
          <li key={id}>
            <Link
              to={`#${id}`}
              aria-current={activeId === id ? "location" : undefined}
              className={cn(
                "-ml-px block border-transparent border-l py-1.5 pl-3 text-muted-foreground transition-colors hover:text-foreground",
                "aria-[current=location]:border-primary aria-[current=location]:text-foreground",
              )}
            >
              {heading}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
