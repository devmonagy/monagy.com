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
    <html lang="en">
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
      <body className="bg-[var(--bg)] text-[var(--text)] transition-colors duration-500">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
