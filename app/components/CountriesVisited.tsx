// app/components/CountriesVisited.tsx
"use client";

// flagcdn.com — free static flag images, no API key needed, ISO 3166-1
// alpha-2 codes. SVGs stay crisp at any size, unlike relying on the OS's
// own flag emoji rendering (Windows in particular often shows flag emoji
// as plain two-letter country codes instead of an actual flag glyph).
const COUNTRIES = [
  { code: "us", name: "United States" },
  { code: "eg", name: "Egypt" },
  { code: "mx", name: "Mexico" },
  { code: "do", name: "Dominican Republic" },
];

export default function CountriesVisited() {
  return (
    <div className="flex flex-col w-full h-full min-h-[128px] sm:min-h-[140px] justify-center rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)]/90 backdrop-blur-md px-4 sm:px-5 py-3 sm:py-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--highlight)] mb-3">
        Countries Visited
      </span>
      <div className="flex items-center gap-4 sm:gap-5">
        {COUNTRIES.map((country) => (
          <div key={country.code} className="group/flag relative">
            {/* Same ambient rotating glow ring as the navbar logo (see
                Navbar.tsx) — deliberate reuse so this reads as part of the
                same visual system, not a bolted-on widget. */}
            <div
              className="absolute -inset-1.5 rounded-full opacity-40 group-hover/flag:opacity-90 blur-[3px] transition-opacity duration-500 pointer-events-none animate-[rotateGlow_8s_linear_infinite]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, var(--highlight) 20%, transparent 40%)",
              }}
            />
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[var(--border-color)] group-hover/flag:border-[var(--highlight)] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover/flag:scale-110">
              {/* eslint-disable-next-line @next/next/no-img-element -- tiny
                  fixed external SVG from a static CDN, not user content;
                  not worth the next/image SVG-optimization config for this */}
              <img
                src={`https://flagcdn.com/${country.code}.svg`}
                alt={country.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--card-bg)] border border-[var(--border-color)] px-2 py-1 font-mono text-[9px] text-[var(--text-contrast)] opacity-0 translate-y-[-4px] group-hover/flag:opacity-100 group-hover/flag:translate-y-0 transition-all duration-200 z-10">
              {country.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
