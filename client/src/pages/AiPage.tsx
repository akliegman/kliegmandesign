import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";

import { Breadcrumb } from "@/components/Breadcrumb";
import { DocsLayout } from "@/components/DocsLayout";
import { OnThisPage } from "@/components/OnThisPage";
import { PageHeader } from "@/components/PageHeader";
import { PageMeta } from "@/components/PageMeta";
import { WorkFigure } from "@/components/WorkFigure";
import { aiPage } from "@/content/ai";

const related = [
  { to: "/work/quizzes", label: "AI-graded quizzes" },
  { to: "/work/moderation", label: "Student safety settings" },
  { to: "/work/spellbook#documentation", label: "Spellbook documentation" },
  { to: "/system", label: "This site's system" },
];

export function AiPage() {
  return (
    <DocsLayout sidebar={<OnThisPage sections={aiPage.sections} />}>
      <PageMeta
        title="AI"
        description="How Adam Kliegman uses AI: in the products he builds, in a codebase agents can be checked against, and in his own engineering."
      />
      <article>
        <PageHeader
          kicker={<Breadcrumb items={[{ label: "Home", to: "/" }, { label: "AI" }]} />}
          title={aiPage.title}
          lede={aiPage.lede}
        />

        {aiPage.sections.map((section, index) => (
          <section key={section.id} aria-labelledby={section.id} className="mt-24">
            <p className="font-mono text-primary text-xs">{String(index + 1).padStart(2, "0")}</p>
            <h2 id={section.id} className="type-heading mt-2 scroll-mt-28">
              {section.heading}
            </h2>
            <div className="mt-5 flex max-w-[68ch] flex-col gap-5 text-[1.0625rem] leading-relaxed">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.figures?.map((figure) => (
              <div key={figure.caption} className="reveal mt-10">
                <WorkFigure figure={figure} />
              </div>
            ))}
          </section>
        ))}

        <nav aria-labelledby="related" className="mt-24 border-t pt-8">
          <h2 id="related" className="type-eyebrow">
            Related
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  viewTransition
                  className="gradient-stroke group flex items-center justify-between rounded-xl border bg-card px-4 py-3 font-medium transition-shadow hover:shadow-raised"
                >
                  {label}
                  <ArrowRightIcon
                    aria-hidden="true"
                    className="size-4 text-muted-foreground transition-[translate,color] group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
    </DocsLayout>
  );
}
