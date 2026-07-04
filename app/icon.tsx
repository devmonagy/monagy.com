import { ImageResponse } from "next/og";
import { getSyneFont } from "./og-font";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const syne = await getSyneFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0d",
          border: "2px solid #00ffcc",
          borderRadius: 8,
        }}
      >
        <span
          style={{
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: 20,
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
