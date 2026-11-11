import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/final-cta";
import { ArrowUpRight, Check, ServiceIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Process } from "@/components/process";
import { Section } from "@/components/section";
import { ServiceArt } from "@/components/service-art";
import { services } from "@/components/services";

export const metadata: Metadata = {
  title: "Services — web, marketing, branding, video, e-commerce and software",
  description:
    "Web design and development, digital marketing, graphic design and printing, video editing and motion graphics, e-commerce and custom software from one team in Dhaka.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services" }]}
        title="Six services. One team. One goal: your growth."
        description="Pick a single service or combine them. When design, development and marketing work together, every taka you spend works harder."
        actions={[
          { label: "GET STARTED", href: "/contact" },
          { label: "See our work", href: "/work", variant: "ghost" },
        ]}
      />

      <Section className="!py-12 lg:!py-16">
        <ul className="divide-y divide-line">
          {services.map((s) => (
            <li key={s.key} id={s.slug} className="scroll-mt-28">
              <Link
                href={`/services/${s.slug}`}
                className="group grid items-center gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr_0.7fr] lg:gap-12"
              >
                <div>
                  <span className="grid size-14 place-items-center rounded-2xl bg-linear-to-br from-cyan/25 to-violet/25 text-cyan">
                    <ServiceIcon name={s.key} className="size-7" />
                  </span>
                  <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-cyan">{s.name}</h2>
                  <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">{s.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan transition-all group-hover:gap-3">
                    Learn more <ArrowUpRight className="size-4" />
                  </span>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {s.deliverables.slice(0, 4).map((d) => (
                    <li key={d.title} className="flex gap-3 text-[15px] text-ink/85">
                      <Check className="mt-1 size-4 shrink-0 text-cyan" />
                      {d.title}
                    </li>
                  ))}
                  <li className="sm:col-span-2">
                    <p className="mt-2 text-xs text-muted">Tools: {s.tech.join(", ")}</p>
                  </li>
                </ul>

                <div className="hidden w-full max-w-[16rem] justify-self-end opacity-70 transition duration-500 group-hover:opacity-100 lg:block">
                  <ServiceArt name={s.key} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Process />
      <FinalCta />
    </>
  );
}
