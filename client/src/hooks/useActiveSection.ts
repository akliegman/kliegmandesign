import { useEffect, useState } from "react";

/**
 * The id of the section being read: the last heading whose top has scrolled above the upper third
 * of the viewport. It is measured from scroll position on each animation frame, so it stays correct
 * after large jumps (an IntersectionObserver band misses headings that skip over it).
 */
export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const threshold = window.innerHeight * 0.33;
      let current = ids[0];
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= threshold) current = id;
      }
      // At the very bottom, short final sections can never reach the upper third; show the last one
      // whose heading is on screen.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        for (const id of ids) {
          const top = document.getElementById(id)?.getBoundingClientRect().top;
          if (top !== undefined && top < window.innerHeight) current = id;
        }
      }
      setActiveId(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [ids]);

  return activeId;
}
