import { useCallback, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/** Whether the visitor's system asks for reduced motion, kept current if the setting changes. */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

/** Must match the key read by the pre-paint script in index.html. */
export const MOTION_STORAGE_KEY = "motion";

const pauseListeners = new Set<() => void>();

function readPaused() {
  return document.documentElement.dataset.motion === "paused";
}

function subscribePaused(listener: () => void) {
  pauseListeners.add(listener);
  return () => pauseListeners.delete(listener);
}

/**
 * The site-wide animation pause (WCAG 2.2.2). Ambient animations run continuously, so visitors can
 * stop all of them at once; the choice is remembered.
 */
export function useMotionPaused() {
  const paused = useSyncExternalStore(subscribePaused, readPaused, () => false);

  const setPaused = useCallback((next: boolean) => {
    const root = document.documentElement;
    if (next) root.dataset.motion = "paused";
    else delete root.dataset.motion;
    try {
      if (next) localStorage.setItem(MOTION_STORAGE_KEY, "paused");
      else localStorage.removeItem(MOTION_STORAGE_KEY);
    } catch {
      // Without storage the choice lasts for this visit.
    }
    for (const listener of pauseListeners) listener();
  }, []);

  return [paused, setPaused] as const;
}
