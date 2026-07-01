// app/layout.tsx
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
      <body className="bg-[var(--bg)] text-[var(--text)] transition-colors duration-500">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
