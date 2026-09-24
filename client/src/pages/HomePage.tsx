import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BriefcaseIcon,
  CrosshairIcon,
  LayersIcon,
  MapPinIcon,
} from "lucide-react";
import { Link } from "react-router";
import headshot480 from "@/assets/images/headshot-480.jpg";
import headshot960 from "@/assets/images/headshot-960.jpg";
import { MastheadBackdrop } from "@/components/MastheadBackdrop";
import { PageMeta } from "@/components/PageMeta";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkCard } from "@/components/WorkCard";
import { aiSummary } from "@/content/ai";
import { principles, profile } from "@/content/profile";
import { findWork, work } from "@/content/work";

const featured = findWork("spellbook");
const highlighted = ["app-shell", "quizzes", "moderation"].map(findWork);
const earlier = work.filter((item) => item.company !== "MagicSchool AI");

export function HomePage() {
  return (
    <>
      <PageMeta />

      <section className="relative overflow-hidden border-b">
        <MastheadBackdrop />
        <div className="container-page relative grid gap-12 py-20 md:py-32 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="flex flex-col gap-6">
            <h1 className="type-display max-w-[21ch] animate-rise [animation-delay:60ms]">
              I build <span className="text-shimmer">design systems</span> and the frontend
              foundations other engineers ship on.
            </h1>
            <p className="type-lede max-w-[60ch] animate-rise [animation-delay:120ms]">
              I'm a full-stack engineer who lives on the frontend. At MagicSchool AI I founded
              Spellbook, the design system behind a platform for 8 million educators.
            </p>
            <div className="flex animate-rise flex-wrap gap-3 [animation-delay:180ms]">
              <Button asChild size="lg">
                <Link to="/work" viewTransition>
                  See the work
                  <ArrowRightIcon aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={profile.resumePath}>
                  Résumé <span className="font-mono text-muted-foreground text-xs">PDF</span>
                </a>
              </Button>
            </div>
          </div>
          <div className="order-first w-32 animate-rise md:w-40 lg:order-none lg:w-56">
            <img
              src={headshot960}
              srcSet={`${headshot480} 480w, ${headshot960} 960w`}
              sizes="(min-width: 64rem) 14rem, (min-width: 48rem) 10rem, 8rem"
              width={960}
              height={960}
              alt={`Portrait of ${profile.name} in sunglasses against a pink shuttered wall`}
              fetchPriority="high"
              className="aspect-[4/5] w-full rounded-xl border object-cover object-[40%_30%] shadow-raised"
            />
          </div>
        </div>
        <div className="container-page relative">
          <dl className="grid border-t sm:grid-cols-3">
            {[
              { label: "Currently", value: profile.current, Icon: BriefcaseIcon },
              { label: "Focus", value: profile.focus, Icon: CrosshairIcon },
              { label: "Based in", value: profile.location, Icon: MapPinIcon },
            ].map(({ label, value, Icon }, index) => (
              <div
                key={label}
                className={
                  index > 0 ? "border-t py-5 sm:border-t-0 sm:border-l sm:px-6" : "py-5 sm:pr-6"
                }
              >
                <dt className="type-eyebrow mb-1.5 flex items-center gap-1.5">
                  <Icon aria-hidden="true" className="size-3.5 text-primary" />
                  {label}
                </dt>
                <dd className="m-0 text-sm">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="selected-work" className="container-page mt-24 md:mt-32">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="selected-work" className="type-heading">
              Selected work
            </h2>
          </div>
          <Link
            to="/work"
            viewTransition
            className="group inline-flex items-center gap-1.5 rounded-sm font-medium text-primary text-sm"
          >
            All work
            <ArrowRightIcon
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {featured && <WorkCard item={featured} feature ambient />}
        <div className="reveal mt-6 grid gap-6 lg:grid-cols-3">
          {highlighted.map((item) => item && <WorkCard key={item.slug} item={item} />)}
        </div>

        <div className="reveal mt-16">
          <h3 className="type-eyebrow mb-4">Earlier work</h3>
          <ul className="border-t">
            {earlier.map((item) => (
              <li key={item.slug} className="border-b">
                <Link
                  to={`/work/${item.slug}`}
                  viewTransition
                  className="group grid gap-1 py-4 transition-colors hover:bg-muted/50 sm:grid-cols-[1fr_12rem_7rem_auto] sm:items-center sm:gap-6 sm:px-2"
                >
                  <span className="font-medium">{item.title}</span>
                  <span className="text-muted-foreground text-sm">{item.company}</span>
                  <span className="font-mono text-muted-foreground text-xs">{item.period}</span>
                  <ArrowRightIcon
                    aria-hidden="true"
                    className="hidden size-4 text-muted-foreground transition-[translate,color] group-hover:translate-x-0.5 group-hover:text-primary sm:block"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="ai" className="container-page mt-32 md:mt-40">
        <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="ai" className="type-heading">
              How I use AI
            </h2>
          </div>
          <Link
            to="/ai"
            viewTransition
            className="group inline-flex items-center gap-1.5 rounded-sm font-medium text-primary text-sm"
          >
            More on AI
            <ArrowRightIcon
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
        <ol className="reveal grid gap-6 md:grid-cols-3">
          {aiSummary.map((point) => (
            <li
              key={point.title}
              className="gradient-stroke flex items-start gap-4 rounded-2xl border bg-card stroke-ambient stroke-idle p-5"
            >
              <span className="icon-tile shrink-0">
                <point.icon aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">{point.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{point.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="how-i-work" className="container-page mt-32 md:mt-40">
        <h2 id="how-i-work" className="type-heading mb-10">
          How I work
        </h2>
        <ol className="grid gap-x-12 border-t lg:grid-cols-3">
          {principles.map((principle) => (
            <li key={principle.title} className="reveal flex flex-col gap-3 border-b py-10">
              <span className="icon-tile">
                <principle.icon aria-hidden="true" />
              </span>
              <h3 className="type-subheading mt-2">{principle.title}</h3>
              <p className="max-w-[52ch] text-muted-foreground leading-relaxed">{principle.body}</p>
              <Link
                to={principle.evidence.to}
                viewTransition
                className="group mt-1 inline-flex w-fit items-center gap-1.5 rounded-sm font-medium text-primary text-sm"
              >
                See it<span className="sr-only"> in {principle.evidence.label}</span>
                <ArrowRightIcon
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="system" className="container-page mt-32 md:mt-40">
        <div className="reveal grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-4">
            <h2 id="system" className="type-heading">
              The system behind this site
            </h2>
            <p className="max-w-[48ch] text-muted-foreground leading-relaxed">
              This site runs on its own small design system: semantic color tokens, a type scale,
              motion tokens, and shadcn/ui components. Its documentation reads the same theme file
              the site uses.
            </p>
            <Button asChild variant="outline" className="mt-2 w-fit">
              <Link to="/system" viewTransition>
                Explore the system
                <ArrowRightIcon aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="gradient-stroke overflow-hidden rounded-2xl border bg-card stroke-ambient stroke-idle">
            <div className="grid gap-6 bg-dot-grid bg-muted p-6 sm:grid-cols-2 sm:p-8">
              <div className="flex flex-col gap-3">
                <p className="type-eyebrow">Color roles</p>
                <ul className="grid grid-cols-4 gap-2">
                  {[
                    ["primary", "bg-primary"],
                    ["accent", "bg-accent"],
                    ["muted", "bg-muted-foreground"],
                    ["card", "bg-card"],
                  ].map(([name, className]) => (
                    <li key={name} className="flex flex-col gap-1.5">
                      <span className={`aspect-square rounded-lg border shadow-xs ${className}`} />
                      <span className="font-mono text-[0.6875rem] text-muted-foreground">
                        {name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3">
                <p className="type-eyebrow">Type</p>
                <div className="flex items-end gap-4 rounded-lg border bg-card px-4 py-3 shadow-xs">
                  <span className="font-semibold text-4xl tracking-tight">Aa</span>
                  <span className="pb-1 font-mono text-muted-foreground text-sm">Geist · Mono</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="type-eyebrow">Components</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>Design system</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <span className="icon-tile">
                    <LayersIcon aria-hidden="true" />
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="type-eyebrow">Theme, live</p>
                <ThemeToggle withLabels />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact" className="container-page mt-32 md:mt-40">
        <div className="reveal gradient-stroke overflow-hidden rounded-2xl border bg-card stroke-ambient stroke-idle p-8 md:p-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-dot-grid [mask-image:linear-gradient(to_left,black,transparent_70%)]"
          />
          <div className="relative flex flex-col gap-5">
            <h2 id="contact" className="type-heading">
              Get in touch
            </h2>
            <p className="max-w-[52ch] text-muted-foreground">
              Email is the quickest way to reach me.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="w-fit break-all rounded-sm font-mono text-lg underline decoration-border underline-offset-8 transition-colors hover:decoration-primary sm:text-xl"
            >
              {profile.email}
            </a>
            <div className="flex flex-wrap gap-2 pt-2">
              <Button asChild variant="outline">
                <a href={profile.links.linkedIn}>
                  LinkedIn
                  <ArrowUpRightIcon aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={profile.links.gitHub}>
                  GitHub
                  <ArrowUpRightIcon aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
