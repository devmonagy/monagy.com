// app/components/ProjectsSection.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import EvolveTerminal from "./EvolveTerminal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  image: string;
  liveUrl: string;
  status?: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: "blog-engine",
    title: "Blog Engine · MERN + TypeScript",
    subtitle: "Featured Project",
    description:
      "A full-stack blog engine inspired by platforms like Medium, built with the MERN stack, TypeScript, Tailwind CSS, and modern tooling. Includes robust secure authentication, post management, and a highly optimized, responsive UI designed for maximum readability.",
    tech: [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
      "JWT",
    ],
    image: "/assets/blogwebapp-screen.webp",
    liveUrl: "https://blogwebapp.monagy.com",
    status: "In Development",
  },
  {
    id: "apa-tax",
    title: "APA Tax Accounting Inc",
    subtitle: "Website Development & Edits",
    description:
      "Developed a high-fidelity multi-page business website for a certified public accounting firm. Engineered with clean, semantic markup, optimized PHP templating, and custom Bootstrap layouts, featuring integrated analytics engines and secure client portal gateways.",
    tech: ["PHP", "Bootstrap", "JavaScript", "jQuery", "HTML5", "CSS3"],
    image: "/assets/APATax.webp",
    liveUrl: "https://apatax.com/",
  },
  {
    id: "fusion-rx",
    title: "Fusion Apothecary Dubai Website",
    subtitle: "WordPress Development",
    description:
      "A tailored architectural WordPress theme optimized for a premium medical compounding pharmacy and luxury wellness lab in Dubai. Features a clean, high-contrast, premium interface showcase designed to highlight specialized lab facilities and clinical IV drip therapies.",
    tech: ["WordPress", "PHP", "JavaScript", "HTML5", "CSS3", "Elementor"],
    image: "/assets/FusionRXDubai.webp",
    liveUrl: "https://fusionrxdubai.com/",
  },
  {
    id: "v1-portfolio",
    title: "Version 1 of Personal Portfolio",
    subtitle: "Portfolio Archive",
    description:
      "The initial layout iteration of my personal portfolio platform. Focused heavily on high-performance raw web assets, smooth DOM responsiveness, clean fluid interactive layers, and micro-interactions built using componentized architectures.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vercel"],
    image: "/assets/MoLightv1.webp",
    liveUrl: "https://v1.monagy.com",
  },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray(".awwwards-project-row");

      rows.forEach((row: any) => {
        const mask = row.querySelector(".project-mask");
        const img = row.querySelector(".project-parallax-img");
        const backdrop = row.querySelector(".project-bg-geo");

        const metaStrings = row.querySelectorAll(".project-meta-item");
        const descBox = row.querySelector(".project-desc-box");
        const techAndLinks = row.querySelectorAll(".project-footer-item");

        const indexAttr = row.getAttribute("data-index");
        const isEvenLayout = indexAttr ? Number(indexAttr) % 2 === 0 : true;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });

        if (isEvenLayout) {
          tl.fromTo(
            mask,
            { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" },
            {
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              duration: 0.9,
              ease: "power4.inOut",
            },
          )
            .from(
              img,
              { scale: 1.25, duration: 1.1, ease: "power2.out" },
              "-=0.75",
            )
            .fromTo(
              backdrop,
              { rotation: -3, scale: 0.95, opacity: 0 },
              {
                opacity: 0.15,
                rotation: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.1)",
              },
              "-=0.85",
            )
            .from(
              metaStrings,
              {
                opacity: 0,
                y: 15,
                stagger: 0.03,
                duration: 0.4,
                ease: "expo.out",
              },
              "-=0.45",
            )
            .from(
              descBox,
              {
                opacity: 0,
                y: 20,
                duration: 0.65,
                ease: "expo.out",
                clearProps: "transform,opacity",
              },
              "-=0.35",
            )
            .from(
              techAndLinks,
              {
                opacity: 0,
                y: 10,
                stagger: 0.03,
                duration: 0.35,
                ease: "expo.out",
              },
              "-=0.4",
            );
        } else {
          tl.from(metaStrings, {
            opacity: 0,
            y: 15,
            stagger: 0.03,
            duration: 0.4,
            ease: "expo.out",
          })
            .from(
              descBox,
              {
                opacity: 0,
                y: 20,
                duration: 0.65,
                ease: "expo.out",
                clearProps: "transform,opacity",
              },
              "-=0.3",
            )
            .from(
              techAndLinks,
              {
                opacity: 0,
                y: 10,
                stagger: 0.03,
                duration: 0.35,
                ease: "expo.out",
              },
              "-=0.4",
            )
            .fromTo(
              mask,
              { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" },
              {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                duration: 0.9,
                ease: "power4.inOut",
              },
              "-=0.5",
            )
            .from(
              img,
              { scale: 1.25, duration: 1.1, ease: "power2.out" },
              "-=0.75",
            )
            .fromTo(
              backdrop,
              { rotation: 3, scale: 0.95, opacity: 0 },
              {
                opacity: 0.15,
                rotation: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.1)",
              },
              "-=0.85",
            );
        }

        gsap.to(img, {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(backdrop, {
          yPercent: -6,
          rotation: isNaN(Number(indexAttr))
            ? 3
            : Number(indexAttr) % 2 === 0
              ? 6
              : -6,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef },
  );

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
      id="projects"
      ref={containerRef}
      className="py-12 sm:py-20 md:py-28 space-y-12 sm:space-y-24 md:space-y-36 scroll-mt-20 overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-16 md:mb-24">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text-contrast)] sm:text-3xl md:text-4xl transition-colors duration-300">
          <span className="text-[var(--highlight)] font-mono text-lg sm:text-xl mr-2 font-normal">
            03.
          </span>
          Some Things I’ve Built
        </h2>
        <div className="h-[1px] bg-[var(--border-color)] flex-1 hidden sm:block transition-colors duration-300" />
      </div>

      {/* Projects Wrapper */}
      <div className="space-y-16 sm:space-y-32 md:space-y-48">
        {PROJECTS_DATA.map((project, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={project.id}
              data-index={idx}
              className="awwwards-project-row relative grid grid-cols-12 items-center group"
            >
              <div
                className={`project-bg-geo absolute hidden md:block border-2 border-dashed border-[var(--highlight)]/30 rounded-2xl pointer-events-none w-[45%] h-[110%] -z-10 transition-colors duration-500 group-hover:border-[var(--highlight)]/60 ${
                  isEven ? "-left-6 top-4" : "-right-6 top-4"
                }`}
              />

              {/* Project Image Panel */}
              <div
                className={`relative col-span-12 md:col-span-7 h-[220px] sm:h-[400px] rounded-xl overflow-hidden bg-[var(--badge-bg)] border border-[var(--border-color)] transition-all duration-500 shadow-[0_8px_24px_rgba(0,0,0,0.04),0_1px_6px_rgba(0,0,0,0.02)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)] ${
                  isEven ? "md:col-start-1" : "md:col-start-6 md:order-2"
                }`}
              >
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-mask block w-full h-full relative cursor-pointer group/img-link after:content-[''] after:absolute after:inset-0 after:bg-black/10 dark:after:bg-zinc-950/40 after:mix-blend-multiply after:transition-colors after:duration-300 hover:after:bg-transparent"
                >
                  {project.status && (
                    <div className="absolute top-4 left-4 z-30 bg-[var(--highlight)] text-[var(--bg)] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-md">
                      {project.status}
                    </div>
                  )}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-parallax-img w-full h-full object-cover object-center scale-110 opacity-70 dark:opacity-60 group-hover/img-link:opacity-100 group-hover/img-link:scale-115 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                  />
                </a>
              </div>

              {/* Project Details Panel */}
              <div
                className={`relative col-span-12 md:col-span-6 z-20 mt-4 md:mt-0 flex flex-col ${
                  isEven
                    ? "md:col-start-7 md:-ml-12 md:items-end text-left md:text-right"
                    : "md:col-start-1 md:-mr-12 md:items-start text-left"
                }`}
              >
                <span className="project-meta-item inline-block text-[11px] sm:text-xs font-mono text-[var(--highlight)] tracking-widest uppercase mb-1">
                  {project.subtitle}
                </span>

                <h3 className="project-meta-item text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-contrast)] hover:text-[var(--highlight)] transition-colors duration-300 mb-2 sm:mb-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.title}
                  </a>
                </h3>

                {/* Description Card */}
                <div
                  onMouseMove={handleMouseMove}
                  className="project-desc-box relative overflow-hidden w-full bg-[var(--card-bg)] text-[var(--text)] p-4 sm:p-6 md:p-8 rounded-xl border border-[var(--border-color)] transition-all duration-300 group-hover:-translate-y-1 text-left select-none will-change-transform transform-gpu shadow-[0_4px_12px_rgba(0,0,0,0.03),0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)] hover:border-[var(--highlight)]/40 hover:text-[var(--text-contrast)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_30px_70px_rgba(0,0,0,0.6)] before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(400px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(var(--highlight-rgb,94,234,212),0.12),transparent_80%)]"
                >
                  <p className="leading-relaxed relative z-10 text-xs sm:text-sm opacity-90">
                    {project.description}
                  </p>
                </div>

                {/* Tech List */}
                <ul
                  className={`project-footer-item flex flex-wrap gap-x-2.5 gap-y-1 sm:gap-x-4 sm:gap-y-2 font-mono text-[10px] sm:text-xs text-[var(--text)] opacity-75 mt-4 sm:mt-6 max-w-md ${
                    isEven ? "md:justify-end" : "md:justify-start"
                  }`}
                >
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="hover:text-[var(--highlight)] hover:opacity-100 transition-colors duration-150 relative z-30"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                {/* Action Button */}
                <div className="project-footer-item flex items-center gap-4 mt-4 sm:mt-6 relative z-30">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-widest bg-[var(--badge-bg)] border border-[var(--border-color)] text-[var(--text-contrast)] hover:border-[var(--highlight)] hover:text-[var(--highlight)] px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_var(--hover-glow)]"
                  >
                    <span>Launch App</span>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Terminal Block */}
      <div className="pt-8 sm:pt-16 md:pt-24 flex justify-center w-full">
        <EvolveTerminal />
      </div>
    </section>
  );
}
