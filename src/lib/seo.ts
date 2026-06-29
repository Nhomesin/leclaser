import type { Metadata } from "next";
import { SITE } from "./site";

type SeoArgs = {
  title: string;
  description: string;
  path?: string; // e.g. "/usluge/lasersko-rezanje"
  noindex?: boolean;
};

/** Builds consistent, canonical Metadata for any page. */
export function buildMetadata({ title, description, path = "/", noindex }: SeoArgs): Metadata {
  const url = `${SITE.baseUrl}${path === "/" ? "" : path}`;
  // Use an absolute title to bypass the root layout's "%s | LEC" template and
  // avoid double/triple branding. Only append "| LEC" if not already present.
  const hasBrand = /\bLEC\b/.test(title);
  const fullTitle = hasBrand ? title : `${title} | ${SITE.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "bs_BA",
      url,
      siteName: SITE.name,
      title: fullTitle,
      description,
      // OG image is provided by the app/opengraph-image route (file convention).
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
