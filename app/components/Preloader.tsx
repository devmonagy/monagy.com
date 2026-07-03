// app/components/Preloader.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: onComplete,
    });

    // Award-level cinematic entrance & exit sequence
    tl.set(containerRef.current, { display: "flex" })
      .fromTo(
        ".loader-text-main",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
      )
      .fromTo(
        ".loader-sub-line",
        { width: "0%" },
        { width: "100%", duration: 1, ease: "power3.inOut" },
        "-=0.6",
      )
      .fromTo(
        ".loader-text-sub",
        { opacity: 0, y: 10 },
        { opacity: 0.6, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.2",
      )
      // Stagger out elements before opening curtain
      .to([".loader-text-main", ".loader-text-sub", ".loader-sub-line"], {
        opacity: 0,
        y: -30,
        duration: 0.6,
        stagger: 0.05,
        ease: "power4.in",
        delay: 0.4,
      })
      // Jaw-dropping geometric clip-path reveal shifting upward
      .to(containerRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.4,
        ease: "expo.inOut",
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg)] select-none transition-colors duration-300"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      {/* Structural Minimal Grid Framework Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-color)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Core Main Branding String */}
        <div className="overflow-hidden mb-3">
          <h2 className="loader-text-main font-['Syne',sans-serif] text-2xl sm:text-3xl md:text-4xl font-black tracking-[0.25em] text-[var(--highlight)] uppercase">
            NAGY_SYS
          </h2>
        </div>

        {/* Minimalist Micro Progress Line Divider */}
        <div className="loader-sub-line h-[1px] bg-gradient-to-r from-transparent via-[var(--highlight)]/40 to-transparent w-full mb-3" />

        {/* Status System Data Flags */}
        <div className="overflow-hidden">
          <p className="loader-text-sub font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--text)] whitespace-nowrap">
            INITIALIZING CORE PIPELINES v2.026
          </p>
        </div>
      </div>

      {/* Decorative Outer Corner Matrix Layout Brackets */}
      <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-[var(--border-color)]" />
      <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-[var(--border-color)]" />
      <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-[var(--border-color)]" />
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-[var(--border-color)]" />
    </div>
  );
}
