import { site } from "./site";

export type Lead = {
  name: string;
  email: string;
  company: string;
  phone: string;
  category: string;
  budget: string;
  timeline: string;
  source: string;
  description: string;
  file?: { name: string; type: string; data: Buffer };
};

export type SendResult = "sent" | "skipped";

const env = (k: string) => process.env[k]?.trim() || "";
const list = (v: string) => v.split(",").map((s) => s.trim()).filter(Boolean);
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const oneLine = (s: string) => s.replace(/[\r\n\t]+/g, " ").replace(/ {2,}/g, " ").trim();

function rows(l: Lead): [string, string][] {
  return [
    ["Name", l.name],
    ["Email", l.email],
    ["Phone", l.phone || "—"],
    ["Company", l.company || "—"],
    ["Category", l.category],
    ["Budget", l.budget],
    ["Timeline", l.timeline || "—"],
    ["Heard about us via", l.source || "—"],
  ];
}

function plainText(l: Lead, max = 3500) {
  const head = rows(l).map(([k, v]) => `${k}: ${v}`).join("\n");
  const text = `New project enquiry\n\n${head}\n\nProject details:\n${l.description}`;
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

/** Fetch with a timeout so one slow provider can't hang the whole request. */
async function post(url: string, init: RequestInit, ms = 12000) {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(ms) });
  if (!res.ok) throw new Error(`${new URL(url).hostname} responded ${res.status}`);
  return res;
}

/* ---------------------------------- Telegram --------------------------------- */

export async function sendTelegram(l: Lead): Promise<SendResult> {
  const token = env("TELEGRAM_BOT_TOKEN");
  const chats = list(env("TELEGRAM_CHAT_ID"));
  if (!token || chats.length === 0) return "skipped";

  const html =
    `<b>New project enquiry</b>\n\n` +
    rows(l).map(([k, v]) => `<b>${k}:</b> ${esc(v)}`).join("\n") +
    `\n\n<b>Project details:</b>\n${esc(l.description.slice(0, 2500))}`;
  const api = `https://api.telegram.org/bot${token}`;

  for (const chat_id of chats) {
    await post(`${api}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id, text: html, parse_mode: "HTML", disable_web_page_preview: true }),
    });
    if (l.file) {
      const form = new FormData();
      form.set("chat_id", chat_id);
      form.set("caption", `Attachment from ${l.name}`.slice(0, 200));
      form.set("document", new Blob([new Uint8Array(l.file.data)], { type: l.file.type }), l.file.name);
      await post(`${api}/sendDocument`, { method: "POST", body: form }, 30000);
    }
  }
  return "sent";
}

/* ---------------------------------- WhatsApp --------------------------------- */

/**
 * Two providers (set WHATSAPP_PROVIDER):
 *  - "cloud":    Meta WhatsApp Business Cloud API (official, needs a Business account)
 *  - "callmebot": CallMeBot (free, personal number, needs a one-time activation)
 */
export async function sendWhatsApp(l: Lead): Promise<SendResult> {
  const provider = env("WHATSAPP_PROVIDER");
  const recipients = list(env("CONTACT_WHATSAPP_TO") || site.whatsapp).map((n) => n.replace(/\D/g, ""));
  if (!provider || recipients.length === 0) return "skipped";

  const text = plainText(l, 1500);

  if (provider === "cloud") {
    const token = env("WHATSAPP_CLOUD_TOKEN");
    const phoneId = env("WHATSAPP_PHONE_NUMBER_ID");
    if (!token || !phoneId) return "skipped";
    const template = env("WHATSAPP_TEMPLATE_NAME");
    for (const to of recipients) {
      const body = template
        ? {
            messaging_product: "whatsapp",
            to,
            type: "template",
            template: {
              name: template,
              language: { code: env("WHATSAPP_TEMPLATE_LANG") || "en" },
              // Template parameters can't contain line breaks.
              components: [{ type: "body", parameters: [{ type: "text", text: oneLine(text).slice(0, 900) }] }],
            },
          }
        : { messaging_product: "whatsapp", to, type: "text", text: { body: text } };
      await post(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }
    return "sent";
  }

  if (provider === "callmebot") {
    const apikey = env("WHATSAPP_CALLMEBOT_APIKEY");
    if (!apikey) return "skipped";
    for (const to of recipients) {
      const qs = new URLSearchParams({ phone: `+${to}`, text, apikey });
      await post(`https://api.callmebot.com/whatsapp.php?${qs}`, { method: "GET" });
    }
    return "sent";
  }

  throw new Error(`Unknown WHATSAPP_PROVIDER "${provider}"`);
}

/* ------------------------------------ Email ---------------------------------- */

export async function sendEmail(l: Lead): Promise<SendResult> {
  const host = env("SMTP_HOST");
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");
  const to = list(env("CONTACT_EMAIL_TO") || site.email);
  if (!host || !user || !pass || to.length === 0) return "skipped";

  const port = Number(env("SMTP_PORT")) || 587;
  const secure = env("SMTP_SECURE") ? env("SMTP_SECURE") === "true" : port === 465;
  const { default: nodemailer } = await import("nodemailer");
  const transport = nodemailer.createTransport({ host, port, secure, auth: { user, pass }, connectionTimeout: 12000, socketTimeout: 20000 });

  const table = rows(l)
    .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#667;vertical-align:top">${k}</td><td style="padding:6px 0"><b>${esc(v)}</b></td></tr>`)
    .join("");

  await transport.sendMail({
    from: env("SMTP_FROM") || `"${site.name} Website" <${user}>`,
    to,
    replyTo: { name: oneLine(l.name), address: l.email },
    subject: oneLine(`New enquiry: ${l.category} — ${l.name}`).slice(0, 150),
    text: plainText(l, 20000),
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111"><h2 style="margin:0 0 16px">New project enquiry</h2><table>${table}</table><h3 style="margin:24px 0 8px">Project details</h3><p style="white-space:pre-wrap;margin:0">${esc(l.description)}</p></div>`,
    attachments: l.file ? [{ filename: l.file.name, content: l.file.data, contentType: l.file.type }] : [],
  });
  return "sent";
}
