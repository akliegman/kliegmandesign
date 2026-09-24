import {
  ArrowLeftRightIcon,
  ArrowRightIcon,
  CheckIcon,
  ContrastIcon,
  ImageIcon,
  LayoutGridIcon,
  type LucideIcon,
  Maximize2Icon,
  MousePointerClickIcon,
  PaletteIcon,
  PanelTopIcon,
  RotateCcwIcon,
  RulerIcon,
  SunMoonIcon,
  TagIcon,
  TypeIcon,
  WavesIcon,
  XIcon,
} from "lucide-react";
import type * as React from "react";
import { useState } from "react";
import { Link } from "react-router";

import { Breadcrumb } from "@/components/Breadcrumb";
import { DocsLayout } from "@/components/DocsLayout";
import { MediaFrame } from "@/components/MediaFrame";
import { MetaList } from "@/components/MetaList";
import { PageHeader } from "@/components/PageHeader";
import { PageMeta } from "@/components/PageMeta";
import { Pager } from "@/components/Pager";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkCard } from "@/components/WorkCard";
import { WorkFigure } from "@/components/WorkFigure";
import { pending, screenshot } from "@/content/media";
import { findWork } from "@/content/work";
import { useActiveSection } from "@/hooks/useActiveSection";
import { contrastRatio, oklchToRgb, toHex } from "@/lib/color";
import { usePrefersReducedMotion } from "@/lib/motion";
import { CONTRAST_PAIRS, readColorTokens, readMotionTokens, tokenRgb } from "@/lib/tokens";

const colorTokens = readColorTokens();
const motionTokens = readMotionTokens();

/** What each semantic role is for on this site. Roles without an entry are aliases. */
const roleUses: Record<string, string> = {
  background: "The page canvas.",
  foreground: "Body text and headings.",
  card: "Raised surfaces: cards, dialogs, the mobile menu, pager links.",
  muted: "Media stages, hover fills, and the theme toggle track.",
  "muted-foreground": "Secondary text, captions, eyebrows, and inactive navigation.",
  primary: "Links, the one primary action per view, and the focus outline.",
  "primary-foreground": "Text on primary buttons.",
  secondary: "Badge fills.",
  accent: "The current page in navigation, and text selection.",
  "accent-foreground": "Text on accent fills.",
  border: "Hairlines, dividers, and card edges.",
  input: "Boundaries of interactive controls, which need 3:1 contrast.",
};

const sections = {
  foundations: [
    { id: "color", heading: "Color" },
    { id: "contrast", heading: "Contrast" },
    { id: "typography", heading: "Typography" },
    { id: "space", heading: "Space and shape" },
    { id: "motion", heading: "Motion" },
  ],
  components: [
    { id: "button", heading: "Button" },
    { id: "badge", heading: "Badge" },
    { id: "theme-toggle", heading: "Theme toggle" },
    { id: "media-frame", heading: "Media frame" },
    { id: "work-figure", heading: "Figure" },
    { id: "work-card", heading: "Work card" },
  ],
  compositions: [
    { id: "case-study-header", heading: "Case study header" },
    { id: "pager", heading: "Pager" },
  ],
};

const sectionGroups = [
  ["Foundations", sections.foundations],
  ["Components", sections.components],
  ["Compositions", sections.compositions],
] as const;

const sectionIds = sectionGroups.flatMap(([, items]) => items.map(({ id }) => id));

function SystemNav() {
  const activeId = useActiveSection(sectionIds);

  return (
    <nav aria-label="System" className="flex flex-col gap-6 text-sm">
      {sectionGroups.map(([label, items]) => (
        <div key={label}>
          <p className="type-eyebrow mb-2">{label}</p>
          <ul className="flex flex-col gap-0.5">
            {items.map(({ id, heading }) => (
              <li key={id}>
                <Link
                  to={`#${id}`}
                  aria-current={activeId === id ? "location" : undefined}
                  className="block rounded-md px-2.5 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground aria-[current=location]:bg-accent aria-[current=location]:font-medium aria-[current=location]:text-accent-foreground"
                >
                  {heading}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

interface SpecSectionProps {
  id: string;
  icon: LucideIcon;
  title: string;
  description: React.ReactNode;
  source?: string;
  children: React.ReactNode;
}

function SpecSection({ id, icon: Icon, title, description, source, children }: SpecSectionProps) {
  return (
    <section aria-labelledby={id} className="mt-24 first:mt-0">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex items-center gap-3">
          <span className="icon-tile">
            <Icon aria-hidden="true" />
          </span>
          <h2 id={id} className="type-heading scroll-mt-28">
            {title}
          </h2>
        </div>
        {source && <code className="font-mono text-muted-foreground text-xs">{source}</code>}
      </div>
      <div className="mt-3 max-w-[68ch] text-muted-foreground leading-relaxed">{description}</div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

/** A live specimen area: the dot-grid stage, with its label. */
function Specimen({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="flex min-h-28 flex-wrap items-center gap-3 bg-dot-grid bg-muted p-6">
        {children}
      </div>
      <p className="border-t bg-card px-4 py-2.5 font-mono text-muted-foreground text-xs">
        {label}
      </p>
    </div>
  );
}

function Guidance({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border bg-card p-4">
        <p className="type-eyebrow mb-2">Do</p>
        <ul className="flex list-disc flex-col gap-1.5 pl-4 text-sm marker:text-muted-foreground">
          {dos.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border bg-card p-4">
        <p className="type-eyebrow mb-2">Don't</p>
        <ul className="flex list-disc flex-col gap-1.5 pl-4 text-sm marker:text-muted-foreground">
          {donts.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ColorRoles() {
  const roles = colorTokens.filter((token) => roleUses[token.name]);

  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full border-collapse text-left text-sm">
        <caption className="sr-only">Semantic color roles with their light and dark values</caption>
        <thead className="bg-card">
          <tr className="border-b">
            <th scope="col" className="type-eyebrow px-4 py-3 font-medium">
              Role
            </th>
            <th scope="col" className="type-eyebrow w-40 px-4 py-3 font-medium">
              Light and dark
            </th>
            <th scope="col" className="type-eyebrow hidden px-4 py-3 font-medium md:table-cell">
              Used for
            </th>
          </tr>
        </thead>
        <tbody>
          {roles.map((token) => (
            <tr key={token.name} className="border-b bg-card last:border-b-0">
              <th scope="row" className="px-4 py-3 align-top font-normal">
                <code className="font-mono text-[0.8125rem]">--{token.name}</code>
                <p className="mt-1 text-muted-foreground md:hidden">{roleUses[token.name]}</p>
              </th>
              <td className="px-4 py-3 align-top">
                <div className="flex gap-1.5">
                  {(["light", "dark"] as const).map((theme) => (
                    <span
                      key={theme}
                      title={`${theme}: ${token[theme]}`}
                      className="flex h-9 flex-1 items-end rounded-md border px-1.5 pb-1 font-mono text-[0.625rem]"
                      style={{
                        // A custom property resolves light-dark() once, at the root, so each swatch
                        // paints the parsed value for its theme directly.
                        background: toHex(oklchToRgb(token[theme])),
                      }}
                    >
                      <span className="rounded-sm bg-card/85 px-1 text-foreground">
                        {toHex(oklchToRgb(token[theme]))}
                      </span>
                    </span>
                  ))}
                </div>
              </td>
              <td className="hidden px-4 py-3 align-top text-muted-foreground md:table-cell">
                {roleUses[token.name]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContrastTable() {
  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full border-collapse bg-card text-left text-sm">
        <caption className="sr-only">
          Contrast ratios of the color pairs the site renders, in both themes
        </caption>
        <thead>
          <tr className="border-b">
            <th scope="col" className="type-eyebrow px-3 py-3 font-medium sm:px-4">
              Pair
            </th>
            <th scope="col" className="type-eyebrow hidden px-4 py-3 font-medium sm:table-cell">
              Minimum
            </th>
            <th scope="col" className="type-eyebrow px-3 py-3 font-medium sm:px-4">
              Light
            </th>
            <th scope="col" className="type-eyebrow px-3 py-3 font-medium sm:px-4">
              Dark
            </th>
          </tr>
        </thead>
        <tbody>
          {CONTRAST_PAIRS.map((pair) => (
            <tr key={`${pair.foreground}-${pair.background}`} className="border-b last:border-b-0">
              <th scope="row" className="px-3 py-3 font-normal sm:px-4">
                <span className="block">{pair.use}</span>
                <code className="block font-mono text-muted-foreground text-xs">
                  {pair.foreground} on {pair.background}
                  <span className="sm:hidden"> · min {pair.minimum}:1</span>
                </code>
              </th>
              <td className="hidden px-4 py-3 font-mono text-xs sm:table-cell">{pair.minimum}:1</td>
              {(["light", "dark"] as const).map((theme) => {
                const ratio = contrastRatio(
                  tokenRgb(colorTokens, pair.foreground, theme),
                  tokenRgb(colorTokens, pair.background, theme),
                );
                const passes = ratio >= pair.minimum;
                const Icon = passes ? CheckIcon : XIcon;
                return (
                  <td key={theme} className="px-3 py-3 font-mono text-xs sm:px-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Icon
                        aria-hidden="true"
                        className={
                          passes ? "size-3.5 text-muted-foreground" : "size-3.5 text-primary"
                        }
                      />
                      {ratio.toFixed(2)}
                      <span className="sr-only">{passes ? "passes" : "fails"}</span>
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const typeRoles = [
  { utility: "type-display", spec: "48 to 76px, 600, tight", sample: "Adam Kliegman" },
  { utility: "type-title", spec: "32 to 48px, 600", sample: "Spellbook design system" },
  { utility: "type-heading", spec: "24px, 600", sample: "Structure through slots" },
  {
    utility: "type-subheading",
    spec: "18px, 600",
    sample: "Student safety settings",
  },
  {
    utility: "type-lede",
    spec: "19px, muted",
    sample: "An opening paragraph that sets up the rest of the page.",
  },
  {
    utility: "text-base",
    spec: "16 to 17px body, relaxed leading, 68ch measure",
    sample: "Body copy for case studies and documentation.",
  },
  { utility: "type-eyebrow", spec: "12px mono, uppercase", sample: "MagicSchool AI · 2026" },
] as const;

const spacingSteps = [
  { step: "1.5", px: 6, use: "Between badges" },
  { step: "3", px: 12, use: "Inside cards" },
  { step: "4", px: 16, use: "Between paragraphs" },
  { step: "8", px: 32, use: "Between figures" },
  { step: "16", px: 64, use: "Between case study sections" },
  { step: "24", px: 96, use: "Between home page sections" },
] as const;

function MotionDemo() {
  const [runs, setRuns] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-xl border">
        <table className="w-full border-collapse bg-card text-left text-sm">
          <caption className="sr-only">Motion tokens</caption>
          <tbody>
            {motionTokens.map(({ name, value }) => (
              <tr key={name} className="border-b last:border-b-0">
                <th scope="row" className="w-56 px-4 py-3 font-normal">
                  <code className="font-mono text-[0.8125rem]">--{name}</code>
                </th>
                <td className="px-4 py-3 font-mono text-muted-foreground text-xs">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Specimen label="animate-rise: page headers and the home page masthead">
        <div
          key={runs}
          className="flex animate-rise items-center gap-3 rounded-lg border bg-card px-4 py-3 shadow-raised"
        >
          <span className="size-2 rounded-full bg-primary" />
          <span className="text-sm">A header rising into place</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto"
          onClick={() => setRuns((count) => count + 1)}
        >
          <RotateCcwIcon aria-hidden="true" />
          Replay
        </Button>
      </Specimen>
      <p className="text-muted-foreground text-sm" aria-live="polite">
        {reducedMotion
          ? "Your system asks for reduced motion, so every duration here resolves to zero and route changes swap instantly."
          : "If your system asks for reduced motion, every duration resolves to zero and route changes swap instantly."}
      </p>
    </div>
  );
}

const exampleCard = findWork("quizzes");
const exampleHeader = findWork("moderation");

export function SystemPage() {
  return (
    <DocsLayout sidebar={<SystemNav />}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] overflow-hidden [mask-image:linear-gradient(black_55%,transparent)]"
      >
        <div className="glow-primary absolute -top-1/3 right-[-10%] aspect-square w-[min(48rem,110vw)] animate-[drift-a_44s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_60%_80%_at_80%_0%,black,transparent_70%)]" />
      </div>
      <PageMeta
        title="System"
        description="The design system behind this site: semantic color roles, contrast, typography, motion, and the components every page is built from."
      />
      <PageHeader
        kicker={<Breadcrumb items={[{ label: "Home", to: "/" }, { label: "System" }]} />}
        title="The system behind this site"
        lede={
          <>
            This site is built from shadcn/ui components on Tailwind CSS, with every visual decision
            in one theme file. The values on this page are read from that file and the examples are
            the components the rest of the site uses, so what's documented here is what ships.
          </>
        }
      />

      <div className="mt-16">
        <SpecSection
          id="color"
          icon={PaletteIcon}
          title="Color"
          source="src/styles/globals.css"
          description={
            <p>
              Colors are shadcn/ui's semantic roles, authored in oklch. Each role holds its light
              and dark value in one light-dark() declaration, so components reference a role and
              never a raw color, and theming needs no per-page overrides. The crimson primary is the
              only saturated hue; everything else is a cool neutral.
            </p>
          }
        >
          <ColorRoles />
        </SpecSection>

        <SpecSection
          id="contrast"
          icon={ContrastIcon}
          title="Contrast"
          description={
            <p>
              Every text and boundary pair the site renders, computed from the same values. Body
              text needs 4.5:1 and control boundaries and focus outlines need 3:1, following WCAG
              2.2 AA. A unit test fails the build if any pair drops below its minimum.
            </p>
          }
        >
          <ContrastTable />
        </SpecSection>

        <SpecSection
          id="typography"
          icon={TypeIcon}
          title="Typography"
          description={
            <p>
              Geist for text and Geist Mono for labels and values that read as data. Pages use these
              named roles rather than composing size, weight, and tracking by hand.
            </p>
          }
        >
          <div className="overflow-hidden rounded-xl border bg-card">
            {typeRoles.map(({ utility, spec, sample }) => (
              <div
                key={utility}
                className="grid gap-2 border-b px-4 py-5 last:border-b-0 md:grid-cols-[11rem_minmax(0,1fr)] md:items-baseline md:gap-6"
              >
                <div>
                  <code className="font-mono text-[0.8125rem]">{utility}</code>
                  <p className="text-muted-foreground text-xs">{spec}</p>
                </div>
                <p className={`${utility} min-w-0 truncate`}>{sample}</p>
              </div>
            ))}
          </div>
        </SpecSection>

        <SpecSection
          id="space"
          icon={RulerIcon}
          title="Space and shape"
          description={
            <p>
              Spacing uses Tailwind's 4px scale, and pages lean on a few steps of it. Radius grows
              with the size of the surface. Depth comes from borders first; the two shadows are kept
              for things that sit above the page.
            </p>
          }
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border bg-card p-5">
              <p className="type-eyebrow mb-4">Spacing</p>
              <ul className="flex flex-col gap-3">
                {spacingSteps.map(({ step, px, use }) => (
                  <li
                    key={step}
                    className="grid grid-cols-[3rem_6rem_minmax(0,1fr)] items-center gap-3 text-sm"
                  >
                    <code className="font-mono text-xs">{step}</code>
                    <span className="h-2 rounded-sm bg-primary/70" style={{ width: px }} />
                    <span className="text-muted-foreground">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <p className="type-eyebrow mb-4">Radius</p>
              <ul className="grid grid-cols-4 gap-3 text-center text-xs">
                {[
                  ["sm", "rounded-sm", "Badges"],
                  ["md", "rounded-md", "Small controls"],
                  ["lg", "rounded-lg", "Buttons"],
                  ["xl", "rounded-xl", "Cards, stages"],
                ].map(([name, className, use]) => (
                  <li key={name} className="flex flex-col items-center gap-2">
                    <span className={`size-12 border-2 border-primary/70 bg-accent ${className}`} />
                    <code className="font-mono">{name}</code>
                    <span className="text-muted-foreground">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              ["Border", "", "Cards, stages, tables"],
              ["shadow-raised", "shadow-raised", "Hovered cards, screenshots"],
              ["shadow-overlay", "shadow-overlay", "Dialogs, the menu, notices"],
            ].map(([name, className, use]) => (
              <div key={name} className={`rounded-xl border bg-card p-5 ${className}`}>
                <code className="font-mono text-[0.8125rem]">{name}</code>
                <p className="mt-1 text-muted-foreground text-sm">{use}</p>
              </div>
            ))}
          </div>
        </SpecSection>

        <SpecSection
          id="motion"
          icon={WavesIcon}
          title="Motion"
          description={
            <p>
              Three durations and two curves. State changes use the fast duration, panels use the
              base, and route transitions and the logo use the slow one with the emphasized curve.
              Navigating between pages uses the View Transitions API where the browser supports it,
              so a case study's cover image carries over from the card you selected.
            </p>
          }
        >
          <MotionDemo />
        </SpecSection>

        <SpecSection
          id="button"
          icon={MousePointerClickIcon}
          title="Button"
          source="components/ui/button.tsx"
          description={
            <p>
              shadcn/ui's button with its defaults changed at the source: a 40px default height,
              focus drawn by the global outline, and hovers from the theme. Three variants cover
              every use on the site. Hover, press, and Tab to see the live states.
            </p>
          }
        >
          <Specimen label="variant: default · outline · ghost">
            <Button>Primary action</Button>
            <Button variant="outline">Secondary action</Button>
            <Button variant="ghost">Quiet action</Button>
            <Button disabled>Disabled</Button>
          </Specimen>
          <div className="mt-4">
            <Specimen label="size: sm · default · lg, and asChild rendering a link">
              <Button size="sm" variant="outline">
                Small
              </Button>
              <Button variant="outline">Default</Button>
              <Button size="lg" asChild>
                <Link to="/work" viewTransition>
                  See the work
                  <ArrowRightIcon aria-hidden="true" />
                </Link>
              </Button>
            </Specimen>
          </div>
          <Guidance
            dos={[
              "Use one primary button per view.",
              "Render navigation as a link through asChild, so it behaves like one.",
            ]}
            donts={[
              "Use a button to go to another page.",
              "Override its colors in a className; add a variant instead.",
            ]}
          />
        </SpecSection>

        <SpecSection
          id="badge"
          icon={TagIcon}
          title="Badge"
          source="components/ui/badge.tsx"
          description={
            <p>
              Badges label facts, so they're set in the mono face and never look clickable. The
              default fill tags a case study; the outline keeps long technology lists calm.
            </p>
          }
        >
          <Specimen label="variant: default · outline">
            <Badge>Design system</Badge>
            <Badge>Accessibility</Badge>
            <Badge variant="outline">React</Badge>
            <Badge variant="outline">TypeScript</Badge>
          </Specimen>
        </SpecSection>

        <SpecSection
          id="theme-toggle"
          icon={SunMoonIcon}
          title="Theme toggle"
          source="components/ThemeToggle.tsx"
          description={
            <p>
              A toggle group over three choices. System follows the operating system. Light and dark
              pin a class on the root element that sets color-scheme, and an inline script applies
              the saved choice before first paint, so the page never flashes the wrong theme.
            </p>
          }
        >
          <Specimen label="The same control as the header">
            <ThemeToggle withLabels />
          </Specimen>
        </SpecSection>

        <SpecSection
          id="media-frame"
          icon={ImageIcon}
          title="Media frame"
          source="components/MediaFrame.tsx"
          description={
            <p>
              Work is presented on a stage. Full-screen captures sit inset like a window, isolated
              components sit centered at their natural size, and media that hasn't arrived yet holds
              its place with a label. When a light and a dark capture both exist, the frame shows
              the one that matches this site's theme.
            </p>
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <MediaFrame
              media={screenshot(
                "ms-spellbook-button-sizes-light",
                "A Spellbook button in four sizes",
                { dark: "ms-spellbook-button-sizes-dark", specimen: true },
              )}
              aspectRatio={16 / 10}
            />
            <MediaFrame media={pending("Media that hasn't arrived yet")} aspectRatio={16 / 10} />
          </div>
        </SpecSection>

        <SpecSection
          id="work-figure"
          icon={Maximize2Icon}
          title="Figure"
          source="components/WorkFigure.tsx"
          description={
            <p>
              A captioned screenshot that opens in a dialog at full resolution, so dense interfaces
              can be read. The dialog traps focus, closes on Escape, and returns focus to the image.
            </p>
          }
        >
          <WorkFigure
            figure={{
              media: screenshot(
                "demyst-platform-billing",
                "The Demyst billing report with a line chart of daily API spend and a table of spend, transactions, and average cost per transaction",
              ),
              caption: "Select the image to view it at full size.",
            }}
          />
        </SpecSection>

        <SpecSection
          id="work-card"
          icon={LayoutGridIcon}
          title="Work card"
          source="components/WorkCard.tsx"
          description={
            <p>
              A case study teaser. The title link stretches across the card, so the whole card is
              one target with one accessible name and no nested controls. Its cover shares a
              view-transition name with the case study it opens.
            </p>
          }
        >
          <div className="max-w-sm">
            {exampleCard && <WorkCard item={exampleCard} morph={false} />}
          </div>
        </SpecSection>

        <SpecSection
          id="case-study-header"
          icon={PanelTopIcon}
          title="Case study header"
          description={
            <p>
              Breadcrumb, page header, and metadata list, composed the way every case study opens.
            </p>
          }
        >
          {exampleHeader && (
            <div className="rounded-xl border bg-card p-6">
              <Breadcrumb
                label="Example breadcrumb"
                items={[{ label: "Work", to: "/work" }, { label: exampleHeader.title }]}
              />
              <p className="type-title mt-4 max-w-[22ch]">{exampleHeader.title}</p>
              <MetaList
                className="mt-6"
                items={[
                  { label: "Company", value: exampleHeader.company },
                  { label: "Role", value: exampleHeader.role },
                ]}
              />
            </div>
          )}
        </SpecSection>

        <SpecSection
          id="pager"
          icon={ArrowLeftRightIcon}
          title="Pager"
          source="components/Pager.tsx"
          description={<p>Previous and next links at the end of every case study.</p>}
        >
          <Pager
            previous={{ to: "/work/spellbook", title: "Spellbook design system" }}
            next={{ to: "/work/app-shell", title: "Navigation and page layout" }}
          />
        </SpecSection>
      </div>
    </DocsLayout>
  );
}
