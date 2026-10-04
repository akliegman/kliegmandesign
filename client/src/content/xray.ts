/**
 * Design notes shown in X-ray mode. An element opts in with `data-xray="<id>"`; the drawer lists the
 * notes present on the current page in document order. The label is the short token summary pinned
 * beside the element.
 */
export interface XrayNote {
  id: string;
  label: string;
  title: string;
  body: string;
}

export const xrayNotes = [
  {
    id: "hero-headline",
    label: "type-display · 600 · −0.04em · 21ch",
    title: "Headline held to 21 characters",
    body: "A short measure keeps the display line readable in one sweep and lands the shimmer phrase early.",
  },
  {
    id: "hero-portrait",
    label: "aspect 4/5 · rounded-xl · shadow-raised",
    title: "The portrait reserves its space",
    body: "Width, height, and aspect ratio are set before the image loads, so nothing shifts when it arrives.",
  },
  {
    id: "hero-facts",
    label: "dl · type-eyebrow",
    title: "Facts as a definition list",
    body: "Each label and value is a term and its definition, so a screen reader announces them as pairs.",
  },
  {
    id: "featured-work",
    label: "gradient-stroke · rounded-xl · @container",
    title: "One card at any width",
    body: "The card lays itself out with a container query, image beside text when wide and stacked when narrow, so one component fills the feature slot and the grid.",
  },
  {
    id: "earlier-work",
    label: "grid · 1fr 12rem 7rem auto",
    title: "Each row is one link",
    body: "A whole row is a single link laid out on a shared grid, so it's one tab stop and the columns line up from row to row.",
  },
  {
    id: "ai-summary",
    label: "icon-tile · aria-hidden",
    title: "Icons never speak twice",
    body: "Every icon sits beside text that already says the same thing, so it's hidden from screen readers.",
  },
  {
    id: "principles",
    label: "sr-only · link context",
    title: "Links say where they go",
    body: 'Each "See it" link carries hidden text naming its destination, so a screen reader\'s list of links isn\'t five identical "See it"s.',
  },
  {
    id: "system-panel",
    label: "bg-primary · bg-accent · live theme",
    title: "The swatches are the real tokens",
    body: "Each square is painted by its role class, so the panel changes with the theme, and the toggle inside it is the same one in the header.",
  },
  {
    id: "contact-email",
    label: "font-mono · break-all · underline-offset-8",
    title: "The address never overflows",
    body: "It can wrap anywhere on a narrow screen, and on hover only the underline changes color, so the text doesn't move.",
  },
  {
    id: "page-title",
    label: "type-title · 600 · 22ch",
    title: "Titles share one measure",
    body: "Every inner page caps its title at 22 characters, so long names break into balanced lines.",
  },
  {
    id: "page-meta",
    label: "dl · subgrid",
    title: "Labels and values line up",
    body: "Every row shares one subgrid, so values align to the same column without fixed widths.",
  },
  {
    id: "breadcrumb",
    label: "nav · ol · aria-current=page",
    title: "The trail ends where you are",
    body: "The last crumb is plain text marked as the current page, so it never links back to itself.",
  },
  {
    id: "case-nav",
    label: "sticky · aria-current · accent",
    title: "The sidebar marks the current study",
    body: 'It uses the same accent and current-page marker as the header, so "you are here" looks the same everywhere.',
  },
  {
    id: "on-this-page",
    label: "sticky · aria-current=location",
    title: "The outline follows your reading",
    body: "The section in view is marked as the current location, so the highlight and a screen reader agree on where you are.",
  },
  {
    id: "work-figure",
    label: "figure · dialog · cursor-zoom-in",
    title: "Dense screenshots open full size",
    body: "Full-screen captures open in a dialog at full resolution so small text can be read. Component specimens are already at natural size, so they don't.",
  },
  {
    id: "themed-media",
    label: "light + dark captures · lazy",
    title: "Screenshots follow your theme",
    body: "Each image has a light and a dark capture. The hidden one is never fetched, so switching themes swaps the picture without loading both up front.",
  },
  {
    id: "pager",
    label: "nav · previous / next",
    title: "Next and previous name their pages",
    body: "Each link shows the title it leads to, and its arrow nudges that way on hover.",
  },
  {
    id: "work-company",
    label: "section · aria-labelledby",
    title: "Work grouped by company",
    body: "Each company is a section named by its heading, so screen-reader users can jump between them like chapters.",
  },
  {
    id: "about-experience",
    label: "ol · border-t rows",
    title: "Experience is an ordered list",
    body: "The roles are a list in order, so assistive tech announces how many there are and where each one sits.",
  },
  {
    id: "about-skills",
    label: "dl · sm:grid-cols-2",
    title: "Skills as terms and definitions",
    body: "Each group name is a term and its skills are the definition, laid out in two columns from small screens up.",
  },
  {
    id: "system-roles",
    label: "readColorTokens · globals.css",
    title: "The color table reads the real file",
    body: "Every row comes from parsing the site's stylesheet, so a token added there shows up here without editing this page.",
  },
  {
    id: "system-contrast",
    label: "contrastRatio · tested",
    title: "Contrast is computed, never typed",
    body: "Each ratio is calculated from the tokens, and the same pairs are checked in the test suite, so the page can't claim a number the site misses.",
  },
] as const satisfies readonly XrayNote[];

export type XrayNoteId = (typeof xrayNotes)[number]["id"];

export function findXrayNote(id: string): XrayNote | undefined {
  return xrayNotes.find((note) => note.id === id);
}
