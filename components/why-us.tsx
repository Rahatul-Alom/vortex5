import { CountUp } from "./count-up";
import { Check } from "./icons";
import { Section, SectionHeading } from "./section";

// Placeholder numbers — replace with real figures.
const stats = [
  { to: 120, suffix: "+", label: "Projects delivered" },
  { to: 60, suffix: "+", label: "Clients worldwide" },
  { to: 6, suffix: "+", label: "Years of experience" },
  { to: 98, suffix: "%", label: "Client satisfaction" },
];

const points = [
  { title: "One team, not five vendors", text: "Design, code and marketing sit together, so your website, ads and brand all say the same thing." },
  { title: "Fixed quotes, clear timelines", text: "You know the price and delivery date before we start, and we keep to both." },
  { title: "A real person replies within a day", text: "Message us on WhatsApp, call or email. You talk to the people doing the work." },
  { title: "Built to be measured", text: "Every site and campaign ships with tracking, so you can see what brought in each lead." },
];

export function WhyUs() {
  return (
    <Section id="why-us">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading title="Why businesses choose Vortex5." />
          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10">
            {stats.map((s) => (
              <div key={s.label}>
                <dd className="font-display text-[clamp(2.6rem,5vw,4rem)] leading-none font-semibold tracking-tight">
                  <CountUp to={s.to} suffix={s.suffix} />
                </dd>
                <dt className="mt-2 text-sm text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <ul className="divide-y divide-line self-center border-y border-line">
          {points.map((p) => (
            <li key={p.title} className="flex gap-5 py-7">
              <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-cyan/15 text-cyan">
                <Check className="size-4" />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-1.5 max-w-lg text-[15px] leading-relaxed text-muted">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
