"use client";

import { useEffect } from "react";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import FooterSection from "./FooterSection";

export default function SiteShell() {
  useEffect(() => {
    // ====== Smooth scroll + active nav links ======
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("nav a[href^='#']")
    );
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]")
    );
    const wrapper = document.getElementById("navbarWrapper");
    const scrollBtn = document.getElementById("scrollToTop");
    const themeToggle = document.getElementById("themeToggle");

    // Smooth scroll on click
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#")) return;
        const target = document.querySelector<HTMLElement>(href);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    const onScroll = () => {
      const pos = window.scrollY + 120;

      // Active link highlight
      sections.forEach((sec) => {
        if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
          links.forEach((a) => a.classList.remove("active"));
          const activeLink = document.querySelector<HTMLAnchorElement>(
            `nav a[href="#${sec.id}"]`
          );
          activeLink?.classList.add("active");
        }
      });

      // Navbar scrolled class
      if (wrapper) {
        if (window.scrollY > 20) {
          wrapper.classList.add("scrolled");
        } else {
          wrapper.classList.remove("scrolled");
        }
      }

      // Scroll to top visibility
      if (scrollBtn) {
        if (window.scrollY > 300) {
          scrollBtn.classList.add("opacity-100", "pointer-events-auto");
          scrollBtn.classList.remove("opacity-0", "pointer-events-none");
        } else {
          scrollBtn.classList.add("opacity-0", "pointer-events-none");
          scrollBtn.classList.remove("opacity-100", "pointer-events-auto");
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // run once on load

    // Theme toggle + persistence
    if (themeToggle) {
      if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
      }

      const handleThemeClick = () => {
        document.body.classList.toggle("light");
        localStorage.setItem(
          "theme",
          document.body.classList.contains("light") ? "light" : "dark"
        );
      };

      themeToggle.addEventListener("click", handleThemeClick);

      // Cleanup theme handler on unmount
      return () => {
        window.removeEventListener("scroll", onScroll);
        themeToggle.removeEventListener("click", handleThemeClick);
      };
    }

    // Cleanup scroll if themeToggle not found
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex bg-[var(--bg)] text-[var(--text)]">
      {/* Scroll to top button (same id & classes as original) */}
      <button
        id="scrollToTop"
        className="fixed bottom-6 right-6 w-10 h-10 flex items-center justify-center bg-[var(--card-bg)] border border-white/20 rounded-full cursor-pointer opacity-0 pointer-events-none transition-all"
        aria-label="Scroll to top"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <span className="text-xl">↑</span>
      </button>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-10 md:py-16">
        {/* Hero (title + tagline) is inside Sidebar on desktop, but your current layout also has heading under navbar.
            We'll keep About/Experience/Projects/Footer as separate sections. */}
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <FooterSection />
      </main>
    </div>
  );
}
