import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LEC — Lasersko rezanje, graviranje i reklame";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          backgroundImage:
            "radial-gradient(60% 70% at 82% 0%, rgba(245,134,52,0.20), rgba(245,134,52,0) 60%), linear-gradient(rgba(10,10,10,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.05) 1px, transparent 1px)",
          backgroundSize: "auto, 64px 64px, 64px 64px",
          padding: "72px 80px",
          color: "#0A0A0A",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg,#F7A05F,#F46600)",
              fontSize: 38,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            L
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 8, color: "#0A0A0A" }}>LEC</div>
          <div style={{ fontSize: 20, color: "#8C8F94", letterSpacing: 4, marginLeft: 8 }}>
            PRECIZNA PROIZVODNJA · OD 2003.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 900 }}>
            Lasersko rezanje, graviranje i reklame
          </div>
          <div style={{ fontSize: 30, color: "#56585C", maxWidth: 820 }}>
            Svjetleće reklame · POS displeji · pleksiglas · CNC — iz Laktaša u cijelu regiju.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 26, color: "#F46600", fontWeight: 700 }}>leclaser.com</div>
          <div style={{ fontSize: 22, color: "#8C8F94" }}>BiH · Srbija · Hrvatska · Crna Gora</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
