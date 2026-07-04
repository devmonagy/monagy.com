import { ImageResponse } from "next/og";
import { getSyneFont } from "../og-font";

// Light-mode variant of the favicon. Not a Next.js icon.tsx convention file
// (only one of those can auto-wire into <head>) — this is a plain route that
// the client swaps to via a <link rel="icon"> replacement when the user
// toggles to light mode, so the tab icon updates live without a refresh.
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
          background: "#ffffff",
          border: "2px solid #0055ff",
          borderRadius: 8,
        }}
      >
        <span
          style={{
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: 20,
            color: "#0055ff",
            lineHeight: 1,
          }}
        >
          M
        </span>
      </div>
    ),
    {
      width: 32,
      height: 32,
      fonts: [{ name: "Syne", data: syne, weight: 800, style: "normal" }],
    },
  );
}
