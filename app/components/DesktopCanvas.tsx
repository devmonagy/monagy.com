// app/components/DesktopCanvas.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import {
  DESKTOP_BREAKPOINT,
  DESKTOP_CANVAS_WIDTH,
  setDesktopScale,
} from "../lib/desktopScale";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Locks everything above DESKTOP_BREAKPOINT to how it renders at exactly
// DESKTOP_CANVAS_WIDTH (1920px) — children are laid out as if the viewport
// were always 1920px wide, then the whole result is transform-scaled to fit
// the real window/zoom level, so the desktop layout reads as one uniform
// "poster" regardless of window size or browser zoom. Below the breakpoint,
// children render completely unwrapped: today's normal responsive mobile
// behavior, untouched.
//
// Renders unwrapped during SSR/first paint too (isDesktopRange defaults to
// false), matching what the server produces — the real state is applied via
// matchMedia only after mount, the same "measure after mount" pattern
// Navbar.tsx already uses for its portal-gated mobile dock. Avoids a
// hydration mismatch without needing a blocking script.
export default function DesktopCanvas({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDesktopRange, setIsDesktopRange] = useState(false);
  const [scale, setScale] = useState(1);
  const [naturalHeight, setNaturalHeight] = useState(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const resizeRafRef = useRef<number | null>(null);
  const observerRafRef = useRef<number | null>(null);
  const lastHeightRef = useRef(0);
  const lenis = useLenis();

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    setIsDesktopRange(mql.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDesktopRange(e.matches);
      if (!e.matches) setDesktopScale(1);
    };

    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  // Continuous scale recompute while in desktop range. Cheap — no DOM
  // measurement needed since 1920 is constant — but rAF-coalesced against a
  // live drag-resize (or a burst of zoom-change events) firing many times
  // per second. Listens on visualViewport too, not just window: browser
  // page-zoom reliably fires `resize` in most cases, but visualViewport's
  // own resize event is the more specific, purpose-built signal for
  // zoom/viewport changes and catches edge cases where `resize` alone
  // wouldn't have fired yet.
  useEffect(() => {
    if (!isDesktopRange) return;

    const updateScale = () => {
      const next = window.innerWidth / DESKTOP_CANVAS_WIDTH;
      setScale(next);
      setDesktopScale(next);
    };

    updateScale();

    const onResize = () => {
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
      resizeRafRef.current = requestAnimationFrame(updateScale);
    };

    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
    };
  }, [isDesktopRange]);

  // Natural (unscaled) content height, measured on the INNER 1920px-wide
  // content only — never the outer wrapper, whose own height is *derived*
  // from this value, which would otherwise create a feedback loop. rAF
  // coalesced, and skips updates under a 1px delta to avoid ResizeObserver
  // thrashing on sub-pixel layout jitter.
  useEffect(() => {
    if (!isDesktopRange) return;
    const el = innerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      if (observerRafRef.current) cancelAnimationFrame(observerRafRef.current);
      observerRafRef.current = requestAnimationFrame(() => {
        const height = entries[0]?.contentRect.height ?? el.scrollHeight;
        if (Math.abs(height - lastHeightRef.current) < 1) return;
        lastHeightRef.current = height;
        setNaturalHeight(height);
      });
    });

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (observerRafRef.current) cancelAnimationFrame(observerRafRef.current);
    };
  }, [isDesktopRange]);

  // Runs *after* React has committed scale/naturalHeight to the DOM (unlike
  // the ad-hoc rAF calls this replaced, which could race React's own render
  // and hand Lenis a stale height) — Lenis caches its own virtual scroll
  // bounds, which go stale the instant the page's real height changes (the
  // height-compensation above does exactly that on every resize), so
  // skipping lenis.resize() before ScrollTrigger.refresh() — or calling it
  // against a not-yet-updated DOM — is what produced growing empty gaps
  // between sections at extreme zoom levels: Lenis's internal scroll range
  // stayed out of sync with what was actually rendered.
  useEffect(() => {
    if (!isDesktopRange) return;
    lenis?.resize();
    ScrollTrigger.refresh();
  }, [isDesktopRange, scale, naturalHeight, lenis]);

  if (!isDesktopRange) {
    return <>{children}</>;
  }

  return (
    <div style={{ position: "relative", height: naturalHeight * scale }}>
      <div
        ref={innerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: DESKTOP_CANVAS_WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
