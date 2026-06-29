import type { Config } from "tailwindcss";

/**
 * LEC // PRECISION design system.
 * Direction: "engineered/laser" — graphite canvas, frosted-acrylic panels,
 * registration-crosshair + kerf-cut motifs, a single hot laser-orange accent,
 * technical mono labels. Dark-first, premium-industrial.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light canvas — matches leclaser.com (white + warm orange brand)
        bg: "#FFFFFF",
        bg2: "#F6F5F2",
        panel: "#FFFFFF",
        panel2: "#F4F2EE",
        ink: "#0A0A0A",
        muted: "#56585C",
        faint: "#8C8F94",
        line: "rgba(10,10,10,0.10)",
        // Signature accent — LEC orange (#f58634), deeper on hover (#f46600)
        laser: {
          DEFAULT: "#F58634",
          400: "#F7A05F",
          500: "#F58634",
          600: "#F46600",
          ember: "#FBB37A",
        },
        // Warm technical hairline accent
        tech: "#F46600",
        // Off-brand ACTION color for CTAs (green) — distinct from the orange brand,
        // so conversion buttons pop. Brand = orange (identity); CTA = green (action).
        cta: {
          DEFAULT: "#1A8050",
          400: "#2E9E63",
          500: "#1A8050",
          600: "#11643E",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.025em",
      },
      maxWidth: {
        container: "1200px",
        prose: "68ch",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(245,134,52,0.40), 0 14px 36px -12px rgba(245,134,52,0.50)",
        "glow-soft": "0 16px 40px -18px rgba(245,134,52,0.45)",
        cta: "0 0 0 1px rgba(17,100,62,0.22), 0 16px 34px -14px rgba(17,100,62,0.42)",
        "cta-soft": "0 14px 32px -18px rgba(17,100,62,0.38)",
        panel: "0 24px 60px -32px rgba(10,10,10,0.22), 0 2px 8px -4px rgba(10,10,10,0.08)",
        ring: "inset 0 0 0 1px rgba(10,10,10,0.06)",
      },
      backgroundImage: {
        "cta-grad": "linear-gradient(135deg, #2E9E63 0%, #1A8050 55%, #11643E 100%)",
        "laser-grad": "linear-gradient(135deg, #F7A05F 0%, #F58634 45%, #F46600 100%)",
        "ink-fade": "linear-gradient(180deg, #0A0A0A 0%, #56585C 100%)",
        "panel-sheen": "linear-gradient(180deg, #FFFFFF 0%, #FAF9F6 100%)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.32,0.72,0,1)",
        precise: "cubic-bezier(0.2,0.8,0.2,1)",
      },
      keyframes: {
        "laser-sweep": {
          "0%": { transform: "translateX(-120%)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { transform: "translateX(120%)", opacity: "0" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.7)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "laser-sweep": "laser-sweep 3.2s ease-in-out infinite",
        "marquee": "marquee 38s linear infinite",
        "pulse-dot": "pulse-dot 1.8s ease-in-out infinite",
        "float-slow": "float-slow 7s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
