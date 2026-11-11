import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { formatDate, getPost, posts } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return { title: p.title, description: p.excerpt };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const more = posts.filter((x) => x.slug !== p.slug).slice(0, 2);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Blog", href: "/blog" }, { label: p.tag }]}
        title={p.title}
        description={`${formatDate(p.date)} · ${p.readTime}`}
      />
      <Section className="!pt-12 lg:!pt-16">
        <article className="mx-auto max-w-2xl">
          {p.body.map((para, i) => (
            <p key={i} className="mb-6 text-lg leading-[1.75] text-ink/85 text-pretty">{para}</p>
          ))}

          <div className="mt-12 rounded-3xl border border-white/10 bg-linear-to-br from-azure/30 to-violet/20 p-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight">Want help with this?</h2>
            <p className="mt-2 text-muted">Tell us about your business and we’ll suggest where to start. It’s free.</p>
            <ButtonLink href="/contact" className="mt-6" arrow>GET STARTED</ButtonLink>
          </div>
        </article>

        <div className="mx-auto mt-20 max-w-4xl">
          <p className="mb-5 font-display text-lg font-semibold">Keep reading</p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {more.map((m) => (
              <li key={m.slug}>
                <Link href={`/blog/${m.slug}`} className="block h-full rounded-2xl border border-white/10 p-6 transition hover:border-cyan/50">
                  <p className="text-sm text-cyan">{m.tag}</p>
                  <p className="mt-2 font-display text-lg font-semibold tracking-tight">{m.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
