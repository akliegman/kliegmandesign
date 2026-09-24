import { ArrowUpRightIcon } from "lucide-react";
import { Link } from "react-router";

import { MediaFrame } from "@/components/MediaFrame";
import { PageHeader } from "@/components/PageHeader";
import { PageMeta } from "@/components/PageMeta";
import { Badge } from "@/components/ui/badge";
import { sideProjects, work } from "@/content/work";

export function WorkIndexPage() {
  const companies = [...new Set(work.map((item) => item.company))];

  return (
    <div className="container-page pt-14 md:pt-20">
      <PageMeta
        title="Work"
        description="Case studies from MagicSchool AI, Demyst, and RubyLaw: design systems, page architecture, AI product surfaces, and enterprise interfaces."
      />
      <PageHeader
        kicker={<p className="type-eyebrow">Work</p>}
        title="Case studies"
        lede="Products and systems I've built, newest first. Each one opens with screens from the product, then explains what the problem was and the decisions behind the result."
      />

      {companies.map((company) => {
        const items = work.filter((item) => item.company === company);
        return (
          <section key={company} aria-labelledby={`company-${items[0]?.slug}`} className="mt-20">
            <h2 id={`company-${items[0]?.slug}`} className="type-eyebrow mb-4">
              {company}
            </h2>
            <ul className="border-t">
              {items.map((item) => (
                <li key={item.slug}>
                  <article className="reveal group relative grid gap-6 border-b py-8 md:grid-cols-[18rem_minmax(0,1fr)] md:gap-10">
                    <MediaFrame
                      media={item.cover}
                      decorative
                      aspectRatio={16 / 10}
                      sizes="(min-width: 48rem) 18rem, 100vw"
                      transitionName={`work-${item.slug}`}
                      className="transition-[border-color,box-shadow] group-hover:border-input group-hover:shadow-raised"
                    />
                    <div className="flex flex-col gap-2 md:py-2">
                      <h3 className="type-subheading">
                        <Link
                          to={`/work/${item.slug}`}
                          viewTransition
                          className="rounded-sm after:absolute after:inset-0 after:content-[''] group-hover:text-primary"
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <p className="max-w-[62ch] text-muted-foreground leading-relaxed">
                        {item.summary}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {item.role}
                        {item.period && <span className="font-mono text-xs"> · {item.period}</span>}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section aria-labelledby="side-projects" className="mt-20">
        <h2 id="side-projects" className="type-eyebrow mb-4">
          Side projects
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {sideProjects.map((project) => (
            <li key={project.title} className="flex flex-col gap-3 rounded-xl border bg-card p-5">
              <h3 className="type-subheading">{project.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{project.summary}</p>
              <div className="mt-auto flex gap-4 pt-1 font-medium text-sm">
                <a
                  href={project.href}
                  className="inline-flex items-center gap-1 rounded-sm text-primary hover:underline"
                >
                  Live site<span className="sr-only"> for {project.title}</span>
                  <ArrowUpRightIcon aria-hidden="true" className="size-4" />
                </a>
                <a
                  href={project.codeHref}
                  className="inline-flex items-center gap-1 rounded-sm text-primary hover:underline"
                >
                  Code<span className="sr-only"> for {project.title}</span>
                  <ArrowUpRightIcon aria-hidden="true" className="size-4" />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
