import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * shadcn/ui button. Focus is drawn by the global `:focus-visible` outline in globals.css, so no
 * variant sets its own ring.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium text-sm transition-[color,background-color,border-color,box-shadow,translate] duration-(--duration-fast) ease-standard active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /** The one primary action in a view. */
        default: "sheen bg-primary text-primary-foreground shadow-xs hover:bg-primary/92",
        /** Secondary actions that sit beside a primary one. */
        /** Carries the animated gradient stroke on hover and focus. */
        outline:
          "gradient-stroke border border-border bg-card text-foreground shadow-xs hover:bg-muted",
        /** Quiet actions inside dense UI such as toolbars and navigation. */
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-8 gap-1.5 rounded-md px-3 text-[0.8125rem]",
        lg: "h-11 px-5 text-[0.9375rem]",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  /** Render the child element (usually a link) with button styling instead of a `<button>`. */
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
