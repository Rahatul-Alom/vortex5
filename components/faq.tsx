import { Plus } from "./icons";
import { Section, SectionHeading } from "./section";
import { ButtonLink } from "./button";

export type Faq = { q: string; a: string };

// Placeholder answers — adjust to match your real policies.
export const generalFaqs: Faq[] = [
  { q: "How much does a project cost?", a: "It depends on scope. After a short call we send a fixed quote, so you know the full price before we start. Business websites and brand packages are usually the most affordable starting points." },
  { q: "How long will my project take?", a: "A business website typically takes 3–6 weeks, a brand identity 2–4 weeks and a custom software MVP 8–12 weeks. We confirm a date in your proposal." },
  { q: "Can you work with clients outside Bangladesh?", a: "Yes. We work with clients in several countries and meet over Google Meet, Zoom or WhatsApp." },
  { q: "Do you offer support after launch?", a: "Yes. We offer monthly care plans covering hosting, security updates, backups and small changes, and you can add marketing on top." },
  { q: "Will I own my website, designs and code?", a: "Yes. Once the project is paid for, all files, source code and accounts are yours." },
  { q: "How do we GET STARTED?", a: "Send us a message on WhatsApp or fill in the project form. A real person replies within one business day to set up a free discovery call." },
];

export function FaqList({ items, tone = "dark" }: { items: Faq[]; tone?: "dark" | "paper" }) {
  return (
    <div className={tone === "paper" ? "divide-y divide-paper-ink/15 border-y border-paper-ink/15" : "divide-y divide-line border-y border-line"}>
      {items.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 font-display text-lg font-semibold tracking-tight">
            {f.q}
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-current/20 transition duration-300 group-open:rotate-45 group-open:bg-cyan group-open:text-void">
              <Plus className="size-4" />
            </span>
          </summary>
          <p className={tone === "paper" ? "max-w-2xl pb-6 text-[15px] leading-relaxed text-paper-muted" : "max-w-2xl pb-6 text-[15px] leading-relaxed text-muted"}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqSection() {
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading title="Questions we hear a lot." description="Can't find your answer? Talk to us directly." />
          <ButtonLink href="/contact" variant="ghost" className="mt-8" arrow>
            Ask us anything
          </ButtonLink>
        </div>
        <FaqList items={generalFaqs} />
      </div>
    </Section>
  );
}
