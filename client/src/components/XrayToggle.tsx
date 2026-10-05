import { ScanIcon } from "lucide-react";
import { Switch, Tooltip } from "radix-ui";

import { cn } from "@/lib/utils";
import { useXray } from "@/lib/xray";

export interface XrayToggleProps {
  className?: string;
}

/**
 * The X-ray switch, set on the same muted track as the theme control. The whole pill is the switch,
 * so its visible "X-ray" text is its accessible name. It glows until the visitor has tried it once,
 * and a tooltip says what it does. The thumb and track meet 3:1 against each other in both states
 * (see CONTRAST_PAIRS), so on and off are told apart by more than position alone. Styles key off aria-checked because the tooltip trigger sets
 * its own data-state on the same element. X toggles it from anywhere (see XrayLayer).
 */
export function XrayToggle({ className }: XrayToggleProps) {
  const { on, seen, setXray } = useXray();

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Switch.Root
            checked={on}
            onCheckedChange={setXray}
            aria-keyshortcuts="x"
            className={cn(
              "group inline-flex h-9 w-fit items-center gap-2 whitespace-nowrap rounded-lg bg-muted pr-1 pl-2.5 font-medium text-muted-foreground text-xs outline-none transition-[color,background-color,box-shadow] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-checked:bg-xray/15 aria-checked:text-foreground aria-checked:shadow-[0_0_0_1px_var(--xray),0_0_16px_-2px_var(--xray)]",
              !seen && !on && "xray-beacon",
              className,
            )}
          >
            <ScanIcon
              aria-hidden="true"
              className="size-4 shrink-0 group-aria-checked:text-xray-line"
            />
            X-ray
            <span
              aria-hidden="true"
              className="relative h-5 w-9 shrink-0 rounded-full bg-muted-foreground transition-colors group-aria-checked:bg-xray group-aria-checked:shadow-[inset_0_0_0_1px_var(--xray-line),0_0_10px_var(--xray)]"
            >
              <Switch.Thumb className="block size-4 translate-x-0.5 translate-y-0.5 rounded-full bg-card shadow-xs transition-[translate,background-color] duration-(--duration-base) ease-emphasized group-aria-checked:translate-x-4.5 group-aria-checked:bg-xray-foreground" />
            </span>
          </Switch.Root>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            align="end"
            sideOffset={10}
            className="z-50 w-60 rounded-lg bg-foreground px-3 py-2 text-background text-xs leading-relaxed shadow-raised"
          >
            <span className="block font-semibold">See how this page was built</span>
            Tokens, spacing, and the design decisions behind it.
            <Tooltip.Arrow className="fill-foreground" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
