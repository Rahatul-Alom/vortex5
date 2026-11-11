import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Page section: consistent width and rhythm. `tone="paper"` flips to the light band. */
export function Section({
  id,
  children,
  className,
  tone = "dark",
  flush = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "paper" | "navy";
  flush?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24",
        tone === "paper" && "bg-paper text-paper-ink",
        tone === "navy" && "overflow-hidden border-y border-white/10 bg-linear-to-b from-[#0b1340] via-[#0a1030] to-[#070b22]",
        tone === "dark" && "border-t border-line",
      )}
    >
      <div className={cn("relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12", flush ? "py-12" : "py-20 lg:py-28", className)}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  title,
  description,
  center = false,
  tone = "dark",
  className,
}: {
  title: ReactNode;
  description?: string;
  center?: boolean;
  tone?: "dark" | "paper";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center", className)}>
      <h2 className="font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.05] font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className={cn("mt-5 max-w-xl text-base leading-relaxed text-pretty", tone === "paper" ? "text-paper-muted" : "text-muted", center && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
