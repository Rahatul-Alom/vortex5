import { CountUp } from "./count-up";
import { CutCard } from "./cut-card";
import { Reveal } from "./reveal";
import { Section } from "./section";

// Placeholder numbers — replace with real figures.
const stats = [
  { to: 120, suffix: "+", label: "Projects Delivered", note: "Across web, apps and brand" },
  { to: 60, suffix: "+", label: "Clients Worldwide", note: "Startups to established teams" },
  { to: 6, suffix: "+", label: "Years of Experience", note: "Building for the web" },
  { to: 98, suffix: "%", label: "Client Satisfaction", note: "Based on project feedback" },
];

const proof = ["On-time delivery", "Transparent pricing", "Dedicated support"];

export function Trust() {
  return (
    <Section id="trust">
      <Reveal>
        <CutCard cut={18} innerClassName="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-azure/50 blur-[110px]" />
          <div className="relative flex flex-col justify-between gap-6 border-b border-line p-8 md:flex-row md:items-end lg:p-10">
            <div className="max-w-md">
              <p className="mb-3 text-xs font-medium tracking-[0.2em] text-cyan uppercase">Trusted by teams worldwide</p>
              <h2 className="font-display text-[clamp(1.5rem,2.5vw,2rem)] leading-[1.2] font-semibold tracking-tight">
                Results you can count on, delivered by people you can reach.
              </h2>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {proof.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="text-cyan">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <dl className="relative grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`p-8 lg:p-10 ${i % 2 === 1 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""} ${i > 0 ? "lg:border-l" : ""}`}
              >
                <dd className="font-display text-[clamp(2rem,3.6vw,2.9rem)] leading-none font-semibold text-gradient">
                  <CountUp to={s.to} suffix={s.suffix} />
                </dd>
                <dt className="mt-3 font-display text-[15px] font-semibold">{s.label}</dt>
                <p className="mt-1 text-[13px] text-muted">{s.note}</p>
              </div>
            ))}
          </dl>
        </CutCard>
      </Reveal>
    </Section>
  );
}
