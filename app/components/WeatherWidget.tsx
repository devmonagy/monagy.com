// app/components/WeatherWidget.tsx
"use client";

import { useEffect, useState } from "react";
import type { WeatherCondition, WeatherData } from "../api/weather/route";

// Weather changes slowly — no reason to poll anywhere near Spotify's 8s
// cadence. Open-Meteo's own current-conditions data itself only refreshes
// roughly every 15 minutes, so 5 here won't surface fresher numbers than
// 15 would — it's purely so the widget feels more alive/frequently checked,
// at the cost of a few extra harmless requests.
const POLL_INTERVAL_MS = 5 * 60 * 1000;

const CONDITION_LABEL: Record<WeatherCondition, string> = {
  clear: "Clear",
  "partly-cloudy": "Partly Cloudy",
  cloudy: "Cloudy",
  fog: "Foggy",
  drizzle: "Drizzle",
  rain: "Rain",
  snow: "Snow",
  thunderstorm: "Thunderstorm",
};

// The circular "orb" backdrop behind the icon — naturalistic per-condition
// color instead of the site's mono-cyan highlight, same reasoning as the
// icon colors below: a weather widget reads as more "alive"/premium when
// it actually looks like the sky it's describing.
function orbGradient(condition: WeatherCondition, isDay: boolean): string {
  if (condition === "thunderstorm") {
    return "radial-gradient(circle at 32% 28%, #7c3aed, #1e1b4b)";
  }
  if (condition === "snow") {
    return "radial-gradient(circle at 32% 28%, #f0f9ff, #7dd3fc)";
  }
  if (condition === "rain" || condition === "drizzle") {
    return "radial-gradient(circle at 32% 28%, #38bdf8, #0c4a6e)";
  }
  if (condition === "fog") {
    return "radial-gradient(circle at 32% 28%, #e2e8f0, #64748b)";
  }
  if (!isDay) {
    return "radial-gradient(circle at 32% 28%, #4338ca, #0f172a)";
  }
  if (condition === "cloudy") {
    return "radial-gradient(circle at 32% 28%, #bae6fd, #64748b)";
  }
  if (condition === "partly-cloudy") {
    return "radial-gradient(circle at 32% 28%, #7dd3fc, #2563eb)";
  }
  return "radial-gradient(circle at 32% 28%, #fef3c7, #f59e0b)"; // clear day
}

// Deliberately warmer/cooler naturalistic colors + gradients here instead
// of the site's usual flat mono-cyan highlight — matching a real weather
// app (sun = warm amber glow, rain = blue, etc.) reads as far more
// "alive" than tinting everything the same brand color, and this is the
// one card in the new section where that swap is worth it. Each icon also
// runs through an SVG glow filter for genuine bloom, not just flat shapes.
function WeatherIcon({
  condition,
  isDay,
}: {
  condition: WeatherCondition;
  isDay: boolean;
}) {
  const showSun = isDay && (condition === "clear" || condition === "partly-cloudy");
  const showMoon = !isDay && (condition === "clear" || condition === "partly-cloudy");
  const showCloud = condition !== "clear";
  const small = condition === "partly-cloudy"; // sun/moon shrinks + shifts when a cloud shares the frame

  return (
    <svg viewBox="0 0 32 32" className="w-full h-full">
      <defs>
        <radialGradient id="sunGradient" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="55%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
        <radialGradient id="moonGradient" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#94A3B8" />
        </radialGradient>
        <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop
            offset="0%"
            stopColor={condition === "thunderstorm" ? "#94A3B8" : "#E2E8F0"}
          />
          <stop
            offset="100%"
            stopColor={condition === "thunderstorm" ? "#475569" : "#94A3B8"}
          />
        </linearGradient>
        {/* Genuine SVG bloom (blur + merge with the sharp source) instead
            of a CSS blur, which would soften the whole shape rather than
            just haloing it. */}
        <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {showSun && (
        <g
          className="weather-sun-spin"
          style={{ transformOrigin: small ? "11px 11px" : "16px 16px" }}
          filter="url(#softGlow)"
        >
          <g transform={small ? "translate(2 2) scale(0.72)" : "translate(4 4) scale(1)"}>
            <circle cx="12" cy="12" r="5" fill="url(#sunGradient)" />
            <g stroke="#FBBF24" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="1" x2="12" y2="3.5" />
              <line x1="12" y1="20.5" x2="12" y2="23" />
              <line x1="1" y1="12" x2="3.5" y2="12" />
              <line x1="20.5" y1="12" x2="23" y2="12" />
              <line x1="4.2" y1="4.2" x2="6" y2="6" />
              <line x1="18" y1="18" x2="19.8" y2="19.8" />
              <line x1="4.2" y1="19.8" x2="6" y2="18" />
              <line x1="18" y1="6" x2="19.8" y2="4.2" />
            </g>
          </g>
        </g>
      )}

      {showMoon && (
        <g
          // translate(5.2 5.2) — this path's exact bounding-box center
          // (computed via the actual SVG arc-to-center formula, not
          // eyeballed) is (12,12), so scale*12+translate=16 needs
          // translate=16-12*0.9=5.2 on both axes to land it dead center.
          transform={small ? "translate(3 2) scale(0.68)" : "translate(5.2 5.2) scale(0.9)"}
          filter="url(#softGlow)"
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="url(#moonGradient)"
          />
          <circle cx="20" cy="6" r="0.9" fill="#F8FAFC" className="weather-star weather-star-1" />
          <circle cx="23" cy="11" r="0.6" fill="#F8FAFC" className="weather-star weather-star-2" />
        </g>
      )}

      {showCloud && (
        // Split into an outer g (static position/scale, SVG `transform`
        // attribute) and an inner g (the animated drift, CSS `transform`
        // property) — putting both on the same element doesn't compose:
        // a CSS transform on an element completely replaces its `transform`
        // attribute rather than combining with it, which would silently
        // throw away the positioning the instant the drift animation ran.
        <g
          transform={
            condition === "partly-cloudy"
              ? "translate(9 13) scale(0.95)"
              : // translate(2.2 2.2) — this path's exact bounding-box
                // center, computed via the real SVG arc-to-center formula
                // (not eyeballed), is (12,12), not (12,16) or anywhere
                // else — so scale*12+translate=16 needs translate=2.2 on
                // BOTH axes to land it dead center. The previous
                // translate(3 9) landed x close to right (16.8) but put y
                // at 22.8 — 6.8 units low out of a 32-tall canvas, which
                // is exactly the "sitting toward the bottom" it looked
                // like. Everything below (rain/snow/bolt/fog) is
                // repositioned to match this new, higher cloud position.
                "translate(2.2 2.2) scale(1.15)"
          }
        >
          <g className="weather-cloud-drift">
            <path
              d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
              fill="url(#cloudGradient)"
            />
          </g>
        </g>
      )}

      {(condition === "rain" || condition === "drizzle") && (
        <g stroke="#7DD3FC" strokeWidth="1.6" strokeLinecap="round">
          <line x1="11" y1="26" x2="9.5" y2="30" className="weather-drop weather-drop-1" />
          <line x1="16" y1="26" x2="14.5" y2="30" className="weather-drop weather-drop-2" />
          <line x1="21" y1="26" x2="19.5" y2="30" className="weather-drop weather-drop-3" />
        </g>
      )}

      {condition === "snow" && (
        <g fill="#F0F9FF">
          <circle cx="11" cy="26" r="1.1" className="weather-snow weather-snow-1" />
          <circle cx="16" cy="29" r="1.1" className="weather-snow weather-snow-2" />
          <circle cx="21" cy="26" r="1.1" className="weather-snow weather-snow-3" />
        </g>
      )}

      {condition === "thunderstorm" && (
        <path
          d="M15 14 10 21h4l-1 5 6-8h-4l1-4z"
          fill="#FDE047"
          filter="url(#softGlow)"
          className="weather-bolt"
        />
      )}

      {condition === "fog" && (
        <g stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" className="weather-fog">
          <line x1="6" y1="16" x2="18" y2="16" />
          <line x1="9" y1="19.5" x2="24" y2="19.5" />
          <line x1="6" y1="23" x2="19" y2="23" />
        </g>
      )}
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 shrink-0">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

function WindIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3 h-3 shrink-0">
      <path d="M3 8h11a3 3 0 1 0-3-3" />
      <path d="M3 16h15a3 3 0 1 1-3 3" />
    </svg>
  );
}

function DropletIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 shrink-0">
      <path d="M12 2C8 8 5 11.5 5 15a7 7 0 0 0 14 0c0-3.5-3-7-7-13Z" />
    </svg>
  );
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [nycTime, setNycTime] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: number;

    const poll = async () => {
      try {
        const res = await fetch("/api/weather", { cache: "no-store" });
        if (res.ok) {
          const next: WeatherData = await res.json();
          if (!cancelled) setWeather(next);
        }
      } catch {
        // Leave the last-known reading on screen rather than clearing it —
        // a stale temperature is a better failure mode than a blank card.
      }
      if (!cancelled) {
        timeoutId = window.setTimeout(poll, POLL_INTERVAL_MS);
      }
    };

    poll();
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  // Live NYC clock — minute precision is plenty for this card, so a 30s
  // tick (not AboutSection's per-second one) keeps it "live" without
  // re-rendering this every second for no visible benefit.
  useEffect(() => {
    const update = () =>
      setNycTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/New_York",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    update();
    const id = window.setInterval(update, 30000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="telemetry-card flex flex-col w-full h-full min-h-[128px] sm:min-h-[140px] justify-center rounded-2xl border bg-[var(--card-bg)]/80 backdrop-blur-xl px-4 sm:px-5 py-3 sm:py-4">
      <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--highlight)] mb-2">
        New York City
      </span>

      {/* flex-wrap (not a hard single line): icon+temp+condition and the
          time/wind/humidity group stay on one row whenever there's room
          (true on desktop and most phone widths), but the stats group
          drops to its own second line rather than overflowing/clipping on
          a narrow enough screen — a real tradeoff now that the condition
          text is back, not the "always one line" of the previous pass. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4">
        <div
          className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0"
          // The icon's color/shape carries the condition visually; this
          // gives screen readers the same info explicitly.
          role="img"
          aria-label={weather ? CONDITION_LABEL[weather.condition] : "Loading weather"}
        >
          {/* Ambient bloom behind the orb, same "blurred color blob" language
              as the site's other ambient flares, just scaled to card size. */}
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-70"
            style={{
              background: weather
                ? orbGradient(weather.condition, weather.isDay)
                : undefined,
            }}
          />
          <div
            className="relative w-full h-full rounded-full p-2.5 sm:p-3"
            style={{
              background: weather
                ? orbGradient(weather.condition, weather.isDay)
                : "var(--border-color)",
            }}
          >
            {weather && (
              <WeatherIcon condition={weather.condition} isDay={weather.isDay} />
            )}
          </div>
        </div>

        {weather ? (
          <>
            <div className="flex flex-col min-w-0 shrink-0">
              <span className="font-[family-name:var(--font-syne)] font-black text-2xl sm:text-3xl text-[var(--text-contrast)] leading-none tabular-nums">
                {weather.tempF}°
              </span>
              <span className="font-mono text-[10px] sm:text-xs text-[var(--text)] opacity-60">
                {CONDITION_LABEL[weather.condition]} · Feels {weather.feelsLikeF}°
              </span>
            </div>

            <div className="hidden sm:block w-px h-8 bg-[var(--border-color)] shrink-0" />

            <div className="flex items-center gap-3 sm:gap-4 font-mono text-[11px] sm:text-sm text-[var(--text)] opacity-80">
              <span className="flex items-center gap-1 tabular-nums">
                <ClockIcon />
                {nycTime ?? "--:--"} EST
              </span>
              <span className="flex items-center gap-1 tabular-nums">
                <WindIcon />
                {weather.windMph}
              </span>
              <span className="flex items-center gap-1 tabular-nums">
                <DropletIcon />
                {weather.humidity}%
              </span>
            </div>
          </>
        ) : (
          <span className="font-mono text-xs text-[var(--text)] opacity-40">
            Loading…
          </span>
        )}
      </div>
    </div>
  );
}
