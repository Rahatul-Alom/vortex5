import { site, whatsappLink } from "@/lib/site";
import { Clock, Mail, Phone, Pin, WhatsApp } from "./icons";
import { ProjectForm } from "./project-form";
import { Section } from "./section";

const steps = [
  { title: "We review", text: "Within one business day, a real person reads your brief." },
  { title: "Discovery call", text: "A short call to align on goals, scope and timeline." },
  { title: "Proposal", text: "A clear plan, timeline and fixed quote. No surprises." },
];

const channel =
  "group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan/50 hover:bg-white/[0.06]";

export function StartProject() {
  return (
    <Section id="contact" className="!pt-12 lg:!pt-16">
      <div className="relative">
        <div aria-hidden className="pointer-events-none absolute -top-20 -left-32 size-96 rounded-full bg-teal/40 blur-[130px]" />
        <div className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.08] font-semibold tracking-tight text-balance">
              Prefer to talk? Pick the quickest way to reach us.
            </h2>

            <ul className="mt-8 grid gap-3">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={channel}>
                  <span className="grid size-12 place-items-center rounded-xl bg-[#25d366]/15 text-[#25d366]"><WhatsApp className="size-6" /></span>
                  <span>
                    <span className="block font-display font-semibold">WhatsApp</span>
                    <span className="text-sm text-muted">The quickest way to reach us</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className={channel}>
                  <span className="grid size-12 place-items-center rounded-xl bg-cyan/15 text-cyan"><Phone className="size-6" /></span>
                  <span>
                    <span className="block font-display font-semibold">{site.phone}</span>
                    <span className="text-sm text-muted">{site.hours}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={channel}>
                  <span className="grid size-12 place-items-center rounded-xl bg-violet/20 text-lavender"><Mail className="size-6" /></span>
                  <span>
                    <span className="block font-display font-semibold">{site.email}</span>
                    <span className="text-sm text-muted">For briefs, files and proposals</span>
                  </span>
                </a>
              </li>
            </ul>

            <div className="mt-8 flex gap-4 text-sm text-muted">
              <Pin className="mt-0.5 size-5 shrink-0 text-cyan" />
              <p className="max-w-xs leading-relaxed">Visit us: {site.location}</p>
            </div>
            <div className="mt-4 flex gap-4 text-sm text-muted">
              <Clock className="mt-0.5 size-5 shrink-0 text-cyan" />
              <p>{site.hours}</p>
            </div>

            <h3 className="mt-12 font-display text-lg font-semibold">What happens after you send the form</h3>
            <ol className="mt-5 space-y-5 border-l border-line pl-6">
              {steps.map((s, i) => (
                <li key={s.title} className="relative">
                  <span className="absolute top-0.5 -left-[2.1rem] grid size-6 place-items-center rounded-full bg-cyan text-xs font-semibold text-void">{i + 1}</span>
                  <span className="block font-display text-[15px] font-semibold">{s.title}</span>
                  <span className="block text-[13px] text-muted">{s.text}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl border border-white/10 bg-linear-to-b from-white/[0.06] to-white/[0.01]">
            <ProjectForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
