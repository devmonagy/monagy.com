// app/components/CustomCursor.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useDesktopScale } from "../lib/desktopScale";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select";

// 1920px-canvas-locked base sizes (unscaled), matching the old fixed
// Tailwind values (w-1.5/h-1.5 dot, w-9/h-9 ring, w-1.5/h-1.5 tick marks) —
// multiplied by useDesktopScale() below so the cursor's real screen size
// stays visually constant across browser zoom instead of shrinking/growing
// with it, same as everything else DesktopCanvas locks. useDesktopScale()
// already resolves to 1 outside desktop range, so this is a no-op on
// mobile/tablet.
const BASE_DOT_SIZE = 6;
const BASE_RING_SIZE = 36;
const BASE_TICK_LENGTH = 6;
const BASE_TICK_THICKNESS = 1;

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const scale = useDesktopScale();

  // Custom cursors are a mouse-only concept — touch devices have no
  // persistent pointer. Gating the render itself (not just the positioning
  // logic) means the dot/ring never mount at all on touch devices, instead
  // of briefly sitting visible at their untransformed top-left CSS position.
  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

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
  }, [enabled]);

  if (!enabled) return null;

  // Portaled straight to `document.body` — MainPage's root div has
  // `isolation: isolate`, which confines this component's z-index to being
  // compared only INSIDE that subtree. The navbar (and anything else
  // portaled to body with its own z-index, like the mobile nav dock) sits
  // OUTSIDE that boundary as a body-level sibling, so no z-index inside the
  // isolated root — no matter how high — can ever paint above it. Portaling
  // here too puts the cursor in that same outer tier, with a z-index high
  // enough to stay above everything else that also lives there.
  const tickLength = BASE_TICK_LENGTH * scale;
  const tickThickness = BASE_TICK_THICKNESS * scale;
  const tickOffset = -tickLength;

  return createPortal(
    <>
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 z-[100000] pointer-events-none rounded-full bg-[var(--highlight)]"
        style={{ width: BASE_DOT_SIZE * scale, height: BASE_DOT_SIZE * scale }}
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 z-[99999] pointer-events-none rounded-full border border-[var(--highlight)] transition-[width,height,background-color] duration-300"
        style={
          {
            width: BASE_RING_SIZE * scale,
            height: BASE_RING_SIZE * scale,
            // Read by .cursor-ring-active in globals.css, so the hover-enlarged
            // state (a fixed 3.5rem there) scales the same way instead of
            // snapping to an unscaled size the moment you hover a link/button.
            "--cursor-scale": scale,
          } as React.CSSProperties
        }
      >
        {/* HUD reticle tick marks */}
        <span
          className="absolute left-1/2 -translate-x-1/2 bg-[var(--highlight)]"
          style={{ top: tickOffset, width: tickThickness, height: tickLength }}
        />
        <span
          className="absolute left-1/2 -translate-x-1/2 bg-[var(--highlight)]"
          style={{ bottom: tickOffset, width: tickThickness, height: tickLength }}
        />
        <span
          className="absolute top-1/2 -translate-y-1/2 bg-[var(--highlight)]"
          style={{ left: tickOffset, height: tickThickness, width: tickLength }}
        />
        <span
          className="absolute top-1/2 -translate-y-1/2 bg-[var(--highlight)]"
          style={{ right: tickOffset, height: tickThickness, width: tickLength }}
        />
      </div>
    </>,
    document.body,
  );
}
