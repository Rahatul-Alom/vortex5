import Link from "next/link";
import { site } from "@/lib/site";
import { ArrowUpRight } from "./icons";
import { Logo } from "./logo";
import { services } from "./services";

const col = "mb-5 font-display text-sm font-semibold text-ink";
const link = "text-sm text-muted transition-colors hover:text-cyan";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface/60">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-72 w-[50rem] -translate-x-1/2 rounded-full bg-azure/30 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 pt-20 pb-8 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1.1fr_1.2fr]">
          <div>
            <Logo tagline />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              A digital agency in Dhaka. We design brands, build websites and software, and run marketing that brings customers in.
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href || undefined} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-1`}>
                    {s.label} <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Company">
            <p className={col}>Company</p>
            <ul className="space-y-3">
              {site.nav.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={link}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={col}>Services</p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.key}>
                  <Link href={`/services/${s.slug}`} className={link}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={col}>Contact</p>
            <ul className="space-y-3 text-sm text-muted">
              <li><a href={`mailto:${site.email}`} className="transition-colors hover:text-cyan">{site.email}</a></li>
              <li><a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="transition-colors hover:text-cyan">{site.phone}</a></li>
              <li className="max-w-[16rem] leading-relaxed">{site.location}</li>
              <li>{site.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.legal.map((l) => (
              <li key={l.label}><a href={l.href} className="transition-colors hover:text-ink">{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
