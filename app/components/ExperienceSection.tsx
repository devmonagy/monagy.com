// app/components/ExperienceSection.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger safely for client environments
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Experience = {
  range: string;
  title: string;
  summary: string;
  skills: string[];
  details: string[];
};

const experiences: Experience[] = [
  {
    range: "2025 — Present",
    title: "Software Developer · ADAPT Community Network",
    summary:
      "Design and maintain internal web applications using modular, reusable components, structured workflows, and secure integrations across SQL Server, Microsoft Fabric, and Azure services. Support stakeholders and continuously improve system performance and reliability.",
    skills: [
      "React",
      "TypeScript",
      "JavaScript (ES6+)",
      "Component-Based Architecture",
      "Reusable Components",
      "UI Performance Optimization",
      "React Hooks",
      "State Management",
    ],
    details: [
      "Develop internal web applications using React, improving performance by ~25%.",
      "Build reusable React components and hooks, accelerating internal workflow development by ~30%.",
      "Integrate REST APIs and Azure services to enable secure internal data exchange by ~35%",
      "Optimize front-end state management and backend queries, reducing manual processing time by ~40%.",
      "Lead Agile sprints to deliver component-based features, improving team delivery predictability by ~20%.",
    ],
  },
  {
    range: "2021 — 2025",
    title: "Web Developer · ADAPT Community Network",
    summary:
      "Develop and maintain accessible, user-focused WordPress sites using HTML, CSS, JavaScript, and PHP to support organizational goals.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "WordPress",
      "PHP",
      "API Integration",
      "Responsive Design",
      "SEO",
      "Accessibility",
    ],
    details: [
      "Built responsive SEO-optimized web applications using JavaScript, PHP, WordPress, and REST APIs, improving page load speeds by ~20–30%.",
      "Developed reusable React components and internal dashboards, reducing manual workflows by ~25%.",
      "Implemented caching, asset optimization, and code refactoring, decreasing load times by ~30–40%.",
      "Ensured WCAG 2.2 accessibility and cross-browser compatibility, reducing UI issues by ~20%.",
    ],
  },
  {
    range: "2018 — Present",
    title: "Founder & Freelance Web Developer · webDefinitely",
    summary:
      "Partnered with local clients to build custom websites and brand identities, managing everything from domain setup to SEO to deliver polished, user-friendly digital experiences.",
    skills: [
      "Web Development",
      "Full Stack Development",
      "SEO",
      "Client Collaboration",
      "Responsive Design",
      "Accessibility",
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
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".experience-card-vibe");

      cards.forEach((card: any) => {
        const metaText = card.querySelectorAll(".exp-meta-reveal");
        const listItems = card.querySelectorAll(".exp-list-item");
        const skillBadges = card.querySelectorAll(".exp-skill-badge");

        // Masked and scaled state configuration
        gsap.set(card, { opacity: 0, y: 35 });
        gsap.set(metaText, { opacity: 0, y: 20 });
        gsap.set(listItems, { opacity: 0, x: -15 });
        gsap.set(skillBadges, { opacity: 0, scale: 0.8, y: 5 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "bottom 15%",
            toggleActions: "play none none reverse", // Continuous interactive loop back and forth
          },
        });

        tl.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power4.out",
        })
          .to(
            metaText,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: "power3.out",
            },
            "-=0.5",
          )
          .to(
            listItems,
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.05,
              ease: "power2.out",
            },
            "-=0.4",
          )
          .to(
            skillBadges,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.02,
              ease: "back.out(1.5)",
            },
            "-=0.3",
          );
      });
    },
    { scope: containerRef },
  );

  return (
    <section id="experience" ref={containerRef} className="mt-16 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-6">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp) => (
          <article
            key={exp.title}
            className="experience-card-vibe bg-[var(--card-bg)] p-6 rounded-xl border border-white/10 hover:border-[var(--highlight)] hover:shadow-[0_0_15px_var(--hover-glow)] transition-all cursor-pointer group relative overflow-hidden"
          >
            {/* Range / Date Label */}
            <p className="exp-meta-reveal text-sm text-zinc-400 mb-1 font-mono">
              {exp.range}
            </p>

            {/* Title Block */}
            <p className="exp-meta-reveal text-lg font-semibold mb-2 group-hover:text-[var(--highlight)] transition-colors duration-300">
              {exp.title}
            </p>

            {/* Summary */}
            <p className="exp-meta-reveal text-sm text-[var(--text-contrast)] leading-relaxed mb-4">
              {exp.summary}
            </p>

            {/* Bullets Detail List */}
            <ul className="list-disc pl-5 space-y-2 text-sm mb-5 text-[var(--text-contrast)]">
              {exp.details.map((d) => (
                <li
                  key={d}
                  className="exp-list-item marker:text-[var(--highlight)]"
                >
                  {d}
                </li>
              ))}
            </ul>

            {/* Tech Badges Grid */}
            <div className="flex flex-wrap gap-2 text-sm pt-2 border-t border-white/5">
              {exp.skills.map((s) => (
                <span
                  key={s}
                  className="exp-skill-badge bg-[var(--badge-bg)] px-3 py-1 rounded-md border border-white/5 hover:border-[var(--highlight)]/30 transition-colors duration-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
