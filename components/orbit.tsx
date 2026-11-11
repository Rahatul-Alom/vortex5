import Link from "next/link";
import type { CSSProperties } from "react";
import { ServiceIcon } from "./icons";
import { LogoMark } from "./logo";
import { serviceByKey, type ServiceKey } from "./services";

type Node = { key: ServiceKey; angle: number };

const outer: Node[] = [
  { key: "web", angle: -90 },
  { key: "marketing", angle: 0 },
  { key: "video", angle: 90 },
  { key: "creative", angle: 180 },
];
const inner: Node[] = [
  { key: "ecommerce", angle: -30 },
  { key: "saas", angle: 150 },
];

function Ring({ nodes, radius, seconds, reverse }: { nodes: Node[]; radius: string; seconds: number; reverse?: boolean }) {
  const dir = reverse ? "orbit-rev" : "orbit";
  const counter = reverse ? "orbit" : "orbit-rev";
  return (
    <div
      aria-hidden={false}
      className="pointer-events-none absolute inset-0 group-hover/orbit:[animation-play-state:paused]"
      style={{ animation: `${dir} ${seconds}s linear infinite` }}
    >
      {nodes.map((n, i) => {
        const s = serviceByKey(n.key);
        return (
          <div
            key={n.key}
            className="absolute top-1/2 left-1/2"
            style={{ transform: `rotate(${n.angle}deg) translateX(${radius}) rotate(${-n.angle}deg)` } as CSSProperties}
          >
            <div
              className="-translate-x-1/2 -translate-y-1/2 group-hover/orbit:[animation-play-state:paused]"
              style={{ animation: `${counter} ${seconds}s linear infinite` }}
            >
              <div
                className="group-hover/orbit:[animation-play-state:paused]"
                style={{ animation: `drift ${5 + i * 1.3}s ease-in-out ${-i * 1.7}s infinite alternate` }}
              >
              <Link
                href={`/services/${s.slug}`}
                className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/15 bg-[#0a0f20]/90 py-1.5 pr-4 pl-1.5 text-[13px] font-medium whitespace-nowrap text-ink shadow-[0_8px_30px_-8px_rgb(25_211_255/0.35)] backdrop-blur transition hover:border-cyan/70 hover:text-cyan"
              >
                <span className="grid size-8 place-items-center rounded-full bg-linear-to-br from-cyan/30 to-violet/30 text-cyan">
                  <ServiceIcon name={n.key} className="size-4" />
                </span>
                {s.name.split(" & ")[0].split(" / ")[0]}
              </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** The signature visual: services orbiting the Vortex5 mark. Pauses on hover so chips are easy to click. */
export function Orbit() {
  return (
    <div
      className="group/orbit @container relative mx-auto aspect-square w-full max-w-[34rem]"
    >
      {/* spiral glow */}
      <div
        aria-hidden
        className="animate-spin-slow absolute inset-[6%] rounded-full opacity-70 blur-2xl"
        style={{ background: "conic-gradient(from 0deg, transparent 0deg, rgb(25 211 255 / 0.45) 90deg, transparent 180deg, rgb(124 92 240 / 0.5) 270deg, transparent 360deg)" }}
      />
      <div aria-hidden className="absolute inset-[3%] rounded-full border border-white/10" />
      <div aria-hidden className="absolute inset-[22%] rounded-full border border-dashed border-white/15" />
      <div aria-hidden className="absolute inset-[38%] rounded-full border border-white/10" />

      <Ring nodes={outer} radius="calc(100cqw * 0.435)" seconds={60} />
      <Ring nodes={inner} radius="calc(100cqw * 0.28)" seconds={42} reverse />

      <div className="absolute top-1/2 left-1/2 grid size-[26%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-void/80 shadow-[0_0_60px_rgb(25_211_255/0.35)] backdrop-blur">
        <LogoMark className="animate-float size-1/2" />
      </div>
    </div>
  );
}
