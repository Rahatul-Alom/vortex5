import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink } from "./button";

/** Header for inner pages: breadcrumb, big title, intro and optional actions. */
export function PageHero({
  crumbs,
  title,
  description,
  actions,
  children,
}: {
  crumbs: { label: string; href?: string }[];
  title: ReactNode;
  description?: string;
  actions?: { label: string; href: string; variant?: "primary" | "ghost" }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_80%_at_50%_0%,#000,transparent)]" />
        <div className="absolute -top-40 right-[-10%] h-[480px] w-[720px] rounded-full bg-azure/50 blur-[140px]" />
        <div className="absolute -bottom-40 left-[-10%] h-[360px] w-[560px] rounded-full bg-violet/20 blur-[140px]" />
      </div>
      <div className="mx-auto max-w-7xl px-5 pt-36 pb-16 sm:px-8 lg:px-12 lg:pt-44 lg:pb-24">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-ink">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <span aria-hidden className="text-white/25">/</span>
              {c.href ? <Link href={c.href} className="transition-colors hover:text-ink">{c.label}</Link> : <span className="text-ink/80">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[1.02] font-semibold tracking-tight text-balance">
          {title}
        </h1>
        {description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{description}</p>}
        {actions && (
          <div className="mt-9 flex flex-wrap gap-3">
            {actions.map((a) => (
              <ButtonLink key={a.label} href={a.href} variant={a.variant ?? "primary"} arrow={a.variant !== "ghost"}>
                {a.label}
              </ButtonLink>
            ))}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
