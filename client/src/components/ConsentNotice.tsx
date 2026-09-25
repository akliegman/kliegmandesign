import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import type { VisitConsent } from "@/lib/visits";

export interface ConsentNoticeProps {
  consent: VisitConsent;
  /** Global Privacy Control or Do Not Track is on, which overrides any choice made here. */
  optedOutByBrowser: boolean;
  onChoose: (consent: Exclude<VisitConsent, "unset">) => void;
  onClose: () => void;
}

/** A small, non-blocking corner notice. The page stays fully usable while it is open. */
export function ConsentNotice({
  consent,
  optedOutByBrowser,
  onChoose,
  onClose,
}: ConsentNoticeProps) {
  const policyLink = (
    <Link to="/privacy-policy" className="text-primary underline underline-offset-4">
      Privacy policy
    </Link>
  );

  return (
    <section
      aria-label="Visit analytics"
      className="fixed inset-x-3 bottom-3 z-30 animate-rise rounded-xl border bg-card p-4 shadow-overlay sm:inset-x-auto sm:right-4 sm:bottom-4 sm:max-w-sm"
    >
      {optedOutByBrowser ? (
        <>
          <p className="text-sm">
            Your browser sends a Global Privacy Control or Do Not Track signal, so this site records
            nothing about your visit. {policyLink}
          </p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm">
            May this site record your visit? That means the pages you view, your IP address,
            approximate location, and device type, sent only to me. {policyLink}
          </p>
          {consent !== "unset" && (
            <p className="mt-2 text-muted-foreground text-sm">
              Currently {consent === "granted" ? "on" : "off"}.
            </p>
          )}
          <div className="mt-3 flex gap-2">
            <Button size="sm" onClick={() => onChoose("granted")}>
              Allow
            </Button>
            <Button size="sm" variant="outline" onClick={() => onChoose("denied")}>
              No thanks
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
