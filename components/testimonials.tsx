"use client";

import { useRef } from "react";
import { ArrowRight, Star } from "./icons";
import { Section, SectionHeading } from "./section";

// Placeholder testimonials — replace with real client quotes.
const testimonials = [
  { quote: "They understood our product faster than we expected and shipped a site that our customers immediately noticed.", name: "Alex Morgan", role: "CEO", company: "Northwind" },
  { quote: "Our cost per lead dropped by almost half in two months, and the monthly report finally showed us where every taka went.", name: "Priya Sharma", role: "COO", company: "Helix Labs" },
  { quote: "From brand identity to launch video, everything felt cohesive. It's rare to get design and engineering this aligned.", name: "Daniel Okafor", role: "Founder", company: "Lumina" },
  { quote: "The dashboard they built now runs our whole operation. Communication was clear at every step.", name: "Sofia Lindqvist", role: "Product Lead", company: "Orbitly" },
  { quote: "Reliable, sharp and genuinely invested in our growth. They feel like part of our team.", name: "Marcus Chen", role: "Head of Growth", company: "Vantage" },
];

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("");
}

export function Testimonials() {
  const scroller = useRef<HTMLUListElement>(null);

  function go(dir: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.6), behavior: "smooth" });
  }

  return (
    <Section id="testimonials" className="overflow-hidden">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading title="Don't take our word for it." description="What clients say after working with us." />
        <div className="flex gap-2">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => go(d)}
              aria-label={d === -1 ? "Previous testimonials" : "Next testimonials"}
              className="grid size-12 cursor-pointer place-items-center rounded-full border border-white/15 text-ink/80 transition hover:border-cyan hover:bg-cyan hover:text-void"
            >
              <ArrowRight className={d === -1 ? "size-5 rotate-180" : "size-5"} />
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={scroller}
        className="-mx-2 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t) => (
          <li key={t.name} className="w-[min(86vw,26rem)] shrink-0 snap-start">
            <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-linear-to-b from-white/[0.06] to-white/[0.01] p-8">
              <div className="flex text-[#ffc547]" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-xl leading-snug tracking-tight text-balance">{t.quote}</blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-6">
                <span className="grid size-11 place-items-center rounded-full bg-linear-to-br from-cyan to-violet font-display text-sm font-semibold text-void">
                  {initials(t.name)}
                </span>
                <span>
                  <span className="block font-display text-sm font-semibold">{t.name}</span>
                  <span className="block text-xs text-muted">{t.role}, {t.company}</span>
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
