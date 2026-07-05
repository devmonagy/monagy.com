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
        // Kinetic Card Entrance — transform/opacity only, stays on the compositor
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
        // Curtain Split Reveal — scaleY stand-in for the old clip-path wipe,
        // same "opening" beat but pure transform so it never repaints
        .fromTo(
          ".entrance-curtain",
          { scaleY: 1 },
          { scaleY: 0, duration: 1.1, ease: "expo.inOut" },
          "-=0.9",
        )
        // Interactive Text Marquees Sliding In Opposite Directions
        .fromTo(
          ".marquee-left",
          { xPercent: 20 },
          { xPercent: -5, duration: 1.8, ease: "power4.out" },
          "-=1.2",
        )
        .fromTo(
          ".marquee-right",
          { xPercent: -20 },
          { xPercent: 5, duration: 1.8, ease: "power4.out" },
          "-=1.8",
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
        // entrance settles so it isn't ticking underneath the curtain repaint
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

    // Whole-card magnetic tilt toward the cursor — subtle, reads as real depth
    // now that the wrapper actually sits inside a perspective context
    gsap.to(matrixContainerRef.current, {
      rotateX: dy * -0.02,
      rotateY: dx * 0.02,
      duration: 0.6,
      ease: "power2.out",
    });

    // Dampened push pull variables for structural layers
    gsap.to(matrixContainerRef.current.querySelectorAll(".layer-heavy"), {
      x: scaledDx * 0.07,
      y: scaledDy * 0.07,
      rotateX: dy * -0.03,
      rotateY: dx * 0.03,
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

      <div className="w-full grid grid-cols-12 gap-y-12 md:gap-x-12 lg:gap-x-16 items-center">
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

        {/* Right Side: Interactive Kinetic Graphic Framework Panel */}
        <div className="col-span-12 md:col-span-5 flex justify-center items-center relative [perspective:1200px]">
          <div className="group relative w-full max-w-[420px] aspect-[4/5]">
            <div
              template-id="kinetic-canvas"
              ref={matrixContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              className="kinetic-canvas-wrapper relative w-full h-full rounded-2xl p-6 sm:p-8 overflow-hidden select-none cursor-crosshair flex flex-col justify-between transition-colors duration-300 shadow-[0_30px_60px_rgba(0,0,0,0.2)]"
              style={
                {
                  "--mouse-x": "50%",
                  "--mouse-y": "50%",
                  transformStyle: "preserve-3d",
                  border: "1px solid transparent",
                  // Holographic gradient border sweep — a premium ID-card
                  // signature distinct from the navbar's rotating glow ring,
                  // driven by animating background-position (compositor-only)
                  backgroundImage: `linear-gradient(var(--card-bg), var(--card-bg)), linear-gradient(120deg, transparent 30%, var(--highlight) 50%, transparent 70%)`,
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  backgroundSize: "100% 100%, 250% 250%",
                  animation: "holoSweep 7s linear infinite",
                } as React.CSSProperties
              }
            >
              {/* Fine background grid texture — echoes the page's own ambient
                  grid at card scale, reinforcing the "system console" feel */}
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              {/* Interactive radial track spotlight overlay effect linked to --radial-glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(600px at var(--mouse-x) var(--mouse-y), var(--radial-glow), transparent 40.7%)`,
                }}
              />

              {/* Curtain Split Reveal — scaleY-only entrance panels standing in for the
                  old clip-path wipe, same "opening" beat with zero repaint cost */}
              <div className="entrance-curtain absolute top-0 left-0 w-full h-1/2 bg-[var(--card-bg)] origin-top z-30 pointer-events-none" />
              <div className="entrance-curtain absolute bottom-0 left-0 w-full h-1/2 bg-[var(--card-bg)] origin-bottom z-30 pointer-events-none" />

              {/* HUD Scan-Line Sweep — always-on ambient motion (transform-only),
                  so touch devices without hover still see the card feel alive */}
              <div
                className="absolute left-0 w-full h-20 pointer-events-none opacity-[0.08] animate-[scanSweep_5s_linear_infinite]"
                style={{
                  background: `linear-gradient(to bottom, transparent, var(--highlight), transparent)`,
                }}
              />

              {/* Micro Top Status Tracker Line */}
              <div className="relative flex justify-between items-center w-full border-b border-[var(--border-color)] pb-3 opacity-80 font-mono text-[10px] tracking-wider text-[var(--text)]">
                <span className="layer-light">SYS_STATUS: ACTIVE</span>
                <span className="layer-light tabular-nums">
                  LOC: NYC // {nycTime ?? "--:--:--"} EST
                </span>
              </div>

              {/* Center Heavy Graphical Layout Content Canvas */}
              <div className="relative flex flex-col items-center justify-center my-auto py-4 pointer-events-none">
                {/* Giant Kinetic Abstract Typography Track Loop Layer Background */}
                <div className="absolute inset-0 flex flex-col justify-center space-y-4 opacity-[0.015] body.light:opacity-[0.025] select-none scale-105">
                  <div className="marquee-left-loop flex whitespace-nowrap font-black font-['Syne',sans-serif] text-5xl tracking-tighter">
                    <span>
                      MN MN MN MN MN MN MN MN MN MN MN MN MN MN MN MN MN MN
                    </span>
                  </div>
                  <div className="marquee-right-loop flex whitespace-nowrap font-black font-['Syne',sans-serif] text-5xl tracking-tighter">
                    <span>NAGY NAGY NAGY NAGY NAGY NAGY NAGY NAGY NAGY NAGY</span>
                  </div>
                </div>

                {/* Foreground Visual Depth Objects — decodes through scramble glyphs
                    on boot / tap / periodic idle tick, mobile-first type scale */}
                <h2 className="layer-heavy font-['Syne',sans-serif] text-6xl sm:text-7xl md:text-8xl font-black text-[var(--text-contrast)] tracking-tighter leading-none select-none transition-colors duration-300">
                  {callsign}
                </h2>
                <div className="layer-light mt-4 flex items-center gap-2 bg-[var(--badge-bg)] text-[var(--highlight)] text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-[var(--border-color)] shadow-sm">
                  NYC · 40.7654° N
                </div>
              </div>

              {/* Bottom Text Track Banner */}
              <div className="marquee-right w-full text-right border-t border-[var(--border-color)] pt-3 overflow-visible whitespace-nowrap">
                <span className="font-black text-2xl sm:text-2xl text-[var(--text-contrast)] tracking-tighter uppercase leading-none block font-['Syne',sans-serif]">
                  CREATIVE_LOGIC
                </span>
                <span className="font-mono text-[10px] text-[var(--text)] opacity-50 tracking-wider block mt-1">
                  CORE_ENGINE_V2.026 // © ALL RIGHTS RESERVED
                </span>
              </div>
            </div>
          </div>

          {/* Edge Aesthetic Framing Corner Borders — brighten with the card on
              hover so the frame reads as one cohesive activated system */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[var(--border-color)] opacity-60 group-hover:border-[var(--highlight)] group-hover:opacity-100 transition-all duration-300" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[var(--border-color)] opacity-60 group-hover:border-[var(--highlight)] group-hover:opacity-100 transition-all duration-300" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[var(--border-color)] opacity-60 group-hover:border-[var(--highlight)] group-hover:opacity-100 transition-all duration-300" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[var(--border-color)] opacity-60 group-hover:border-[var(--highlight)] group-hover:opacity-100 transition-all duration-300" />
        </div>
      </div>
    </section>
  );
}
