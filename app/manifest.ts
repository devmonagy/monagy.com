import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mohamed Nagy | Front-End Developer",
    short_name: "M_N",
    description:
      "Mohamed Nagy – Front-End Developer building clean, responsive, user-focused applications with React, Next.js, TypeScript, and Tailwind CSS.",
    start_url: "/",
    display: "standalone",
    background_color: "#030303",
    theme_color: "#0b0b0d",
    icons: [
      {
        src: "/pwa-icon-192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa-icon-512",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
