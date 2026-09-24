import { useParams } from "react-router";

import { Breadcrumb } from "@/components/Breadcrumb";
import { DocsLayout } from "@/components/DocsLayout";
import { MediaFrame } from "@/components/MediaFrame";
import { MetaList } from "@/components/MetaList";
import { OnThisPage } from "@/components/OnThisPage";
import { PageHeader } from "@/components/PageHeader";
import { PageMeta } from "@/components/PageMeta";
import { Pager } from "@/components/Pager";
import { Badge } from "@/components/ui/badge";
import { WorkFigure } from "@/components/WorkFigure";
import { WorkNav } from "@/components/WorkNav";
import { work } from "@/content/work";
import { cn } from "@/lib/utils";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function CaseStudyPage() {
  const { slug } = useParams();
  const index = work.findIndex((item) => item.slug === slug);
  const item = work[index];

  if (!item) return <NotFoundPage />;

  const previous = work[index - 1];
  const next = work[index + 1];

  return (
    <DocsLayout sidebar={<WorkNav />} aside={<OnThisPage sections={item.sections} />}>
      <PageMeta title={item.title} description={item.summary} />
      <article>
        <PageHeader
          kicker={<Breadcrumb items={[{ label: "Work", to: "/work" }, { label: item.title }]} />}
          title={item.title}
          lede={item.lede}
        />

        <MetaList
          className="mt-8"
          items={[
            { label: "Company", value: item.company },
            { label: "Role", value: item.role },
            ...(item.period ? [{ label: "Period", value: item.period }] : []),
            {
              label: "Stack",
              value: (
                <span className="flex flex-wrap gap-1.5">
                  {item.stack.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </span>
              ),
            },
          ]}
        />

        <MediaFrame
          media={item.cover}
          priority
          sizes="(min-width: 80rem) 48rem, (min-width: 64rem) calc(100vw - 20rem), 100vw"
          className="gradient-stroke mt-12 stroke-ambient stroke-idle"
        />

        {item.sections.map((section) => {
          const figures = section.figures ?? [];
          return (
            <section key={section.id} aria-labelledby={section.id} className="mt-24">
              <h2 id={section.id} className="type-heading scroll-mt-28">
                {section.heading}
              </h2>
              <div className="mt-5 flex max-w-[68ch] flex-col gap-5 text-[1.0625rem] leading-relaxed">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {figures.length > 0 && (
                <div
                  className={cn("reveal mt-10 grid gap-10", figures.length > 1 && "sm:grid-cols-2")}
                >
                  {figures.map((figure, figureIndex) => (
                    <div
                      key={figure.media.kind === "image" ? figure.media.src : figure.media.label}
                      className={cn(
                        // An odd figure out spans the row rather than leaving a gap.
                        figures.length % 2 === 1 &&
                          figureIndex === figures.length - 1 &&
                          figures.length > 1 &&
                          "sm:col-span-2",
                      )}
                    >
                      <WorkFigure
                        figure={figure}
                        sizes={
                          figures.length > 1
                            ? "(min-width: 64rem) 24rem, (min-width: 40rem) 50vw, 100vw"
                            : undefined
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}

        <Pager
          className="mt-28"
          previous={previous && { to: `/work/${previous.slug}`, title: previous.title }}
          next={next && { to: `/work/${next.slug}`, title: next.title }}
        />
      </article>
    </DocsLayout>
  );
}
