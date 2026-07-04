// app/components/AppBackground.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Persistent ambient backdrop mounted once at the app root: two clipped
// margin columns outside the max-w-7xl content column (the empty space
// either side of the body on wide screens), plus a full-bleed film-grain
// overlay. Each margin column has its own `overflow-hidden`, so the
// glow/rain is physically clipped at the column edge — not just faded by
// opacity — guaranteeing it can never bleed across the body copy. Column
// width scales with the actual available gutter via calc(), so it fills
// more of the space on ultra-wide monitors instead of a fixed thin strip.
// See [[feedback_stacking_context_bg]]: -z-10 here only paints correctly
// because MainPage.tsx's root wrapper has `isolate`.
//
// Grain is deliberately its OWN top-level layer at a high z-index rather
// than living inside the -z-10 background: sections like the footer set an
// explicit opaque `bg-[var(--bg)]`, and as normal in-flow content they paint
// OVER a -z-10 layer, silently blocking grain from ever showing through —
// that mismatch (grainy gaps vs. flat opaque sections) is what read as a
// "patchy footer". Sitting on top instead guarantees uniform grain
// everywhere, including over the footer and cards.
const GRAIN_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220">' +
  '<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>' +
  '<feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.45 0"/></filter>' +
  '<rect width="100%" height="100%" filter="url(#n)"/></svg>';
const GRAIN_BG = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

// Deterministic (no Math.random at render time, so server/client markup
// matches) rain columns confined inside the clipped margin column.
const RAIN_TOKENS = ["01", "10", "11", "00", "SYS", "//", "0x2A", "_N", "M_", "ENGINE"];
const RAIN_LINES = 60;

function buildRainColumn(seed: number) {
  const lines: string[] = [];
  for (let j = 0; j < RAIN_LINES; j++) {
    lines.push(RAIN_TOKENS[(seed * 13 + j * 7) % RAIN_TOKENS.length]);
  }
  const block = lines.join("\n");
  return `${block}\n${block}`;
}

// Column width as a fraction of the real gutter: (100vw - 1280px) is the
// full gutter on both sides combined; half of that is one side's gutter,
// and this claims 80% of one side's gutter, leaving a 20% buffer before the
// centered content column no matter how wide the viewport gets. Because
// this is continuous (not a breakpoint jump), it scales from ~0 right at
// 1280px (max-w-7xl's own width, first pixel of real gutter) up through a
// full ambient zone at ultra-wide sizes — so 1366x768 gets a thin sliver
// instead of nothing, and a 2560px monitor gets a lot more presence.
const MARGIN_COLUMN_WIDTH = "calc((100vw - 1280px) * 0.4)";

export default function AppBackground() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      // Slow breathing on the margin glow washes — transform/opacity only.
      gsap.to(".margin-wash", {
        opacity: 0.28,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 1.5, from: "random" },
      });

      // Data-packet pulses traveling the full viewport height of each rail.
      // The rail's own mask-image (see JSX) fades them in/out at the top and
      // bottom edges, so no separate opacity keyframing is needed.
      gsap.utils.toArray<HTMLElement>(".rail-pulse").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: "-8vh" },
          { y: "108vh", duration: 8, repeat: -1, ease: "none", delay: i * 3 },
        );
      });
    },
    { scope: scopeRef },
  );

  const rainLeft = [buildRainColumn(1), buildRainColumn(2), buildRainColumn(5)];
  const rainRight = [buildRainColumn(3), buildRainColumn(4), buildRainColumn(6)];

  return (
    <div ref={scopeRef} aria-hidden="true">
      <div className="fixed inset-0 -z-10 pointer-events-none select-none">
        {/* LEFT MARGIN COLUMN — width scales with the real gutter via
            calc(), overflow-hidden physically clips everything at that
            boundary so it can never reach the centered content column */}
        <div
          className="hidden xl:block absolute left-0 top-0 bottom-0 overflow-hidden"
          style={{ width: MARGIN_COLUMN_WIDTH }}
        >
          {/* Smooth gradient wash — no blurred circles, just a soft fade off
              the true viewport edge, scales with the column so it reads as a
              wide atmospheric zone instead of a thin stuck-on stripe */}
          <div className="margin-wash absolute inset-0 opacity-[0.22] bg-gradient-to-r from-[var(--highlight)] via-[var(--highlight)]/30 to-transparent" />

          {/* Ambient conic glow ring — same signature as the preloader/navbar
              badge */}
          <div
            className="absolute left-6 top-[20%] w-14 h-14 rounded-full opacity-40 blur-md animate-[rotateGlow_8s_linear_infinite]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, var(--highlight) 18%, transparent 40%)",
            }}
          />

          {/* Rain glyphs spread across the column's width, not just its
              outer edge, so the effect fills the zone rather than hugging it */}
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
              maskImage:
                "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
            }}
          >
            <div
              className="absolute top-0 left-3 whitespace-pre text-center font-mono text-[10px] leading-[1.8] text-[var(--highlight)] opacity-[0.24] motion-reduce:animate-none animate-[railFall_linear_infinite]"
              style={{ animationDuration: "17s" }}
            >
              {rainLeft[0]}
            </div>
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-pre text-center font-mono text-[10px] leading-[1.8] text-[var(--highlight)] opacity-[0.18] motion-reduce:animate-none animate-[railFall_linear_infinite]"
              style={{ animationDuration: "20s", animationDelay: "-9s" }}
            >
              {rainLeft[1]}
            </div>
            <div
              className="absolute top-0 right-3 whitespace-pre text-center font-mono text-[10px] leading-[1.8] text-[var(--highlight)] opacity-[0.14] motion-reduce:animate-none animate-[railFall_linear_infinite]"
              style={{ animationDuration: "24s", animationDelay: "-4s" }}
            >
              {rainLeft[2]}
            </div>
          </div>

          {/* Vertical data rail: line, tick marks, traveling pulses, HUD label */}
          <div
            className="absolute inset-y-0 left-8 w-px"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
              maskImage:
                "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
            }}
          >
            <div className="absolute inset-0 bg-[var(--highlight)] opacity-30" />
            <div
              className="absolute inset-y-0 left-1.5 w-px opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, var(--highlight) 0px, var(--highlight) 1px, transparent 1px, transparent 40px)",
              }}
            />
            <span className="rail-pulse absolute left-0 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--highlight)] shadow-[0_0_10px_2px_var(--highlight)]" />
            <span className="rail-pulse absolute left-0 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--highlight)] shadow-[0_0_10px_2px_var(--highlight)]" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-90deg] whitespace-nowrap font-mono text-[9px] tracking-[0.4em] text-[var(--highlight)] opacity-[0.3]">
              SYS_ENGINE // AMBIENT_RENDER_ACTIVE
            </span>
          </div>
        </div>

        {/* RIGHT MARGIN COLUMN — mirrored */}
        <div
          className="hidden xl:block absolute right-0 top-0 bottom-0 overflow-hidden"
          style={{ width: MARGIN_COLUMN_WIDTH }}
        >
          <div className="margin-wash absolute inset-0 opacity-[0.22] bg-gradient-to-l from-[var(--highlight)] via-[var(--highlight)]/30 to-transparent" />

          <div
            className="absolute right-6 top-[65%] w-14 h-14 rounded-full opacity-40 blur-md animate-[rotateGlow_8s_linear_infinite]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, var(--highlight) 18%, transparent 40%)",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
              maskImage:
                "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
            }}
          >
            <div
              className="absolute top-0 right-3 whitespace-pre text-center font-mono text-[10px] leading-[1.8] text-[var(--highlight)] opacity-[0.24] motion-reduce:animate-none animate-[railFall_linear_infinite]"
              style={{ animationDuration: "19s", animationDelay: "-3s" }}
            >
              {rainRight[0]}
            </div>
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 whitespace-pre text-center font-mono text-[10px] leading-[1.8] text-[var(--highlight)] opacity-[0.18] motion-reduce:animate-none animate-[railFall_linear_infinite]"
              style={{ animationDuration: "21s" }}
            >
              {rainRight[1]}
            </div>
            <div
              className="absolute top-0 left-3 whitespace-pre text-center font-mono text-[10px] leading-[1.8] text-[var(--highlight)] opacity-[0.14] motion-reduce:animate-none animate-[railFall_linear_infinite]"
              style={{ animationDuration: "25s", animationDelay: "-11s" }}
            >
              {rainRight[2]}
            </div>
          </div>

          <div
            className="absolute inset-y-0 right-8 w-px"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
              maskImage:
                "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
            }}
          >
            <div className="absolute inset-0 bg-[var(--highlight)] opacity-30" />
            <div
              className="absolute inset-y-0 right-1.5 w-px opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, var(--highlight) 0px, var(--highlight) 1px, transparent 1px, transparent 40px)",
              }}
            />
            <span className="rail-pulse absolute right-0 translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--highlight)] shadow-[0_0_10px_2px_var(--highlight)]" />
            <span className="rail-pulse absolute right-0 translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--highlight)] shadow-[0_0_10px_2px_var(--highlight)]" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap font-mono text-[9px] tracking-[0.4em] text-[var(--highlight)] opacity-[0.3]">
              FRAME_BUFFER // NO_SIGNAL_LOSS
            </span>
          </div>
        </div>

        {/* MOBILE / TABLET AMBIENT ACCENT — below xl (1280px) there's no real
            side gutter left for the margin-column treatment at all, so this
            gives phones and tablets their own lightweight "something is
            alive" touch instead of nothing: a thin shimmering line above the
            floating mobile nav dock (which sits at bottom-6), cheap enough
            (one small transform-only loop) to run happily on any device. */}
        <div className="xl:hidden absolute bottom-2 left-6 right-6 h-px overflow-hidden rounded-full opacity-40">
          <div
            className="w-[200%] h-full motion-reduce:animate-none animate-[shimmerX_5s_linear_infinite]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent 0%, transparent 8%, var(--highlight) 12%, transparent 16%, transparent 50%)",
            }}
          />
        </div>

        {/* PERSISTENT CHASSIS CORNER BRACKETS — same bracket language as the
            preloader/kinetic card, faintly framing the live viewport at all
            times, all breakpoints — cheap and never touches content */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-[var(--highlight)] opacity-30" />
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-r-2 border-[var(--highlight)] opacity-30" />
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-l-2 border-[var(--highlight)] opacity-30" />
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2 border-[var(--highlight)] opacity-30" />
      </div>

      {/* FILM GRAIN — a top-level overlay (not tucked behind content, see
          note above), so it reads uniformly over the footer, cards, and the
          bare page canvas alike instead of stopping wherever a section has
          its own opaque background. */}
      <div
        className="fixed -inset-1/2 z-[9000] opacity-[0.09] pointer-events-none motion-reduce:animate-none animate-[grainFlicker_0.5s_steps(1)_infinite]"
        style={{ backgroundImage: GRAIN_BG, backgroundSize: "160px 160px" }}
      />
    </div>
  );
}
