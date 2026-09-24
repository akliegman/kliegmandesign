import { useCallback, useSyncExternalStore } from "react";

export type ThemePreference = "system" | "light" | "dark";

/** Must match the key read by the pre-paint script in index.html. */
export const THEME_STORAGE_KEY = "theme";

const listeners = new Set<() => void>();

function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

/** Sets the root class that pins `color-scheme`; "system" removes it so the OS setting applies. */
export function applyThemePreference(preference: ThemePreference) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  if (preference !== "system") root.classList.add(preference);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** The visitor's theme preference, persisted in localStorage and shared by every consumer. */
export function useThemePreference() {
  const preference = useSyncExternalStore(subscribe, readPreference, () => "system" as const);

  const setPreference = useCallback((next: ThemePreference) => {
    try {
      if (next === "system") localStorage.removeItem(THEME_STORAGE_KEY);
      else localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode, blocked site data); the choice lasts for the visit.
    }
    applyThemePreference(next);
    for (const listener of listeners) listener();
  }, []);

  return [preference, setPreference] as const;
}
