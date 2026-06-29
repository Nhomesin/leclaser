# LEC — Ownership & Setup Guide

This repository is a **complete, self-contained copy** of the leclaser.com website. It has **no
link to any prior Vercel account** — you can host it entirely under your own Vercel and GitHub.

- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript + Tailwind CSS + framer-motion
- **Pages:** 78 prerendered (home, 6 services, portfolio + 6 categories, 52 city pages, about, contact, legal)
- **Language:** Bosnian/Serbian/Croatian (Latin, ijekavica)

---

## 1. Take ownership of the code (GitHub)

The repo currently lives under a temporary GitHub account for delivery. To make it **yours**:

**Option A — Transfer the repo (true ownership):**
GitHub → the repo → **Settings → General → Danger Zone → Transfer ownership** → enter your
GitHub username or organization. You become the sole owner.

**Option B — Fork/clone into your own account:**
Fork the repo, or `git clone` it and push to a new repo under your GitHub.

> Either way, once it's in your GitHub you can delete the delivery copy.

---

## 2. Deploy on your Vercel

1. Create a free/Pro account at **vercel.com** (sign in with your GitHub).
2. **Add New → Project → Import Git Repository** → pick this repo.
3. Vercel auto-detects **Next.js** — leave build/output settings at defaults.
4. Add the environment variables in section 3 (optional but recommended), then **Deploy**.

After that, **every push to the main branch deploys automatically**. You get a free
`*.vercel.app` URL immediately; add the real domain in section 4.

---

## 3. Environment variables (set in Vercel → Project → Settings → Environment Variables)

The site **works without any of these** — phone, WhatsApp, and Viber buttons are always live.
They are only needed so the **website contact form delivers leads** (otherwise a form submission
is only written to Vercel's function logs).

| Variable | Required? | What it does |
|----------|-----------|--------------|
| `RESEND_API_KEY` | for email leads | Sends each form submission to your inbox via [Resend](https://resend.com). Free tier is plenty for this volume. |
| `LEAD_TO` | optional | Inbox that receives leads. Defaults to `info@leclaser.com`. |
| `LEAD_FROM` | optional | Verified sender, e.g. `LEC web <upiti@leclaser.com>`. Must be on a domain you verify in Resend. |
| `LEAD_WEBHOOK_URL` | optional | POSTs every lead (JSON) to a Zapier/Make/n8n/CRM webhook — e.g. to ping WhatsApp instantly. |

**To enable email leads:** create a Resend account → verify your sending domain (adds DNS records,
does **not** touch your existing inbox MX) → put the API key in `RESEND_API_KEY` and your inbox in
`LEAD_TO` → redeploy → submit a test lead to confirm it arrives.

---

## 4. Point the leclaser.com domain at this site

1. In Vercel: **Project → Settings → Domains → Add** `leclaser.com` (and `www.leclaser.com`).
2. Vercel shows the exact DNS records to set at your domain registrar:
   - Apex `leclaser.com` → **A record** `76.76.21.21`
   - `www` → **CNAME** `cname.vercel-dns.com`
3. **Do not change your `MX` / email (SPF/DKIM) records** — only the A/CNAME above. Your email keeps working.
4. SSL is issued automatically once DNS propagates.

> Tip: lower the DNS TTL to ~300s a day before switching so you can roll back fast if needed.

---

## 5. Run / edit locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (verifies all 78 pages)
```

**Where to edit common things:**
- **Business info / phones / address / hours (NAP):** `src/lib/site.ts`
- **Services copy:** `src/data/services-content.ts`
- **Portfolio copy:** `src/data/portfolio-content.ts`
- **City pages (52):** `src/data/cities.ts`
- **Brand color / theme tokens:** `tailwind.config.ts`
- **Photos:** `public/` (`brand/`, `portfolio/`, `services/`). Replace placeholders with high-res
  versions using the same filenames, or update the references in `src/data/images.ts`.

---

## 6. What's NOT included (by design)

- No `node_modules`, `.next` build output, or `.vercel` link — these regenerate / are created fresh
  under your account.
- No secrets/API keys — you set your own in Vercel (section 3).

That's it — the site is fully yours.
