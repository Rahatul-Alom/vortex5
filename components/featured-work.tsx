import { ButtonLink } from "./button";
import { ProjectCard } from "./project-card";
import { Section, SectionHeading } from "./section";
import { projects } from "@/lib/work";

export function FeaturedWork() {
  const [a, b, c] = [projects[0], projects[2], projects[3]];
  return (
    <Section id="work">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          title="Recent work, and what it did for our clients."
          description="Every project starts with a business goal. Here are a few where we hit it."
        />
        <ButtonLink href="/work" variant="ghost" arrow>
          View all projects
        </ButtonLink>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-5">
        <ProjectCard p={a} className="lg:col-span-3" tall />
        <ProjectCard p={b} className="lg:col-span-2" tall />
        <ProjectCard p={c} wide className="lg:col-span-5 lg:grid lg:grid-cols-[1.1fr_1fr]" />
      </div>
    </Section>
  );
}
