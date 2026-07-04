import { ImageResponse } from "next/og";
import { getSyneFont } from "./og-font";
import { SocialCard } from "./social-card";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const syne = await getSyneFont();

  return new ImageResponse(<SocialCard />, {
    ...size,
    fonts: [{ name: "Syne", data: syne, weight: 800, style: "normal" }],
  });
}
