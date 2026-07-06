// app/components/WeatherWidget.tsx
"use client";

import { useEffect, useState } from "react";
import type { WeatherCondition, WeatherData } from "../api/weather/route";

// Weather changes slowly — no reason to poll anywhere near Spotify's 8s
// cadence. Open-Meteo's own current-conditions data refreshes roughly every
// 15 minutes anyway, so polling faster than that would just repeat stale
// numbers.
const POLL_INTERVAL_MS = 15 * 60 * 1000;

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

// Deliberately warmer/cooler naturalistic colors here instead of the site's
// usual mono-cyan highlight — matching a real weather app (sun = warm
// amber, rain = blue, etc.) reads as far more "alive" than tinting
// everything the same brand color, and this is the one card in the new
// section where that swap is worth it.
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
    <svg viewBox="0 0 32 32" className="w-12 h-12 sm:w-14 sm:h-14 shrink-0">
      {showSun && (
        <g
          className="weather-sun-spin"
          style={{ transformOrigin: small ? "11px 11px" : "16px 16px" }}
        >
          <g transform={small ? "translate(2 2) scale(0.72)" : "translate(4 4) scale(1)"}>
            <circle cx="12" cy="12" r="5" fill="#FBBF24" />
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
        <g transform={small ? "translate(3 2) scale(0.68)" : "translate(5 4) scale(0.9)"}>
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="#CBD5E1"
          />
          <circle cx="20" cy="6" r="0.9" fill="#E2E8F0" className="weather-star weather-star-1" />
          <circle cx="23" cy="11" r="0.6" fill="#E2E8F0" className="weather-star weather-star-2" />
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
              : "translate(3 9) scale(1.15)"
          }
        >
          <g className="weather-cloud-drift">
            <path
              d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
              fill={condition === "thunderstorm" ? "#64748B" : "#94A3B8"}
            />
          </g>
        </g>
      )}

      {(condition === "rain" || condition === "drizzle") && (
        <g stroke="#38BDF8" strokeWidth="1.6" strokeLinecap="round">
          <line x1="10" y1="24" x2="8.5" y2="28" className="weather-drop weather-drop-1" />
          <line x1="15" y1="24" x2="13.5" y2="28" className="weather-drop weather-drop-2" />
          <line x1="20" y1="24" x2="18.5" y2="28" className="weather-drop weather-drop-3" />
        </g>
      )}

      {condition === "snow" && (
        <g fill="#E0F2FE">
          <circle cx="10" cy="25" r="1.1" className="weather-snow weather-snow-1" />
          <circle cx="16" cy="27" r="1.1" className="weather-snow weather-snow-2" />
          <circle cx="21" cy="25" r="1.1" className="weather-snow weather-snow-3" />
        </g>
      )}

      {condition === "thunderstorm" && (
        <path
          d="M15 21 10 28h4l-1 5 6-8h-4l1-4z"
          fill="#FACC15"
          className="weather-bolt"
        />
      )}

      {condition === "fog" && (
        <g stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" className="weather-fog">
          <line x1="6" y1="22" x2="18" y2="22" />
          <line x1="9" y1="25.5" x2="24" y2="25.5" />
          <line x1="6" y1="29" x2="19" y2="29" />
        </g>
      )}
    </svg>
  );
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

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

  return (
    <div className="flex items-center gap-4 w-full h-full min-h-[128px] sm:min-h-[140px] rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)]/90 backdrop-blur-md px-4 sm:px-5 py-3 sm:py-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      {weather ? (
        <WeatherIcon condition={weather.condition} isDay={weather.isDay} />
      ) : (
        <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full border border-[var(--border-color)] opacity-30" />
      )}

      <div className="flex flex-col min-w-0">
        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--highlight)]">
          New York City
        </span>
        {weather ? (
          <>
            <span className="font-[family-name:var(--font-syne)] font-black text-2xl sm:text-3xl text-[var(--text-contrast)] leading-none tabular-nums">
              {weather.tempF}°
            </span>
            <span className="font-mono text-[10px] sm:text-xs text-[var(--text)] opacity-60">
              {CONDITION_LABEL[weather.condition]} · Feels {weather.feelsLikeF}°
            </span>
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
