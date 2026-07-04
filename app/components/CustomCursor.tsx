// app/components/CustomCursor.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Custom cursors are a mouse-only concept — touch devices have no
    // persistent pointer, so leave them completely untouched
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("custom-cursor-active");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, opacity: 1, duration: 0.1 });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
      });
    };

    const handlePointerOver = (e: PointerEvent) => {
      const isInteractive = (e.target as HTMLElement)?.closest(
        INTERACTIVE_SELECTOR,
      );
      ring.classList.toggle("cursor-ring-active", Boolean(isInteractive));
      dot.classList.toggle("cursor-dot-active", Boolean(isInteractive));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("pointerover", handlePointerOver);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerover", handlePointerOver);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 z-[10000] pointer-events-none w-1.5 h-1.5 rounded-full bg-[var(--highlight)]"
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 z-[9999] pointer-events-none w-9 h-9 rounded-full border border-[var(--highlight)] transition-[width,height,background-color] duration-300"
      >
        {/* HUD reticle tick marks */}
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-px h-1.5 bg-[var(--highlight)]" />
        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-px h-1.5 bg-[var(--highlight)]" />
        <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-px w-1.5 bg-[var(--highlight)]" />
        <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-px w-1.5 bg-[var(--highlight)]" />
      </div>
    </>
  );
}
