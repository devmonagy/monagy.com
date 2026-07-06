// app/components/CurrentlyLearning.tsx
"use client";

// Picked to fit the existing bio ("Engineering high-fidelity visual
// architectures") and this site's own GSAP-heavy ambition — swap the
// title/description below for whatever's actually true.
const LEARNING = {
  title: "Three.js / WebGL",
  description: "Pushing browser-based visual fidelity further",
};

export default function CurrentlyLearning() {
  return (
    <div className="flex flex-col w-full h-full min-h-[128px] sm:min-h-[140px] justify-center rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)]/90 backdrop-blur-md px-4 sm:px-5 py-3 sm:py-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      <span className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--highlight)] mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--highlight)] animate-pulse shrink-0" />
        Currently Learning
      </span>

      <span className="font-[family-name:var(--font-syne)] font-black text-lg sm:text-xl text-[var(--text-contrast)] leading-tight">
        {LEARNING.title}
      </span>
      <span className="font-mono text-[10px] sm:text-xs text-[var(--text)] opacity-60 mt-1 mb-3">
        {LEARNING.description}
      </span>

      {/* Indeterminate progress bar — a fixed percentage would be a fake
          number; this just reads as "ongoing," matching the honest reality
          of learning something continuously rather than to a finish line. */}
      <div className="h-1 w-full rounded-full bg-[var(--border-color)] overflow-hidden">
        <div className="h-full w-1/3 rounded-full bg-[var(--highlight)] animate-[learningProgress_2.2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
