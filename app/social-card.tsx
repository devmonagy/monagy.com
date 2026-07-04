// Shared visual for opengraph-image.tsx and twitter-image.tsx — kept as a
// plain module (not a Next.js file convention) so the two convention files
// stay simple and directly recognizable while sharing one design.
export function SocialCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#030303",
        backgroundImage:
          "radial-gradient(circle at 12% 18%, rgba(0,255,204,0.16), transparent 55%)",
        padding: "72px 88px",
      }}
    >
      {/* Top row: status badge + M_N mark */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "Syne",
            fontSize: 20,
            color: "#a1a1aa",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#00ffcc",
            }}
          />
          SYS_STATUS: ACTIVE
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 20,
            border: "3px solid #00ffcc",
            background: "#0b0b0d",
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: 34,
            color: "#00ffcc",
          }}
        >
          M_N
        </div>
      </div>

      {/* Main headline block */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: 92,
            color: "#f4f4f5",
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          Mohamed Nagy.
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: 32,
            color: "#00ffcc",
          }}
        >
          Engineering high-fidelity visual architectures.
        </div>
      </div>

      {/* Bottom row: tech tags + credit */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          {["REACT", "NEXT.JS", "TYPESCRIPT"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontFamily: "Syne",
                fontSize: 18,
                color: "#a1a1aa",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 999,
                padding: "8px 20px",
                letterSpacing: 2,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Syne",
            fontSize: 20,
            color: "#a1a1aa",
            letterSpacing: 2,
          }}
        >
          monagy.com
        </div>
      </div>
    </div>
  );
}
