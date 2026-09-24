import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useRef } from "react";
import { flushSync } from "react-dom";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { type ThemePreference, useThemePreference } from "@/lib/theme";

const options = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "system", label: "System", Icon: MonitorIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
] as const;

export interface ThemeToggleProps {
  /** Show text labels beside the icons, for roomier placements such as the mobile menu. */
  withLabels?: boolean;
  className?: string;
}

/**
 * Light, system, and dark. Where view transitions are supported and motion is welcome, the new
 * theme is revealed as a circle growing from the control that was pressed.
 */
export function ThemeToggle({ withLabels = false, className }: ThemeToggleProps) {
  const [preference, setPreference] = useThemePreference();
  const origin = useRef<{ x: number; y: number } | null>(null);

  function change(next: ThemePreference) {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reducedMotion) {
      setPreference(next);
      return;
    }

    const root = document.documentElement;
    const { x, y } = origin.current ?? { x: window.innerWidth, y: 0 };
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const duration = Number.parseFloat(getComputedStyle(root).getPropertyValue("--duration-slow"));

    root.dataset.themeTransition = "";
    const transition = document.startViewTransition(() => flushSync(() => setPreference(next)));
    transition.ready
      .then(() =>
        root.animate(
          { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          {
            duration: duration * 1.5,
            easing: "cubic-bezier(0.19, 1, 0.22, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        ),
      )
      .catch(() => {});
    transition.finished.finally(() => delete root.dataset.themeTransition);
  }

  return (
    <ToggleGroup
      type="single"
      value={preference}
      onValueChange={(value) => {
        // Radix reports "" when the pressed item is clicked again; keep the current choice.
        if (value) change(value as ThemePreference);
      }}
      onPointerDown={(event) => {
        origin.current = { x: event.clientX, y: event.clientY };
      }}
      onKeyDown={(event) => {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        origin.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }}
      aria-label="Color theme"
      className={className}
    >
      {options.map(({ value, label, Icon }) => (
        <ToggleGroupItem key={value} value={value} aria-label={withLabels ? undefined : label}>
          <Icon aria-hidden="true" />
          {withLabels && label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
