/** An sRGB color with channels in the 0 to 1 range. */
export type Rgb = readonly [number, number, number];

const OKLCH = /oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)(?:deg)?\s*(?:\/\s*[\d.%]+\s*)?\)/;

/** Parses an `oklch(L C H)` string (L as 0 to 1 or a percentage) and converts it to clamped sRGB. */
export function oklchToRgb(value: string): Rgb {
  const match = OKLCH.exec(value);
  if (!match) throw new Error(`Not an oklch() color: ${value}`);
  const [, l, percent, c, h] = match;
  const lightness = Number(l) / (percent ? 100 : 1);
  const chroma = Number(c);
  const hue = (Number(h) * Math.PI) / 180;

  const a = chroma * Math.cos(hue);
  const b = chroma * Math.sin(hue);
  const lp = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const mp = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const sp = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;

  const linear = [
    4.0767416621 * lp - 3.3077115913 * mp + 0.2309699292 * sp,
    -1.2684380046 * lp + 2.6097574011 * mp - 0.3413193965 * sp,
    -0.0041960863 * lp - 0.7034186147 * mp + 1.707614701 * sp,
  ] as const;

  return linear.map((channel) => {
    const clamped = Math.min(1, Math.max(0, channel));
    return clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * clamped ** (1 / 2.4) - 0.055;
  }) as unknown as Rgb;
}

function relativeLuminance([r, g, b]: Rgb) {
  const toLinear = (channel: number) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/** WCAG 2 contrast ratio between two colors, from 1 to 21. */
export function contrastRatio(foreground: Rgb, background: Rgb) {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export function toHex(rgb: Rgb) {
  return `#${rgb
    .map((channel) =>
      Math.round(channel * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}
