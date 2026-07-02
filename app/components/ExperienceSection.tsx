// app/components/ExperienceSection.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Experience = {
  id: string;
  tabTitle: string;
  role: string;
  company: string;
  url: string;
  range: string;
  summary: string;
  skills: string[];
  details: string[];
};

const EXPERIENCES_DATA: Experience[] = [
  {
    id: "adapt-software",
    tabTitle: "ADAPT (Dev)",
    role: "Software Developer",
    company: "ADAPT Community Network",
    url: "https://adaptcommunitynetwork.org/",
    range: "2025 — Present",
    summary:
      "Design and maintain internal web applications using modular, reusable components, structured workflows, and secure integrations across SQL Server, Microsoft Fabric, and Azure services. Support stakeholders and continuously improve system performance and reliability.",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "Architecture",
      "Azure",
      "Optimization",
      "Hooks",
      "State Management",
    ],
    details: [
      "Develop internal web applications using React, improving performance by ~25%.",
      "Build reusable React components and hooks, accelerating internal workflow development by ~30%.",
      "Integrate REST APIs and Azure services to enable secure internal data exchange by ~35%.",
      "Optimize front-end state management and backend queries, reducing manual processing time by ~40%.",
      "Lead Agile sprints to deliver component-based features, improving team delivery predictability by ~20%.",
    ],
  },
  {
    id: "adapt-web",
    tabTitle: "ADAPT (Web)",
    role: "Web Developer",
    company: "ADAPT Community Network",
    url: "https://adaptcommunitynetwork.org/",
    range: "2021 — 2025",
    summary:
      "Develop and maintain accessible, user-focused WordPress sites using HTML, CSS, JavaScript, and PHP to support organizational goals.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "WordPress",
      "PHP",
      "REST APIs",
      "SEO",
      "WCAG Accessibility",
    ],
    details: [
      "Built responsive SEO-optimized web applications using JavaScript, PHP, WordPress, and REST APIs, improving page load speeds by ~20–30%.",
      "Developed reusable React components and internal dashboards, reducing manual workflows by ~25%.",
      "Implemented caching, asset optimization, and code refactoring, decreasing load times by ~30–40%.",
      "Ensured WCAG 2.2 accessibility and cross-browser compatibility, reducing UI issues by ~20%.",
    ],
  },
  {
    id: "webdefinitely",
    tabTitle: "webDefinitely",
    role: "Founder & Freelance Developer",
    company: "webDefinitely",
    url: "#",
    range: "2018 — Present",
    summary:
      "Partnered with local clients to build custom websites and brand identities, managing everything from domain setup to SEO to deliver polished, user-friendly digital experiences.",
    skills: [
      "Full Stack",
      "React",
      "Node.js",
      "SEO",
      "Client Strategy",
      "Deployments",
      "DNS Hosting",
    ],
    details: [
      "Delivered full‑stack solutions with JS/React/Node/PHP, improving delivery speed by ~25%.",
      "Built reusable UI components, cutting dev time by ~30%.",
      "Handled hosting, DNS, and deployments, reducing launch issues by ~40%.",
      "Led projects end‑to‑end, increasing on‑time delivery and client satisfaction by ~20%.",
    ],
  },
];

export default function ExperienceSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Entrance scroll animation for the whole section
  useGSAP(
    () => {
      gsap.from(".exp-header-anim", {
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });

      gsap.from(".exp-layout-wrapper", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: containerRef },
  );

  // Kinetic slide text reveal when switching tabs
  useEffect(() => {
    if (!contentRef.current) return;

    const elements = contentRef.current.querySelectorAll(".tab-panel-anim");
    gsap.killTweensOf(elements);
    gsap.set(elements, { opacity: 0, y: 10 });

    gsap.to(elements, {
      opacity: 1,
      y: 0,
      stagger: 0.03,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [activeIdx]);

  // Update slider bar accent position smoothly
  useEffect(() => {
    const activeTab = activeTabRef.current;
    const slider = sliderRef.current;
    if (!activeTab || !slider) return;

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      gsap.to(slider, {
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
        bottom: 0,
        top: "auto",
        height: 2,
        duration: 0.3,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(slider, {
        top: activeTab.offsetTop,
        height: activeTab.offsetHeight,
        left: 0,
        width: 2,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [activeIdx]);

  // Interactive mouse tracking spotlight background effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-12 sm:py-20 md:py-28 scroll-mt-20"
    >
      {/* Headings */}
      <div className="exp-header-anim flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-contrast)] sm:text-3xl md:text-4xl transition-colors duration-300">
          <span className="text-[var(--highlight)] font-mono text-lg sm:text-xl mr-2 font-normal">
            02.
          </span>
          Where I’ve Worked
        </h2>
        <div className="h-[1px] bg-[var(--border-color)] flex-1 hidden sm:block transition-colors duration-300" />
      </div>

      {/* Main Structural Wrapper */}
      <div className="exp-layout-wrapper grid grid-cols-12 gap-y-6 md:gap-x-8 items-start">
        {/* Left Side: Navigation Strip */}
        <div className="col-span-12 md:col-span-3 flex md:flex-col overflow-x-auto md:overflow-x-visible relative border-b md:border-b-0 md:border-l border-[var(--border-color)] transition-colors duration-300 scrollbar-none">
          {/* Kinetic Active Target Track Slider */}
          <div
            ref={sliderRef}
            className="absolute bg-[var(--highlight)] shadow-[0_0_12px_var(--highlight)] z-20"
          />

          {EXPERIENCES_DATA.map((exp, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={exp.id}
                ref={isActive ? activeTabRef : null}
                onClick={() => setActiveIdx(idx)}
                className={`whitespace-nowrap px-4 py-3 sm:px-5 sm:py-3.5 text-left font-mono text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-300 outline-none select-none flex-1 md:flex-initial ${
                  isActive
                    ? "text-[var(--highlight)] bg-[var(--hover-glow)] font-semibold"
                    : "text-[var(--text)] opacity-60 hover:opacity-100 hover:bg-[var(--hover-glow)]"
                }`}
              >
                {exp.tabTitle}
              </button>
            );
          })}
        </div>

        {/* Right Side: Interactive Spotlight Card Panel */}
        <div
          ref={contentRef}
          onMouseMove={handleMouseMove}
          className="col-span-12 md:col-span-9 relative overflow-hidden bg-[var(--card-bg)] text-[var(--text)] p-5 sm:p-6 md:p-8 rounded-xl border border-[var(--border-color)] transition-all duration-300 select-none shadow-[0_10px_30px_rgba(0,0,0,0.04),0_1px_8px_rgba(0,0,0,0.02)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)] hover:border-[var(--highlight)]/40 hover:text-[var(--text-contrast)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_30px_70px_rgba(0,0,0,0.6)] before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(400px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(var(--highlight-rgb,94,234,212),0.12),transparent_80%)]"
        >
          {(() => {
            const activeExp = EXPERIENCES_DATA[activeIdx];
            return (
              <div className="space-y-4 sm:space-y-6 relative z-10">
                {/* Header Info */}
                <div>
                  <h3 className="tab-panel-anim text-lg sm:text-xl font-bold text-[var(--text-contrast)] leading-snug transition-colors duration-300">
                    <span>{activeExp.role}</span>{" "}
                    <span className="text-[var(--highlight)]">
                      @{" "}
                      <a
                        href={activeExp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[var(--highlight)] after:transition-all after:duration-300 hover:after:w-full"
                      >
                        {activeExp.company}
                      </a>
                    </span>
                  </h3>
                  <p className="tab-panel-anim text-[11px] sm:text-xs font-mono text-[var(--text)] opacity-70 mt-1 transition-colors duration-300">
                    {activeExp.range}
                  </p>
                </div>

                {/* Sub-Summary */}
                <p className="tab-panel-anim text-xs sm:text-sm text-[var(--text)] opacity-85 leading-relaxed max-w-2xl transition-colors duration-300">
                  {activeExp.summary}
                </p>

                {/* Alternating Triangle Pointer Detail Rows */}
                <ul className="space-y-3 text-xs sm:text-sm text-[var(--text)] transition-colors duration-300">
                  {activeExp.details.map((detail, i) => (
                    <li
                      key={i}
                      className="tab-panel-anim flex items-start gap-2.5 sm:gap-3 leading-relaxed"
                    >
                      <span className="text-[var(--highlight)] font-mono text-xs mt-0.5 select-none flex-shrink-0">
                        ‣
                      </span>
                      <span className="opacity-90">{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Categorized Technical Skill Tags Footer */}
                <div className="tab-panel-anim pt-4 border-t border-[var(--border-color)] flex flex-wrap gap-1.5 sm:gap-2 transition-colors duration-300">
                  {activeExp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-[var(--badge-bg)] text-[var(--text)] opacity-90 font-mono text-[10px] sm:text-[11px] px-2.5 py-1 rounded-md border border-[var(--border-color)] hover:border-[var(--highlight)] hover:text-[var(--highlight)] hover:opacity-100 transition-all duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
