// app/components/MainPage.tsx
"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import FooterSection from "./FooterSection";
import Preloader from "./Preloader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

  // Navbar active link, scrolled state, and scroll-to-top visibility animations
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isLoaded) return;

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("nav a[href^='#']"),
    );
    const wrapper = document.getElementById("navbarWrapper");
    const scrollTopBtn = document.getElementById("scrollToTop");

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

    // Unified ScrollTrigger to manage structural tracking and show-on-scroll-up patterns
    let showAnim: gsap.core.Tween | null = null;
    if (scrollTopBtn) {
      showAnim = gsap
        .fromTo(
          scrollTopBtn,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, paused: true, duration: 0.4, ease: "power3.out" },
        )
        .progress(0);
    }

    const onScroll = () => {
      const currentScrollY = window.scrollY;

      // Toggle overall visibility tracking context threshold
      const isPastThreshold = currentScrollY > 300;
      setShowScrollTop(isPastThreshold);

      if (wrapper) {
        if (currentScrollY > 20) {
          wrapper.classList.add("scrolled");
        } else {
          wrapper.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    // GSAP ScrollTrigger handler to capture directionality
    const scrollTriggerInstance = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        if (!showAnim || window.scrollY <= 300) {
          if (showAnim) showAnim.reverse();
          return;
        }

        // direction === 1 means scrolling down, -1 means scrolling up
        if (self.direction === 1) {
          showAnim.reverse();
        } else {
          showAnim.play();
        }
      },
    });

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
      scrollTriggerInstance.kill();
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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300 relative">
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

          {/* 
            FIXED SCROLL-TO-TOP LAYOUT ANCHOR CONTAINER
            Pins the tracking layer cleanly down to match your max-w-7xl structural boundaries 
          */}
          <div className="fixed bottom-6 inset-x-0 pointer-events-none z-[9999]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-end">
              <button
                id="scrollToTop"
                onClick={handleScrollTopClick}
                className="w-9 h-9 flex items-center justify-center bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl cursor-pointer shadow-lg hover:border-[var(--highlight)]/50 transition-all duration-300 shrink-0 pointer-events-auto will-change-transform"
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
