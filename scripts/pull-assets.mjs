// Pulls LEC's real brand + product images from leclaser.com and maps them to
// our category/service slugs. Writes files into public/ and a data file at
// src/data/images.ts. Re-runnable.
import fs from "node:fs";
import path from "node:path";

const ORIGIN = "https://leclaser.com";
const ROOT = process.cwd();
const PUB = path.join(ROOT, "public");

const BRAND = {
  logo: `${ORIGIN}/wp-content/uploads/2023/09/lec_logo_orange_250px-crni.png`,
  icon: `${ORIGIN}/wp-content/uploads/2023/09/cropped-logo_ICON_b-270x270.png`,
};

// our slug -> leclaser portfolio-item page(s)
const CATEGORY_MAP = {
  "svjetlece-reklame-logotipi": ["oznake-svjetleci-logotipi"],
  "reklamne-table-totemi": ["oznake-reklamne-table-za-firme"],
  "hotelske-oznake-wayfinding": ["hotelske-oznake"],
  "pos-displeji": ["pos", "pos-samostojeci-display", "pos-nosaci-proizvoda"],
  "pleksiglas-proizvodi": ["pleksiglas-proizvodi", "nagrade-priznanja-poslovni-pokloni", "govornice", "nosaci-menija", "namjenski-proizvodi"],
  "enterijer-eksterijer": ["enterijer-eksterijer", "enterijer-opremanje-prostora", "enterijer-postanski-sanducici", "eksterijer-fasadni-detalji"],
};

const SERVICE_MAP = {
  "lasersko-rezanje": ["lasersko-rezanje-sjecenje"],
  "lasersko-graviranje": ["lasersko-graviranje"],
  "cnc-rezanje-glodanje": ["cnc-rezanje-glodanje"],
  "dijamantsko-poliranje": ["dijamantsko-poliranje"],
  "termo-savijanje-lijepljenje": ["termo-savijanje-i-lijepjenje-pleksiglasa"],
  "dizajn-proizvoda": ["dizajn-proizvoda"],
};

const UA = { headers: { "User-Agent": "Mozilla/5.0 (asset-puller)" } };

async function getHtml(url) {
  const r = await fetch(url, UA);
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.text();
}

// Collect upload image URLs from HTML, grouped by base name (ignoring -WxH size).
function imagesFromHtml(html) {
  const re = /https:\/\/leclaser\.com\/wp-content\/uploads\/[^\s"')]+?\.(?:jpg|jpeg|png|webp)/gi;
  const all = [...new Set(html.match(re) || [])];
  const groups = new Map();
  for (const url of all) {
    const ext = url.split(".").pop().toLowerCase();
    const m = url.match(/^(.*?)(?:-(\d+)x(\d+))?\.(?:jpg|jpeg|png|webp)$/i);
    if (!m) continue;
    const base = m[1];
    const w = m[2] ? parseInt(m[2], 10) : 0;
    if (/logo|icon|cropped|placeholder|avatar/i.test(base)) continue; // skip brand/ui
    if (!groups.has(base)) groups.set(base, []);
    groups.get(base).push({ url, w, ext });
  }
  // pick best variant per group: smallest with w>=700, else largest
  const picks = [];
  for (const [, variants] of groups) {
    variants.sort((a, b) => a.w - b.w);
    const big = variants.filter((v) => v.w >= 700);
    const pick = big.length ? big[0] : variants[variants.length - 1];
    picks.push(pick);
  }
  return picks;
}

async function download(url, dest) {
  const r = await fetch(url, UA);
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  const buf = Buffer.from(await r.arrayBuffer());
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  return buf.length;
}

// minimal PNG dimension reader (IHDR)
function pngSize(buf) {
  if (buf.length < 24) return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

async function collectFor(map, bucket, perSlugCap) {
  const out = {};
  for (const [slug, items] of Object.entries(map)) {
    const picks = [];
    const seen = new Set();
    for (const item of items) {
      let html;
      try {
        html = await getHtml(`${ORIGIN}/portfolio-item/${item}/`);
      } catch (e) {
        console.warn(`  ! skip ${item}: ${e.message}`);
        continue;
      }
      for (const p of imagesFromHtml(html)) {
        const key = p.url.replace(/-\d+x\d+/, "");
        if (seen.has(key)) continue;
        seen.add(key);
        picks.push(p);
      }
    }
    const chosen = picks.slice(0, perSlugCap);
    const rels = [];
    let i = 1;
    for (const p of chosen) {
      const ext = p.ext === "jpeg" ? "jpg" : p.ext;
      const rel = `/${bucket}/${slug}/${String(i).padStart(2, "0")}.${ext}`;
      try {
        const bytes = await download(p.url, path.join(PUB, rel));
        rels.push(rel);
        console.log(`  ${slug} <- ${path.basename(p.url)} (${Math.round(bytes / 1024)}kb)`);
        i++;
      } catch (e) {
        console.warn(`  ! ${p.url}: ${e.message}`);
      }
    }
    out[slug] = rels;
  }
  return out;
}

async function main() {
  console.log("Brand assets…");
  const logoBuf = Buffer.from(await (await fetch(BRAND.logo, UA)).arrayBuffer());
  fs.mkdirSync(path.join(PUB, "brand"), { recursive: true });
  fs.writeFileSync(path.join(PUB, "brand/logo.png"), logoBuf);
  const logoDim = pngSize(logoBuf) || { w: 250, h: 70 };
  await download(BRAND.icon, path.join(PUB, "brand/icon.png"));
  // favicon used by Next conventions (app/icon.png, app/apple-icon.png)
  fs.copyFileSync(path.join(PUB, "brand/icon.png"), path.join(ROOT, "src/app/icon.png"));
  fs.copyFileSync(path.join(PUB, "brand/icon.png"), path.join(ROOT, "src/app/apple-icon.png"));
  console.log(`  logo ${logoDim.w}x${logoDim.h}, icon ok`);

  console.log("Portfolio images…");
  const portfolio = await collectFor(CATEGORY_MAP, "portfolio", 10);
  console.log("Service images…");
  const services = await collectFor(SERVICE_MAP, "services", 6);

  const data =
    `// AUTO-GENERATED by scripts/pull-assets.mjs — real LEC photos from leclaser.com.\n` +
    `export const LOGO = { src: "/brand/logo.png", width: ${logoDim.w}, height: ${logoDim.h} };\n` +
    `export const ICON = "/brand/icon.png";\n\n` +
    `export const PORTFOLIO_IMAGES: Record<string, string[]> = ${JSON.stringify(portfolio, null, 2)};\n\n` +
    `export const SERVICE_IMAGES: Record<string, string[]> = ${JSON.stringify(services, null, 2)};\n\n` +
    `export function categoryImages(slug: string): string[] { return PORTFOLIO_IMAGES[slug] || []; }\n` +
    `export function categoryHero(slug: string): string | null { return (PORTFOLIO_IMAGES[slug] || [])[0] || null; }\n` +
    `export function serviceImages(slug: string): string[] { return SERVICE_IMAGES[slug] || []; }\n` +
    `export function serviceHero(slug: string): string | null { return (SERVICE_IMAGES[slug] || [])[0] || null; }\n`;
  fs.writeFileSync(path.join(ROOT, "src/data/images.ts"), data);

  const counts = Object.entries(portfolio).map(([k, v]) => `${k}:${v.length}`).join(", ");
  const scounts = Object.entries(services).map(([k, v]) => `${k}:${v.length}`).join(", ");
  console.log(`\nDone.\n  portfolio -> ${counts}\n  services  -> ${scounts}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
