/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Marketing copy is hand-checked; don't let lint rules (e.g. unescaped quotes in
  // Bosnian/Serbian/Croatian text) block production builds on Vercel.
  eslint: { ignoreDuringBuilds: true },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

module.exports = nextConfig;
