import { ArrowUpRightIcon } from "lucide-react";
import headshot480 from "@/assets/images/headshot-480.jpg";
import headshot960 from "@/assets/images/headshot-960.jpg";
import { PageHeader } from "@/components/PageHeader";
import { PageMeta } from "@/components/PageMeta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { education, experience, profile, skills } from "@/content/profile";

export function AboutPage() {
  return (
    <div className="container-page grid gap-12 pt-14 md:pt-20 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
      <PageMeta
        title="About"
        description={`About ${profile.name}: experience, skills, and how to get in touch.`}
      />

      <aside className="order-2 lg:order-none">
        <div className="flex flex-col gap-5 lg:sticky lg:top-[calc(var(--header-height)+2.5rem)]">
          <img
            src={headshot960}
            srcSet={`${headshot480} 480w, ${headshot960} 960w`}
            sizes="16rem"
            width={960}
            height={960}
            alt={`Portrait of ${profile.name}`}
            loading="lazy"
            className="hidden aspect-[4/5] w-full rounded-xl border object-cover object-[40%_30%] lg:block"
          />
          <div className="flex flex-col gap-2 text-sm">
            <p className="type-eyebrow">Contact</p>
            <a
              href={`mailto:${profile.email}`}
              className="w-fit break-all rounded-sm font-mono text-primary hover:underline"
            >
              {profile.email}
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={profile.links.linkedIn}>
                LinkedIn
                <ArrowUpRightIcon aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={profile.links.gitHub}>
                GitHub
                <ArrowUpRightIcon aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={profile.resumePath}>
                Résumé <span className="font-mono text-muted-foreground text-xs">PDF</span>
              </a>
            </Button>
          </div>
        </div>
      </aside>

      <div className="min-w-0">
        <PageHeader
          kicker={<p className="type-eyebrow">About</p>}
          title="Engineering, product, and design, with the frontend at the center"
        />
        <div className="mt-8 flex max-w-[68ch] flex-col gap-4 text-[1.0625rem] leading-relaxed">
          <p>
            I'm a full-stack engineer who lives on the frontend and cares most about design systems.
            I've spent more than 13 years across engineering, product leadership, and UX, most of it
            building the shared foundations other engineers ship on.
          </p>
          <p>
            At MagicSchool AI I founded Spellbook, the design system every screen in the product is
            built from, and I own the frontend architecture beneath it. I also build product on top
            of it, from navigation and page layout to AI-graded quizzes, student safety settings,
            and the icons for more than 80 AI tools.
          </p>
          <p>
            Before that I built a shared component library and accessible websites for large law
            firms at RubyLaw. Earlier I spent several years in product: as Director of Product
            Management at Demyst, where I also architected and built the customer platform's
            frontend, and at Noodle, where I moved from UX engineering to leading product
            engineering and then to product management.
          </p>
        </div>

        <section aria-labelledby="experience" className="mt-20">
          <h2 id="experience" className="type-heading">
            Experience
          </h2>
          <ol className="mt-6 border-t">
            {experience.map((role) => (
              <li
                key={role.company}
                className="grid gap-3 border-b py-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6"
              >
                <div>
                  <p className="font-medium">{role.company}</p>
                  <p className="text-muted-foreground text-sm">{role.detail}</p>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {role.titles.map(({ title, period }) => (
                    <li key={title} className="flex flex-wrap justify-between gap-x-4 text-sm">
                      <span>{title}</span>
                      <span className="font-mono text-muted-foreground text-xs leading-5">
                        {period}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="skills" className="mt-20">
          <h2 id="skills" className="type-heading">
            Skills
          </h2>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            {skills.map(({ group, items }) => (
              <div key={group}>
                <dt className="type-eyebrow mb-2.5">{group}</dt>
                <dd className="m-0 flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="education" className="mt-20">
          <h2 id="education" className="type-heading">
            Education
          </h2>
          <ul className="mt-6 border-t">
            {education.map(({ school, detail }) => (
              <li
                key={school}
                className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b py-4"
              >
                <span className="font-medium">{school}</span>
                <span className="text-muted-foreground text-sm">{detail}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
