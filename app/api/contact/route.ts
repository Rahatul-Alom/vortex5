import { NextResponse } from "next/server";
import { ALLOWED_FILE_EXT, MAX_FILE_BYTES, budgets, categories, sources, timelines } from "@/lib/contact-options";
import { sendEmail, sendTelegram, sendWhatsApp, type Lead } from "@/lib/notify";

export const runtime = "nodejs";

// Best-effort limiter (per server instance): 5 submissions per IP every 10 minutes.
const hits = new Map<string, { n: number; reset: number }>();
function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || h.reset < now) {
    hits.set(ip, { n: 1, reset: now + 10 * 60_000 });
    if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
    return false;
  }
  return ++h.n > 5;
}

const text = (f: FormData, k: string, max: number) => {
  const v = f.get(k);
  return typeof v === "string" ? v.replace(/\r\n/g, "\n").trim().slice(0, max) : "";
};
const pick = <T extends readonly string[]>(v: string, opts: T): v is T[number] => (opts as readonly string[]).includes(v);
const fail = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  // Only accept submissions from our own pages.
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) return fail("Forbidden", 403);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (limited(ip)) return fail("Too many requests. Please try again in a few minutes.", 429);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("Invalid form data.");
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success to bots.
  if (text(form, "website", 200)) return NextResponse.json({ ok: true });

  const name = text(form, "name", 100);
  const email = text(form, "email", 254);
  const category = text(form, "category", 100);
  const budget = text(form, "budget", 100);
  const timeline = text(form, "timeline", 100);
  const source = text(form, "source", 100);
  const description = text(form, "description", 5000);

  if (!name || !description) return fail("Please fill in your name and project details.");
  if (!/^[^\s@<>()",;:\\]+@[^\s@<>()",;:\\]+\.[^\s@<>()",;:\\]{2,}$/.test(email)) return fail("Please enter a valid email address.");
  if (!pick(category, categories)) return fail("Please choose a project category.");
  if (!pick(budget, budgets)) return fail("Please choose an estimated budget.");
  if (timeline && !pick(timeline, timelines)) return fail("Invalid timeline.");
  if (source && !pick(source, sources)) return fail("Invalid option.");

  const lead: Lead = {
    name,
    email,
    company: text(form, "company", 120),
    phone: text(form, "phone", 30),
    category,
    budget,
    timeline,
    source,
    description,
  };

  const file = form.get("attachment");
  if (file instanceof File && file.size > 0) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!(ALLOWED_FILE_EXT as readonly string[]).includes(ext)) return fail("This file type isn't allowed. Use PDF, DOC, DOCX, PNG, JPG or ZIP.");
    if (file.size > MAX_FILE_BYTES) return fail("The attachment is larger than 5 MB.");
    lead.file = {
      name: file.name.replace(/[^\w.\- ]+/g, "_").slice(0, 120),
      type: file.type || "application/octet-stream",
      data: Buffer.from(await file.arrayBuffer()),
    };
  }

  // Send to every channel at the same time; one failing channel must not block the others.
  const channels = { telegram: sendTelegram, whatsapp: sendWhatsApp, email: sendEmail };
  const names = Object.keys(channels) as (keyof typeof channels)[];
  const results = await Promise.allSettled(names.map((n) => channels[n](lead)));

  let delivered = 0;
  results.forEach((r, i) => {
    if (r.status === "fulfilled") {
      if (r.value === "sent") delivered++;
      else console.warn(`[contact] ${names[i]} is not configured (skipped)`);
    } else {
      console.error(`[contact] ${names[i]} failed:`, r.reason instanceof Error ? r.reason.message : r.reason);
    }
  });

  if (delivered === 0) return fail("We couldn't send your message right now. Please contact us on WhatsApp or by email.", 502);
  return NextResponse.json({ ok: true });
}
