// app/components/MainPage.tsx
"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import FooterSection from "./FooterSection";
import Preloader from "./Preloader";

export default function MainPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Load theme from localStorage on first render
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("theme");
    const root = document.documentElement;
    const body = document.body;

    if (stored === "light") {
      setTheme("light");
      root.classList.add("light");
      root.classList.remove("dark");
      body.classList.add("light");
    } else {
      setTheme("dark");
      root.classList.add("dark");
      root.classList.remove("light");
      body.classList.remove("light");
    }
  }, []);

  // Synchronize documentElement root + body class tokens with active context state
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    const body = document.body;

    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
      body.classList.add("light");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
      body.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Navbar active link, scrolled state, and scroll-to-top visibility
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isLoaded) return;

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("nav a[href^='#']"),
    );
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]"),
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
      (link as any)._navListener = listener;
    });

    const onScroll = () => {
      const scrollPos = window.scrollY + 120;

      sections.forEach((sec) => {
        if (
          scrollPos >= sec.offsetTop &&
          scrollPos < sec.offsetTop + sec.offsetHeight
        ) {
          links.forEach((a) => a.classList.remove("active"));
          const activeLinks = document.querySelectorAll<HTMLAnchorElement>(
            `nav a[href="#${sec.id}"]`,
          );
          activeLinks.forEach((link) => link.classList.add("active"));
        }
      });

      if (wrapper) {
        if (window.scrollY > 20) {
          wrapper.classList.add("scrolled");
        } else {
          wrapper.classList.remove("scrolled");
        }
      }

      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    // Safe, reliable project card hover fix for mobile touch layouts
    if (window.innerWidth <= 768) {
      const projectCards =
        document.querySelectorAll<HTMLElement>("#projects .tile");
      projectCards.forEach((card) => {
        const touchHandler = () => {
          card.classList.remove(
            "hover:border-[var(--highlight)]",
            "hover:shadow-[0_0_10px_var(--highlight)]",
          );
          void card.offsetWidth; // Force Reflow
          card.classList.add(
            "hover:border-[var(--highlight)]",
            "hover:shadow-[0_0_10px_var(--highlight)]",
          );
        };
        card.addEventListener("touchstart", touchHandler, { passive: true });
        (card as any)._touchHandler = touchHandler;
      });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      links.forEach((link) => {
        const listener = (link as any)._navListener;
        if (listener) {
          link.removeEventListener("click", listener);
        }
      });
    };
  }, [isLoaded]);

  const handleScrollTopClick = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      {/* CINEMATIC FULL SCREEN LOADING ENGINE PLATFORM */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* CORE WEB APPLICATION CONTAINER CORE REVEAL */}
      {isLoaded && (
        <div className="opacity-0 animate-[fadeInContent_1s_cubic-bezier(0.25,1,0.5,1)_forwards]">
          {/* REFACTORED HIGH-FIDELITY NAVBAR HEADER */}
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          {/* CORE ALIGNED TRACKING CONTAINER CONTEXT */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-16">
            <AboutSection />
            <ExperienceSection />
            <ProjectsSection />
            <FooterSection />
          </main>

          {/* Scroll to top button */}
          <button
            id="scrollToTop"
            onClick={handleScrollTopClick}
            className={`fixed bottom-6 right-6 w-10 h-10 flex items-center justify-center bg-[var(--card-bg)] border border-white/20 rounded-full cursor-pointer transition-all duration-300 shadow-md hover:border-[var(--highlight)] hover:text-[var(--highlight)] ${
              showScrollTop
                ? "opacity-100 pointer-events-auto translate-y-0"
                : "opacity-0 pointer-events-none translate-y-4"
            }`}
            aria-label="Scroll to top"
          >
            <span className="text-xl font-mono">↑</span>
          </button>
        </div>
      )}
    </div>
  );
}
