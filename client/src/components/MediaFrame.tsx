import { ImageIcon } from "lucide-react";
import type * as React from "react";

import type { ImageMedia, Media } from "@/content/types";
import { cn } from "@/lib/utils";

export interface MediaFrameProps {
  media: Media;
  /** Responsive `sizes` for the image, matched to the column it sits in. */
  sizes?: string;
  /** Load immediately with high priority. Use for the largest image above the fold only. */
  priority?: boolean;
  /** Treat the image as decorative, for example when a card heading already names it. */
  decorative?: boolean;
  /** Shared name so the browser can morph this media between routes during a view transition. */
  transitionName?: string;
  /** Fix the frame to this width-to-height ratio; screenshots crop from the top, specimens center. */
  aspectRatio?: number;
  className?: string;
}

export interface ThemedImageProps {
  media: ImageMedia;
  sizes: string;
  priority: boolean;
  alt: string;
  className?: string;
}

/**
 * Renders the capture that matches the site's theme. Both images are in the markup, but the hidden
 * one is `display: none` with lazy loading, so browsers only fetch the one being shown.
 */
export function ThemedImage({ media, sizes, priority, alt, className }: ThemedImageProps) {
  const shared = {
    sizes,
    width: media.width,
    height: media.height,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    decoding: "async" as const,
  };

  return (
    <>
      <img
        {...shared}
        src={media.src}
        srcSet={media.srcSet}
        alt={alt}
        fetchPriority={priority && !media.dark ? "high" : "auto"}
        className={cn(className, media.dark && "dark:hidden")}
      />
      {media.dark && (
        <img
          {...shared}
          src={media.dark.src}
          srcSet={media.dark.srcSet}
          alt={alt}
          className={cn(className, "hidden dark:block")}
        />
      )}
    </>
  );
}

/**
 * Presents work on a "stage": a muted, dot-gridded surface. Full-screen captures sit inset like a
 * window; isolated component specimens sit centered at their natural size. Pending media renders
 * the same stage with a label, so layouts hold their final shape until the asset arrives.
 */
export function MediaFrame({
  media,
  sizes = "(min-width: 76rem) 48rem, 100vw",
  priority = false,
  decorative = false,
  transitionName,
  aspectRatio,
  className,
}: MediaFrameProps) {
  const style: React.CSSProperties = { viewTransitionName: transitionName, aspectRatio };
  const stage = "relative overflow-hidden rounded-xl border bg-dot-grid bg-muted";

  if (media.kind === "pending") {
    return (
      <div
        className={cn(stage, "grid place-items-center p-6", className)}
        style={{ ...style, aspectRatio: aspectRatio ?? media.aspectRatio ?? 16 / 10 }}
      >
        <div className="flex max-w-[30ch] flex-col items-center gap-3 text-center">
          <span className="grid size-10 place-items-center rounded-lg border bg-card text-muted-foreground shadow-xs">
            <ImageIcon aria-hidden="true" className="size-4" />
          </span>
          <p className="text-muted-foreground text-sm">{media.label}</p>
          {import.meta.env.DEV && (
            <span className="rounded-sm border border-primary border-dashed px-1.5 font-mono text-[0.6875rem] text-primary">
              pending media
            </span>
          )}
        </div>
      </div>
    );
  }

  const alt = decorative ? "" : media.alt;

  if (media.specimen) {
    return (
      <div className={cn(stage, "grid place-items-center p-[6%]", className)} style={style}>
        {/* Specimens are 2x captures, so half the pixel width is their natural CSS size. */}
        <div className="w-full" style={{ maxWidth: media.width / 2 }}>
          <ThemedImage
            media={media}
            sizes={`${Math.round(media.width / 2)}px`}
            priority={priority}
            alt={alt}
            className="h-auto max-h-full w-full rounded-lg shadow-raised"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(stage, "px-[4%] pt-[4%]", className)} style={style}>
      <ThemedImage
        media={media}
        sizes={sizes}
        priority={priority}
        alt={alt}
        className={cn(
          "w-full rounded-t-md border border-b-0 bg-card object-cover object-top shadow-raised",
          aspectRatio ? "h-full" : "h-auto",
        )}
      />
    </div>
  );
}
