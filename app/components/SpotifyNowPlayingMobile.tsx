// app/components/SpotifyNowPlayingMobile.tsx
"use client";

import { useState } from "react";
import { useIsDesktopRange } from "../lib/desktopScale";
import SpotifyNowPlaying from "./SpotifyNowPlaying";

// Mobile/tablet only (<1024px) — desktop keeps SpotifyNowPlayingBar's
// portaled, precisely-measured-and-centered approach untouched; that's a
// deliberately different mechanism than this one, not a shared component.
//
// This is a real in-flow block instead of a floating overlay measured
// against a fixed gap — simpler, and sidesteps every edge case that came
// from trying to fit precisely into the existing header-to-content space.
// It smoothly grows/shrinks via CSS grid-template-rows 0fr/1fr (the
// standard trick for animating to/from an unknown "auto" height, since
// neither GSAP nor plain CSS can transition a height you don't know ahead
// of time — the actual card height varies with album art/text). Its own
// vertical margin (py-6 below) only exists while expanded: collapsed, the
// whole block is exactly 0px tall and contributes nothing, so hiding it
// returns the page to its regular header-to-About spacing untouched.
export default function SpotifyNowPlayingMobile() {
  const isDesktopRange = useIsDesktopRange();
  const [expanded, setExpanded] = useState(false);

  if (isDesktopRange) return null;

  return (
    <div
      // -mb-20 sm:-mb-28 md:-mb-36 (only while expanded) exactly cancels
      // AboutSection's own py-20 sm:py-28 md:py-36 top padding, which is
      // otherwise still there below this and stacks with this wrapper's own
      // py-6 — that stacking is what made the gap below the card roughly
      // 4x the gap above it. Canceling it means the ONLY visible space
      // below the card is this wrapper's own py-6, matching the top
      // exactly. Transitioned alongside the height so the collapse/expand
      // reads as one smooth motion instead of the margin snapping.
      className={`grid transition-[grid-template-rows,margin-bottom] duration-500 ease-in-out ${
        expanded ? "-mb-20 sm:-mb-28 md:-mb-36" : ""
      }`}
      style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
    >
      <div className="overflow-hidden min-h-0">
        <div className="flex justify-center py-6 px-4">
          <SpotifyNowPlaying onVisibleChange={setExpanded} />
        </div>
      </div>
    </div>
  );
}
