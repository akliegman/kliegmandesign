import { oklchToRgb, type Rgb } from "@/lib/color";
import themeSource from "@/styles/globals.css?raw";

export type ThemeName = "light" | "dark";

export interface ColorToken {
  name: string;
  light: string;
  dark: string;
}

const DECLARATION = /--([a-z-]+):\s*([^;]+);/g;

/**
 * Reads the color variables from the `:root` block of globals.css, resolving `light-dark()` pairs
 * and `var()` aliases. The /system page and the contrast tests both use this, so the documented
 * values are the shipped values.
 */
export function readColorTokens(source: string = themeSource): ColorToken[] {
  const rootBlock = /:root\s*\{([\s\S]*?)\n\}/.exec(source)?.[1] ?? "";
  const raw = new Map<string, string>();
  for (const [, name, value] of rootBlock.matchAll(DECLARATION)) {
    if (name && value) raw.set(name, value.trim());
  }

  const resolve = (value: string, theme: ThemeName, depth = 0): string | undefined => {
    if (depth > 4) return undefined;
    const alias = /^var\(--([a-z-]+)\)$/.exec(value)?.[1];
    if (alias) {
      const target = raw.get(alias);
      return target ? resolve(target, theme, depth + 1) : undefined;
    }
    const pair = /^light-dark\((oklch\([^)]*\)),\s*(oklch\([^)]*\))\)$/.exec(value);
    if (pair) return theme === "light" ? pair[1] : pair[2];
    return value.startsWith("oklch(") ? value : undefined;
  };

  const tokens: ColorToken[] = [];
  for (const [name, value] of raw) {
    const light = resolve(value, "light");
    const dark = resolve(value, "dark");
    if (light && dark) tokens.push({ name, light, dark });
  }
  return tokens;
}

export function tokenRgb(tokens: ColorToken[], name: string, theme: ThemeName): Rgb {
  const token = tokens.find((candidate) => candidate.name === name);
  if (!token) throw new Error(`Unknown color token --${name}`);
  return oklchToRgb(token[theme]);
}

/** Reads the motion tokens (durations and easings) from the `:root` block of globals.css. */
export function readMotionTokens(source: string = themeSource) {
  const rootBlock = /:root\s*\{([\s\S]*?)\n\}/.exec(source)?.[1] ?? "";
  return [...rootBlock.matchAll(DECLARATION)]
    .filter(([, name]) => name?.startsWith("duration-") || name?.startsWith("ease-"))
    .map(([, name, value]) => ({ name: name ?? "", value: value?.trim() ?? "" }));
}

/**
 * Foreground and background pairs the site actually renders, with the WCAG minimum each must meet:
 * 4.5 for body text, 3 for UI boundaries and focus indicators.
 */
export const CONTRAST_PAIRS = [
  { foreground: "foreground", background: "background", minimum: 4.5, use: "Body text" },
  { foreground: "foreground", background: "card", minimum: 4.5, use: "Text on cards" },
  {
    foreground: "muted-foreground",
    background: "background",
    minimum: 4.5,
    use: "Secondary text",
  },
  {
    foreground: "muted-foreground",
    background: "muted",
    minimum: 4.5,
    use: "Captions on media stages",
  },
  { foreground: "muted-foreground", background: "secondary", minimum: 4.5, use: "Badges" },
  { foreground: "primary", background: "background", minimum: 4.5, use: "Links" },
  {
    foreground: "primary-foreground",
    background: "primary",
    minimum: 4.5,
    use: "Primary buttons",
  },
  {
    foreground: "accent-foreground",
    background: "accent",
    minimum: 4.5,
    use: "Current page in navigation",
  },
  { foreground: "input", background: "background", minimum: 3, use: "Control boundaries" },
  { foreground: "ring", background: "background", minimum: 3, use: "Focus outline" },
  { foreground: "ring", background: "card", minimum: 3, use: "Focus outline on cards" },
] as const;
