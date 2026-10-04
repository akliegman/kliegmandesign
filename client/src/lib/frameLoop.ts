export interface FrameLoopOptions {
  /** Frames per second to draw at. Ambient canvases don't need the display's full rate. */
  fps?: number;
  /** Called once if drawing keeps taking longer than the budget; the loop stops first. */
  onSlow?: () => void;
}

/** Average draw time, in milliseconds, past which a device is treated as struggling. */
const SLOW_DRAW_MS = 10;
/** Frames sampled before deciding, so one slow frame (a GC pause, a tab switch) doesn't count. */
const SAMPLE_FRAMES = 45;

/**
 * Runs `draw` on animation frames at a capped rate, pauses while the tab is hidden, and gives up
 * if drawing is consistently too slow for the device. `draw` receives seconds since its last call.
 * Returns a function that stops the loop.
 */
export function startFrameLoop(
  draw: (elapsed: number) => void,
  { fps = 30, onSlow }: FrameLoopOptions = {},
) {
  const interval = 1000 / fps;
  let frame = 0;
  let last = performance.now();
  let sampled = 0;
  let drawTime = 0;
  let stopped = false;

  const stop = () => {
    stopped = true;
    cancelAnimationFrame(frame);
    document.removeEventListener("visibilitychange", onVisibility);
  };

  const tick = (now: number) => {
    if (stopped) return;
    frame = requestAnimationFrame(tick);
    if (now - last < interval - 1) return;
    const elapsed = Math.min(0.1, (now - last) / 1000);
    last = now;
    const started = performance.now();
    draw(elapsed);
    if (onSlow && sampled < SAMPLE_FRAMES) {
      drawTime += performance.now() - started;
      sampled += 1;
      if (sampled === SAMPLE_FRAMES && drawTime / SAMPLE_FRAMES > SLOW_DRAW_MS) {
        stop();
        onSlow();
      }
    }
  };

  function onVisibility() {
    cancelAnimationFrame(frame);
    if (!document.hidden && !stopped) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }

  document.addEventListener("visibilitychange", onVisibility);
  frame = requestAnimationFrame(tick);
  return stop;
}
