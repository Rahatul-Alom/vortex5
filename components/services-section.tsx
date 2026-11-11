"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";
import { Section, SectionHeading } from "./section";
import { services } from "./services";

export function ServicesSection() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <Section id="services">
      <Reveal>
        <SectionHeading
          label="Services & Technologies"
          title="Digital services, built on modern technology."
          description="Pick a service to see how we approach it and the tools we build with."
        />
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <ul className="border-t border-line">
            {services.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.key} className="relative border-b border-line">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={on}
                    className="flex w-full cursor-pointer gap-5 py-5 pr-2 text-left"
                  >
                    <span className={cn("pt-0.5 font-display text-sm transition-colors", on ? "text-cyan" : "text-muted")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className={cn("block font-display text-lg font-semibold transition-colors", on ? "text-ink" : "text-ink/60 hover:text-ink")}>
                        {s.name}
                      </span>
                      <span className={cn("grid transition-all duration-500", on ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                        <span className="overflow-hidden">
                          <span className="block max-w-md text-sm leading-relaxed text-muted">{s.desc}</span>
                        </span>
                      </span>
                    </span>
                    <span aria-hidden className={cn("pt-0.5 transition-all duration-300", on ? "translate-x-0 text-cyan" : "-translate-x-2 text-transparent")}>→</span>
                  </button>
                  <span
                    aria-hidden
                    className="absolute -bottom-px left-0 h-px bg-cyan transition-all duration-500"
                    style={{ width: on ? "100%" : "0%" }}
                  />
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={150} className="flex flex-col items-center gap-8">
          <StackVisual />
          <div className="w-full">
            <p className="mb-3 text-xs font-medium tracking-[0.2em] text-muted uppercase">Technologies · {current.name}</p>
            <ul key={current.key} className="flex flex-wrap gap-2">
              {current.tech.map((t, i) => (
                <li
                  key={t}
                  className="animate-rise clip-tech bg-cyan/25 p-px [--cut:5px]"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="clip-tech block bg-[#0a0e1b] px-3 py-1.5 text-[13px] text-ink/90 [--cut:4.41px]">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/** Isometric stack of layers that tilts with the pointer and spreads apart on hover. */
function StackVisual() {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", String(((e.clientX - r.left) / r.width - 0.5) * 2));
    el.style.setProperty("--my", String(((e.clientY - r.top) / r.height - 0.5) * 2));
  }
  function onLeave() {
    ref.current?.style.setProperty("--mx", "0");
    ref.current?.style.setProperty("--my", "0");
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative h-[300px] w-full max-w-md [--gap:30px] [--mx:0] [--my:0] [perspective:900px] hover:[--gap:58px]"
    >
      <div aria-hidden className="absolute top-1/2 left-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/15 blur-[70px]" />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 size-[210px] -translate-x-1/2 -translate-y-[55%] transition-transform duration-300 ease-out [transform-style:preserve-3d]"
        style={{ transform: "translate(-50%, -55%) rotateX(calc(58deg + var(--my) * -6deg)) rotateY(calc(var(--mx) * 7deg))" }}
      >
        <div className="animate-sway absolute inset-0 [transform-style:preserve-3d]">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-xl border border-cyan/40 bg-linear-to-br from-cyan/15 via-violet/10 to-transparent transition-[translate] duration-500 ease-out"
              style={
                {
                  "--i": i,
                  translate: "0 0 calc(var(--i) * var(--gap))",
                  opacity: 0.45 + i * 0.18,
                  boxShadow: i === 3 ? "0 0 36px rgb(25 211 255 / 0.25)" : undefined,
                } as React.CSSProperties
              }
            >
              {i === 3 && (
                <>
                  <div className="absolute inset-0 rounded-xl bg-[linear-gradient(to_right,rgb(25_211_255/0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgb(25_211_255/0.18)_1px,transparent_1px)] bg-[size:26px_26px]" />
                  <div className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_24px_var(--color-cyan)]" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
