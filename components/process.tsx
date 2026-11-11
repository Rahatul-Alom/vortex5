import { Section, SectionHeading } from "./section";

const steps = [
  { title: "Discover", text: "We learn your business, customers and goals in a short call, then agree on what success looks like." },
  { title: "Plan", text: "You get a clear scope, timeline and fixed quote. No surprises later." },
  { title: "Create", text: "We design and build in weekly steps and share progress so you can give feedback early." },
  { title: "Launch", text: "We test on real devices, set up tracking and go live together with you." },
  { title: "Grow", text: "After launch we keep improving with campaigns, updates and monthly reports." },
];

export function Process() {
  return (
    <Section tone="navy" id="process">
      <div aria-hidden className="pointer-events-none absolute -top-24 right-0 h-72 w-[36rem] rounded-full bg-violet/25 blur-[120px]" />
      <SectionHeading
        title="A simple process, so you always know what happens next."
        description="Five steps from first conversation to measurable growth."
      />
      <ol className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
        <div aria-hidden className="absolute top-5 right-0 left-0 hidden h-px bg-white/15 md:block" />
        {steps.map((s, i) => (
          <li key={s.title} className="relative">
            <span className="relative grid size-10 place-items-center rounded-full bg-linear-to-br from-cyan to-violet font-display text-sm font-semibold text-void">
              {i + 1}
            </span>
            <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
