"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import the mandatory structural layout CSS to fix jittering
import "lenis/dist/lenis.css";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Sync GSAP's global refresh mechanism with Lenis layout shifts
    ScrollTrigger.refresh();
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12, // Lower = smoother, Higher = faster response (0.12 is snappy & premium)
        duration: 1.0, // Cuts scroll drag down so you navigate sections effortlessly
        smoothWheel: true, // Keeps mouse wheel fluid
        syncTouch: false, // Set to false to avoid mobile browser conflicts
      }}
    >
      {children}
    </ReactLenis>
  );
}
