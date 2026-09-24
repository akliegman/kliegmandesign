import { useId } from "react";
import { Link } from "react-router";

import { profile } from "@/content/profile";

/**
 * The site logo and the link home: an "AK" monogram drawn in open strokes (an A without its
 * crossbar, a K without its upright) inside a tile with the site's turning gradient border. The
 * name is visually hidden text, so the link keeps an accessible name. The strokes draw in on load,
 * and the K's arms kick out on hover and keyboard focus; under reduced motion the mark just appears.
 */
export function Wordmark() {
  const gradientId = useId();

  return (
    <Link to="/" viewTransition className="group flex items-center rounded-lg">
      <span className="icon-tile size-9 shadow-xs">
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="size-6! overflow-visible"
          fill="none"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={`url(#${gradientId})`}
        >
          <defs>
            {/* User-space units: a bounding-box gradient cannot paint a perfectly straight stroke. */}
            <linearGradient
              id={gradientId}
              gradientUnits="userSpaceOnUse"
              x1="2"
              y1="4"
              x2="30"
              y2="28"
            >
              <stop offset="0" style={{ stopColor: "var(--primary)" }} />
              <stop offset="0.55" style={{ stopColor: "var(--accent-foreground)" }} />
              <stop offset="1" style={{ stopColor: "var(--muted-foreground)" }} />
            </linearGradient>
          </defs>
          <path pathLength={1} className="logo-stroke" d="M4.5 25 L11 7 L17.5 25" />
          <g className="origin-[21.4px_16px] transition-transform duration-(--duration-slow) ease-emphasized group-hover:rotate-[-4deg] group-hover:scale-x-110 group-focus-visible:scale-x-110">
            <path
              pathLength={1}
              className="logo-stroke [animation-delay:160ms]"
              d="M28 7 L21.4 15.4 L28 25"
            />
          </g>
        </svg>
      </span>
      <span className="sr-only">{profile.name}, home</span>
    </Link>
  );
}
