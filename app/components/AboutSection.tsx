// app/components/AboutSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getDesktopScale } from "../lib/desktopScale";

interface TechItem {
  name: string;
  category: string;
}

const MODERN_TECH_STACK: TechItem[] = [
  { name: "React / Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Node.js / Express", category: "backend" },
  { name: "MongoDB", category: "database" },
  { name: "Tailwind CSS", category: "design" },
  { name: "RESTful APIs", category: "architecture" },
];

const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#01";
const CALLSIGN = "M_N";

export default function AboutSection() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const matrixContainerRef = useRef<HTMLDivElement>(null);
  const scrambleIntervalRef = useRef<number | null>(null);

  const [nycTime, setNycTime] = useState<string | null>(null);
  const [callsign, setCallsign] = useState(CALLSIGN);

  // Live NYC clock — real ticking data instead of a static "EST" label
  useEffect(() => {
    const update = () =>
      setNycTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );

    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  // Terminal-style decode: scrambles through random glyphs before resolving
  // back to "M_N" — contained to a 3-char text node, so it's a cheap paint,
  // not a layout-affecting animation
  const runScramble = () => {
    const totalFrames = 10;
    let frame = 0;

    if (scrambleIntervalRef.current) {
      window.clearInterval(scrambleIntervalRef.current);
    }

    scrambleIntervalRef.current = window.setInterval(() => {
      frame += 1;
      const revealCount = Math.floor((frame / totalFrames) * CALLSIGN.length);
      setCallsign(
        CALLSIGN.split("")
          .map((char, i) =>
            i < revealCount
              ? char
              : SCRAMBLE_CHARS[
                  Math.floor(Math.random() * SCRAMBLE_CHARS.length)
                ],
          )
          .join(""),
      );

      if (frame >= totalFrames) {
        window.clearInterval(scrambleIntervalRef.current!);
        scrambleIntervalRef.current = null;
        setCallsign(CALLSIGN);
      }
    }, 45);
  };

  // Boot the decode shortly after entrance, then repeat periodically so the
  // card stays "alive" without requiring hover — matters on touch devices
  useEffect(() => {
    const bootTimeout = window.setTimeout(runScramble, 2400);
    const loop = window.setInterval(runScramble, 8000);
    return () => {
      window.clearTimeout(bootTimeout);
      window.clearInterval(loop);
      if (scrambleIntervalRef.current) window.clearInterval(scrambleIntervalRef.current);
    };
  }, []);

  // Awwwards-Grade Cinematic Entrance Animations
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Title & Headings Split Reveal
      tl.fromTo(
        ".reveal-line",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.4, stagger: 0.08, delay: 0.1 },
      )
        // Main Body Text Fade (Includes the new Résumé action wrapper seamlessly)
        .fromTo(
          ".fade-in-body",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.9",
        )
        // Kinetic Readout Entrance — transform/opacity only, stays on the
        // compositor. No curtain-open beat anymore: the panel is a
        // full-height mask-faded readout now, not a boxed card, so there's
        // no rectangle to "open" — this single fade/rise/tilt reads as one
        // cohesive system booting up instead.
        .fromTo(
          ".kinetic-canvas-wrapper",
          { opacity: 0, y: 50, scale: 0.92, rotateX: -12 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1.3,
            ease: "power4.out",
          },
          "-=1.1",
        )
        // Tech Grid Matrix Stagger Reveal
        .fromTo(
          ".tech-pill",
          { opacity: 0, scale: 0.85, y: 15 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.04,
            ease: "back.out(1.1)",
          },
          "-=1.2",
        )
        // Continuous Fluid Background Float Line loop — deferred until the
        // entrance settles so it isn't ticking underneath the entrance itself
        .add(() => {
          gsap.to(".marquee-left-loop", {
            xPercent: -50,
            ease: "none",
            duration: 22,
            repeat: -1,
          });

          gsap.to(".marquee-right-loop", {
            xPercent: 0,
            from: { xPercent: -50 },
            ease: "none",
            duration: 22,
            repeat: -1,
          });
        }, "-=0.4");
    },
    { scope: scopeRef },
  );

  // Micro-Interaction: Immersive Mouse Displacement Track Over Matrix Canvas
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!matrixContainerRef.current) return;
    const rect = matrixContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Track custom properties for CSS variables gradient highlight follow
    matrixContainerRef.current.style.setProperty("--mouse-x", `${x}px`);
    matrixContainerRef.current.style.setProperty("--mouse-y", `${y}px`);

    // Calculate displacement vectors from the absolute center
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;

    // rect (and therefore dx/dy) is already in real, post-transform screen
    // pixels — correct as-is for rotation (a tilt angle looks the same
    // regardless of an ancestor's scale) but not for translation: gsap.to
    // below sets THIS element's own x/y, which then gets re-multiplied by
    // DesktopCanvas's ancestor scale when painted, so a real-pixel delta fed
    // in directly would displace twice as far/near as intended. Dividing by
    // the current scale up front cancels that out.
    const scale = getDesktopScale();
    const scaledDx = dx / scale;
    const scaledDy = dy / scale;

    // Whole-panel magnetic tilt toward the cursor — subtle, reads as real
    // depth now that the wrapper actually sits inside a perspective context.
    // Multipliers dampened from their original card-sized values now that
    // this tracks the full-height readout instead of a ~420x525 card — dx/dy
    // range over a much bigger area, so the same multipliers would have
    // produced a noticeably more exaggerated tilt.
    gsap.to(matrixContainerRef.current, {
      rotateX: dy * -0.012,
      rotateY: dx * 0.012,
      duration: 0.6,
      ease: "power2.out",
    });

    // Dampened push pull variables for structural layers
    gsap.to(matrixContainerRef.current.querySelectorAll(".layer-heavy"), {
      x: scaledDx * 0.07,
      y: scaledDy * 0.07,
      rotateX: dy * -0.018,
      rotateY: dx * 0.018,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(matrixContainerRef.current.querySelectorAll(".layer-light"), {
      x: scaledDx * -0.04,
      y: scaledDy * -0.04,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!matrixContainerRef.current) return;
    gsap.to(matrixContainerRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power3.out",
    });
    gsap.to(
      matrixContainerRef.current.querySelectorAll(".layer-heavy, .layer-light"),
      {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: "power3.out",
      },
    );
  };

  // Touch devices can't hover for the magnetic tilt, so a tap gets its own
  // punchy feedback burst plus a decode re-trigger — mobile-first equivalent
  const handleTouchStart = () => {
    if (!matrixContainerRef.current) return;
    runScramble();
    gsap
      .timeline()
      .to(matrixContainerRef.current, {
        rotateX: -5,
        rotateY: 4,
        scale: 1.015,
        duration: 0.2,
        ease: "power2.out",
      })
      .to(matrixContainerRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      });
  };

  return (
    <section
      id="about"
      ref={scopeRef}
      className="relative min-h-[90vh] flex flex-col justify-center py-20 sm:py-28 md:py-36 overflow-hidden scroll-mt-24"
    >
      {/* Background Depth Ambient Flare */}
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-[var(--highlight)] opacity-[0.05] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* items-stretch (not items-center): lets the right column's new
          full-height readout panel stretch to match the text column's
          natural (taller) height instead of being vertically centered
          within it — needed for the "fills the section top to bottom"
          effect below. */}
      <div className="w-full grid grid-cols-12 gap-y-12 md:gap-x-12 lg:gap-x-16 items-stretch">
        {/* Left Side: Editorial Typography & Layout Panel */}
        <div className="col-span-12 md:col-span-7 flex flex-col justify-center relative z-20">
          {/* Section ID Header Flag */}
          <div className="overflow-hidden mb-4">
            <span className="reveal-line inline-block font-mono text-xs sm:text-sm text-[var(--highlight)] tracking-widest uppercase font-semibold">
              01. Introduction & Background
            </span>
          </div>

          {/* Master Structural Typography Headers */}
          {/* `overflow-x-visible` earlier still produced a scrollbar: setting
              overflow-x/overflow-y to different values on the SAME element
              makes the browser silently coerce the "visible" axis to "auto"
              (a real, spec-defined behavior, not a bug) — "auto" still
              clips/scrolls on overflow, it just adds a scrollbar affordance
              instead of hiding it outright. Fixed properly this time: each
              line gets its OWN overflow-hidden mask sized to `w-max` (fits
              exactly that line's content, nothing more) instead of one
              mask sized to the column. Since nothing then overflows each
              box's own bounds, plain `overflow-hidden` never needs to clip
              anything, at any font size — "Mohamed" is free to extend past
              the grid column into the column gap next to it (empty space,
              comfortably wider than the ~7% this needs) instead of being
              cropped or wrapping the layout into a scrollbar. */}
          {/* Explicit text-[var(--text-contrast)] on these two spans, even
              though the parent h1 already sets it: a global `h1 span {
              color: var(--highlight) }` rule (originally written for when
              the subtitle below was the ONLY span inside this h1) would
              otherwise repaint them teal now that they're spans here too,
              for the unrelated reveal-line masking split. */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-normal text-[var(--text-contrast)] leading-[1.05] transition-colors duration-300">
            <span className="overflow-hidden block w-max">
              <span className="reveal-line block text-[var(--text-contrast)]">Mohamed</span>
            </span>
            <span className="overflow-hidden block w-max">
              <span className="reveal-line block text-[var(--text-contrast)]">Nagy.</span>
            </span>
          </h1>
          <div className="overflow-hidden mb-6 sm:mb-8">
            <p className="reveal-line font-medium text-2xl sm:text-3xl md:text-4xl mt-3 opacity-70 tracking-tight text-[var(--highlight)]">
              Engineering high-fidelity visual architectures.
            </p>
          </div>

          {/* Core Copy Bio Blocks */}
          <div className="fade-in-body text-[var(--text)] space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed max-w-xl font-normal opacity-90 transition-colors duration-300">
            <p>
              I am an adaptable software developer with over 7 years of
              specialized expertise in engineering front-end user experiences
              while building robust full-stack software structures. My workspace
              is centered around crafting performant digital systems using{" "}
              <span className="text-[var(--text-contrast)] font-semibold underline decoration-[var(--highlight)]/40 decoration-2 underline-offset-4">
                React, Next.js, and TypeScript
              </span>{" "}
              , bound to clean execution architectures.
            </p>
            <p>
              I bridge visual design precision with strict production
              optimization, ensuring software layouts stay fully compliant with
              modern cross-browser standards and complete accessibility rules.
            </p>
            <p className="text-xs font-mono opacity-70 uppercase tracking-wider pt-2">
              Core Tech Stack Matrix:
            </p>
          </div>

          {/* Tech Matrix Pill Clusters */}
          <div className="fade-in-body mt-4 max-w-xl">
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 font-mono text-xs">
              {MODERN_TECH_STACK.map((tech) => (
                <li
                  key={tech.name}
                  className="tech-pill flex items-center gap-2 px-3.5 py-3 rounded-lg bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[var(--highlight)] hover:bg-[var(--hover-glow)] text-[var(--text)] hover:text-[var(--text-contrast)] transition-all duration-300 group cursor-default shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--highlight)] opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  <span>{tech.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* High-Fidelity Interactive Resume Downloader Pipeline */}
          <div className="fade-in-body mt-8 max-w-xl">
            <a
              href="/assets/Resume-MohamedNAGY.pdf"
              download="Resume-MohamedNAGY.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-6 px-6 py-4 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[var(--highlight)] text-[var(--text-contrast)] transition-all duration-300 group shadow-[0_4px_12px_rgba(0,0,0,0.03)] font-mono text-xs tracking-wider"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--highlight)] animate-pulse" />
                <span>FETCH_SYSTEM_RESUME // PDF</span>
              </div>
              <span className="transform translate-x-0 group-hover:translate-x-1 group-hover:text-[var(--highlight)] transition-transform duration-300 text-sm font-bold">
                ↓
              </span>
            </a>
          </div>
        </div>

        {/* Right Side: System Readout — a full-height ambient HUD instead of
            a boxed card. No border, no fill, no rectangle: it's mask-faded
            top and bottom so it dissolves into the section rather than
            sitting on it, with a vertical "data spine" tying a top status
            line, the kinetic M_N centerpiece, and a bottom signature into
            one continuous readout instead of three stacked chunks. */}
        {/* [perspective:1200px] lives on this outer wrapper, not on the
            tilted element itself below — perspective has to be set on an
            ANCESTOR of whatever gets the rotateX/rotateY tilt for the 3D
            depth to actually read; putting it on the same element that's
            also being rotated flattens the effect back to a 2D skew. */}
        <div className="col-span-12 md:col-span-5 relative [perspective:1200px]">
          <div
            ref={matrixContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            className="kinetic-canvas-wrapper group relative w-full h-[480px] sm:h-[560px] md:h-full flex flex-col justify-between select-none cursor-crosshair"
            style={
              {
                "--mouse-x": "50%",
                "--mouse-y": "50%",
                transformStyle: "preserve-3d",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
                maskImage:
                  "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
              } as React.CSSProperties
            }
          >
            {/* Ambient backdrop layer: fine grid, soft highlight glow, and
                the giant ghost typography loop — now spanning the FULL
                panel instead of a small card interior */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              {/* w-[65%] + aspect-square (not fixed px dimensions) — the
                  panel is full-width on mobile/sm but narrows to ~5/12 of
                  the row at md+, and a fixed 420-560px circle was wider
                  than that narrower column, so it got clipped into a tall
                  vertical band by the column's own edges instead of
                  reading as a circle. Percentage width + forced 1:1 aspect
                  ratio keeps it a true circle at any column width. */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] aspect-square max-w-[380px] bg-[var(--highlight)] opacity-[0.1] blur-[100px] rounded-full" />
              <div className="absolute inset-0 flex flex-col justify-center space-y-6 opacity-[0.05] select-none">
                <div className="marquee-left-loop flex whitespace-nowrap font-black font-['Syne',sans-serif] text-6xl sm:text-7xl tracking-tighter">
                  <span>MN MN MN MN MN MN MN MN MN MN MN MN MN MN</span>
                </div>
                <div className="marquee-right-loop flex whitespace-nowrap font-black font-['Syne',sans-serif] text-6xl sm:text-7xl tracking-tighter">
                  <span>NAGY NAGY NAGY NAGY NAGY NAGY NAGY NAGY NAGY</span>
                </div>
              </div>
              {/* Interactive radial spotlight, same --mouse-x/y tracking as before */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(500px at var(--mouse-x) var(--mouse-y), var(--radial-glow), transparent 45%)`,
                }}
              />
            </div>

            {/* Vertical data spine — literal thread connecting the
                top/middle/bottom readouts into one system. Hidden on the
                very smallest screens to keep the mobile layout clean. */}
            <div
              className="absolute left-2 sm:left-4 top-0 bottom-0 w-px pointer-events-none hidden sm:block"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                maskImage:
                  "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
              }}
            >
              <div className="absolute inset-0 bg-[var(--highlight)] opacity-30" />
              <span className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--highlight)] shadow-[0_0_10px_2px_var(--highlight)] animate-[railTravel_5s_linear_infinite]" />
            </div>

            {/* TOP: Status Readout */}
            <div className="layer-light relative z-10 flex items-center justify-between font-mono text-[10px] sm:text-xs tracking-wider text-[var(--text)] pl-6 sm:pl-10">
              <span>SYS_STATUS: ACTIVE</span>
              <span className="tabular-nums">
                LOC: NYC // {nycTime ?? "--:--:--"} EST
              </span>
            </div>

            {/* MIDDLE: Kinetic Centerpiece — radar rings echo the custom
                cursor's own reticle language, tying the page's interactive
                chrome to its hero content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center py-6 pointer-events-none">
              {/* Border opacity bumped from an earlier /15 — that read fine
                  against the dark theme's near-black background but was
                  nearly invisible against the light theme's white one, a
                  low-opacity blue border having far less contrast on white
                  than the same fraction of bright cyan has on black. /35
                  and /60 hold up in both themes. */}
              <div className="absolute w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] pointer-events-none animate-[rotateGlow_30s_linear_infinite]">
                <div className="absolute inset-0 rounded-full border border-[var(--highlight)]/35" />
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-px h-2 bg-[var(--highlight)]/60" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-px h-2 bg-[var(--highlight)]/60" />
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 h-px w-2 bg-[var(--highlight)]/60" />
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 h-px w-2 bg-[var(--highlight)]/60" />
              </div>
              <div className="absolute w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border border-dashed border-[var(--highlight)]/30" />

              {/* Foreground Visual Depth Objects — decodes through scramble
                  glyphs on boot / tap / periodic idle tick, mobile-first
                  type scale */}
              <h2 className="layer-heavy font-['Syne',sans-serif] text-7xl sm:text-8xl md:text-9xl font-black text-[var(--text-contrast)] tracking-tighter leading-none select-none transition-colors duration-300">
                {callsign}
              </h2>
              <div className="layer-light mt-5 flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[var(--highlight)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--highlight)]" />
                NYC · 40.7654° N
              </div>
            </div>

            {/* BOTTOM: Signature — always stacked now (not side-by-side at
                any width): CREATIVE_LOGIC on its own line, the system tag
                on its own line underneath. No two elements competing for
                the same row means nothing can get pushed past the edge and
                clipped, on any screen size. */}
            <div className="layer-light relative z-10 px-6 sm:px-10 border-t border-[var(--border-color)]/50 pt-4 pb-1">
              <span className="block font-['Syne',sans-serif] font-black text-xl sm:text-2xl text-[var(--text-contrast)] tracking-tighter uppercase leading-none">
                CREATIVE_LOGIC
              </span>
              <div className="mt-2.5 flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-[var(--text)] opacity-60 tracking-wider uppercase">
                <span className="w-1 h-1 rounded-full bg-[var(--highlight)] shrink-0" />
                <span>CORE_ENGINE_V2.026 // © ALL RIGHTS RESERVED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
