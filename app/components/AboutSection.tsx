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
              Mohamed Nagy.
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
              </span>
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
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--highlight)] opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
                  <span className="tracking-wide">{tech.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="fade-in-body mt-10 sm:mt-12 flex flex-wrap items-center gap-6">
            <a
              href="/assets/Resume-MohamedNAGY.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-6 py-3 text-xs sm:text-sm font-mono tracking-widest uppercase font-semibold text-white bg-[var(--highlight)] rounded-lg transition-all duration-300 hover:bg-transparent hover:text-[var(--highlight)] border border-transparent hover:border-[var(--highlight)] overflow-hidden shadow-md shadow-[var(--highlight)]/10 hover:shadow-[0_0_25px_var(--hover-glow)] transform hover:-translate-y-0.5 transform-gpu"
            >
              <span>Download Résumé</span>
            </a>

            <a
              href="#projects"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-mono tracking-wider font-semibold text-[var(--text)] opacity-75 hover:opacity-100 hover:text-[var(--highlight)] py-2 transition-all duration-200 group relative"
            >
              <span>View Showcases</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--highlight)] transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Kinetic Typography Canvas Matrix */}
        <div
          ref={matrixContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="col-span-12 md:col-span-5 flex items-center justify-center relative mt-6 md:mt-0 perspective-1000 select-none cursor-default"
        >
          <div className="kinetic-canvas-wrapper relative w-full max-w-[420px] aspect-[4/5] rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.4)] transform-gpu transition-all duration-500 before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(350px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(var(--highlight-rgb,94,234,212),0.08),transparent_85%)]">
            {/* Outer Subtle Grid Overlay Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-color)_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.15] pointer-events-none" />

            {/* Layer 1: Light Damped Background Moving Text Lines */}
            <div className="layer-light absolute inset-0 flex flex-col justify-between py-12 opacity-[0.03] dark:opacity-[0.04] text-[var(--text-contrast)] font-extrabold tracking-tighter text-7xl uppercase pointer-events-none will-change-transform transform-gpu">
              <div className="marquee-left-loop whitespace-nowrap w-[200%]">
                DEVELOPER DEVELOPER DEVELOPER DEVELOPER
              </div>
              <div className="marquee-right-loop whitespace-nowrap w-[200%] -translate-x-1/2">
                ENGINEER ENGINEER ENGINEER ENGINEER
              </div>
              <div className="marquee-left-loop whitespace-nowrap w-[200%]">
                ARCHITECT ARCHITECT ARCHITECT ARCHITECT
              </div>
            </div>

            {/* Layer 2: Heavy Geometric Typography Core Frame */}
            <div className="layer-heavy absolute inset-0 flex flex-col justify-center items-center p-6 space-y-4 will-change-transform transform-gpu">
              {/* Top Text Track Banner */}
              <div className="marquee-left w-full text-left border-b border-[var(--border-color)] pb-3 overflow-visible whitespace-nowrap">
                <span className="font-mono text-xs text-[var(--highlight)] tracking-widest block mb-1 font-bold">
                  STATUS // CODE
                </span>
                <span className="font-sans font-black text-3xl sm:text-4xl text-[var(--text-contrast)] tracking-tighter uppercase leading-none">
                  FULLSTACK_DEV
                </span>
              </div>

              {/* Central Abstract Framework Geometry Grid */}
              <div className="w-full flex-1 flex items-center justify-center relative py-4">
                <div className="absolute w-24 h-24 border border-dashed border-[var(--highlight)]/20 rounded-full animate-[spin_40s_linear_infinite]" />
                <div className="absolute w-36 h-36 border border-dashed border-[var(--border-color)] rounded-full animate-[spin_60s_linear_infinite_reverse]" />

                <div className="text-center z-10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 block mb-1 text-[var(--text)]">
                    ESTABLISHED SYSTEM
                  </span>
                  <span className="font-sans font-black text-5xl lg:text-5xl tracking-tighter text-[var(--text-contrast)] block leading-none select-none">
                    MoNAGY.com
                  </span>
                  <span className="font-mono text-[11px] text-[var(--highlight)] tracking-widest block mt-2 font-bold bg-[var(--hover-glow)] px-3 py-1 rounded-full border border-[var(--border-color)]">
                    NYC · 40.7654° N
                  </span>
                </div>
              </div>

              {/* Bottom Text Track Banner */}
              <div className="marquee-right w-full text-right border-t border-[var(--border-color)] pt-3 overflow-visible whitespace-nowrap">
                <span className="font-sans font-black text-3xl sm:text-4xl text-[var(--text-contrast)] tracking-tighter uppercase leading-none block">
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
      </div>
    </section>
  );
}
