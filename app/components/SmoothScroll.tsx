"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import the mandatory structural layout CSS to fix jittering
import "lenis/dist/lenis.css";

// Runs inside <ReactLenis> so useLenis() re-fires once the instance is ready
// (it's created async, one render after mount — reading it via a ref on
// mount misses it). Lenis keeps driving its own scroll loop as usual; this
// just tells ScrollTrigger to re-evaluate on every Lenis scroll tick, so its
// cached scroll position never lags a frame behind Lenis's eased value —
// that mismatch was the source of the scrub/parallax jitter.
function LenisGsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    gsap.registerPlugin(ScrollTrigger);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();
  }, [lenis]);

  return null;
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
}
