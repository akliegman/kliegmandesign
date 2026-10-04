import { ChevronDownIcon } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router";

import { findXrayNote, type XrayNote } from "@/content/xray";
import { startFrameLoop } from "@/lib/frameLoop";
import { useMotionPaused, usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { trackVisitEvent } from "@/lib/visits";
import { setXray, useXray } from "@/lib/xray";

interface Placed {
  note: XrayNote;
  element: HTMLElement;
  top: number;
  left: number;
  right: number;
  /** Whether the label sits at the element's right edge, to clear a label just above it. */
  alignEnd: boolean;
}

/** Labels closer than this vertically, and starting near the same x, would collide or cover the element above. */
const LABEL_CLEARANCE = 40;

/** Finds every annotated element on the page and where it sits in the document. */
function measure(): Placed[] {
  const placed: Placed[] = [];
  const seen = new Set<string>();
  for (const element of document.querySelectorAll<HTMLElement>("main [data-xray]")) {
    const note = findXrayNote(element.dataset.xray ?? "");
    // A component used several times on a page is annotated once, at its first appearance.
    if (!note || seen.has(note.id)) continue;
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) continue;
    seen.add(note.id);
    const top = rect.top + window.scrollY;
    const left = rect.left + window.scrollX;
    const crowded = placed.some(
      (other) =>
        !other.alignEnd &&
        Math.abs(other.top - top) < LABEL_CLEARANCE &&
        Math.abs(other.left - left) < 240,
    );
    placed.push({ note, element, top, left, right: left + rect.width, alignEnd: crowded });
  }
  return placed;
}

/** X toggles X-ray and Escape turns it off, except while the visitor is typing. */
function useXrayKeys() {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      const on = document.documentElement.dataset.xray === "on";
      if (event.key === "x" || event.key === "X") setXray(!on);
      else if (event.key === "Escape" && on) setXray(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}

const GLYPHS = [
  "--primary",
  "oklch",
  "0.88",
  "142",
  "16px",
  "600",
  "21ch",
  "--radius",
  "4/5",
  "rem",
  "{}",
  "</>",
  "light-dark",
  "--ease",
  "360ms",
  "aria",
  "gap-6",
  "px",
  "::",
  "01",
  "xl",
  "AA",
  "dl",
  "@container",
];
const COLUMN_WIDTH = 20;
const TRAIL = 12;

interface Column {
  y: number;
  speed: number;
  chars: string[];
}

function pickGlyph() {
  const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "·";
  return glyph.length > 3 ? (glyph[Math.floor(Math.random() * glyph.length)] ?? "·") : glyph;
}

/**
 * A rain of the site's own token names and values behind the page, in X-ray green. It draws at 24
 * frames a second and at 1x resolution, since it sits behind the content at partial opacity. Under
 * reduced motion, the site-wide pause, or a device that can't keep up, it holds one still frame.
 */
function TokenRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const [paused] = useMotionPaused();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let columns: Column[] = [];
    let width = 0;
    let height = 0;
    let colorAge = Number.POSITIVE_INFINITY;
    const styles = getComputedStyle(canvas);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      // Resizing a canvas resets its context, so the font and color are set again here.
      context.font = `500 12px ${styles.fontFamily}`;
      colorAge = Number.POSITIVE_INFINITY;
      const count = Math.ceil(width / COLUMN_WIDTH);
      columns = Array.from(
        { length: count },
        (_, index) =>
          columns[index] ?? {
            y: Math.random() * height,
            speed: 40 + Math.random() * 90,
            chars: Array.from({ length: TRAIL }, pickGlyph),
          },
      );
    };

    const draw = (elapsed: number) => {
      // The color follows the theme; reading it about once a second is plenty.
      colorAge += elapsed;
      if (colorAge > 1) {
        context.fillStyle = styles.color;
        colorAge = 0;
      }
      context.clearRect(0, 0, width, height);
      columns.forEach((column, index) => {
        column.y += column.speed * elapsed;
        if (column.y - TRAIL * COLUMN_WIDTH > height) {
          column.y = Math.random() * -200;
          column.speed = 40 + Math.random() * 90;
        }
        for (let step = 0; step < TRAIL; step++) {
          const y = column.y - step * COLUMN_WIDTH;
          if (y < -COLUMN_WIDTH || y > height + COLUMN_WIDTH) continue;
          if (elapsed > 0 && Math.random() < 0.02) column.chars[step] = pickGlyph();
          context.globalAlpha = step === 0 ? 0.9 : (1 - step / TRAIL) * 0.55;
          context.fillText(column.chars[step] ?? "·", index * COLUMN_WIDTH + 3, y);
        }
      });
      context.globalAlpha = 1;
    };

    resize();
    let stop = () => {};
    if (reduced || paused) draw(0);
    else stop = startFrameLoop(draw, { fps: 24, onSlow: () => draw(0) });

    const onResize = () => {
      resize();
      draw(0);
    };
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      window.removeEventListener("resize", onResize);
    };
  }, [reduced, paused]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="size-full animate-in font-mono text-xray-line opacity-60 duration-(--duration-slow) dark:opacity-50"
      />
    </div>
  );
}

/**
 * Everything X-ray adds to the page while it's on: the token rain, a numbered pin and token label on
 * each annotated element, and a drawer listing the design decisions on the current page.
 */
export function XrayLayer() {
  const { on } = useXray();
  const { pathname } = useLocation();
  const [placed, setPlaced] = useState<Placed[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(true);
  const listId = useId();

  useXrayKeys();

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-measure when the page changes
  useEffect(() => {
    if (!on) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setPlaced(measure()));
    };
    update();
    // Entrance animations shift elements for a moment after a page renders.
    const settle = window.setTimeout(update, 450);
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [on, pathname]);

  if (!on) return null;

  const openNote = (item: Placed) => {
    setActive(item.note.id);
    item.element.scrollIntoView({ block: "center" });
    trackVisitEvent({ type: "xray_note", path: pathname, note: item.note.id });
  };

  return (
    <>
      <TokenRain />
      {createPortal(
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-30">
          {placed.map((item, index) => (
            <div
              key={item.note.id}
              className="fade-in zoom-in-75 absolute animate-in duration-(--duration-slow)"
              style={
                item.alignEnd
                  ? {
                      top: item.top - 30,
                      right: Math.max(8, document.documentElement.clientWidth - item.right - 6),
                    }
                  : { top: item.top - 30, left: Math.max(8, item.left - 6) }
              }
            >
              <span className="flex items-center gap-1.5">
                <span className="grid size-5 place-items-center rounded-full bg-xray font-bold font-mono text-[0.625rem] text-xray-foreground shadow-[0_0_0_3px_var(--background),0_0_12px_var(--xray)]">
                  {index + 1}
                </span>
                <span className="whitespace-nowrap rounded bg-xray px-1.5 py-0.5 font-mono font-semibold text-[0.65625rem] text-xray-foreground">
                  {item.note.label}
                </span>
              </span>
            </div>
          ))}
        </div>,
        document.body,
      )}
      <aside
        aria-label="Design decisions on this page"
        className="fade-in slide-in-from-bottom-4 fixed right-4 bottom-4 z-40 w-[min(20rem,calc(100vw-2rem))] animate-in rounded-xl border bg-card p-3 shadow-raised duration-(--duration-slow) ease-emphasized"
      >
        <h2>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={listId}
            onClick={() => setExpanded((value) => !value)}
            className="flex w-full items-center gap-2 rounded-lg px-1 py-0.5 text-left font-semibold text-sm"
          >
            Decisions on this page
            <span className="ml-auto font-mono font-normal text-muted-foreground text-xs">
              {placed.length}
            </span>
            <ChevronDownIcon
              aria-hidden="true"
              className={cn(
                "size-4 text-muted-foreground transition-transform duration-(--duration-base)",
                !expanded && "rotate-180",
              )}
            />
          </button>
        </h2>
        <div id={listId} hidden={!expanded} className="mt-1">
          {placed.length === 0 ? (
            <p className="px-1 py-2 text-muted-foreground text-xs">
              No notes on this page yet. The token rain is still the real thing.
            </p>
          ) : (
            <ol className="flex max-h-[min(40vh,22rem)] flex-col gap-0.5 overflow-y-auto">
              {placed.map((item, index) => (
                <li key={item.note.id}>
                  <button
                    type="button"
                    onClick={() => openNote(item)}
                    className={cn(
                      "flex w-full gap-2.5 rounded-lg p-2 text-left text-xs leading-snug transition-colors hover:bg-muted",
                      active === item.note.id && "bg-muted",
                    )}
                  >
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-xray font-bold font-mono text-[0.625rem] text-xray-foreground">
                      {index + 1}
                    </span>
                    <span>
                      <span className="block font-semibold">{item.note.title}</span>
                      <span className="text-muted-foreground">{item.note.body}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          )}
          <p className="mt-1 px-1 font-mono text-[0.6875rem] text-muted-foreground">
            Press X or Esc to turn off
          </p>
        </div>
      </aside>
    </>
  );
}
