import { SITE } from "./site";

/** Renders a JSON-LD <script> tag. Server-safe. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON is generated from trusted, static data — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const ORG_ID = `${SITE.baseUrl}/#organization`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.baseUrl,
    logo: `${SITE.baseUrl}/opengraph-image`,
    foundingDate: String(SITE.founded),
    sameAs: [SITE.instagram],
    email: SITE.email,
    telephone: SITE.phonePrimary.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postal,
      addressCountry: SITE.address.countryCode,
    },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE.baseUrl}/#localbusiness`,
    name: `${SITE.name} — Lasersko rezanje, graviranje i reklame`,
    image: `${SITE.baseUrl}/opengraph-image`,
    url: SITE.baseUrl,
    telephone: SITE.phonePrimary.tel,
    email: SITE.email,
    priceRange: "$$",
    foundingDate: String(SITE.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      postalCode: SITE.address.postal,
      addressCountry: SITE.address.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.address.lat, longitude: SITE.address.lng },
    areaServed: SITE.serviceRegion.map((c) => ({ "@type": "Country", name: c })),
    sameAs: [SITE.instagram],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "16:00",
      },
    ],
  };
}

export function serviceSchema(opts: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: { "@id": ORG_ID },
    areaServed: SITE.serviceRegion.map((c) => ({ "@type": "Country", name: c })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
