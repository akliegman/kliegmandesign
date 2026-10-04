import { useEffect, useRef, useState } from "react";

import { startFrameLoop } from "@/lib/frameLoop";
import { useMotionPaused, usePrefersReducedMotion } from "@/lib/motion";

const GAP = 16;
const REACH = 160;
/** Dot opacity is drawn in this many steps, so each frame fills a few batched paths. */
const ALPHA_STEPS = 16;

/**
 * The home masthead's background: a dot grid under two soft glows that drift on slow loops. The grid
 * answers the pointer, with dots near it brightening into the primary color and easing outward, and
 * the glows lean toward it. The site-wide pause in the footer stops all of it (WCAG 2.2.2). Under
 * reduced motion, or on a device too slow to draw it smoothly, the grid is the original still pattern.
 */
export function MastheadBackdrop() {
  const reduced = usePrefersReducedMotion();
  const [paused] = useMotionPaused();
  const [tooSlow, setTooSlow] = useState(false);
  const still = reduced || paused || tooSlow;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 transition-transform duration-700 ease-out [transform:translate(var(--lean-x,0px),var(--lean-y,0px))]">
        <div className="glow-primary absolute -top-1/2 -right-[15%] aspect-square w-[min(56rem,120vw)] animate-[drift-a_24s_ease-in-out_infinite]" />
      </div>
      <div className="absolute inset-0 transition-transform duration-700 ease-out [transform:translate(calc(var(--lean-x,0px)*-0.6),calc(var(--lean-y,0px)*-0.6))]">
        <div className="glow-neutral absolute top-1/4 right-1/4 aspect-square w-[min(40rem,90vw)] animate-[drift-b_32s_ease-in-out_infinite]" />
      </div>
      {still ? (
        <div className="absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_70%_90%_at_75%_0%,black,transparent_75%)]" />
      ) : (
        <LiveDotGrid onTooSlow={() => setTooSlow(true)} />
      )}
    </div>
  );
}

interface LiveDotGridProps {
  onTooSlow: () => void;
}

/**
 * The dot grid drawn to a canvas so it can respond to the pointer and ripple slowly at rest. It
 * draws at 30 frames a second, only while the masthead is on screen, and batches the dots into a
 * handful of paths by color and opacity rather than filling each one separately.
 */
function LiveDotGrid({ onTooSlow }: LiveDotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onTooSlowRef = useRef(onTooSlow);
  onTooSlowRef.current = onTooSlow;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const masthead = canvas?.parentElement?.parentElement;
    if (!canvas || !context || !masthead) return;

    const styles = getComputedStyle(canvas);
    let width = 0;
    let height = 0;
    let xs = new Float32Array(0);
    let ys = new Float32Array(0);
    let masks = new Float32Array(0);
    let seconds = 0;
    let colorAge = Number.POSITIVE_INFINITY;
    let ink = "";
    let primary = "";
    let target = { x: -9999, y: -9999 };
    let pointer = { x: -9999, y: -9999 };
    let stop: (() => void) | null = null;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      // Positions and the falloff mask only change with size, so they're computed once here.
      const points: number[] = [];
      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) {
          // The same falloff as the still grid's mask: strongest top right, gone by the bottom left.
          const mask = Math.max(
            0,
            1 - Math.hypot((x / width - 0.75) / 0.7, y / height / 0.9) / 0.75,
          );
          points.push(x, y, mask);
        }
      }
      const count = points.length / 3;
      xs = new Float32Array(count);
      ys = new Float32Array(count);
      masks = new Float32Array(count);
      for (let index = 0; index < count; index++) {
        xs[index] = points[index * 3] ?? 0;
        ys[index] = points[index * 3 + 1] ?? 0;
        masks[index] = points[index * 3 + 2] ?? 0;
      }
    };

    const draw = (elapsed: number) => {
      seconds += elapsed;
      colorAge += elapsed;
      if (colorAge > 1) {
        ink = styles.color;
        primary = styles.caretColor;
        colorAge = 0;
      }
      pointer = {
        x: pointer.x + (target.x - pointer.x) * 0.2,
        y: pointer.y + (target.y - pointer.y) * 0.2,
      };
      const inkPaths = Array.from({ length: ALPHA_STEPS }, () => new Path2D());
      const litPaths = Array.from({ length: ALPHA_STEPS }, () => new Path2D());
      for (let index = 0; index < xs.length; index++) {
        const x = xs[index] ?? 0;
        const y = ys[index] ?? 0;
        const mask = masks[index] ?? 0;
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const near =
          Math.abs(dx) < REACH && Math.abs(dy) < REACH
            ? Math.max(0, 1 - Math.hypot(dx, dy) / REACH)
            : 0;
        if (mask === 0 && near === 0) continue;
        const ripple = ((Math.sin(x * 0.02 + y * 0.015 - seconds * 1.2) + 1) / 2) * 0.05;
        const alpha = Math.min(1, mask * (0.17 + ripple) + near * 0.75);
        if (alpha < 0.02) continue;
        const step = Math.min(ALPHA_STEPS - 1, Math.floor(alpha * ALPHA_STEPS));
        const distance = Math.hypot(dx, dy);
        const push = distance > 0 ? (near * 6) / distance : 0;
        const radius = 1 + near * 1.2;
        const path = near > 0.15 ? litPaths[step] : inkPaths[step];
        path?.moveTo(x + dx * push + radius, y + dy * push);
        path?.arc(x + dx * push, y + dy * push, radius, 0, Math.PI * 2);
      }
      context.clearRect(0, 0, width, height);
      for (let step = 0; step < ALPHA_STEPS; step++) {
        context.globalAlpha = (step + 0.5) / ALPHA_STEPS;
        const inkPath = inkPaths[step];
        const litPath = litPaths[step];
        if (inkPath) {
          context.fillStyle = ink;
          context.fill(inkPath);
        }
        if (litPath) {
          context.fillStyle = primary;
          context.fill(litPath);
        }
      }
      context.globalAlpha = 1;
    };

    const start = () => {
      stop ??= startFrameLoop(draw, {
        onSlow: () => {
          stop = null;
          onTooSlowRef.current();
        },
      });
    };
    const pause = () => {
      stop?.();
      stop = null;
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (pointer.x < -9000) pointer = target;
      masthead.style.setProperty("--lean-x", `${(target.x / rect.width - 0.5) * 60}px`);
      masthead.style.setProperty("--lean-y", `${(target.y / rect.height - 0.5) * 40}px`);
    };
    const onLeave = () => {
      target = { x: -9999, y: -9999 };
      masthead.style.setProperty("--lean-x", "0px");
      masthead.style.setProperty("--lean-y", "0px");
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    // Nothing is drawn while the masthead is scrolled out of view.
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) start();
      else pause();
    });
    visibility.observe(masthead);
    masthead.addEventListener("pointermove", onMove);
    masthead.addEventListener("pointerleave", onLeave);
    return () => {
      pause();
      resizeObserver.disconnect();
      visibility.disconnect();
      masthead.removeEventListener("pointermove", onMove);
      masthead.removeEventListener("pointerleave", onLeave);
      masthead.style.removeProperty("--lean-x");
      masthead.style.removeProperty("--lean-y");
    };
  }, []);

  // Canvas can't resolve light-dark(), so the two inks come from computed styles: text for the
  // grid, caret for the primary color.
  return (
    <canvas
      ref={canvasRef}
      data-dot-grid
      className="absolute inset-0 size-full text-foreground caret-primary"
    />
  );
}
