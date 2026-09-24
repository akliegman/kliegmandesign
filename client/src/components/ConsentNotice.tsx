import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import type { AnalyticsConsent } from "@/lib/analytics";

export interface ConsentNoticeProps {
  onChoose: (consent: Exclude<AnalyticsConsent, "unset">) => void;
}

/** A small, non-blocking corner notice. The page stays fully usable while it is open. */
export function ConsentNotice({ onChoose }: ConsentNoticeProps) {
  return (
    <section
      aria-label="Analytics choice"
      className="fixed inset-x-3 bottom-3 z-30 animate-rise rounded-xl border bg-card p-4 shadow-overlay sm:inset-x-auto sm:right-4 sm:bottom-4 sm:max-w-sm"
    >
      <p className="text-sm">
        May I use Google Analytics to count visits? It sets cookies and nothing loads until you say
        yes.{" "}
        <Link to="/privacy-policy" className="text-primary underline underline-offset-4">
          Privacy policy
        </Link>
      </p>
      <div className="mt-3 flex gap-2">
        <Button size="sm" onClick={() => onChoose("granted")}>
          Allow
        </Button>
        <Button size="sm" variant="outline" onClick={() => onChoose("denied")}>
          No thanks
        </Button>
      </div>
    </section>
  );
}
