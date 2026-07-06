// app/components/SpotifyNowPlayingBar.tsx
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDesktopScale, useIsDesktopRange } from "../lib/desktopScale";
import SpotifyNowPlaying from "./SpotifyNowPlaying";

// Portaled straight to document.body — same reasoning as Navbar/CustomCursor
// (see MainPage.tsx's comment block on why those live outside DesktopCanvas):
// AboutSection sits inside DesktopCanvas's `transform: scale(...)` 1920px-
// canvas lock on desktop. getBoundingClientRect() always reports final,
// post-scale real pixels, but writing one of those values back into a CSS
// `top` on an element that's ITSELF still inside that same transform gets
// re-multiplied by the scale again on paint — a first attempt at this
// (measuring and positioning entirely inside AboutSection) hit exactly that
// bug and stayed visibly off-center on desktop no matter which element it
// measured against. Rendering outside the transform entirely sidesteps it:
// no scale math needed at all, since nothing here is ever re-scaled.
export default function SpotifyNowPlayingBar() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const isDesktopRange = useIsDesktopRange();
  const scale = useDesktopScale();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Centers the card in the real, measured gap between the fixed header's
  // bottom edge and the About section's own visible content (the
  // "01. Introduction & Background" flag — not the section's outer box,
  // which sits flush against the header with ~zero gap; the visible empty
  // space is the section's own internal top padding). Absolute + document-
  // relative coordinates (rect + window.scrollY) so it scrolls away with
  // the page like normal content instead of staying pinned to the
  // viewport.
  //
  // Deliberately pure symmetric centering — no separate fixed-pixel margin
  // added on top of it. An earlier version subtracted a fixed 32px from
  // both ends before centering, which guaranteed the TOP margin but not the
  // bottom one: on a mobile gap too short to fit the card plus 2×32px, the
  // top margin ate into what should've been bottom margin, and the card
  // visually overlapped the "01. Introduction" text. `(gap - height) / 2`
  // applied to both sides by construction is always exactly equal on both
  // sides and never overlaps as long as the card actually fits in the gap.
  useLayoutEffect(() => {
    if (!mounted) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const recalculate = () => {
      const navbar = document.getElementById("navbarWrapper");
      const introFlag = document.getElementById("about-intro-flag");
      if (!navbar || !introFlag) return;

      const navbarBottom =
        navbar.getBoundingClientRect().bottom + window.scrollY;
      const introFlagTop =
        introFlag.getBoundingClientRect().top + window.scrollY;
      const gap = introFlagTop - navbarBottom;

      // wrapper.offsetHeight is the card's UNSCALED layout height (transform
      // never affects offsetHeight) — but on desktop the inner card is
      // visually scaled up/down via the 1920-canvas lock below, so the
      // actual on-screen height used for centering has to account for that
      // too, or the two gaps drift apart again exactly like the bug this
      // was already fixed for once.
      const visualHeight = wrapper.offsetHeight * (isDesktopRange ? scale : 1);
      // +5px on mobile only, added on top of (not instead of) the symmetric
      // centering above — a small deliberate nudge down, leaving the
      // bottom-side math completely untouched as asked.
      const mobileTopNudge = isDesktopRange ? 0 : 5;
      const centeredTop =
        navbarBottom + Math.max(0, (gap - visualHeight) / 2) + mobileTopNudge;
      wrapper.style.top = `${centeredTop}px`;
    };

    recalculate();

    // Only re-run on a genuine WIDTH change (real resize, orientation
    // flip, breakpoint crossing) — NOT height. Mobile browsers resize the
    // visual viewport's HEIGHT continuously as the address bar collapses/
    // expands while you scroll (and that also changes AboutSection's own
    // `min-h-[90vh]`-driven layout slack on mobile), which fired this on
    // every scroll tick and produced exactly the "jumps down as you
    // scroll" bug reported — even debounced, it kept converging on a
    // genuinely different position each time because the underlying
    // measurement had actually changed. Width never changes from that, so
    // filtering it out removes the false trigger at the source instead of
    // just slowing it down.
    let lastWidth = window.innerWidth;
    let debounceTimeout: number;
    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      window.clearTimeout(debounceTimeout);
      debounceTimeout = window.setTimeout(recalculate, 150);
    };

    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(debounceTimeout);
      debounceTimeout = window.setTimeout(recalculate, 150);
    });
    resizeObserver.observe(wrapper);
    window.addEventListener("resize", handleResize);

    return () => {
      window.clearTimeout(debounceTimeout);
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted, isDesktopRange, scale]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={wrapperRef}
      // px-4 sm:px-6 md:px-8 deliberately mirrors <main>'s own horizontal
      // padding in MainPage.tsx exactly, not a flat px-6 — this wrapper is
      // portaled to document.body, outside <main>, so it doesn't inherit
      // that padding automatically. A flat px-6 (24px) vs <main>'s actual
      // px-4 (16px) at the smallest mobile breakpoint was the 8px mismatch
      // that read as "not quite flush left" against the About content below.
      className="absolute left-0 right-0 z-30 flex justify-center px-4 sm:px-6 md:px-8 pointer-events-none"
    >
      {/* Locks the card's rendered size to the 1920px canvas on desktop,
          same technique Navbar/CustomCursor use — scale grows/shrinks
          around the top-center point, so the top edge (what `top` above
          anchors) never moves; only the bottom edge does, which is exactly
          what the visualHeight math above accounts for. Untouched below
          1024px (isDesktopRange false), matching every other Sticky Zoom
          component's mobile behavior. */}
      <div
        className="pointer-events-auto"
        style={
          isDesktopRange
            ? { transform: `scale(${scale})`, transformOrigin: "top center" }
            : undefined
        }
      >
        <SpotifyNowPlaying />
      </div>
    </div>,
    document.body,
  );
}
