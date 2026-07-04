import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

export const metadata: Metadata = {
  title: "Mohamed Nagy | Front-End Developer",
  description:
    "Mohamed Nagy – Front-End Developer passionate about building clean, responsive, user-focused applications with modern technologies like React, Tailwind, and TypeScript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Speed up font loading by preconnecting to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
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
