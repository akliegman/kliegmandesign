import { useCallback, useSyncExternalStore } from "react";

import { trackVisitEvent } from "@/lib/visits";

/** On or off for the tab, so it follows the visitor from page to page. Must match the pre-paint script in index.html. */
const STATE_KEY = "xray";
/** Remembered across visits; the switch stops glowing once someone has tried it. */
const SEEN_KEY = "xray-seen";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readOn() {
  return document.documentElement.dataset.xray === "on";
}

function readSeen() {
  try {
    return localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function setXray(next: boolean) {
  const root = document.documentElement;
  if (next) root.dataset.xray = "on";
  else delete root.dataset.xray;
  try {
    if (next) sessionStorage.setItem(STATE_KEY, "on");
    else sessionStorage.removeItem(STATE_KEY);
    localStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Without storage the state lasts until the next page load.
  }
  for (const listener of listeners) listener();
  trackVisitEvent({ type: "xray_toggle", path: window.location.pathname, on: next });
}

/** Whether X-ray is on, and whether the visitor has ever turned it on or off. */
export function useXray() {
  const on = useSyncExternalStore(subscribe, readOn, () => false);
  const seen = useSyncExternalStore(subscribe, readSeen, () => true);
  const set = useCallback((next: boolean) => setXray(next), []);
  return { on, seen, setXray: set };
}
