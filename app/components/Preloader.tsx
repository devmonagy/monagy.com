// app/components/Preloader.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: onComplete,
    });

    const counterObj = { value: 0 };

    // Force system display mount
    tl.set(containerRef.current, { display: "flex" });

    // 1. Initial High-Fidelity Infrastructure Layout Reveal
    tl.fromTo(
      ".loader-panel-accent",
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 0.15, duration: 1, ease: "expo.out", stagger: 0.1 },
    ).fromTo(
      ".kinetic-element",
      { y: 80, opacity: 0, skewY: 4 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.08,
      },
      "-=0.7",
    );

    // 2. High-Speed Ticker Integration for Structural Percentage Matrix
    tl.to(
      counterObj,
      {
        value: 100,
        duration: 2.2,
        ease: "power3.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = Math.floor(counterObj.value)
              .toString()
              .padStart(3, "0");
          }
        },
      },
      "-=1.0",
    );

    // Continuous marquee looping logic while running
    gsap.to(".marquee-fast-l", {
      xPercent: -30,
      ease: "none",
      duration: 6,
      repeat: -1,
    });
    gsap.to(".marquee-fast-r", {
      xPercent: 30,
      ease: "none",
      duration: 6,
      repeat: -1,
    });

    // 3. Staggered Spatial Compression & Core Collapse Sequence
    tl.to(".loader-text-main", {
      letterSpacing: "0.5em",
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      ease: "power4.inOut",
      delay: 0.2,
    })
      .to(
        ".kinetic-element:not(.loader-text-main)",
        {
          opacity: 0,
          y: -40,
          duration: 0.5,
          stagger: 0.04,
          ease: "power4.in",
        },
        "-=0.5",
      )
      .to(
        ".loader-panel-accent",
        {
          opacity: 0,
          scaleY: 0,
          duration: 0.4,
          ease: "power3.in",
        },
        "-=0.3",
      );

    // 4. Jaw-Dropping Kinetic Shutter Tear — collapsing the full-screen rect
    // straight up to a flat top edge is geometrically identical to a scaleY(0)
    // anchored at the top, so this stays on the compositor instead of forcing
    // a full-viewport repaint every frame like the old clip-path version did
    tl.to(
      containerRef.current,
      {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.4,
        ease: "expo.inOut",
      },
      "-=0.1",
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-[var(--bg)] py-12 select-none overflow-hidden"
    >
      {/* Structural Minimal Grid Framework Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-color)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-20" />

      {/* Cybernetic Structural Accent Bars */}
      <div className="loader-panel-accent absolute left-12 top-0 bottom-0 w-[1px] bg-[var(--border-color)] origin-top hidden md:block" />
      <div className="loader-panel-accent absolute right-12 top-0 bottom-0 w-[1px] bg-[var(--border-color)] origin-bottom hidden md:block" />

      {/* TOP PIPELINE RUNNING MARQUEE */}
      <div className="kinetic-element marquee-fast-l flex whitespace-nowrap opacity-20 border-b border-[var(--border-color)]/40 pb-2 w-full font-mono text-[9px] tracking-[0.3em] text-[var(--text)]">
        <span className="px-4">INITIALIZING CORE OBJECT ARCHITECTURE //</span>
        <span className="px-4">INITIALIZING CORE OBJECT ARCHITECTURE //</span>
        <span className="px-4">INITIALIZING CORE OBJECT ARCHITECTURE //</span>
        <span className="px-4">INITIALIZING CORE OBJECT ARCHITECTURE //</span>
      </div>

      {/* CENTER INTENSITY HUB */}
      <div className="relative flex flex-col items-center max-w-xl px-6 text-center my-auto">
        {/* Massive Geometric Matrix Background Variable */}
        <div className="kinetic-element absolute text-[14vw] font-black font-['Syne',sans-serif] text-[var(--highlight)]/5 opacity-[0.03] select-none pointer-events-none tracking-tighter -z-10 transform -translate-y-6">
          SYS_INIT
        </div>

        {/* Core Main Branding String */}
        <div className="overflow-hidden mb-2">
          <h2 className="loader-text-main kinetic-element font-['Syne',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.2em] text-[var(--text-contrast)] uppercase leading-none transition-all">
            NAGY<span className="text-[var(--highlight)]">.</span>SYS
          </h2>
        </div>

        {/* Giant Numeric Status Pipeline Tracker */}
        <div className="overflow-hidden my-4">
          <div className="kinetic-element font-mono text-6xl sm:text-7xl font-light tracking-tighter text-[var(--text-contrast)] flex items-baseline">
            <span ref={counterRef} className="font-bold tabular-nums">
              000
            </span>
            <span className="text-xs font-mono text-[var(--highlight)] tracking-widest ml-2 opacity-80">
              %
            </span>
          </div>
        </div>

        {/* Minimalist Micro Progress Line Divider */}
        <div className="kinetic-element h-[2px] bg-gradient-to-r from-transparent via-[var(--highlight)] to-transparent w-48 mb-4 rounded-full" />

        {/* Status System Data Flags */}
        <div className="overflow-hidden flex flex-col gap-1.5 items-center">
          <p className="kinetic-element loader-text-sub font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--text)] opacity-60 whitespace-nowrap">
            LOCATING ASSET DATA PIPELINES // V2.026
          </p>
          <div className="kinetic-element flex items-center gap-2 bg-[var(--highlight)]/5 border border-[var(--highlight)]/20 px-3 py-1 rounded-full">
            <span className="w-1 h-1 rounded-full bg-[var(--highlight)] animate-[ping_1.2s_infinite]" />
            <span className="font-mono text-[8px] tracking-widest text-[var(--highlight)] uppercase font-bold">
              STAGE_01: INJECTING_FLOW
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM PIPELINE RUNNING MARQUEE */}
      <div className="kinetic-element marquee-fast-r flex whitespace-nowrap opacity-20 border-t border-[var(--border-color)]/40 pt-2 w-full font-mono text-[9px] tracking-[0.3em] text-[var(--text)] dir-rtl">
        <span className="px-4">
          // EST_ESTABLISHED NYC TERMINAL ACCESS SECURED
        </span>
        <span className="px-4">
          // EST_ESTABLISHED NYC TERMINAL ACCESS SECURED
        </span>
        <span className="px-4">
          // EST_ESTABLISHED NYC TERMINAL ACCESS SECURED
        </span>
        <span className="px-4">
          // EST_ESTABLISHED NYC TERMINAL ACCESS SECURED
        </span>
      </div>

      {/* Decorative Outer Corner Matrix Layout Brackets */}
      <div className="absolute top-6 left-6 w-5 h-5 border-t border-l border-[var(--border-color)] opacity-60" />
      <div className="absolute top-6 right-6 w-5 h-5 border-t border-r border-[var(--border-color)] opacity-60" />
      <div className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-[var(--border-color)] opacity-60" />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-[var(--border-color)] opacity-60" />
    </div>
  );
}
