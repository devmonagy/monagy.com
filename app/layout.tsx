import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

// Self-hosted via next/font instead of a <link> to Google's CSS API: that
// old approach was a render-blocking external request (DNS + connection +
// stylesheet fetch, all before text could paint in the right font, plus the
// classic FOIT/FOUT flash). next/font downloads these at BUILD time, serves
// them from this same origin, and injects the right font-display + preload
// automatically — one of the highest-impact, lowest-risk Next.js perf wins
// available. Exposed as CSS variables (not applied directly) because the
// rest of the app references these fonts by name all over the place via
// Tailwind arbitrary values — see globals.css's --font-display/--font-body
// and the "family-name" arbitrary-property font utilities used throughout
// components (not spelled out literally here on purpose: Tailwind's JIT
// scans the raw text of every file for anything that looks like a class,
// comments included — writing that bracket syntax with a wildcard in a
// comment previously got a bogus utility generated for it and broke the
// production build with a CSS parse error).
const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const SITE_TITLE = "Mohamed Nagy | Software Developer";
const SITE_DESCRIPTION =
  "Mohamed Nagy – Software Developer passionate about building clean, responsive, user-focused applications with modern technologies like React, Tailwind, and TypeScript.";

export const metadata: Metadata = {
  // Required for the auto-generated opengraph-image/twitter-image routes to
  // resolve to absolute URLs — update if the production domain differs.
  metadataBase: new URL("https://monagy.com"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Mohamed Nagy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${plusJakartaSans.variable} ${spaceGrotesk.variable}`}
    >
      <body
        className="bg-[var(--bg)] text-[var(--text)] transition-colors duration-500"
        suppressHydrationWarning
      >
        {/* Blocking (no async/defer) so it runs before first paint, applying
            the user's saved theme class before any CSS-driven color renders.
            Without this, the theme is only set inside a React useEffect,
            which runs after the page has already started rendering — that
            gap is what shows up as a flash back to the default theme on
            every reload for anyone who chose light mode. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme")==="light"?"light":"dark";var r=document.documentElement,b=document.body;if(t==="light"){r.classList.add("light");r.classList.remove("dark");b.classList.add("light")}else{r.classList.add("dark");r.classList.remove("light");b.classList.remove("light")}}catch(e){}})();`,
          }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
