import { Link } from "react-router";

export interface BreadcrumbProps {
  items: { label: string; to?: string }[];
  /** Landmark name; override when a page shows more than one breadcrumb. */
  label?: string;
}

/** Ancestor links for a page; the last item is the current page and is not a link. */
export function Breadcrumb({ items, label = "Breadcrumb" }: BreadcrumbProps) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-2 font-mono text-muted-foreground text-xs">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.to ? (
              <Link
                to={item.to}
                viewTransition
                className="rounded-sm hover:text-foreground hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
