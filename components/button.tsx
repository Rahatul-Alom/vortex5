import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ArrowRight } from "./icons";

type Variant = "primary" | "ghost" | "dark";
type Size = "md" | "sm" | "lg";
type Shared = { variant?: Variant; size?: Size; arrow?: boolean };

const sizes = {
  lg: { box: "h-14 text-[15px] [--cut:8px]", pad: "px-8", inner: "[--cut:7.41px]" },
  md: { box: "h-12 text-sm [--cut:7px]", pad: "px-7", inner: "[--cut:6.41px]" },
  sm: { box: "h-10 text-[13px] [--cut:5px]", pad: "px-5", inner: "[--cut:4.41px]" },
};

const base =
  "clip-tech group relative inline-flex cursor-pointer items-center justify-center font-display font-semibold tracking-tight transition duration-300";

function outerClass(variant: Variant, size: Size, className?: string) {
  const s = sizes[size];
  if (variant === "ghost") return cn(base, s.box, "bg-white/20 p-px text-ink hover:bg-cyan/70", className);
  if (variant === "dark") return cn(base, s.box, s.pad, "gap-2 bg-paper-ink text-white hover:bg-violet", className);
  return cn(base, s.box, s.pad, "gap-2 bg-linear-to-r from-cyan to-violet text-void hover:brightness-110", className);
}

/**
 * clip-path also trims borders at the cut corners, so the ghost stroke is an
 * outer shape with an inner clipped shape inset by 1px.
 */
function Body({ variant, size, arrow, children }: { variant: Variant; size: Size; arrow: boolean; children: ReactNode }) {
  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );
  if (variant !== "ghost") return content;
  return (
    <span
      className={cn(
        "clip-tech flex size-full items-center justify-center gap-2 bg-[#0a0e1b] transition-colors duration-300 group-hover:bg-[#101727]",
        sizes[size].pad,
        sizes[size].inner,
      )}
    >
      {content}
    </span>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  href = "#",
  ...props
}: Shared & Omit<ComponentProps<"a">, "href"> & { href?: string }) {
  const cls = outerClass(variant, size, className);
  const body = (
    <Body variant={variant} size={size} arrow={arrow}>
      {children}
    </Body>
  );
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls} {...props}>
        {body}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...props}>
      {body}
    </a>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  className,
  children,
  ...props
}: Shared & ComponentProps<"button">) {
  return (
    <button className={outerClass(variant, size, className)} {...props}>
      <Body variant={variant} size={size} arrow={arrow}>
        {children}
      </Body>
    </button>
  );
}
