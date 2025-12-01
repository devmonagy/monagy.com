// app/components/MainPage.tsx
"use client";

import { useEffect, useState } from "react";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import FooterSection from "./FooterSection";

export default function MainPage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Load theme from localStorage on first render
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme");
    if (stored === "light") {
      setTheme("light");
      document.body.classList.add("light");
    } else {
      setTheme("dark");
      document.body.classList.remove("light");
    }
  }, []);

  // Keep body class + localStorage in sync with theme state
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (theme === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Navbar active link, scrolled state, and scroll-to-top visibility
  useEffect(() => {
    if (typeof window === "undefined") return;

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("nav a[href^='#']")
    );
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]")
    );
    const wrapper = document.getElementById("navbarWrapper");

    const handleLinkClick = (e: MouseEvent, link: HTMLAnchorElement) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (!href) return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    links.forEach((link) => {
      const listener = (e: MouseEvent) => handleLinkClick(e, link);
      link.addEventListener("click", listener);
      // store listener on the element for cleanup
      (link as any)._navListener = listener;
    });

    const onScroll = () => {
      const scrollPos = window.scrollY + 120;

      // active link highlighting
      sections.forEach((sec) => {
        if (
          scrollPos >= sec.offsetTop &&
          scrollPos < sec.offsetTop + sec.offsetHeight
        ) {
          links.forEach((a) => a.classList.remove("active"));
          const activeLink = document.querySelector<HTMLAnchorElement>(
            `nav a[href="#${sec.id}"]`
          );
          activeLink?.classList.add("active");
        }
      });

      // navbar "scrolled" style
      if (wrapper) {
        if (window.scrollY > 20) {
          wrapper.classList.add("scrolled");
        } else {
          wrapper.classList.remove("scrolled");
        }
      }

      // scroll-to-top button
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // run once

    // Fix mobile "stuck hover" on project cards (like in original JS)
    if (window.innerWidth <= 768) {
      const projectCards = document.querySelectorAll<HTMLElement>(
        "#projects .hover\\:border-\\[var\\(--highlight\\)\\]"
      );
      projectCards.forEach((card) => {
        const touchHandler = () => {
          card.classList.remove(
            "hover:border-[var(--highlight)]",
            "hover:shadow-[0_0_10px_var(--highlight)]"
          );
          void card.offsetWidth; // reflow
          card.classList.add(
            "hover:border-[var(--highlight)]",
            "hover:shadow-[0_0_10px_var(--highlight)]"
          );
        };
        card.addEventListener("touchstart", touchHandler);
        (card as any)._touchHandler = touchHandler;
      });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      links.forEach((link) => {
        const listener = (link as any)._navListener as
          | ((e: MouseEvent) => void)
          | undefined;
        if (listener) {
          link.removeEventListener("click", listener);
        }
      });
      // no need to cleanup projectCard touch handlers aggressively, but could here if desired
    };
  }, []);

  const handleScrollTopClick = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* NAVBAR – top scrollable nav, like original */}
      <div
        id="navbarWrapper"
        className="sticky top-0 z-50 w-full backdrop-blur-sm bg-[var(--bg)]/70 border-b transition-all"
        style={{ borderColor: "var(--border-color)" }}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <nav>
            <ul className="flex gap-6 sm:gap-8 text-sm">
              <li>
                <a
                  href="#about"
                  className="relative active pb-1 border-b-2 border-transparent hover:text-[var(--highlight)] transition-all"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#experience"
                  className="relative pb-1 border-b-2 border-transparent hover:text-[var(--highlight)] transition-all"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="relative pb-1 border-b-2 border-transparent hover:text-[var(--highlight)] transition-all"
                >
                  Projects
                </a>
              </li>
            </ul>
          </nav>

          {/* THEME TOGGLE – same id so JS + CSS work; uses CSS variables */}
          <button
            id="themeToggle"
            type="button"
            onClick={toggleTheme}
            className="theme-toggle w-10 h-10 flex items-center justify-center bg-[var(--card-bg)] border border-white/20 rounded-full cursor-pointer relative"
            style={{ borderColor: "var(--border-color)" }}
            aria-label="Toggle theme"
          >
            {/* Moon icon */}
            <svg
              id="iconMoon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-5 h-5 fill-current absolute transition-all ${
                theme === "dark"
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-50"
              }`}
            >
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
            {/* Sun icon */}
            <svg
              id="iconSun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-5 h-5 fill-current absolute transition-all ${
                theme === "light"
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-50"
              }`}
            >
              <circle cx="12" cy="12" r="5" />
              <g stroke="currentColor" strokeWidth="2">
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

      {/* HERO under navbar */}
      <div className="max-w-3xl mx-auto px-4 py-10 text-left">
        <h1 className="text-4xl font-bold mb-2">Mohamed Nagy</h1>
        <p className="text-xl text-[var(--highlight)] mb-3">
          Crafting pixel-perfect, user-centric web experiences 🚀
        </p>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-3xl mx-auto px-4 pb-16">
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <FooterSection />
      </main>

      {/* Scroll to top button */}
      <button
        id="scrollToTop"
        onClick={handleScrollTopClick}
        className={`fixed bottom-6 right-6 w-10 h-10 flex items-center justify-center bg-[var(--card-bg)] border border-white/20 rounded-full cursor-pointer transition-all ${
          showScrollTop
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <span className="text-xl">↑</span>
      </button>
    </div>
  );
}
