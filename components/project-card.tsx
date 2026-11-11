import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/work";
import { ArrowUpRight } from "./icons";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({ p, className, tall = false, wide = false }: { p: Project; className?: string; tall?: boolean; wide?: boolean }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#080c18] transition duration-300 hover:border-cyan/50 hover:shadow-[0_30px_80px_-30px_rgb(25_211_255/0.35)]",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden bg-linear-to-br to-void", p.glow, tall ? "aspect-[4/3] lg:aspect-auto lg:min-h-80 lg:flex-1" : "aspect-[16/10]")}>
        {!p.image?.trim() && <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />}
        <ProjectVisual p={p} />
        <span className="absolute top-4 right-4 grid size-11 translate-y-1 place-items-center rounded-full bg-white text-void opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      <div className={cn("flex flex-col gap-3 p-6 lg:p-7", wide && "lg:justify-center lg:gap-4 lg:p-12")}>
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-cyan">{p.categoryLabel}</span>
          <span className="text-muted">{p.client}</span>
        </div>
        <h3 className={cn("font-display text-2xl font-semibold tracking-tight", wide && "lg:text-4xl")}>{p.name}</h3>
        <p className="text-sm leading-relaxed text-muted">{p.blurb}</p>
        <ul className="mt-1 flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-4">
          {p.results.slice(0, wide ? 3 : 2).map((r) => (
            <li key={r.label} className="text-sm text-muted">
              <span className="font-display text-base font-semibold text-ink">{r.value}</span> {r.label}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
