import { ImageResponse } from "next/og";
import { getSyneFont } from "./og-font";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const syne = await getSyneFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0d",
          backgroundImage:
            "radial-gradient(circle at 50% 40%, rgba(0,255,204,0.25), transparent 65%)",
        }}
      >
        <span
          style={{
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: 104,
            color: "#00ffcc",
            lineHeight: 1,
          }}
        >
          M
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Syne", data: syne, weight: 800, style: "normal" }],
    },
  );
}
