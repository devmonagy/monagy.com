// app/components/MainPage.tsx
"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";
import EvolveTerminal from "./EvolveTerminal";
import FooterSection from "./FooterSection";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";
import AppBackground from "./AppBackground";
import DesktopCanvas from "./DesktopCanvas";

export default function MainPage() {
  const [isLoaded, setIsLoaded] = useState(false);
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

  // Swap the browser tab favicon to match the active theme, live, with no
  // page refresh. Mutating the existing <link>'s href isn't reliable across
  // browsers (Safari in particular can ignore it) — removing it and adding a
  // fresh <link> element forces every browser to pick up the change.
  useEffect(() => {
    if (typeof document === "undefined") return;

    const href = `${theme === "light" ? "/icon-light" : "/icon"}?v=${Date.now()}`;

    document
      .querySelectorAll<HTMLLinkElement>("link[rel='icon']")
      .forEach((link) => link.remove());

    const iconLink = document.createElement("link");
    iconLink.rel = "icon";
    iconLink.type = "image/png";
    iconLink.href = href;
    document.head.appendChild(iconLink);
  }, [theme]);

  // Navbar link smoothing & mobile touch interactions
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isLoaded) return;

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("nav a[href^='#']"),
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
      if (wrapper) {
        if (window.scrollY > 20) {
          wrapper.classList.add("scrolled");
        } else {
          wrapper.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
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

  const scrollTopButton = (
    <button
      id="scrollToTop"
      onClick={handleScrollTopClick}
      className="w-9 h-9 flex items-center justify-center bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl cursor-pointer shadow-lg hover:border-[var(--highlight)] hover:shadow-[0_0_20px_var(--hover-glow)] transition-all duration-300 shrink-0 pointer-events-auto"
      aria-label="Scroll to top of container"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 text-[var(--text-contrast)]"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300 relative isolate">
      <CustomCursor />
      <AppBackground />

      {/* CINEMATIC FULL SCREEN LOADING ENGINE PLATFORM */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/*
        Navbar, CustomCursor, Preloader, and AppBackground stay outside
        DesktopCanvas on purpose — all use `position: fixed` (Navbar
        included, see Navbar.tsx for why it moved off `sticky`) and need to
        stay glued to the real viewport as you scroll, but a transformed
        ancestor (DesktopCanvas's scale wrapper) becomes the containing
        block for `fixed` descendants (a well-documented casualty of nesting
        inside any transformed ancestor — confirmed by testing, not just a
        paper risk). Since the ancestor is a normal (non-fixed) block sized
        to the full scrollable page, anything fixed inside it scrolls away
        with the page instead of staying pinned to the screen — exactly
        backwards for a persistent nav bar or an "always visible"
        background. Keeping them outside preserves their original, working
        behavior; they just don't participate in the 1920px-canvas scaling
        (a video-game-HUD-style tradeoff: viewport chrome stays a consistent
        size regardless of the locked design's zoom level, only the actual
        scrollable content scales).

        The scroll-to-top button is the opposite case on purpose: it's
        rendered INSIDE <main> below, as a normal in-flow element pinned to
        the bottom of the whole page rather than the viewport — it should
        only ever be seen once you've actually scrolled to the end of the
        app, not float alongside you the whole way down. Being inside <main>
        also means it rides the same 1920px-canvas scaling as everything
        else there, which is what keeps its right edge lined up with the
        header's theme toggle above.
      */}
      {isLoaded && (
        <div className="opacity-0 animate-[fadeInOpacityOnly_1s_cubic-bezier(0.25,1,0.5,1)_forwards]">
          {/* REFACTORED HIGH-FIDELITY NAVBAR HEADER */}
          <Navbar theme={theme} toggleTheme={toggleTheme} />
        </div>
      )}

      <DesktopCanvas>
        {/* CORE WEB APPLICATION CONTAINER CORE REVEAL */}
        {isLoaded && (
          <div className="opacity-0 animate-[fadeInContent_1s_cubic-bezier(0.25,1,0.5,1)_forwards]">
            {/* CORE ALIGNED TRACKING CONTAINER CONTEXT */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-16">
              <AboutSection />
              <ExperienceSection />
              <ProjectsSection />
              <ContactSection />
              <div className="pt-8 sm:pt-16 md:pt-24 flex justify-center w-full">
                <EvolveTerminal />
              </div>
              <FooterSection />
              {/* In normal document flow (not fixed) so it stays put at the
                  bottom of the page instead of floating alongside the
                  viewport while scrolling — see the block comment above. */}
              <div className="pt-8 flex justify-end">{scrollTopButton}</div>
            </main>
          </div>
        )}
      </DesktopCanvas>
    </div>
  );
}
