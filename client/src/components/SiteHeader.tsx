import { MenuIcon } from "lucide-react";
import { NavLink } from "react-router";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Wordmark } from "@/components/Wordmark";
import { navigation, profile } from "@/content/profile";
import { cn } from "@/lib/utils";

const navLinkClass =
  "rounded-md px-3 py-2 font-medium text-muted-foreground text-sm transition-colors hover:bg-muted hover:text-foreground aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground";

function ResumeLink({ className }: { className?: string }) {
  return (
    <a
      href={profile.resumePath}
      className={cn(navLinkClass, "inline-flex items-center gap-1.5", className)}
    >
      Résumé <span className="font-mono text-[0.6875rem] text-muted-foreground">PDF</span>
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md backdrop-saturate-150 [view-transition-name:site-header]">
      <div className="container-page flex h-(--header-height) items-center gap-6">
        <Wordmark />

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} viewTransition className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
          <ResumeLink />
        </nav>

        <ThemeToggle className="hidden md:inline-flex" />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto md:hidden">
              <MenuIcon aria-hidden="true" className="size-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="gap-0 p-0">
            <div className="flex h-(--header-height) items-center border-b px-5">
              <SheetTitle className="type-eyebrow">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation and theme</SheetDescription>
            </div>
            <nav aria-label="Primary" className="flex flex-col gap-1 p-3">
              <SheetClose asChild>
                <NavLink
                  to="/"
                  end
                  viewTransition
                  className={cn(navLinkClass, "px-3 py-3 text-base")}
                >
                  Home
                </NavLink>
              </SheetClose>
              {navigation.map((item) => (
                <SheetClose key={item.to} asChild>
                  <NavLink
                    to={item.to}
                    viewTransition
                    className={cn(navLinkClass, "px-3 py-3 text-base")}
                  >
                    {item.label}
                  </NavLink>
                </SheetClose>
              ))}
              <ResumeLink className="px-3 py-3 text-base" />
            </nav>
            <div className="mt-auto border-t p-5">
              <p className="type-eyebrow mb-3">Theme</p>
              <ThemeToggle withLabels />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
