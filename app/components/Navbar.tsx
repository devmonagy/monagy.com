// app/components/Navbar.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const mobileDockRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure portal target exists on client mount
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useGSAP(
    () => {
      if (!mounted) return;

      // 1. Mobile Hide / Show on Scroll Direction
      if (mobileDockRef.current) {
        const showAnim = gsap
          .from(mobileDockRef.current, {
            y: 100,
            opacity: 0,
            paused: true,
            duration: 0.4,
            ease: "power3.out",
          })
          .progress(1);

        ScrollTrigger.create({
          start: "top top",
          end: "max",
          onUpdate: (self) => {
            if (self.direction === 1) {
              showAnim.reverse();
            } else {
              showAnim.play();
            }
          },
        });
      }

      // 2. Multi-Theme Intersection Highlight Tracking Matrix
      const sections = ["about", "experience", "projects"];

      sections.forEach((id) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top 40%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (self.isActive) {
              // Target elements across both desktop and mobile layouts safely
              gsap.to(`a[href="#${id}"]`, {
                color: "var(--highlight)",
                borderBottomColor: "var(--highlight)",
                duration: 0.3,
                overwrite: "auto",
              });
            } else {
              gsap.to(`a[href="#${id}"]`, {
                color: "var(--text)",
                borderBottomColor: "transparent",
                duration: 0.3,
                overwrite: "auto",
              });
            }
          },
        });
      });
    },
    { dependencies: [mounted] },
  );

  // Render the core desktop layout structure inline
  const mainNavbarContent = (
    <header
      id="navbarWrapper"
      className="sticky top-0 z-50 w-full transition-all duration-500 backdrop-blur-md bg-[var(--bg)]/60 border-b border-[var(--border-color)]/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-16 md:h-24 flex items-center justify-between relative">
        {/* LEFT LOGO SYSTEM */}
        <div className="flex items-center gap-3 z-10">
          <div className="relative flex items-center justify-center w-7 h-7 rounded-md bg-[var(--highlight)]/10 border border-[var(--highlight)]/30 shrink-0">
            <span className="font-mono text-xs font-black text-[var(--highlight)]">
              M
            </span>
          </div>
          <div className="flex flex-col select-none">
            <span className="font-['Syne',sans-serif] font-extrabold text-xs sm:text-sm tracking-tight text-[var(--text-contrast)] leading-none">
              NAGY
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[var(--highlight)] mt-1 font-bold">
              SYS // V2.026
            </span>
          </div>
        </div>

        {/* DESKTOP ONLY NAVIGATION */}
        <nav className="hidden md:flex items-center">
          <ul className="flex items-center gap-8 font-['Plus_Jakarta_Sans',sans-serif] text-xs font-semibold uppercase tracking-[0.18em]">
            <li>
              <a
                href="#about"
                className="nav-link text-[var(--text)] transition-colors duration-200 pb-2 block border-b-2 border-transparent"
              >
                <span className="text-[var(--highlight)] font-mono text-[10px] mr-1.5 opacity-60">
                  01.
                </span>
                About
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className="nav-link text-[var(--text)] transition-colors duration-200 pb-2 block border-b-2 border-transparent"
              >
                <span className="text-[var(--highlight)] font-mono text-[10px] mr-1.5 opacity-60">
                  02.
                </span>
                Experience
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="nav-link text-[var(--text)] transition-colors duration-200 pb-2 block border-b-2 border-transparent"
              >
                <span className="text-[var(--highlight)] font-mono text-[10px] mr-1.5 opacity-60">
                  03.
                </span>
                Projects
              </a>
            </li>
          </ul>
        </nav>

        {/* RIGHT UTILITIES */}
        <div className="flex items-center gap-4 z-10">
          <div className="hidden lg:flex flex-col text-right font-mono text-[10px] select-none border-l border-[var(--border-color)] pl-5">
            <div className="flex items-center justify-end gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--highlight)] animate-[ping_1.8s_infinite]" />
              <span className="text-[var(--text-contrast)] font-bold tracking-wider">
                SYS_STATUS // ONLINE
              </span>
            </div>
            <span className="text-[var(--text)] opacity-40 mt-1 tracking-widest">
              LOC: NYC · 40.7654° N
            </span>
          </div>

          {/* Theme Toggle Button */}
          <button
            id="themeToggle"
            type="button"
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl cursor-pointer relative hover:border-[var(--highlight)]/50 transition-all duration-300 shrink-0"
            aria-label="Toggle color pipeline"
          >
            <svg
              id="iconMoon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-4 h-4 fill-current absolute transition-all duration-500 ${
                theme === "dark"
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-50 -rotate-90"
              }`}
            >
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
            <svg
              id="iconSun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-4 h-4 fill-current absolute transition-all duration-500 ${
                theme === "light"
                  ? "opacity-100 scale-100 rotate-0 text-[var(--highlight)]"
                  : "opacity-0 scale-50 rotate-90"
              }`}
            >
              <circle cx="12" cy="12" r="5" />
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="1" x2="12" y2="4" />
                <line x1="12" y1="20" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="4" y2="12" />
                <line x1="20" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );

  // Portable Floating Component Structure
  const floatingMobileDock = mounted
    ? createPortal(
        <div
          ref={mobileDockRef}
          className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[92vw] max-w-[360px] will-change-transform"
        >
          <nav className="bg-[var(--card-bg)]/85 border border-[var(--border-color)] rounded-full backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.3)] px-6 py-3.5">
            <ul className="flex items-center justify-between font-['Plus_Jakarta_Sans',sans-serif] text-[11px] font-bold uppercase tracking-[0.14em]">
              <li>
                <a
                  href="#about"
                  className="nav-link text-[var(--text)] px-2 pb-1 block border-b-2 border-transparent transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="nav-link text-[var(--text)] px-2 pb-1 block border-b-2 border-transparent transition-colors"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="nav-link text-[var(--text)] px-2 pb-1 block border-b-2 border-transparent transition-colors"
                >
                  Projects
                </a>
              </li>
            </ul>
          </nav>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      {mainNavbarContent}
      {floatingMobileDock}
    </>
  );
}
