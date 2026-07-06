// app/components/SpotifyNowPlaying.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

interface NowPlayingData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
  url?: string;
}

// Near-instant without hammering Spotify's API — there's no push/webhook
// for "currently playing," so this is genuinely a poll, just a fast one.
// Backs off while the tab is hidden since nobody's watching it update then.
const POLL_INTERVAL_MS = 8000;
const HIDDEN_POLL_INTERVAL_MS = 25000;

const OFFLINE: NowPlayingData = { isPlaying: false };

// Lives permanently in the new personal-telemetry section — unlike the
// earlier floating-widget version (removed), this never unmounts. It just
// cross-fades between an "offline" and "now playing" state, which is a
// simpler problem than the old mount/unmount/exit-tween dance and sidesteps
// that whole class of bug entirely.
export default function SpotifyNowPlaying() {
  // What's actually rendered, deliberately decoupled from the raw polled
  // state so a track starting/stopping/changing can cross-fade cleanly
  // instead of jump-cutting the instant new data arrives.
  const [displayData, setDisplayData] = useState<NowPlayingData>(OFFLINE);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const rawDataRef = useRef<NowPlayingData>(OFFLINE);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: number;

    const applyUpdate = (next: NowPlayingData) => {
      const prev = rawDataRef.current;
      rawDataRef.current = next;

      // First paint: show whatever state it actually starts in, no
      // transition — there's nothing to cross-fade FROM yet.
      if (!hasLoadedRef.current) {
        hasLoadedRef.current = true;
        setDisplayData(next);
        return;
      }

      const stateChanged = Boolean(prev.isPlaying) !== Boolean(next.isPlaying);
      const trackChanged =
        next.isPlaying &&
        prev.isPlaying &&
        (prev.title !== next.title || prev.artist !== next.artist);

      if (!stateChanged && !trackChanged) {
        // Nothing visibly different (still offline, or same track) — just
        // sync silently, no reason to animate.
        setDisplayData(next);
        return;
      }

      if (!contentRef.current) {
        setDisplayData(next);
        return;
      }

      gsap
        .timeline()
        .to(contentRef.current, {
          opacity: 0,
          y: -4,
          duration: 0.2,
          ease: "power2.in",
        })
        .call(() => setDisplayData(next))
        .to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        });
    };

    const poll = async () => {
      try {
        const res = await fetch("/api/now-playing", { cache: "no-store" });
        const next: NowPlayingData = await res.json();
        if (!cancelled) applyUpdate(next);
      } catch {
        if (!cancelled) applyUpdate(OFFLINE);
      }
      if (!cancelled) {
        timeoutId = window.setTimeout(
          poll,
          document.hidden ? HIDDEN_POLL_INTERVAL_MS : POLL_INTERVAL_MS,
        );
      }
    };

    poll();
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  // Marquee only kicks in when the track/artist text actually doesn't fit —
  // scrollWidth vs the bounded container's clientWidth is the real measure
  // of that, not a guessed character count. No need to explicitly reset
  // isOverflowing when offline: textContainerRef/textRef only exist in the
  // JSX's "playing" branch, so they're already null then and the guard
  // below already no-ops — and a stale `true` left over while offline is
  // harmless since that state isn't read anywhere in the offline branch.
  useEffect(() => {
    const container = textContainerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const checkOverflow = () => {
      setIsOverflowing(text.scrollWidth > container.clientWidth);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [displayData.isPlaying, displayData.title, displayData.artist]);

  return (
    <a
      href={displayData.url ?? "https://open.spotify.com"}
      target="_blank"
      rel="noopener noreferrer"
      className="group/spotify flex items-center w-full h-full min-h-[128px] sm:min-h-[140px] rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)]/90 backdrop-blur-md px-4 sm:px-5 py-3 sm:py-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-[var(--highlight)]/60 hover:bg-[var(--hover-glow)] transition-colors duration-300"
    >
      <div ref={contentRef} className="flex items-center gap-3 sm:gap-4 w-full">
        {displayData.isPlaying ? (
          <>
            {displayData.albumArt && (
              <Image
                src={displayData.albumArt}
                alt=""
                width={40}
                height={40}
                className="rounded-lg border border-[var(--border-color)] shrink-0"
              />
            )}
            <div className="flex flex-col min-w-0 flex-1">
              <span className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--highlight)]">
                {/* Pure CSS loop (see .eq-bar in globals.css) instead of a
                    GSAP tween — it can't get orphaned/stuck across remounts
                    the way a JS-driven infinite tween keyed to a stale
                    effect can. */}
                <span className="flex items-end gap-[2px] h-2.5 shrink-0">
                  <span className="eq-bar w-[2px] h-full rounded-full bg-[var(--highlight)] [animation-delay:0ms]" />
                  <span className="eq-bar w-[2px] h-full rounded-full bg-[var(--highlight)] [animation-delay:150ms]" />
                  <span className="eq-bar w-[2px] h-full rounded-full bg-[var(--highlight)] [animation-delay:300ms]" />
                </span>
                Mo is currently on Spotify
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
                </svg>
              </span>
              {/* Bounded container the overflow check measures against;
                  mask fades the edges so the marquee copy doesn't
                  hard-clip mid-loop. */}
              <div
                ref={textContainerRef}
                className="overflow-hidden"
                style={
                  isOverflowing
                    ? {
                        WebkitMaskImage:
                          "linear-gradient(to right, transparent, black 12px, black calc(100% - 12px), transparent)",
                        maskImage:
                          "linear-gradient(to right, transparent, black 12px, black calc(100% - 12px), transparent)",
                      }
                    : undefined
                }
              >
                <div
                  className={
                    isOverflowing
                      ? "flex w-max gap-16 animate-[spotifyMarquee_9s_linear_infinite]"
                      : "truncate"
                  }
                >
                  <span
                    ref={textRef}
                    className="inline-block whitespace-nowrap font-mono text-xs sm:text-sm text-[var(--text-contrast)] group-hover/spotify:text-[var(--highlight)] transition-colors duration-300"
                  >
                    {displayData.title}
                    <span className="opacity-50"> · </span>
                    {displayData.artist}
                  </span>
                  {isOverflowing && (
                    <span
                      aria-hidden="true"
                      className="whitespace-nowrap font-mono text-xs sm:text-sm text-[var(--text-contrast)] group-hover/spotify:text-[var(--highlight)] transition-colors duration-300"
                    >
                      {displayData.title}
                      <span className="opacity-50"> · </span>
                      {displayData.artist}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-lg border border-[var(--border-color)] bg-[var(--bg)]/40 flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-[var(--text)] opacity-30"
                aria-hidden="true"
              >
                <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--text)] opacity-50">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--text)] opacity-40 shrink-0" />
                Mo is offline on Spotify
              </span>
              <span className="font-mono text-xs sm:text-sm text-[var(--text)] opacity-35">
                Not listening right now
              </span>
            </div>
          </>
        )}
      </div>
    </a>
  );
}
