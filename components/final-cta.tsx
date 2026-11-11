import { site, whatsappLink } from "@/lib/site";
import { ButtonLink } from "./button";
import { Mail, Phone, WhatsApp } from "./icons";
import { Section } from "./section";

export function FinalCta() {
  return (
    <Section id="cta" className="!py-16 lg:!py-24">
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-linear-to-br from-azure/70 via-[#12163a] to-violet/60 px-6 py-16 text-center sm:px-12 lg:py-24">
        <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(60%_80%_at_50%_50%,#000,transparent)]" />
        <div aria-hidden className="absolute -top-32 left-1/2 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-cyan/30 blur-[110px]" />

        <h2 className="mx-auto max-w-3xl font-display text-[clamp(2.2rem,5.4vw,4.4rem)] leading-[1.02] font-semibold tracking-tight text-balance">
          Ready to get more customers online?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/75 text-pretty">
          Tell us about your business. We’ll reply within one business day with ideas, a timeline and a fixed quote. It’s free and there’s no obligation.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/contact" size="lg" arrow>
            GET STARTED
          </ButtonLink>
          <ButtonLink href={whatsappLink()} target="_blank" rel="noopener noreferrer" variant="ghost" size="lg">
            <WhatsApp className="size-5 text-[#25d366]" /> WhatsApp us
          </ButtonLink>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink/75">
          <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-2 transition-colors hover:text-cyan">
            <Phone className="size-4" /> {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-cyan">
            <Mail className="size-4" /> {site.email}
          </a>
        </div>
      </div>
    </Section>
  );
}
