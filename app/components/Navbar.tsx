// app/components/Navbar.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  DESKTOP_CANVAS_WIDTH,
  useDesktopScale,
  useIsDesktopRange,
} from "../lib/desktopScale";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

// Unscaled (1920px-canvas) header height on desktop — matches the inner
// content's own `md:h-24` (96px; `md` is always active once isDesktopRange
// is true, since DESKTOP_BREAKPOINT sits above Tailwind's `md`). Kept as a
// sibling constant rather than measured, since the header's height never
// varies with content on desktop.
const NAVBAR_DESKTOP_HEIGHT = 96;

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const mobileDockRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const isDesktopRange = useIsDesktopRange();
  const scale = useDesktopScale();

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
      const sections = ["about", "experience", "projects", "contact"];

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

  const handleLogoClick = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // The actual nav content, factored out so it can render either unwrapped
  // (mobile/tablet, untouched) or inside the 1920px-canvas scale layer below
  // (desktop) without keeping two copies in sync. The glass treatment
  // (backdrop-blur/bg/border) lives here rather than on the full-width
  // `<header>` on purpose — it's scoped to the same max-w-7xl column as the
  // rest of the page's content, so the margins either side stay clear and
  // AppBackground's matrix rain reads through unobstructed instead of
  // getting blurred/tinted across the entire viewport width.
  const navInner = (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-16 md:h-24 flex items-center justify-between relative backdrop-blur-md bg-[var(--bg)]/60 border-b border-[var(--border-color)]/60">
        {/* LEFT LOGO SYSTEM — same M_N brand mark as the favicon/social image
            system, so the identity is consistent everywhere it appears */}
        <button
          type="button"
          onClick={handleLogoClick}
          aria-label="Scroll to top"
          className="group/logo relative flex items-center gap-3 z-10 cursor-pointer select-none"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0">
            {/* Ambient rotating glow ring — same signature effect used on the
                About section's kinetic card, GPU-only (transform: rotate) */}
            <div
              className="absolute -inset-1 rounded-xl opacity-50 group-hover/logo:opacity-100 blur-[3px] transition-opacity duration-500 pointer-events-none animate-[rotateGlow_6s_linear_infinite]"
              style={{
                background: `conic-gradient(from 0deg, transparent 0%, var(--highlight) 20%, transparent 40%)`,
              }}
            />
            <div className="relative w-full h-full flex items-center justify-center rounded-xl bg-[var(--card-bg)] border border-[var(--highlight)]/40 group-hover/logo:border-[var(--highlight)] transition-all duration-300 group-active/logo:scale-95">
              <span className="font-['Syne',sans-serif] font-black text-sm sm:text-base tracking-tighter text-[var(--text-contrast)] leading-none">
                M<span className="text-[var(--highlight)]">_</span>N
              </span>
            </div>
          </div>

          <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[var(--highlight)] font-bold group-hover/logo:text-[var(--text-contrast)] transition-colors duration-300">
            SYS // V2.026
          </span>
        </button>

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
            <li>
              <a
                href="#contact"
                className="nav-link text-[var(--text)] transition-colors duration-200 pb-2 block border-b-2 border-transparent"
              >
                <span className="text-[var(--highlight)] font-mono text-[10px] mr-1.5 opacity-60">
                  04.
                </span>
                Contact
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
  );

  // `position: fixed` instead of `sticky` — sticky kept silently reverting
  // to scrolling away with the page even with every known transformed
  // ancestor removed, which pointed at some other sticky-specific edge case
  // rather than a clean containing-block bug. `fixed` sidesteps that whole
  // class of quirk (no flow-position "activation" logic to get wrong) and
  // is the same positioning already proven reliable elsewhere in this exact
  // tree (AppBackground, CustomCursor, the scroll-to-top button). Since
  // `fixed` takes the header out of flow, navbarSpacer below reserves the
  // same height it used to occupy so content doesn't jump underneath it.
  //
  // On desktop, the header's own real height locks to the 1920px canvas
  // (inline `height` below) while navInner renders at the canvas's native
  // 1920px width and gets transform-scaled to fit — the same technique
  // DesktopCanvas uses for <main>, just applied to a `position: fixed`
  // element instead of a normal in-flow one. That's safe here for the same
  // reason it was safe under `sticky`: only an ANCESTOR's transform breaks
  // fixed/sticky positioning, never a descendant's. Below the breakpoint
  // navInner renders unwrapped/unscaled, same as always.
  const headerElement = (
    <header
      id="navbarWrapper"
      className="fixed top-0 left-0 z-[1000] w-full transition-all duration-500"
      style={isDesktopRange ? { height: NAVBAR_DESKTOP_HEIGHT * scale } : undefined}
    >
      {isDesktopRange ? (
        <div
          style={{
            width: DESKTOP_CANVAS_WIDTH,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {navInner}
        </div>
      ) : (
        navInner
      )}
    </header>
  );

  // Bumping z-index alone didn't beat DesktopCanvas's content: it sits
  // inside a `transform`-scaled sibling, and a `fixed` + `backdrop-blur`
  // element nested a few levels up from a transformed sibling is exactly
  // the setup where Chromium/WebKit compositing can ignore z-index math
  // entirely (this only surfaced once the header was actually staying
  // fixed while scrolling past that content — never showed up before).
  // Portaling straight to `document.body` sidesteps the ambiguity outright,
  // by using the exact same pattern floatingMobileDock already relies on
  // below: it makes the header a direct sibling of MainPage's whole root
  // div at the body level, instead of a nested descendant competing inside
  // it, so z-index compares against that one opaque subtree rather than
  // whatever's happening inside DesktopCanvas's transform layer. Renders
  // inline (unportaled) until mount to match SSR output, same reasoning as
  // floatingMobileDock further down.
  const mainNavbarContent = mounted
    ? createPortal(headerElement, document.body)
    : headerElement;

  // Reserves the flow space the header used to occupy back when it was
  // `position: sticky` (which stays in flow) now that it's `fixed` (which
  // doesn't) — same height logic as the header itself, so the gap it leaves
  // always matches exactly, scaled or not.
  const navbarSpacer = (
    <div
      aria-hidden="true"
      className="h-16 md:h-24 w-full"
      style={isDesktopRange ? { height: NAVBAR_DESKTOP_HEIGHT * scale } : undefined}
    />
  );

  // Portable Floating Component Structure
  const floatingMobileDock = mounted
    ? createPortal(
        <div
          ref={mobileDockRef}
          className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[92vw] max-w-[360px] will-change-transform"
        >
          <nav className="bg-[var(--card-bg)]/85 border border-[var(--border-color)] rounded-full backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.3)] px-3 py-3 overflow-hidden">
            <ul className="flex items-center justify-between font-['Plus_Jakarta_Sans',sans-serif] text-[10px] font-bold uppercase tracking-[0.03em] whitespace-nowrap">
              <li>
                <a
                  href="#about"
                  className="nav-link text-[var(--text)] px-1 pb-1 block border-b-2 border-transparent transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="nav-link text-[var(--text)] px-1 pb-1 block border-b-2 border-transparent transition-colors"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="nav-link text-[var(--text)] px-1 pb-1 block border-b-2 border-transparent transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="nav-link text-[var(--text)] px-1 pb-1 block border-b-2 border-transparent transition-colors"
                >
                  Contact
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
      {navbarSpacer}
      {floatingMobileDock}
    </>
  );
}
