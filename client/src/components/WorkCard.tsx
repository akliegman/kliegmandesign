import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";

import { MediaFrame } from "@/components/MediaFrame";
import { Badge } from "@/components/ui/badge";
import type { WorkItem } from "@/content/types";
import { cn } from "@/lib/utils";

export interface WorkCardProps {
  item: WorkItem;
  /** The lead project, set with a larger title. */
  feature?: boolean;
  /** Keep the gradient stroke faintly turning at rest. Use on one or two cards per page. */
  ambient?: boolean;
  /** Share the cover's view-transition name with the case study page, so it morphs into place. */
  morph?: boolean;
}

/**
 * A case study teaser. The title link stretches over the whole card, so the card is one tab stop
 * and one accessible name, with no nested interactive content. The card lays itself out with a
 * container query: image beside text once the card is wider than 42rem, stacked when narrower, so
 * the same component works as a feature, in a three-up grid, and in a single tablet column.
 */
export function WorkCard({ item, feature = false, ambient = false, morph = true }: WorkCardProps) {
  return (
    <article
      className={cn(
        "gradient-stroke group @container overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-raised",
        ambient && "stroke-ambient",
      )}
    >
      <div className="grid h-full @2xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <MediaFrame
          media={item.cover}
          decorative
          sizes={
            feature
              ? "(min-width: 64rem) 42rem, 100vw"
              : "(min-width: 64rem) 24rem, (min-width: 42rem) 50vw, 100vw"
          }
          aspectRatio={16 / 10}
          transitionName={morph ? `work-${item.slug}` : undefined}
          className={cn(
            "w-full rounded-none border-0 border-b [&_img]:transition-transform [&_img]:duration-(--duration-slow) [&_img]:ease-emphasized group-hover:[&_img]:-translate-y-1.5",
            // Width and height are both definite side by side, so the aspect ratio yields and the
            // stage fills the row instead of growing wider than its column.
            "@2xl:h-full @2xl:border-r @2xl:border-b-0",
          )}
        />
        <div className="flex flex-col @2xl:justify-center gap-3 @2xl:p-8 p-5">
          <p className="type-eyebrow">
            {item.company}
            {item.period && <span className="text-muted-foreground/80"> · {item.period}</span>}
          </p>
          <h3 className={feature ? "type-heading" : "type-subheading"}>
            <Link
              to={`/work/${item.slug}`}
              viewTransition
              className="rounded-sm after:absolute after:inset-0 after:content-['']"
            >
              {item.title}
            </Link>
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{item.summary}</p>
          <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
            {item.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
            <ArrowRightIcon
              aria-hidden="true"
              className="ml-auto size-4 text-muted-foreground transition-[translate,color] group-hover:translate-x-0.5 group-hover:text-primary"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
