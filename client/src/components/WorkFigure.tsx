import { Maximize2Icon } from "lucide-react";

import { MediaFrame, ThemedImage } from "@/components/MediaFrame";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Figure } from "@/content/types";

export interface WorkFigureProps {
  figure: Figure;
  sizes?: string;
  /** Crops tall screenshots in the page; the dialog always shows the whole image. */
  aspectRatio?: number;
}

/**
 * A captioned screenshot. Full-screen captures open in a dialog at full resolution so dense
 * interfaces can be read. Specimens are already shown at natural size, and pending media has nothing
 * to enlarge, so neither gets the dialog.
 */
export function WorkFigure({ figure, sizes, aspectRatio }: WorkFigureProps) {
  const { media, caption } = figure;

  if (media.kind === "pending" || media.specimen) {
    return (
      <figure className="m-0">
        <MediaFrame media={media} aspectRatio={aspectRatio} />
        {caption && (
          <figcaption className="mt-3 text-muted-foreground text-sm">{caption}</figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="m-0">
      <Dialog>
        <DialogTrigger className="gradient-stroke group block w-full cursor-zoom-in rounded-xl text-left">
          <MediaFrame
            media={media}
            sizes={sizes}
            aspectRatio={aspectRatio}
            className="transition-shadow group-hover:shadow-raised"
          />
          <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md border bg-card/90 px-2 py-1 font-medium text-xs shadow-xs backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:opacity-0">
            <Maximize2Icon aria-hidden="true" className="size-3.5" />
            View full size
          </span>
        </DialogTrigger>
        <DialogContent className="max-h-[calc(100dvh-2rem)] grid-rows-[auto_minmax(0,1fr)] gap-3 p-3 sm:max-w-[min(100rem,calc(100%-2rem))]">
          <div className="pr-12 pl-1">
            <DialogTitle className="text-sm">{caption ?? "Screenshot"}</DialogTitle>
            <DialogDescription className="sr-only">{media.alt}</DialogDescription>
          </div>
          <div className="min-h-0 overflow-auto rounded-md border bg-muted">
            <ThemedImage
              media={media}
              sizes="100vw"
              priority
              alt={media.alt}
              className="mx-auto h-auto w-full"
            />
          </div>
        </DialogContent>
      </Dialog>
      {caption && <figcaption className="mt-3 text-muted-foreground text-sm">{caption}</figcaption>}
    </figure>
  );
}
