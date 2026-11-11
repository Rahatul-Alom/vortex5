import Image from "next/image";
import type { Project } from "@/lib/work";
import { ProjectArt } from "./project-art";

/** Cover for a project: its own image if one is set, otherwise the ProjectArt illustration. */
export function ProjectVisual({ p, sizes = "(min-width: 1024px) 50vw, 100vw" }: { p: Project; sizes?: string }) {
  const src = p.image?.trim();
  if (!src) return <ProjectArt art={p.art} />;
  return (
    <Image
      src={src}
      alt={p.imageAlt ?? `${p.name} — ${p.categoryLabel} project`}
      fill
      sizes={sizes}
      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
    />
  );
}
