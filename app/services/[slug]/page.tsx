import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Check, ServiceIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { Section, SectionHeading } from "@/components/section";
import { getService, services } from "@/components/services";
import { projects } from "@/lib/work";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: s.name, description: s.desc };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = projects.filter((p) => p.category === s.key).slice(0, 2);
  const others = services.filter((o) => o.key !== s.key);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }, { label: s.name }]}
        title={s.headline}
        description={s.desc}
        actions={[
          { label: "GET STARTED", href: "/contact" },
          { label: "See related work", href: "/work", variant: "ghost" },
        ]}
      />

      <Section>
        <SectionHeading title="What you get." description="Everything is scoped and priced up front, so you know exactly what is included." />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {s.deliverables.map((d) => (
            <li key={d.title} className="bg-[#070a14] p-8 transition-colors hover:bg-[#0b1020]">
              <span className="grid size-10 place-items-center rounded-xl bg-cyan/15 text-cyan">
                <Check className="size-5" />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{d.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{d.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper">
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading tone="paper" title="Tools we work with." description="Proven tools, chosen for your needs rather than for fashion." />
          <ul className="flex flex-wrap gap-3">
            {s.tech.map((t) => (
              <li key={t} className="rounded-full border border-paper-ink/20 bg-white px-5 py-3 font-display text-lg font-semibold tracking-tight">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {related.length > 0 && (
        <Section>
          <SectionHeading title="Work in this area." />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {related.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </Section>
      )}

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading title={`${s.name}: common questions.`} />
          <FaqList items={s.faqs} />
        </div>
      </Section>

      <Section flush>
        <p className="mb-6 font-display text-lg font-semibold">Other services</p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {others.map((o) => (
            <li key={o.key}>
              <Link
                href={`/services/${o.slug}`}
                className="flex h-full items-center gap-3 rounded-2xl border border-white/10 p-4 text-sm transition hover:border-cyan/50 hover:bg-white/[0.04]"
              >
                <ServiceIcon name={o.key} className="size-5 shrink-0 text-cyan" />
                {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <FinalCta />
    </>
  );
}
