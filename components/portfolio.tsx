import { ButtonLink } from "./button";
import { CutCard } from "./cut-card";
import { Reveal } from "./reveal";
import { Section, SectionHeading } from "./section";

type Art = "store" | "dashboard" | "mobile" | "brand";

// Placeholder projects — replace with real case studies.
const projects: {
  name: string;
  category: string;
  blurb: string;
  services: string[];
  tech: string[];
  art: Art;
  glow: string;
}[] = [
  {
    name: "Nimbus Commerce",
    category: "E-commerce",
    blurb: "A fast, conversion-focused storefront with a custom checkout and inventory sync.",
    services: ["Web Development", "UI/UX Design"],
    tech: ["Next.js", "Shopify", "Stripe"],
    art: "store",
    glow: "from-cyan/30 via-azure/30",
  },
  {
    name: "Orbit CRM",
    category: "SaaS / Custom Software",
    blurb: "A multi-tenant CRM with role-based access, reporting dashboards and automations.",
    services: ["SaaS", "UI/UX Design"],
    tech: ["Laravel", "React", "PostgreSQL"],
    art: "dashboard",
    glow: "from-violet/35 via-azure/30",
  },
  {
    name: "Pulse Fitness",
    category: "Mobile App",
    blurb: "A cross-platform training app with workout plans, progress tracking and reminders.",
    services: ["Mobile App", "UI/UX Design"],
    tech: ["Flutter", "Firebase"],
    art: "mobile",
    glow: "from-teal/50 via-cyan/25",
  },
  {
    name: "Aurora Studio",
    category: "Brand & Web",
    blurb: "A full identity, launch video and marketing site for a creative studio.",
    services: ["Graphic Design", "Video Editing", "Web"],
    tech: ["Figma", "After Effects", "Next.js"],
    art: "brand",
    glow: "from-azure/40 via-violet/30",
  },
];

export function Portfolio() {
  return (
    <Section id="work">
      <Reveal>
        <SectionHeading
          label="Featured Projects"
          title="Selected work that moved the needle."
          description="A look at recent projects across web, apps and brand."
        />
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={(i % 2) * 120}>
            <CutCard cut={16} className="group h-full hover:bg-cyan/40" innerClassName="flex h-full flex-col">
              <div className={`relative aspect-[16/10] overflow-hidden bg-linear-to-br ${p.glow} to-void`}>
                <ProjectArt art={p.art} />
                <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium tracking-[0.18em] text-cyan uppercase">{p.category}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.blurb}</p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.services.map((s) => (
                    <li key={s} className="rounded-sm bg-cyan/10 px-2 py-1 text-[11px] text-cyan">{s}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted">{p.tech.join("  ·  ")}</p>

                <div className="mt-auto flex items-center gap-4 pt-6">
                  <ButtonLink href="#" variant="ghost" size="sm">View Project</ButtonLink>
                  <a href="#" className="text-sm text-ink/70 transition-colors hover:text-cyan">Live Project ↗</a>
                </div>
              </div>
            </CutCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const line = "stroke-white/30";

function ProjectArt({ art }: { art: Art }) {
  return (
    <svg viewBox="0 0 320 200" className="absolute inset-0 size-full p-6 transition-transform duration-700 group-hover:scale-[1.03]" fill="none">
      {art === "store" && (
        <>
          <rect x="20" y="14" width="280" height="172" rx="8" className={line} />
          <path d="M20 40h280" className={line} />
          <circle cx="34" cy="27" r="3" fill="#19d3ff" />
          <rect x="36" y="54" width="140" height="62" rx="6" fill="#19d3ff" fillOpacity=".22" />
          <path d="M190 62h90M190 78h70M190 94h50" className="stroke-white/40" strokeLinecap="round" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={36 + i * 88} y="130" width="76" height="44" rx="6" className={line} />
          ))}
        </>
      )}
      {art === "dashboard" && (
        <>
          <rect x="20" y="14" width="280" height="172" rx="8" className={line} />
          <path d="M72 14v172" className={line} />
          {[34, 54, 74, 94].map((y) => (
            <path key={y} d={`M32 ${y}h28`} stroke="#a99cff" strokeOpacity=".7" strokeLinecap="round" />
          ))}
          {[0, 1, 2].map((i) => (
            <rect key={i} x={86 + i * 70} y="28" width="60" height="36" rx="5" className={line} />
          ))}
          {[30, 52, 40, 70, 58, 86, 74].map((h, i) => (
            <rect key={i} x={90 + i * 28} y={170 - h} width="14" height={h} rx="3" fill="#19d3ff" fillOpacity={0.25 + i * 0.1} />
          ))}
        </>
      )}
      {art === "mobile" && (
        <>
          {[0, 1].map((i) => (
            <g key={i} transform={`translate(${i === 0 ? 70 : 170} ${i === 0 ? 16 : 30})`}>
              <rect width="86" height="160" rx="14" className={line} />
              <rect x="8" y="14" width="70" height="46" rx="8" fill="#19d3ff" fillOpacity={i === 0 ? 0.25 : 0.12} />
              <path d="M10 76h58M10 90h40M10 112h58M10 126h30" className="stroke-white/35" strokeLinecap="round" />
            </g>
          ))}
        </>
      )}
      {art === "brand" && (
        <>
          <circle cx="110" cy="100" r="62" fill="#19d3ff" fillOpacity=".18" className="stroke-cyan/50" />
          <circle cx="170" cy="100" r="62" fill="#7c5cf0" fillOpacity=".2" className="stroke-violet/60" />
          <text x="140" y="112" textAnchor="middle" fontSize="38" fontWeight="600" fill="white" fillOpacity=".85">Aa</text>
          <path d="M40 176h240" className={line} />
        </>
      )}
    </svg>
  );
}
