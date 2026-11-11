import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Card with cut corners and a stroke that follows the cut. clip-path trims
 * borders, so the stroke is an outer shape with an inner shape inset by 1px.
 */
export function CutCard({
  cut = 14,
  className,
  innerClassName,
  children,
}: {
  cut?: number;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("clip-tech bg-white/[0.14] p-px transition-colors duration-300", className)}
      style={{ "--cut": `${cut}px` } as CSSProperties}
    >
      <div
        className={cn("clip-tech h-full bg-[#080c18] bg-linear-to-b from-white/[0.05] to-white/[0.01]", innerClassName)}
        style={{ "--cut": `${cut - 0.59}px` } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
