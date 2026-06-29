// Converts the leclaser-content workflow output into typed data files.
// Usage: node scripts/build-data.mjs <path-to-workflow-output.json>
import fs from "node:fs";
import path from "node:path";

const SRC = process.argv[2];
if (!SRC) {
  console.error("Provide the workflow output file path.");
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(SRC, "utf8"));
const data = raw.result || raw;

const deburr = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d").replace(/Đ/g, "D")
    .replace(/ć/g, "c").replace(/č/g, "c")
    .replace(/š/g, "s").replace(/ž/g, "z");

const slugify = (s) =>
  deburr(s).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// ---- CITIES ----
const countryOrder = { "Bosna i Hercegovina": 0, Srbija: 1, Hrvatska: 2, "Crna Gora": 3 };
const tierOrder = { metropola: 0, "veliki-grad": 1, "industrijski-centar": 2, "regionalni-centar": 3, "turisticki-centar": 4 };

const seen = new Set();
const cities = data.cities
  .map((c) => {
    const name = c._name || c.name;
    let slug = slugify(c.slug && /^[a-z0-9-]+$/.test(c.slug) ? c.slug : name);
    while (seen.has(slug)) slug = slug + "-x";
    seen.add(slug);
    return {
      slug,
      name,
      nameLocative: c.nameLocative,
      country: c.country,
      countryCode: c.countryCode,
      region: c.region,
      tier: c.tier,
      populationLabel: c.populationLabel,
      nearbyTowns: c.nearbyTowns,
      heroTitle: c.heroTitle,
      heroSubtitle: c.heroSubtitle,
      intro: c.intro,
      localAngle: c.localAngle,
      logistics: c.logistics,
      topServices: c.topServices,
      faqs: c.faqs,
      metaTitle: c.metaTitle,
      metaDescription: c.metaDescription,
    };
  })
  .sort((a, b) => {
    const co = (countryOrder[a.country] ?? 9) - (countryOrder[b.country] ?? 9);
    if (co !== 0) return co;
    const to = (tierOrder[a.tier] ?? 9) - (tierOrder[b.tier] ?? 9);
    if (to !== 0) return to;
    return a.name.localeCompare(b.name, "hr");
  });

// ---- SERVICES ----
const services = data.services.map((s) => ({ ...s, slug: slugify(s.slug || s.name) }));

// ---- PORTFOLIO ----
const portfolio = data.portfolio.map((p) => ({ ...p, slug: slugify(p.slug || p.name) }));

const outDir = path.join(process.cwd(), "src", "data");
fs.mkdirSync(outDir, { recursive: true });

const header = "// AUTO-GENERATED from leclaser-content workflow. Edit copy here directly if needed.\n";

const citiesFile =
  header +
  `export type CityFaq = { q: string; a: string };
export type City = {
  slug: string;
  name: string;
  nameLocative: string;
  country: string;
  countryCode: "BA" | "RS" | "HR" | "ME";
  region: string;
  tier: string;
  populationLabel: string;
  nearbyTowns: string[];
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
  localAngle: string;
  logistics: string;
  topServices: string[];
  faqs: CityFaq[];
  metaTitle: string;
  metaDescription: string;
};

export const CITIES: City[] = ${JSON.stringify(cities, null, 2)};

export const COUNTRIES: { code: string; name: string }[] = [
  { code: "BA", name: "Bosna i Hercegovina" },
  { code: "RS", name: "Srbija" },
  { code: "HR", name: "Hrvatska" },
  { code: "ME", name: "Crna Gora" },
];

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
`;

const servicesFile =
  header +
  `export type ServiceContent = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  whatItIs: string;
  materials: string[];
  applications: string[];
  advantages: { title: string; text: string }[];
  processSteps: { title: string; text: string }[];
  specs: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
  ctaLine: string;
  metaTitle: string;
  metaDescription: string;
};

export const SERVICE_CONTENT: ServiceContent[] = ${JSON.stringify(services, null, 2)};

export function getService(slug: string): ServiceContent | undefined {
  return SERVICE_CONTENT.find((s) => s.slug === slug);
}
`;

const portfolioFile =
  header +
  `export type PortfolioContent = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  description: string;
  useCases: string[];
  materials: string[];
  items: { name: string; desc: string }[];
  faqs: { q: string; a: string }[];
  ctaLine: string;
  metaTitle: string;
  metaDescription: string;
};

export const PORTFOLIO_CONTENT: PortfolioContent[] = ${JSON.stringify(portfolio, null, 2)};

export function getPortfolio(slug: string): PortfolioContent | undefined {
  return PORTFOLIO_CONTENT.find((p) => p.slug === slug);
}
`;

fs.writeFileSync(path.join(outDir, "cities.ts"), citiesFile);
fs.writeFileSync(path.join(outDir, "services-content.ts"), servicesFile);
fs.writeFileSync(path.join(outDir, "portfolio-content.ts"), portfolioFile);

console.log(`Wrote ${cities.length} cities, ${services.length} services, ${portfolio.length} portfolio categories.`);
console.log("City slugs:", cities.map((c) => c.slug).join(", "));
console.log("Service slugs:", services.map((s) => s.slug).join(", "));
console.log("Portfolio slugs:", portfolio.map((p) => p.slug).join(", "));
