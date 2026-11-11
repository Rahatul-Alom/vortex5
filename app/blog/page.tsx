import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/final-cta";
import { ArrowUpRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { formatDate, posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — practical advice on websites, marketing and branding",
  description: "Short, practical articles to help you grow your business online.",
};

export default function BlogPage() {
  const [first, ...rest] = posts;
  return (
    <>
      <PageHero
        crumbs={[{ label: "Blog" }]}
        title="Practical ideas for growing online."
        description="Short guides on websites, marketing, branding and software, written for business owners."
      />
      <Section className="!pt-12 lg:!pt-16">
        <Link
          href={`/blog/${first.slug}`}
          className="group grid gap-6 rounded-3xl border border-white/10 bg-linear-to-br from-azure/30 via-white/[0.03] to-violet/20 p-8 transition hover:border-cyan/50 lg:grid-cols-[1fr_auto] lg:items-end lg:p-12"
        >
          <div>
            <p className="text-sm text-cyan">{first.tag} · {formatDate(first.date)} · {first.readTime}</p>
            <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.08] font-semibold tracking-tight text-balance">{first.title}</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{first.excerpt}</p>
          </div>
          <span className="grid size-14 place-items-center rounded-full border border-white/20 transition group-hover:border-cyan group-hover:bg-cyan group-hover:text-void">
            <ArrowUpRight className="size-6" />
          </span>
        </Link>

        <ul className="mt-5 grid gap-5 md:grid-cols-3">
          {rest.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col rounded-3xl border border-white/10 p-7 transition hover:border-cyan/50 hover:bg-white/[0.03]">
                <p className="text-sm text-cyan">{p.tag}</p>
                <h3 className="mt-3 font-display text-xl leading-snug font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                <p className="mt-6 text-xs text-muted">{formatDate(p.date)} · {p.readTime}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <FinalCta />
    </>
  );
}
