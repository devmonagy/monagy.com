// app/components/ContactSection.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CONTACT_EMAIL = "contactmonagy@gmail.com";

export default function ContactSection() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-reveal",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: scopeRef.current,
            start: "top 80%",
          },
        },
      );

      // Continuous background marquee — deferred start avoids competing with
      // the entrance reveal's paint work
      gsap.to(".contact-marquee-loop", {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      });
    },
    { scope: scopeRef },
  );

  // Magnetic CTA — the email button drifts toward the cursor and hosts a
  // mouse-tracked spotlight, matching the interaction language already used
  // on the project/experience cards
  const handleCtaMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);

    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: dx * 0.15,
      y: dy * 0.3,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleCtaMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section
      id="contact"
      ref={scopeRef}
      className="relative py-20 sm:py-28 md:py-36 overflow-hidden scroll-mt-24"
    >
      {/* Background Depth Ambient Flare */}
      <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-[var(--highlight)] opacity-[0.05] rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Giant faint repeating background typography — same motif as the
          About section's MN/NAGY marquee and the footer's M_N wordmark */}
      <div className="absolute inset-0 flex items-center opacity-[0.025] select-none pointer-events-none -z-10 overflow-hidden">
        <div className="contact-marquee-loop flex whitespace-nowrap font-black font-['Syne',sans-serif] text-[16vw] tracking-tighter text-[var(--text-contrast)]">
          <span className="px-8">
            SAY HELLO • SAY HELLO • SAY HELLO • SAY HELLO •
          </span>
          <span className="px-8">
            SAY HELLO • SAY HELLO • SAY HELLO • SAY HELLO •
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center text-center">
        {/* Section ID Header Flag — continues the 01/02/03 numbering used by
            About, Experience, and Projects */}
        <div className="contact-reveal overflow-hidden mb-4">
          <span className="inline-block font-mono text-xs sm:text-sm text-[var(--highlight)] tracking-widest uppercase font-semibold">
            04. Get In Touch
          </span>
        </div>

        <h2 className="contact-reveal font-['Syne',sans-serif] text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-[var(--text-contrast)] leading-[1.05] transition-colors duration-300">
          Say Hello<span className="text-[var(--highlight)]">.</span>
        </h2>

        <p className="contact-reveal mt-6 max-w-xl text-sm sm:text-base text-[var(--text)] opacity-80 leading-relaxed transition-colors duration-300">
          Got a project in mind, or just want to talk shop? My inbox is
          always open — I read every message and usually reply within a day
          or two.
        </p>

        {/* Magnetic Email CTA */}
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Let's%20build%20something`}
          onMouseMove={handleCtaMouseMove}
          onMouseLeave={handleCtaMouseLeave}
          className="contact-reveal group/cta relative mt-10 inline-flex items-center gap-4 sm:gap-6 px-6 py-5 sm:px-10 sm:py-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] hover:border-[var(--highlight)]/60 text-[var(--text-contrast)] transition-colors duration-300 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] cursor-pointer"
          style={
            {
              "--mouse-x": "50%",
              "--mouse-y": "50%",
            } as React.CSSProperties
          }
        >
          <div
            className="absolute inset-0 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(320px at var(--mouse-x) var(--mouse-y), var(--radial-glow), transparent 70%)`,
            }}
          />

          <span className="relative z-10 w-2 h-2 rounded-full bg-[var(--highlight)] animate-pulse shrink-0" />

          <span className="relative z-10 font-['Syne',sans-serif] font-black text-base sm:text-2xl tracking-tight break-all sm:break-normal">
            {CONTACT_EMAIL}
          </span>

          <span className="relative z-10 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[var(--highlight)]/40 group-hover/cta:border-[var(--highlight)] group-hover/cta:bg-[var(--highlight)] text-[var(--highlight)] group-hover/cta:text-[var(--bg)] transition-all duration-300 shrink-0 text-lg font-bold">
            ↗
          </span>
        </a>

        <span className="contact-reveal inline-block mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text)] opacity-50">
          Based in NYC // Open to remote work worldwide
        </span>
      </div>
    </section>
  );
}
