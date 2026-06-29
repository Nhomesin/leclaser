import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadBody = {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  service?: string;
  message?: string;
  source?: string;
  company?: string; // honeypot
};

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot — silently accept to not tip off bots.
  if (body.company) return NextResponse.json({ ok: true });

  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
  }

  const lead = {
    name,
    phone,
    email: (body.email || "").trim(),
    city: (body.city || "").trim(),
    service: (body.service || "").trim(),
    message: (body.message || "").trim(),
    source: (body.source || "").trim(),
    at: new Date().toISOString(),
  };

  // Always log (visible in Vercel function logs as a fallback channel).
  console.log("[LEAD]", JSON.stringify(lead));

  // Optional: forward to a generic webhook (Zapier/Make/n8n/GHL) if configured.
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (e) {
      console.error("[LEAD] webhook failed", e);
    }
  }

  // Optional: email via Resend if RESEND_API_KEY is set.
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const to = process.env.LEAD_TO || SITE.email;
    const from = process.env.LEAD_FROM || "LEC web <onboarding@resend.dev>";
    const html = `
      <h2>Novi upit sa leclaser.com</h2>
      <table style="font-family:sans-serif;font-size:14px">
        <tr><td><b>Ime</b></td><td>${escapeHtml(lead.name)}</td></tr>
        <tr><td><b>Telefon</b></td><td>${escapeHtml(lead.phone)}</td></tr>
        <tr><td><b>E-mail</b></td><td>${escapeHtml(lead.email)}</td></tr>
        <tr><td><b>Grad</b></td><td>${escapeHtml(lead.city)}</td></tr>
        <tr><td><b>Usluga</b></td><td>${escapeHtml(lead.service)}</td></tr>
        <tr><td><b>Izvor</b></td><td>${escapeHtml(lead.source)}</td></tr>
        <tr><td valign="top"><b>Poruka</b></td><td>${escapeHtml(lead.message).replace(/\n/g, "<br>")}</td></tr>
      </table>`;
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: lead.email || undefined,
          subject: `Novi upit — ${lead.name}${lead.city ? ` (${lead.city})` : ""}`,
          html,
        }),
      });
      if (!res.ok) console.error("[LEAD] resend failed", await res.text());
    } catch (e) {
      console.error("[LEAD] resend error", e);
    }
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}
