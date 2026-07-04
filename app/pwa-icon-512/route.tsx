import { ImageResponse } from "next/og";
import { getSyneFont } from "../og-font";

export async function GET() {
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
          backgroundImage:
            "radial-gradient(circle at 50% 40%, rgba(0,255,204,0.25), transparent 65%)",
        }}
      >
        <span
          style={{
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: 280,
            color: "#00ffcc",
            lineHeight: 1,
          }}
        >
          M
        </span>
      </div>
    ),
    {
      width: 512,
      height: 512,
      fonts: [{ name: "Syne", data: syne, weight: 800, style: "normal" }],
    },
  );
}
