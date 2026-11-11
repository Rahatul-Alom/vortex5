import { cn } from "@/lib/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 165 162" className={cn("size-8", className)} aria-hidden>
      <defs>
        <linearGradient id="v-left" x1="0.1" y1="0" x2="0.75" y2="1">
          <stop offset="0%" stopColor="#00e0ff" />
          <stop offset="55%" stopColor="#2aa8ff" />
          <stop offset="100%" stopColor="#7c5cf0" />
        </linearGradient>
        <linearGradient id="v-right" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#19d3ff" />
          <stop offset="100%" stopColor="#1a3fb0" />
        </linearGradient>
      </defs>
      <path d="M2 2h56l50 118-22 40z" fill="url(#v-left)" />
      <path d="M98 2h65c-10 46-30 78-52 76-7-1-13-8-13-18z" fill="url(#v-right)" />
    </svg>
  );
}

export function Logo({ tagline = false, className }: { tagline?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-[0.12em]">
          VORTEX<span className="text-lavender">5</span>
        </span>
        {tagline && (
          <span className="mt-1 text-[8px] tracking-[0.3em] text-cyan">CREATIVE × TECHNOLOGY</span>
        )}
      </span>
    </span>
  );
}
