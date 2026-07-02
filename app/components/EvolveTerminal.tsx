// app/components/EvolveTerminal.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EvolveTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tokens = gsap.utils.toArray(".code-token");
      gsap.set(tokens, { opacity: 0, y: 8 });

      gsap.to(tokens, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.015,
        ease: "power2.out",
        scrollTrigger: {
          trigger: terminalRef.current,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: terminalRef },
  );

  return (
    <div
      ref={terminalRef}
      className="terminal-window bg-white dark:bg-[var(--card-bg)] text-zinc-800 dark:text-[var(--text)] text-sm rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 text-left font-mono w-full max-w-3xl mt-16 hover:border-[var(--highlight)]/40 hover:shadow-[0_0_20px_var(--hover-glow)] group/terminal transition-[border-color,box-shadow] duration-300 ease-out"
    >
      {/* Top Header Bar */}
      <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 px-4 py-3 border-b border-zinc-200 dark:border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="text-xs text-zinc-600 dark:text-zinc-400 ml-2 font-sans select-none">
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
          </span>{" "}
          <span className="code-token inline-block text-zinc-700 dark:text-inherit">
            (
          </span>{" "}
          <span className="code-token inline-block variable text-orange-600 dark:text-orange-300">
            knowledge
          </span>{" "}
          <span className="code-token inline-block control text-purple-600 dark:text-purple-400">
            :
          </span>{" "}
          <span className="code-token inline-block keyword text-teal-600 dark:text-teal-400">
            number
          </span>{" "}
          <span className="code-token inline-block text-zinc-700 dark:text-inherit">
            ,
          </span>{" "}
          <span className="code-token inline-block variable text-orange-600 dark:text-orange-300">
            age
          </span>{" "}
          <span className="code-token inline-block control text-purple-600 dark:text-purple-400">
            :
          </span>{" "}
          <span className="code-token inline-block keyword text-teal-600 dark:text-teal-400">
            number
          </span>{" "}
          <span className="code-token inline-block text-zinc-700 dark:text-inherit">
            ,
          </span>{" "}
          <span className="code-token inline-block variable text-orange-600 dark:text-orange-300">
            life
          </span>{" "}
          <span className="code-token inline-block control text-purple-600 dark:text-purple-400">
            :
          </span>{" "}
          <span className="code-token inline-block keyword text-teal-600 dark:text-teal-400">
            any[]
          </span>{" "}
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
          </span>{" "}
          <br />
          &nbsp;&nbsp;
          <span className="code-token inline-block control text-purple-600 dark:text-purple-400">
            while
          </span>{" "}
          <span className="code-token inline-block text-zinc-700 dark:text-inherit">
            (
          </span>{" "}
          <span className="code-token inline-block variable text-orange-600 dark:text-orange-300">
            age
          </span>{" "}
          <span className="code-token inline-block text-zinc-700 dark:text-inherit">
            ++
          </span>{" "}
          <span className="code-token inline-block text-zinc-700 dark:text-inherit">
            &lt;
          </span>{" "}
          <span className="code-token inline-block variable text-orange-600 dark:text-orange-300">
            life
          </span>{" "}
          <span className="code-token inline-block text-zinc-700 dark:text-inherit">
            .
          </span>{" "}
          <span className="code-token inline-block function text-blue-600 dark:text-blue-400">
            length
          </span>{" "}
          <span className="code-token inline-block text-zinc-700 dark:text-inherit">
            )
          </span>{" "}
          <span className="code-token inline-block text-zinc-700 dark:text-inherit">
            &#123;
          </span>{" "}
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="code-token inline-block text-zinc-700 dark:text-inherit">
            ++
          </span>{" "}
          <span className="code-token inline-block variable text-orange-600 dark:text-orange-300">
            knowledge
          </span>{" "}
          <span className="code-token inline-block text-zinc-700 dark:text-inherit">
            ;
          </span>{" "}
          <br />
          &nbsp;&nbsp;
          <span className="code-token inline-block text-zinc-700 dark:text-inherit">
            &#125;
          </span>{" "}
          <br />
          &nbsp;&nbsp;
          <span className="code-token inline-block control text-purple-600 dark:text-purple-400">
            return
          </span>{" "}
          <span className="code-token inline-block variable text-orange-600 dark:text-orange-300">
            knowledge
          </span>{" "}
          <span className="code-token inline-block text-zinc-700 dark:text-inherit">
            ;
          </span>{" "}
          <br />
          <span className="code-token inline-block text-zinc-700 dark:text-inherit">
            &#125;
          </span>
        </code>
      </pre>
    </div>
  );
}
