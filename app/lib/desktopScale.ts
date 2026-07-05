// app/lib/desktopScale.ts
import { useEffect, useState } from "react";

// The fixed "design canvas" width the desktop layout is locked to — see
// DesktopCanvas.tsx. Everything above DESKTOP_BREAKPOINT renders as if the
// viewport were exactly this wide, then gets uniformly transform-scaled to
// fit the real window/zoom level.
export const DESKTOP_CANVAS_WIDTH = 1920;

// Matches Tailwind's own `lg:` breakpoint so there's no off-by-one mismatch
// with the rest of the codebase's responsive classes.
export const DESKTOP_BREAKPOINT = 1024;

// Read by AboutSection/ContactSection's mouse-tracking handlers to cancel
// out the ancestor scale before feeding a delta into a GSAP transform (see
// DesktopCanvas.tsx for why this is only needed for GSAP-driven transforms,
// not for the --mouse-x/--mouse-y CSS custom properties those same handlers
// also set). Plain module-level state, not React state for that use case:
// those consumers only ever read it inside an event handler, never during
// render.
let currentScale = 1;
const listeners = new Set<(scale: number) => void>();

export function getDesktopScale(): number {
  return currentScale;
}

export function setDesktopScale(value: number): void {
  currentScale = value;
  listeners.forEach((listener) => listener(value));
}

// For consumers that DO need to re-render on scale changes (AppBackground's
// margin-column sizing) rather than just reading it inside an event handler.
export function useDesktopScale(): number {
  const [scale, setScale] = useState(currentScale);
  useEffect(() => {
    setScale(currentScale);
    listeners.add(setScale);
    return () => {
      listeners.delete(setScale);
    };
  }, []);
  return scale;
}

// Same matchMedia-after-mount pattern DesktopCanvas.tsx uses internally,
// shared here for the elements that live OUTSIDE DesktopCanvas but still
// need to know when they've crossed into desktop range — Navbar and the
// scroll-to-top button, which must stay real `position: fixed/sticky`
// against the true viewport (so they can't be nested inside DesktopCanvas's
// transformed wrapper) while still visually locking their own size to the
// 1920px canvas via useDesktopScale(). Defaults to false so SSR/first paint
// matches, same hydration-safe reasoning as DesktopCanvas.
export function useIsDesktopRange(): boolean {
  const [isDesktopRange, setIsDesktopRange] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    setIsDesktopRange(mql.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDesktopRange(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isDesktopRange;
}
