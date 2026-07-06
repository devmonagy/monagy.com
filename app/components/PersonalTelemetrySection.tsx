// app/components/PersonalTelemetrySection.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SpotifyNowPlaying from "./SpotifyNowPlaying";
import WeatherWidget from "./WeatherWidget";
import CountriesVisited from "./CountriesVisited";
import CurrentlyLearning from "./CurrentlyLearning";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Deliberately NOT numbered "05." and NOT in the navbar, same treatment as
// EvolveTerminal right below it — this is a personal-telemetry bonus beat
// after the About→Experience→Projects→Contact case has already been made,
// not another step in that funnel.
export default function PersonalTelemetrySection() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".telemetry-reveal",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: scopeRef.current,
            start: "top 80%",
          },
        },
      );
    },
    { scope: scopeRef },
  );

  return (
    <section
      ref={scopeRef}
      // Matches Experience/Projects' padding scale (py-12 sm:py-20 md:py-28),
      // not About/Contact's bigger one — see the heading comment below for
      // why the whole treatment was switched to match those two instead.
      className="relative py-12 sm:py-20 md:py-28 overflow-hidden scroll-mt-24"
    >
      {/* Matches Experience/Projects' quieter heading treatment (smaller
          sans-serif size, rule line extending after it) instead of About/
          Contact's big Syne-font/period-accent one this originally copied.
          Those two are this site's "emotional weight" moments (the intro,
          the final CTA); Experience/Projects are reference material — this
          section is closer to the latter: a lower-stakes bonus, not
          another core beat, so it shouldn't visually compete with "Say
          Hello." for attention. */}
      <div className="telemetry-reveal flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-contrast)] sm:text-3xl md:text-4xl transition-colors duration-300">
          Off The Clock
        </h2>
        <div className="h-[1px] bg-[var(--border-color)] flex-1 hidden sm:block transition-colors duration-300" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="telemetry-reveal h-full">
          <SpotifyNowPlaying />
        </div>
        <div className="telemetry-reveal h-full">
          <WeatherWidget />
        </div>
        <div className="telemetry-reveal h-full">
          <CountriesVisited />
        </div>
        <div className="telemetry-reveal h-full">
          <CurrentlyLearning />
        </div>
      </div>
    </section>
  );
}
