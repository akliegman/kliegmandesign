/** A finished image with the intrinsic size of its largest source, so layout reserves its space. */
export interface ImageMedia {
  kind: "image";
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  /**
   * The same capture in the dark theme. When present, the site shows whichever version matches its
   * own current theme, so switching themes demonstrates the product's theming.
   */
  dark?: { src: string; srcSet: string };
  /**
   * An isolated component captured at 2x. It renders at its natural size, centered on the stage,
   * instead of filling the frame like a full-screen capture.
   */
  specimen?: boolean;
}

/**
 * Media that has not been supplied yet. It renders as a neutral stage with its label, so a page
 * keeps its final shape until the real asset replaces it.
 */
export interface PendingMedia {
  kind: "pending";
  /** Names what will appear here, shown to visitors, for example "Quiz builder editing view". */
  label: string;
  /** Width divided by height of the expected asset. Defaults to 16 / 10. */
  aspectRatio?: number;
}

export type Media = ImageMedia | PendingMedia;

export interface Figure {
  media: Media;
  caption?: string;
}

export interface WorkSection {
  /** Anchor id, unique within the case study. */
  id: string;
  heading: string;
  paragraphs: string[];
  figures?: Figure[];
}

export interface WorkItem {
  slug: string;
  title: string;
  company: string;
  role: string;
  /** Human-readable range such as "2019 to 2023". Omitted when it is not yet confirmed. */
  period?: string;
  /** One sentence for cards and index rows. */
  summary: string;
  /** The opening paragraph of the case study. */
  lede: string;
  tags: string[];
  stack: string[];
  cover: Media;
  sections: WorkSection[];
}

export interface SideProject {
  title: string;
  summary: string;
  href: string;
  codeHref: string;
}

/** A block of legal copy. Paragraph text can mix plain and bold runs. */
export type LegalBlock =
  | { type: "heading"; text: string; level?: 3 }
  | { type: "paragraph"; text: string | LegalRun[] }
  | { type: "list"; items: string[] };

export interface LegalRun {
  text: string;
  strong?: boolean;
}

export interface LegalDocument {
  title: string;
  updated: string;
  blocks: LegalBlock[];
}
