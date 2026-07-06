// app/components/FooterSection.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function FooterSection() {
  const footerScopeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Subtle reveal for structural lines and massive typography block on viewport entrance
      gsap.fromTo(
        ".footer-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerScopeRef.current,
            start: "top 90%",
          },
        },
      );
    },
    { scope: footerScopeRef },
  );

  return (
    <footer
      ref={footerScopeRef}
      className="relative mt-28 border-t border-[var(--border-color)] bg-[var(--bg)] pt-16 pb-12 overflow-hidden transition-colors duration-300"
    >
      {/* Background Depth Ambient Blur */}
      <div className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] bg-[var(--highlight)] opacity-[0.03] rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="w-full flex flex-col gap-16">
        {/* Top Segment: Editorial Links & Meta Information */}
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-8 items-start">
          {/* Column 1: Core Navigation Intent */}
          <div className="col-span-12 sm:col-span-6 md:col-span-4 flex flex-col gap-4 footer-reveal">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--highlight)] font-semibold">
              // Navigation Matrix
            </span>
            <ul className="flex flex-col gap-2 font-[family-name:var(--font-syne)] text-xl font-bold text-[var(--text-contrast)]">
              <li>
                <a
                  href="#about"
                  className="hover:text-[var(--highlight)] active:text-[var(--highlight)] transition-colors duration-200 group flex items-center gap-2"
                >
                  <span className="text-xs font-mono opacity-40 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
                    01/
                  </span>{" "}
                  About
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="hover:text-[var(--highlight)] active:text-[var(--highlight)] transition-colors duration-200 group flex items-center gap-2"
                >
                  <span className="text-xs font-mono opacity-40 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
                    02/
                  </span>{" "}
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-[var(--highlight)] active:text-[var(--highlight)] transition-colors duration-200 group flex items-center gap-2"
                >
                  <span className="text-xs font-mono opacity-40 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
                    03/
                  </span>{" "}
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-[var(--highlight)] active:text-[var(--highlight)] transition-colors duration-200 group flex items-center gap-2"
                >
                  <span className="text-xs font-mono opacity-40 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
                    04/
                  </span>{" "}
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: System Specifications / Architecture Tokens */}
          <div className="col-span-12 sm:col-span-6 md:col-span-4 flex flex-col gap-4 footer-reveal">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text)] opacity-60">
              // System Engine Specs
            </span>
            <div className="flex flex-wrap gap-2 max-w-xs font-mono text-[11px] text-[var(--text)]">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "GSAP",
                "Vercel",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-[var(--card-bg)] border border-[var(--border-color)] shadow-[0_1px_3px_rgba(0,0,0,0.01)] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Column 3: Professional Networks / Actions */}
          <div className="col-span-12 md:col-span-4 flex flex-col gap-4 md:items-end footer-reveal">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text)] opacity-60 md:text-right">
              // External Sync
            </span>
            <div className="flex flex-col gap-3 font-mono text-xs w-full md:max-w-[200px]">
              <a
                href="https://github.com/devmonagy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center py-2 border-b border-[var(--border-color)] hover:border-[var(--highlight)] text-[var(--text-contrast)] transition-colors group"
              >
                <span>GITHUB</span>
                <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/devmonagy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center py-2 border-b border-[var(--border-color)] hover:border-[var(--highlight)] text-[var(--text-contrast)] transition-colors group"
              >
                <span>LINKEDIN</span>
                <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </a>
              <a
                href="https://codepen.io/devmonagy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center py-2 border-b border-[var(--border-color)] hover:border-[var(--highlight)] text-[var(--text-contrast)] transition-colors group"
              >
                <span>CODEPEN</span>
                <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Center Canvas: Giant Structural Brand Banner (Zero-Wrap SVG Geometry) */}
        <div className="w-full select-none pointer-events-none border-t border-[var(--border-color)] pt-8 overflow-hidden footer-reveal">
          <svg
            viewBox="0 0 800 180"
            className="w-full h-auto text-[var(--text-contrast)] opacity-[0.03] body.light:opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="50%"
              y="70%"
              dominantBaseline="middle"
              textAnchor="middle"
              className="font-[family-name:var(--font-syne)] font-black tracking-tighter"
              style={{ fontSize: "170px", fill: "currentColor" }}
            >
              M_N
            </text>
          </svg>
        </div>

        {/* Bottom Segment: Copyright & System Baseline Status */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-t border-[var(--border-color)] pt-8 font-mono text-[10px] tracking-wider text-[var(--text)] opacity-70 footer-reveal">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} MoNAGY.com // ALL RIGHTS RESERVED
          </div>
          <div className="flex items-center justify-center gap-4">
            <span>LOC: NYC // EST</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--highlight)] opacity-60 animate-pulse" />
            <span>CORE_ENGINE_V2.026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
