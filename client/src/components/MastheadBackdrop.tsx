/**
 * The home masthead's background: a dot grid under two soft glows that drift on slow loops. The
 * site-wide pause in the footer stops them (WCAG 2.2.2), and under reduced motion they hold still.
 */
export function MastheadBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="glow-primary absolute -top-1/2 -right-[15%] aspect-square w-[min(56rem,120vw)] animate-[drift-a_24s_ease-in-out_infinite]" />
      <div className="glow-neutral absolute top-1/4 right-1/4 aspect-square w-[min(40rem,90vw)] animate-[drift-b_32s_ease-in-out_infinite]" />
      <div className="absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_70%_90%_at_75%_0%,black,transparent_75%)]" />
    </div>
  );
}
