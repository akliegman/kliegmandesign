import { NavLink } from "react-router";

import { work } from "@/content/work";

/** Case studies grouped by company, for the docs sidebar. */
export function WorkNav() {
  const companies = [...new Set(work.map((item) => item.company))];

  return (
    <nav aria-label="Case studies" className="flex flex-col gap-6 text-sm">
      {companies.map((company) => (
        <div key={company}>
          <p className="type-eyebrow mb-2">{company}</p>
          <ul className="flex flex-col gap-0.5">
            {work
              .filter((item) => item.company === company)
              .map((item) => (
                <li key={item.slug}>
                  <NavLink
                    to={`/work/${item.slug}`}
                    viewTransition
                    className="block rounded-md px-2.5 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground aria-[current=page]:bg-accent aria-[current=page]:font-medium aria-[current=page]:text-accent-foreground"
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
