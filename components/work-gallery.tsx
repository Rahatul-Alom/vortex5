"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { projects } from "@/lib/work";
import { ProjectCard } from "./project-card";
import { services, type ServiceKey } from "./services";

type Filter = "all" | ServiceKey;

export function WorkGallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const available = services.filter((s) => projects.some((p) => p.category === s.key));

  const chip = (active: boolean) =>
    cn(
      "cursor-pointer rounded-full border px-5 py-2.5 text-sm transition",
      active ? "border-cyan bg-cyan text-void font-semibold" : "border-white/15 text-ink/75 hover:border-white/40 hover:text-ink",
    );

  return (
    <>
      <div role="group" aria-label="Filter projects by service" className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setFilter("all")} aria-pressed={filter === "all"} className={chip(filter === "all")}>
          All projects
        </button>
        {available.map((s) => (
          <button key={s.key} type="button" onClick={() => setFilter(s.key)} aria-pressed={filter === s.key} className={chip(filter === s.key)}>
            {s.name}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.slug} className="flex">
            <ProjectCard p={p} className="w-full" />
          </li>
        ))}
      </ul>
    </>
  );
}
