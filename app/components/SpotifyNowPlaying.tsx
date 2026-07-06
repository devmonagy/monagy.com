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

interface SpotifyNowPlayingProps {
  // Lets a wrapper (SpotifyNowPlayingMobile) track this component's own
  // mount/unmount timing without duplicating the isPlaying/exit-tween logic
  // above — desktop's SpotifyNowPlayingBar doesn't pass this, so nothing
  // changes for it.
  onVisibleChange?: (visible: boolean) => void;
}

export default function SpotifyNowPlaying({
  onVisibleChange,
}: SpotifyNowPlayingProps = {}) {
  const [data, setData] = useState<NowPlayingData | null>(null);
  // Whether the card is in the DOM at all — the ONLY thing the render
  // below gates on. Turning on is immediate; turning off plays an exit
  // tween first and only unmounts (via onComplete) when it finishes.
  // Render must never also check data.isPlaying directly: that flips in
  // the same tick as this, and gating on both unmounts the card (and nulls
  // its ref) before the exit tween below ever gets a live node to animate.
  const [visible, setVisible] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: number;

    const poll = async () => {
      try {
        const res = await fetch("/api/now-playing", { cache: "no-store" });
        const next: NowPlayingData = await res.json();
        if (!cancelled) setData(next);
      } catch {
        if (!cancelled) setData({ isPlaying: false });
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

  useEffect(() => {
    const isPlaying = Boolean(data?.isPlaying);

    if (isPlaying) {
      setVisible(true);
      return;
    }

    if (visible && cardRef.current) {
      // A quick "signal lost" flicker before the collapse — reads more like
      // this HUD losing a feed than a plain fade-out.
      gsap
        .timeline({ onComplete: () => setVisible(false) })
        .to(cardRef.current, { opacity: 0.25, duration: 0.06 })
        .to(cardRef.current, { opacity: 1, duration: 0.06 })
        .to(cardRef.current, { opacity: 0.15, duration: 0.05 })
        .to(cardRef.current, { opacity: 1, duration: 0.05 })
        .to(cardRef.current, {
          opacity: 0,
          scale: 0.85,
          y: -14,
          filter: "blur(8px)",
          duration: 0.35,
          ease: "power2.in",
        });
    }
    // visible is intentionally excluded — this should only re-run when the
    // playing state itself changes, not when the exit tween flips it off.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.isPlaying]);

  useEffect(() => {
    onVisibleChange?.(visible);
  }, [visible, onVisibleChange]);

  useEffect(() => {
    if (!visible || !cardRef.current) return;

    const tween = gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.8, y: -18, filter: "blur(10px)" },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.65,
        ease: "back.out(1.7)",
      },
    );

    return () => {
      tween.kill();
    };
  }, [visible]);

  // Marquee only kicks in when the track/artist text actually doesn't fit —
  // scrollWidth vs the bounded container's clientWidth is the real measure
  // of that, not a guessed character count (font, album-art presence, and
  // card width all affect how many characters actually fit). Re-checks on
  // every track change (new title/artist = new width) and on resize (the
  // container's own available width can change at any breakpoint).
  //
  // `visible` has to be a dependency here too, not just title/artist: data
  // (and therefore title/artist) is set BEFORE visible flips true — the
  // card, and these refs, don't exist in the DOM until visible does. Without
  // `visible` in the deps, this effect fires once while the refs are still
  // null (card not mounted yet) and never fires again once it actually
  // mounts, since title/artist haven't changed at that point — it was
  // silently never measuring anything.
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
  }, [data?.title, data?.artist, visible]);

  if (!visible) return null;

  return (
    <a
      ref={cardRef}
      href={data?.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/spotify flex items-center gap-3 sm:gap-4 max-w-[88vw] sm:max-w-md rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)]/90 backdrop-blur-md px-4 sm:px-5 py-2.5 sm:py-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-[var(--highlight)] hover:bg-[var(--hover-glow)] transition-colors duration-300"
    >
      {data?.albumArt && (
        <Image
          src={data.albumArt}
          alt=""
          width={40}
          height={40}
          className="rounded-lg border border-[var(--border-color)] shrink-0"
        />
      )}

      <div className="flex flex-col min-w-0">
        <span className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--highlight)]">
          {/* Pure CSS loop (see .eq-bar in globals.css) instead of a GSAP
              tween — it can't get orphaned/stuck across remounts the way a
              JS-driven infinite tween keyed to a stale effect can. */}
          <span className="flex items-end gap-[2px] h-2.5 shrink-0">
            <span className="eq-bar w-[2px] h-full rounded-full bg-[var(--highlight)] [animation-delay:0ms]" />
            <span className="eq-bar w-[2px] h-full rounded-full bg-[var(--highlight)] [animation-delay:150ms]" />
            <span className="eq-bar w-[2px] h-full rounded-full bg-[var(--highlight)] [animation-delay:300ms]" />
          </span>
          Mo is currently listening to
        </span>
        {/* Bounded container the overflow check measures against; mask
            fades the edges so the marquee copy doesn't hard-clip mid-loop. */}
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
              // inline-block, not just whitespace-nowrap: a plain <span> is
              // display:inline, and inline elements always report 0 for
              // scrollWidth/clientWidth regardless of their actual content
              // width — a DOM spec quirk, not a Tailwind issue — which made
              // the overflow check below compare "0 > containerWidth" and
              // always come back false. inline-block gets real measurements
              // while still sizing to content instead of going full-width.
              className="inline-block whitespace-nowrap font-mono text-xs sm:text-sm text-[var(--text-contrast)] group-hover/spotify:text-[var(--highlight)] transition-colors duration-300"
            >
              {data?.title}
              <span className="opacity-50"> · </span>
              {data?.artist}
            </span>
            {/* Second copy only rendered once overflowing — translateX runs
                0 to -50% across the two, so the loop point is invisible
                (same technique as AboutSection's marquee-left/right-loop
                ghost typography). aria-hidden since it's a visual duplicate
                of the same text, not new content for a screen reader. */}
            {isOverflowing && (
              <span
                aria-hidden="true"
                className="whitespace-nowrap font-mono text-xs sm:text-sm text-[var(--text-contrast)] group-hover/spotify:text-[var(--highlight)] transition-colors duration-300"
              >
                {data?.title}
                <span className="opacity-50"> · </span>
                {data?.artist}
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}
