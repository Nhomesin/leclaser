import type { MetadataRoute } from "next";
import { SITE, SERVICES, PORTFOLIO } from "@/lib/site";
import { CITIES } from "@/data/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (p: string) => `${SITE.baseUrl}${p === "/" ? "" : p}`;

  const staticPages: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/usluge"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/portfolio"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/lokacije"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/o-nama"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: url("/kontakt"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: url(`/usluge/${s.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const portfolioPages: MetadataRoute.Sitemap = PORTFOLIO.map((p) => ({
    url: url(`/portfolio/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const cityPages: MetadataRoute.Sitemap = CITIES.map((c) => ({
    url: url(`/lokacije/${c.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...portfolioPages, ...cityPages];
}
