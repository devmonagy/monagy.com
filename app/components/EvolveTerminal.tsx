// app/components/EvolveTerminal.tsx
"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Ties the code snippet's abstract "evolve" loop to a real fact from the bio
// (7+ years of experience) instead of being pure decoration
const RESULT_YEARS = 7;

export default function EvolveTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLSpanElement>(null);
  const [isRunning, setIsRunning] = useState(false);

  // Runs the "typing" reveal followed by a live-ticking output line — called
  // both automatically on first scroll into view and manually via the RUN
  // button, so the terminal is replayable instead of a one-shot animation
  const runSequence = () => {
    if (isRunning || !terminalRef.current) return;
    setIsRunning(true);

    const tokens = gsap.utils.toArray(
      terminalRef.current.querySelectorAll(".code-token"),
    );
    const outputLine = terminalRef.current.querySelector(
      ".terminal-output-line",
    );
    const counterObj = { value: 0 };

    gsap
      .timeline({ onComplete: () => setIsRunning(false) })
      .set(tokens, { opacity: 0, y: 8 })
      .set(outputLine, { opacity: 0, y: 6 })
      .set(outputRef.current, { textContent: "0" })
      .to(tokens, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        stagger: 0.014,
        ease: "power2.out",
      })
      .to(outputLine, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(counterObj, {
        value: RESULT_YEARS,
        duration: 1,
        ease: "power1.inOut",
        onUpdate: () => {
          if (outputRef.current) {
            outputRef.current.textContent = Math.floor(
              counterObj.value,
            ).toString();
          }
        },
      });
  };

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: terminalRef.current,
        start: "top 85%",
        once: true,
        onEnter: runSequence,
      });
    },
    { scope: terminalRef },
  );

  return (
    <div
      ref={terminalRef}
      className="terminal-window bg-[var(--card-bg)] text-[var(--text)] text-sm rounded-xl overflow-hidden border border-[var(--border-color)] text-left font-mono w-full max-w-3xl mt-16 hover:border-[var(--highlight)]/40 hover:shadow-[0_0_20px_var(--hover-glow)] group/terminal transition-[border-color,box-shadow] duration-300 ease-out"
    >
      {/* Top Header Bar */}
      <div className="flex items-center gap-2 bg-[var(--badge-bg)] px-4 py-3 border-b border-[var(--border-color)]">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="text-xs text-[var(--text)] opacity-70 ml-2 select-none">
          evolve.ts
        </span>

        <button
          type="button"
          onClick={runSequence}
          disabled={isRunning}
          className="ml-auto flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--highlight)] border border-[var(--highlight)]/30 hover:border-[var(--highlight)] hover:bg-[var(--hover-glow)] px-2.5 py-1 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span className={isRunning ? "animate-pulse" : ""}>▶</span>
          {isRunning ? "RUNNING" : "RUN"}
        </button>
      </div>

      {/* Code Frame */}
      <pre className="terminal-code-lines p-5 overflow-x-auto selection:bg-[var(--highlight)] selection:text-black leading-6">
        <code>
          <div className="terminal-code-line">
            <span className="code-token inline-block control">function</span>{" "}
            <span className="code-token inline-block function">evolve</span>
            <span className="code-token inline-block">(</span>
            <span className="code-token inline-block variable">
              knowledge
            </span>
            <span className="code-token inline-block">: </span>
            <span className="code-token inline-block keyword">number</span>
            <span className="code-token inline-block">, </span>
            <span className="code-token inline-block variable">age</span>
            <span className="code-token inline-block">: </span>
            <span className="code-token inline-block keyword">number</span>
            <span className="code-token inline-block">, </span>
            <span className="code-token inline-block variable">life</span>
            <span className="code-token inline-block">: </span>
            <span className="code-token inline-block keyword">any[]</span>
            <span className="code-token inline-block">): </span>
            <span className="code-token inline-block keyword">number</span>
            <span className="code-token inline-block"> {"{"}</span>
          </div>

          <div className="terminal-code-line pl-8">
            <span className="code-token inline-block control">while</span>
            <span className="code-token inline-block"> (</span>
            <span className="code-token inline-block variable">age</span>
            <span className="code-token inline-block">++ &lt; </span>
            <span className="code-token inline-block variable">life</span>
            <span className="code-token inline-block">.</span>
            <span className="code-token inline-block function">length</span>
            <span className="code-token inline-block">) {"{"}</span>
          </div>

          <div className="terminal-code-line pl-16">
            <span className="code-token inline-block">++</span>
            <span className="code-token inline-block variable">
              knowledge
            </span>
            <span className="code-token inline-block">;</span>
          </div>

          <div className="terminal-code-line pl-8">
            <span className="code-token inline-block">{"}"}</span>
          </div>

          <div className="terminal-code-line pl-8">
            <span className="code-token inline-block control">return</span>{" "}
            <span className="code-token inline-block variable">
              knowledge
            </span>
            <span className="code-token inline-block">;</span>
          </div>

          <div className="terminal-code-line">
            <span className="code-token inline-block">{"}"}</span>
            <span className="terminal-cursor inline-block w-2 h-4 bg-[var(--highlight)] ml-1 align-middle" />
          </div>
        </code>
      </pre>

      {/* Live Output Console — ties the code's abstract loop to a real
          bio fact instead of leaving it as pure decoration */}
      <div className="terminal-output-line border-t border-[var(--border-color)] bg-[var(--badge-bg)]/60 px-5 py-4 opacity-0">
        <div className="flex items-center gap-2 text-[var(--text)] opacity-60 text-xs mb-1.5">
          <span className="text-[var(--highlight)]">❯</span>
          node evolve.ts
        </div>
        <div className="text-[var(--text-contrast)]">
          knowledge:{" "}
          <span
            ref={outputRef}
            className="font-bold text-[var(--highlight)] tabular-nums"
          >
            0
          </span>{" "}
          years and counting
        </div>
      </div>
    </div>
  );
}
