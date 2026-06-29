import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LEC — Precizna proizvodnja",
    short_name: "LEC",
    description: "Lasersko rezanje, graviranje, CNC i pleksiglas proizvodi — iz Laktaša u cijelu regiju.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/brand/icon.png", sizes: "270x270", type: "image/png" },
      { src: "/brand/icon.png", sizes: "192x192", type: "image/png" },
    ],
  };
}
