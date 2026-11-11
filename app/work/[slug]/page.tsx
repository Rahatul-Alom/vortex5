import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/final-cta";
import { ArrowRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { ProjectVisual } from "@/components/project-visual";
import { Section } from "@/components/section";
import { getProject, projects } from "@/lib/work";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: `${p.name} — case study`, description: p.blurb };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Work", href: "/work" }, { label: p.name }]}
        title={p.name}
        description={p.blurb}
        actions={[{ label: "Start a similar project", href: "/contact" }]}
      />

      <Section className="!pt-12 lg:!pt-16">
        <div className={`group relative aspect-[16/8] overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br ${p.glow} to-void`}>
          {!p.image?.trim() && <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />}
          <ProjectVisual p={p} sizes="100vw" />
        </div>

        <dl className="mt-10 grid gap-8 border-b border-line pb-10 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-muted">Client</dt>
            <dd className="mt-1 font-display text-lg font-semibold">{p.client}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Services</dt>
            <dd className="mt-1 font-display text-lg font-semibold">{p.services.join(", ")}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Tools</dt>
            <dd className="mt-1 font-display text-lg font-semibold">{p.tech.join(", ")}</dd>
          </div>
        </dl>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">The challenge</h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">{p.challenge}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">What we did</h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">{p.solution}</p>
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-semibold tracking-tight">The results</h2>
        <dl className="mt-12 grid gap-10 sm:grid-cols-3">
          {p.results.map((r) => (
            <div key={r.label} className="border-t-2 border-paper-ink pt-5">
              <dd className="font-display text-[clamp(3rem,6vw,4.8rem)] leading-none font-semibold tracking-tight">{r.value}</dd>
              <dt className="mt-3 text-base text-paper-muted">{r.label}</dt>
            </div>
          ))}
        </dl>
      </Section>

      <Section flush>
        <Link href={`/work/${next.slug}`} className="group flex items-center justify-between gap-6 py-6">
          <span>
            <span className="block text-sm text-muted">Next project</span>
            <span className="mt-1 block font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-cyan sm:text-5xl">{next.name}</span>
          </span>
          <span className="grid size-14 shrink-0 place-items-center rounded-full border border-white/20 transition group-hover:border-cyan group-hover:bg-cyan group-hover:text-void">
            <ArrowRight className="size-6" />
          </span>
        </Link>
      </Section>

      <FinalCta />
    </>
  );
}
