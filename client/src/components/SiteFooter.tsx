import { Link } from "react-router";

import { profile } from "@/content/profile";
import { useMotionPaused } from "@/lib/motion";

export interface SiteFooterProps {
  /** Reopens the analytics choice; rendered as a button because it is an action, not a page. */
  onAnalyticsSettings: () => void;
}

const linkClass =
  "rounded-sm underline-offset-4 transition-colors hover:text-foreground hover:underline";

export function SiteFooter({ onAnalyticsSettings }: SiteFooterProps) {
  const [paused, setPaused] = useMotionPaused();

  return (
    <footer className="mt-32 border-t">
      <div className="container-page flex flex-col gap-6 py-10 text-muted-foreground text-sm md:flex-row md:items-center md:justify-between">
        <div className="flex max-w-[48ch] flex-col gap-2">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p>
            This site records visits, including pages viewed, IP address, and approximate location.{" "}
            <Link
              className="underline underline-offset-4 hover:text-foreground"
              to="/privacy-policy"
              viewTransition
            >
              How and why
            </Link>
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <a className={linkClass} href={`mailto:${profile.email}`}>
                Email
              </a>
            </li>
            <li>
              <a className={linkClass} href={profile.links.linkedIn}>
                LinkedIn
              </a>
            </li>
            <li>
              <a className={linkClass} href={profile.links.gitHub}>
                GitHub
              </a>
            </li>
            <li>
              <Link className={linkClass} to="/terms-of-use" viewTransition>
                Terms
              </Link>
            </li>
            <li>
              <Link className={linkClass} to="/privacy-policy" viewTransition>
                Privacy
              </Link>
            </li>
            <li>
              <button
                type="button"
                aria-pressed={paused}
                className={linkClass}
                onClick={() => setPaused(!paused)}
              >
                Pause animations
              </button>
            </li>
            <li>
              <button type="button" className={linkClass} onClick={onAnalyticsSettings}>
                Analytics choice
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
