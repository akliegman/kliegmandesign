import dimensions from "@/assets/work/dimensions.json";
import type { ImageMedia, PendingMedia } from "@/content/types";

const files = import.meta.glob<string>("../assets/work/*.jpg", {
  eager: true,
  import: "default",
});

type ScreenshotName = keyof typeof dimensions;

function sources(name: ScreenshotName) {
  const small = files[`../assets/work/${name}-800.jpg`];
  const large = files[`../assets/work/${name}-1600.jpg`];
  if (!small || !large) throw new Error(`Missing screenshot exports for "${name}"`);
  const [width] = dimensions[name] as [number, number];
  return { src: large, srcSet: `${small} ${Math.min(width, 800)}w, ${large} ${width}w` };
}

export interface ScreenshotOptions {
  /** Name of the matching dark-theme capture. */
  dark?: ScreenshotName;
  /** Render an isolated component at its natural size. */
  specimen?: boolean;
}

/**
 * A responsive screenshot from `src/assets/work`, exported as `<name>-800.jpg` and
 * `<name>-1600.jpg` (or the native width when smaller). Dimensions come from `dimensions.json`,
 * which lists the larger export of each image.
 */
export function screenshot(
  name: ScreenshotName,
  alt: string,
  { dark, specimen }: ScreenshotOptions = {},
): ImageMedia {
  const [width, height] = dimensions[name] as [number, number];
  return {
    kind: "image",
    ...sources(name),
    width,
    height,
    alt,
    dark: dark ? sources(dark) : undefined,
    specimen,
  };
}

export function pending(label: string, aspectRatio?: number): PendingMedia {
  return { kind: "pending", label, aspectRatio };
}
