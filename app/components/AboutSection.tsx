// app/components/AboutSection.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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

export default function AboutSection() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const matrixContainerRef = useRef<HTMLDivElement>(null);

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
        // Main Body Text Fade
        .fromTo(
          ".fade-in-body",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.9",
        )
        // Kinetic Split-Screen Typography Canvas Open
        .fromTo(
          ".kinetic-canvas-wrapper",
          {
            clipPath: "polygon(0 45%, 100% 45%, 100% 55%, 0 55%)",
            scale: 0.9,
            opacity: 0,
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            scale: 1,
            opacity: 1,
            duration: 1.6,
            ease: "expo.inOut",
          },
          "-=1.1",
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
        );

      // Continuous Fluid Background Float Line loop
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

    // Dampened push pull variables for structural layers
    gsap.to(matrixContainerRef.current.querySelectorAll(".layer-heavy"), {
      x: dx * 0.07,
      y: dy * 0.07,
      rotateX: dy * -0.03,
      rotateY: dx * 0.03,
      duration: 0.5,
      ease: "power2.out",
    });

    gsap.to(matrixContainerRef.current.querySelectorAll(".layer-light"), {
      x: dx * -0.04,
      y: dy * -0.04,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!matrixContainerRef.current) return;
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
          <div className="overflow-hidden mb-6 sm:mb-8">
            <h1 className="reveal-line text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--text-contrast)] leading-[1.05] transition-colors duration-300">
              Mohamed Nagy.{" "}
              <span className="font-medium text-2xl sm:text-3xl md:text-4xl block mt-3 opacity-70 tracking-tight">
                Engineering high-fidelity visual architectures.
              </span>
            </h1>
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
        </div>

        {/* Right Side: Interactive Kinetic Graphic Framework Panel */}
        <div className="col-span-12 md:col-span-5 flex justify-center items-center relative perspective-1000">
          <div
            ref={matrixContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="kinetic-canvas-wrapper relative w-full max-w-[380px] aspect-[4/5] bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 overflow-hidden select-none cursor-crosshair group flex flex-col justify-between transition-colors duration-300 shadow-[0_30px_60px_rgba(0,0,0,0.2)]"
            style={
              {
                "--mouse-x": "50%",
                "--mouse-y": "50%",
                transformStyle: "preserve-3d",
              } as React.CSSProperties
            }
          >
            {/* Interactive radial track spotlight overlay effect linked to --radial-glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(600px at var(--mouse-x) var(--mouse-y), var(--radial-glow), transparent 40.7%)`,
              }}
            />

            {/* Micro Top Status Tracker Line */}
            <div className="flex justify-between items-center w-full border-b border-[var(--border-color)] pb-3 opacity-80 font-mono text-[10px] tracking-wider text-[var(--text)]">
              <span className="layer-light">SYS_STATUS: ACTIVE</span>
              <span className="layer-light">LOC: NYC // EST</span>
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

              {/* Foreground Visual Depth Objects */}
              <h2 className="layer-heavy font-['Syne',sans-serif] text-6xl sm:text-7xl font-black text-[var(--text-contrast)] tracking-tighter leading-none select-none transition-colors duration-300">
                M_N
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

          {/* Edge Aesthetic Framing Corner Borders */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[var(--border-color)] opacity-60" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[var(--border-color)] opacity-60" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[var(--border-color)] opacity-60" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[var(--border-color)] opacity-60" />
        </div>
      </div>
    </section>
  );
}
