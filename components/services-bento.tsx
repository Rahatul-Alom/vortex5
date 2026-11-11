import Link from "next/link";
import { cn } from "@/lib/cn";
import { ArrowUpRight, ServiceIcon } from "./icons";
import { Section, SectionHeading } from "./section";
import { ServiceArt } from "./service-art";
import { services } from "./services";

const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-7", "lg:col-span-5"];
const order = ["web", "marketing", "creative", "ecommerce", "saas", "video"] as const;

export function ServicesBento() {
  const list = order.map((k) => services.find((s) => s.key === k)!);
  return (
    <Section id="services">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          title="Everything your business needs to grow online."
          description="Six services, one team. Use one, or combine them into a single plan so design, development and marketing work together."
        />
        <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-cyan transition hover:gap-3">
          Explore all services <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="mt-14 grid gap-4 lg:grid-cols-12">
        {list.map((s, i) => (
          <Link
            key={s.key}
            href={`/services/${s.slug}`}
            className={cn(
              "group relative flex min-h-[24rem] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-white/[0.05] to-white/[0.01] p-7 transition duration-300 hover:border-cyan/50 lg:p-8",
              spans[i],
            )}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-cyan/0 blur-[90px] transition duration-500 group-hover:bg-cyan/25"
            />
            <div className="relative flex items-start justify-between">
              <span className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-cyan/25 to-violet/25 text-cyan">
                <ServiceIcon name={s.key} className="size-6" />
              </span>
              <span className="grid size-10 place-items-center rounded-full border border-white/15 text-ink/70 transition duration-300 group-hover:border-cyan group-hover:bg-cyan group-hover:text-void">
                <ArrowUpRight className="size-4" />
              </span>
            </div>

            <div aria-hidden className="pointer-events-none relative my-4 ml-auto h-28 w-44 opacity-60 transition duration-500 group-hover:opacity-100">
              <ServiceArt name={s.key} />
            </div>

            <div className="relative max-w-sm">
              <h3 className="font-display text-2xl font-semibold tracking-tight">{s.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.short}</p>
              <p className="mt-4 text-xs text-ink/55">{s.tech.slice(0, 3).join(", ")}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
