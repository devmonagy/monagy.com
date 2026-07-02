// app/components/Navbar.tsx
"use client";

import React from "react";

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  return (
    <header
      id="navbarWrapper"
      className="sticky top-0 z-50 w-full transition-all duration-500 backdrop-blur-md bg-[var(--bg)]/60 border-b border-[var(--border-color)]/60"
    >
      {/* Structural Containment Boundary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-20 md:h-24 flex items-center justify-between relative">
        {/* LOGO ENGINE */}
        <div className="flex items-center gap-3 z-10">
          <div className="relative flex items-center justify-center w-7 h-7 rounded-md bg-[var(--highlight)]/10 border border-[var(--highlight)]/30 group overflow-hidden">
            <span className="font-mono text-xs font-black text-[var(--highlight)] group-hover:scale-110 transition-transform duration-300">
              M
            </span>
            <div className="absolute inset-0 bg-[var(--highlight)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
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

        {/* DYNAMIC NAVIGATION DECK */}
        {/* Mobile: Fixed bottom pill dock | Desktop: Aligned center-right header menu */}
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:static z-50 bg-[var(--card-bg)]/80 md:bg-transparent border border-[var(--border-color)]/60 md:border-transparent px-6 py-3.5 md:p-0 rounded-full md:rounded-none backdrop-blur-lg md:backdrop-blur-none shadow-[0_8px_32px_rgba(0,0,0,0.4)] md:shadow-none w-[90vw] max-w-[380px] md:w-auto md:max-w-none">
          <ul className="flex items-center justify-between md:justify-start gap-4 md:gap-10 font-['Plus_Jakarta_Sans',sans-serif] text-[11px] md:text-xs font-semibold uppercase tracking-[0.15em] md:tracking-[0.18em]">
            <li className="relative">
              <a
                href="#about"
                className="nav-link relative text-[var(--text)] hover:text-[var(--text-contrast)] pb-2 transition-colors group flex flex-col md:flex-row items-center"
              >
                <span className="text-[var(--highlight)] font-mono text-[9px] md:mr-1.5 opacity-60 font-medium md:inline block leading-none mb-1 md:mb-0">
                  01.
                </span>
                <span className="text-[10px] md:text-xs">About</span>
                {/* Hardware accelerated dynamic glide bar */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--highlight)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full link-indicator" />
              </a>
            </li>
            <li className="relative">
              <a
                href="#experience"
                className="nav-link relative text-[var(--text)] hover:text-[var(--text-contrast)] pb-2 transition-colors group flex flex-col md:flex-row items-center"
              >
                <span className="text-[var(--highlight)] font-mono text-[9px] md:mr-1.5 opacity-60 font-medium md:inline block leading-none mb-1 md:mb-0">
                  02.
                </span>
                <span className="text-[10px] md:text-xs">Experience</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--highlight)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full link-indicator" />
              </a>
            </li>
            <li className="relative">
              <a
                href="#projects"
                className="nav-link relative text-[var(--text)] hover:text-[var(--text-contrast)] pb-2 transition-colors group flex flex-col md:flex-row items-center"
              >
                <span className="text-[var(--highlight)] font-mono text-[9px] md:mr-1.5 opacity-60 font-medium md:inline block leading-none mb-1 md:mb-0">
                  03.
                </span>
                <span className="text-[10px] md:text-xs">Projects</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--highlight)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full link-indicator" />
              </a>
            </li>
          </ul>
        </nav>

        {/* METRICS & UTILITY SYSTEM */}
        <div className="flex items-center gap-4 sm:gap-6 z-10">
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

          <button
            id="themeToggle"
            type="button"
            onClick={toggleTheme}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl cursor-pointer relative hover:border-[var(--highlight)]/50 transition-all duration-300"
            aria-label="Toggle color pipeline"
          >
            <svg
              id="iconMoon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-4 h-4 sm:w-[18px] sm:h-[18px] fill-current absolute transition-all duration-500 ${
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
              className={`w-4 h-4 sm:w-[18px] sm:h-[18px] fill-current absolute transition-all duration-500 ${
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
}
