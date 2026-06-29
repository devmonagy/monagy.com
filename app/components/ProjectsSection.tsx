// app/components/ProjectsSection.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger safely for client environments
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Card Animation Sequence - Updated toggleActions for two-way playback
      const cards = gsap.utils.toArray(".project-card-vibe");

      cards.forEach((card: any) => {
        const thumbnail = card.querySelector(".project-thumb-img");
        const textElements = card.querySelectorAll(".project-fade-up");
        const badges = card.querySelectorAll(".project-badge-anim");

        gsap.set(card, { opacity: 0, y: 35 });
        gsap.set(thumbnail, { scale: 1.25, opacity: 0 });
        gsap.set(textElements, { opacity: 0, y: 15, x: -10 });
        gsap.set(badges, { opacity: 0, scale: 0.8, y: 5 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "bottom 15%",
            // play on enter, reverse on leave, restart/play on enter back, reverse on leave back
            toggleActions: "play reverse play reverse",
          },
        });

        tl.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power4.out",
        })
          .to(
            thumbnail,
            {
              opacity: 1,
              scale: 1,
              duration: 1.1,
              ease: "power3.out",
            },
            "-=0.6",
          )
          .to(
            textElements,
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.6,
              stagger: 0.06,
              ease: "power3.out",
            },
            "-=0.7",
          )
          .to(
            badges,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              stagger: 0.02,
              duration: 0.4,
              ease: "back.out(1.5)",
            },
            "-=0.4",
          );
      });

      // 2. High-End Terminal Token "Compilation" Reveal - Updated toggleActions for two-way playback
      const tokens = gsap.utils.toArray(".code-token");
      gsap.set(tokens, { opacity: 0, y: 8 });

      gsap.to(tokens, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.015,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".terminal-window",
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play reverse play reverse",
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section id="projects" ref={containerRef} className="mt-16 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>

      <div className="space-y-6">
        {/* BlogWebApp / Blog Engine project */}
        <a
          href="https://blogwebapp.monagy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="project-card-vibe relative block bg-[var(--card-bg)] p-4 sm:p-6 rounded-xl border border-white/10 hover:border-[var(--highlight)] hover:shadow-[0_0_15px_var(--hover-glow)] transition-all cursor-pointer overflow-hidden group"
        >
          <div className="absolute top-0 right-0 z-10 bg-[var(--highlight)] text-[var(--card-bg)] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg shadow-md sm:text-xs">
            In Development
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="w-full h-40 sm:w-24 sm:h-24 sm:mt-1 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 relative bg-black/20">
              <img
                src="/assets/blogwebapp-screen.webp"
                alt="Blog web app screenshot"
                className="project-thumb-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex-1 space-y-2">
              <p className="project-fade-up text-sm text-[var(--highlight)] pt-1">
                Full-Stack Project
              </p>

              <h3 className="project-fade-up text-xl font-bold leading-snug sm:text-lg sm:font-semibold group-hover:text-[var(--highlight)] transition-colors duration-300">
                <span className="line-clamp-1">
                  Blog Engine · MERN + TypeScript
                </span>
              </h3>

              <p className="project-fade-up text-sm text-[var(--text-contrast)] leading-relaxed line-clamp-3 sm:line-clamp-none mb-3">
                A full-stack blog engine inspired by platforms like Medium,
                built with the MERN stack, TypeScript, Tailwind CSS, and modern
                tooling. Includes authentication, post management, and a
                responsive, modern UI.
              </p>

              <div className="flex flex-wrap gap-2 text-[10px] sm:text-xs pt-2 border-t border-white/5">
                {[
                  "MongoDB",
                  "Express",
                  "React",
                  "Node.js",
                  "TypeScript",
                  "Tailwind CSS",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="project-badge-anim bg-[var(--badge-bg)] px-2.5 py-1 rounded-md border border-white/5 hover:border-[var(--highlight)]/30 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
                <span className="project-badge-anim hidden xs:block bg-[var(--badge-bg)] px-2.5 py-1 rounded-md border border-white/5 hover:border-[var(--highlight)]/30 transition-colors duration-300">
                  JWT
                </span>
                <span className="project-badge-anim hidden xs:block bg-[var(--badge-bg)] px-2.5 py-1 rounded-md border border-white/5 hover:border-[var(--highlight)]/30 transition-colors duration-300">
                  REST API
                </span>
                <span className="project-badge-anim hidden sm:block bg-[var(--badge-bg)] px-2.5 py-1 rounded-md border border-white/5 hover:border-[var(--highlight)]/30 transition-colors duration-300">
                  Vercel
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* APATax*/}
        <a
          href="https://apatax.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="project-card-vibe block bg-[var(--card-bg)] p-6 rounded-xl border border-white/10 hover:border-[var(--highlight)] hover:shadow-[0_0_15px_var(--hover-glow)] transition-all cursor-pointer group"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-full h-40 sm:w-24 sm:h-24 sm:mt-1 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 relative bg-black/20">
              <img
                src="/assets/APATax.webp"
                alt="APATax"
                className="project-thumb-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex-1">
              <p className="project-fade-up text-sm text-[var(--highlight)] mb-1">
                Website Development & Edits
              </p>
              <h3 className="project-fade-up text-lg font-semibold mb-2 group-hover:text-[var(--highlight)] transition-colors duration-300">
                APA Tax Accounting Inc
              </h3>
              <p className="project-fade-up text-sm text-[var(--text-contrast)] mb-3">
                Developed a multi-page business website for a certified public
                accounting firm. Built using clean, semantic markup, PHP
                templating, and Bootstrap for a responsive layout, featuring
                integrated analytics, user consultation intake forms, and
                external secure client portal logic.
              </p>
              <div className="flex flex-wrap gap-2 text-xs pt-2 border-t border-white/5">
                {[
                  "PHP",
                  "Bootstrap",
                  "JavaScript",
                  "jQuery",
                  "HTML5",
                  "CSS",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="project-badge-anim bg-[var(--badge-bg)] px-3 py-1 rounded-md border border-white/5 hover:border-[var(--highlight)]/30 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </a>

        {/* FusionRXDubai*/}
        <a
          href="https://fusionrxdubai.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="project-card-vibe block bg-[var(--card-bg)] p-6 rounded-xl border border-white/10 hover:border-[var(--highlight)] hover:shadow-[0_0_15px_var(--hover-glow)] transition-all cursor-pointer group"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-full h-40 sm:w-24 sm:h-24 sm:mt-1 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 relative bg-black/20">
              <img
                src="/assets/FusionRXDubai.webp"
                alt="Fusion Apothecary Dubai"
                className="project-thumb-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex-1">
              <p className="project-fade-up text-sm text-[var(--highlight)] mb-1">
                WordPress Development
              </p>
              <h3 className="project-fade-up text-lg font-semibold mb-2 group-hover:text-[var(--highlight)] transition-colors duration-300">
                Fusion Apothecary Dubai Website
              </h3>
              <p className="project-fade-up text-sm text-[var(--text-contrast)] mb-3">
                A custom WordPress theme developed for a premium medical
                compounding pharmacy and wellness lab in Dubai. Features a
                clean, professional layout designed to showcase bespoke
                healthcare services, specialized lab facilities, and custom IV
                drip therapies.
              </p>
              <div className="flex flex-wrap gap-2 text-xs pt-2 border-t border-white/5">
                {["WordPress", "PHP", "JavaScript", "HTML5", "CSS"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="project-badge-anim bg-[var(--badge-bg)] px-3 py-1 rounded-md border border-white/5 hover:border-[var(--highlight)]/30 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </a>

        {/* Version_ONE / MoNAGY.com */}
        <a
          href="https://v1.monagy.com"
          target="_blank"
          rel="noopener noreferrer"
          className="project-card-vibe block bg-[var(--card-bg)] p-6 rounded-xl border border-white/10 hover:border-[var(--highlight)] hover:shadow-[0_0_15px_var(--hover-glow)] transition-all cursor-pointer group"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-full h-40 sm:w-24 sm:h-24 sm:mt-1 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 relative bg-black/20">
              <img
                src="/assets/MoLightv1.webp"
                alt="Version 1 of MoNAGY.com"
                className="project-thumb-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex-1">
              <p className="project-fade-up text-sm text-[var(--highlight)] mb-1">
                Portfolio
              </p>
              <h3 className="project-fade-up text-lg font-semibold mb-2 group-hover:text-[var(--highlight)] transition-colors duration-300">
                Version 1 of Personal Protfolio
              </h3>
              <p className="project-fade-up text-sm text-[var(--text-contrast)] mb-3">
                A personal portfolio website using HTML, CSS, and JavaScript,
                incorporating responsive design and interactive UI elements to
                create a polished and engaging user experience.
              </p>
              <div className="flex flex-wrap gap-2 text-xs pt-2 border-t border-white/5">
                {[
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "Next.js",
                  "Vercel",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="project-badge-anim bg-[var(--badge-bg)] px-3 py-1 rounded-md border border-white/5 hover:border-[var(--highlight)]/30 transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </a>
      </div>

      {/* Styled Interactive Terminal Window */}
      <div className="terminal-window bg-white dark:bg-[var(--card-bg)] text-zinc-800 dark:text-[var(--text)] text-sm rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 text-left font-mono w-full max-w-3xl mt-16 transition-all duration-300 hover:border-[var(--highlight)]/40 hover:shadow-[0_0_20px_var(--hover-glow)] group/terminal">
        {/* Top Header Bar */}
        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 px-4 py-3 border-b border-zinc-200 dark:border-white/5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-2 font-sans select-none">
            evolve.ts
          </span>
        </div>

        {/* Code Frame */}
        <pre className="p-5 overflow-x-auto selection:bg-[var(--highlight)] selection:text-black">
          <code>
            <span className="code-token inline-block control text-purple-600 dark:text-purple-400">
              function
            </span>{" "}
            <span className="code-token inline-block function text-blue-600 dark:text-blue-400">
              evolve
            </span>
            <span className="code-token inline-block text-zinc-700 dark:text-inherit">
              (
            </span>
            <span className="code-token inline-block variable text-orange-600 dark:text-orange-300">
              knowledge
            </span>
            <span className="code-token inline-block control text-purple-600 dark:text-purple-400">
              :
            </span>{" "}
            <span className="code-token inline-block keyword text-teal-600 dark:text-teal-400">
              number
            </span>
            <span className="code-token inline-block text-zinc-700 dark:text-inherit">
              ,
            </span>{" "}
            <span className="code-token inline-block variable text-orange-600 dark:text-orange-300">
              age
            </span>
            <span className="code-token inline-block control text-purple-600 dark:text-purple-400">
              :
            </span>{" "}
            <span className="code-token inline-block keyword text-teal-600 dark:text-teal-400">
              number
            </span>
            <span className="code-token inline-block text-zinc-700 dark:text-inherit">
              ,
            </span>{" "}
            <span className="code-token inline-block variable text-orange-600 dark:text-orange-300">
              life
            </span>
            <span className="code-token inline-block control text-purple-600 dark:text-purple-400">
              :
            </span>{" "}
            <span className="code-token inline-block keyword text-teal-600 dark:text-teal-400">
              any[]
            </span>
            <span className="code-token inline-block text-zinc-700 dark:text-inherit">
              )
            </span>{" "}
            <span className="code-token inline-block control text-purple-600 dark:text-purple-400">
              :
            </span>{" "}
            <span className="code-token inline-block keyword text-teal-600 dark:text-teal-400">
              number
            </span>{" "}
            <span className="code-token inline-block text-zinc-700 dark:text-inherit">
              &#123;
            </span>
            <br />
            &nbsp;&nbsp;
            <span className="code-token inline-block control text-purple-600 dark:text-purple-400">
              while
            </span>{" "}
            <span className="code-token inline-block text-zinc-700 dark:text-inherit">
              (
            </span>
            <span className="code-token inline-block variable text-orange-600 dark:text-orange-300">
              age
            </span>
            <span className="code-token inline-block text-zinc-700 dark:text-inherit">
              ++
            </span>{" "}
            <span className="code-token inline-block text-zinc-700 dark:text-inherit">
              &lt;
            </span>{" "}
            <span className="code-token inline-block variable text-orange-600 dark:text-orange-300">
              life
            </span>
            <span className="code-token inline-block text-zinc-700 dark:text-inherit">
              .
            </span>
            <span className="code-token inline-block function text-blue-600 dark:text-blue-400">
              length
            </span>
            <span className="code-token inline-block text-zinc-700 dark:text-inherit">
              )
            </span>{" "}
            <span className="code-token inline-block text-zinc-700 dark:text-inherit">
              &#123;
            </span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="code-token inline-block text-zinc-700 dark:text-inherit">
              ++
            </span>
            <span className="code-token inline-block variable text-orange-600 dark:text-orange-300">
              knowledge
            </span>
            <span className="code-token inline-block text-zinc-700 dark:text-inherit">
              ;
            </span>
            <br />
            &nbsp;&nbsp;
            <span className="code-token inline-block text-zinc-700 dark:text-inherit">
              &#125;
            </span>
            <br />
            &nbsp;&nbsp;
            <span className="code-token inline-block control text-purple-600 dark:text-purple-400">
              return
            </span>{" "}
            <span className="code-token inline-block variable text-orange-600 dark:text-orange-300">
              knowledge
            </span>
            <span className="code-token inline-block text-zinc-700 dark:text-inherit">
              ;
            </span>
            <br />
            <span className="code-token inline-block text-zinc-700 dark:text-inherit">
              &#125;
            </span>
          </code>
        </pre>
      </div>
    </section>
  );
}
