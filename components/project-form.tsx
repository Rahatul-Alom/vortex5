"use client";

import { useState } from "react";
import { ALLOWED_FILE_EXT, MAX_FILE_BYTES, budgets, categories, sources, timelines } from "@/lib/contact-options";
import { Button } from "./button";

const input =
  "h-12 w-full rounded-xl border border-white/12 bg-white/[0.04] px-3.5 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-cyan/60 focus:bg-white/[0.05]";

function Field({ label, optional, children }: { label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink/90">
        {label}
        {optional && <span className="ml-1.5 font-normal text-muted">(optional)</span>}
      </span>
      {children}
    </label>
  );
}

function Pills({ legend, name, options, required }: { legend: string; name: string; options: readonly string[]; required?: boolean }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-ink/90">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o, i) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" name={name} value={o} required={required && i === 0} className="peer sr-only" />
            <span className="block rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-[13px] text-muted transition peer-checked:border-cyan/70 peer-checked:bg-cyan/10 peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-cyan/60 hover:border-white/25 hover:text-ink">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

type Status = "idle" | "sending" | "success" | "error";

export function ProjectForm() {
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);

    const file = data.get("attachment");
    if (file instanceof File && file.size > MAX_FILE_BYTES) {
      setStatus("error");
      setMessage("The attachment is larger than 5 MB. Please upload a smaller file.");
      return;
    }

    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/contact", { method: "POST", body: data });
      const json = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !json?.ok) {
        setStatus("error");
        setMessage(json?.error ?? "Something went wrong. Please try again.");
        return;
      }
      form.reset();
      setFileName("");
      setStatus("success");
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex min-h-[28rem] flex-col items-center justify-center p-8 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-cyan/15 text-cyan">
          <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">Thank you! We got your project.</h3>
        <p className="mt-3 max-w-sm text-muted">A real person will review it and reply within one business day.</p>
        <Button type="button" variant="ghost" className="mt-8" onClick={() => setStatus("idle")}>
          Send another project
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 p-6 sm:p-8">
      {/* Honeypot for bots — hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name">
          <input type="text" name="name" required maxLength={100} placeholder="Jane Doe" autoComplete="name" className={input} />
        </Field>
        <Field label="Work Email">
          <input type="email" name="email" required maxLength={254} placeholder="jane@company.com" autoComplete="email" className={input} />
        </Field>
        <Field label="Company / Organization" optional>
          <input type="text" name="company" maxLength={120} placeholder="Company name" autoComplete="organization" className={input} />
        </Field>
        <Field label="Phone Number" optional>
          <input type="tel" name="phone" maxLength={30} placeholder="+1 000 000 0000" autoComplete="tel" className={input} />
        </Field>
      </div>

      <Pills legend="Project Category" name="category" options={categories} required />

      <Pills legend="Estimated Budget" name="budget" options={budgets} required />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Project Timeline" optional>
          <select name="timeline" defaultValue="" className={input}>
            <option value="">Select a timeline</option>
            {timelines.map((t) => <option key={t} value={t} className="bg-surface">{t}</option>)}
          </select>
        </Field>
        <Field label="How did you hear about us?" optional>
          <select name="source" defaultValue="" className={input}>
            <option value="">Select an option</option>
            {sources.map((t) => <option key={t} value={t} className="bg-surface">{t}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Project Description / Requirements">
        <textarea
          maxLength={5000}
          name="description"
          required
          rows={5}
          placeholder="Tell us about your goals, features you need, and anything else we should know."
          className={`${input} h-auto resize-y py-3 leading-relaxed`}
        />
      </Field>

      <div>
        <span className="mb-2 block text-sm font-medium text-ink/90">
          Attachment<span className="ml-1.5 font-normal text-muted">(optional, up to 5 MB)</span>
        </span>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/20 bg-white/[0.02] px-4 py-3.5 text-sm text-muted transition hover:border-cyan/60 hover:text-ink">
          <span aria-hidden className="text-cyan">↑</span>
          <span className="truncate">{fileName || "Upload a brief or requirements document"}</span>
          <input
            type="file"
            name="attachment"
            accept={ALLOWED_FILE_EXT.map((e) => `.${e}`).join(",")}
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {message}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <p className="text-xs text-muted">Free quote. We reply within one business day.</p>
        <Button type="submit" arrow disabled={status === "sending"} className="disabled:cursor-wait disabled:opacity-70">
          {status === "sending" ? "Sending…" : "SUBMIT"}
        </Button>
      </div>
    </form>
  );
}
