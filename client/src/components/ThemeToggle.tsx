import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

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

export function ThemeToggle({ withLabels = false, className }: ThemeToggleProps) {
  const [preference, setPreference] = useThemePreference();

  return (
    <ToggleGroup
      type="single"
      value={preference}
      onValueChange={(value) => {
        // Radix reports "" when the pressed item is clicked again; keep the current choice.
        if (value) setPreference(value as ThemePreference);
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
