import Link from "next/link";
import type { Project } from "@/content/projects";
import { StatusChip } from "./ui/StatusChip";
import { Reveal } from "./motion/Reveal";

/**
 * Index-row card. The whole row is one link to the project page; the elevation
 * lifts on hover rather than the card scaling or tilting.
 */
export function ProjectCard({
  project,
  index,
  /**
   * The card sits under an h2 on the home page but directly under the h1 on
   * /work, so the title level has to follow its context or the heading order
   * skips a level.
   */
  headingLevel = "h3",
}: {
  project: Project;
  index: number;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <Reveal as="li" delay={index * 0.05}>
      <Link
        href={`/work/${project.slug}`}
        className="group block border border-line-2 bg-e1 shadow-e1 transition-colors duration-150 hover:border-line-4 hover:bg-e2"
      >
        <article className="grid gap-x-10 gap-y-6 p-6 md:p-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <StatusChip status={project.status} />
              <span className="label-mono text-muted">{project.period}</span>
            </div>

            <Heading className="mt-5 font-display text-[1.375rem] leading-tight font-semibold tracking-[-0.02em] text-ink transition-colors duration-150 group-hover:text-primary md:text-[1.625rem]">
              {project.title}
            </Heading>

            <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-dim md:text-base">
              {project.tagline}
            </p>

            <p className="label-mono mt-6 inline-flex items-center gap-2 text-primary">
              Read the breakdown
              <span
                aria-hidden="true"
                className="transition-transform duration-150 group-hover:translate-x-0.5"
              >
                →
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <dl className="flex flex-col gap-4">
              {project.metrics.slice(0, 2).map((m) => (
                <div key={m.label}>
                  <dt className="sr-only-text">{m.label}</dt>
                  <dd>
                    <span className="block font-display text-[1.5rem] leading-none font-semibold tracking-[-0.02em] text-ink">
                      {m.value}
                    </span>
                    <span className="mt-1.5 block text-xs leading-snug text-muted">
                      {m.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="font-mono text-[0.75rem] leading-relaxed tracking-[0.03em] text-muted">
              {project.stack.slice(0, 6).join("  ·  ")}
              {project.stack.length > 6 && "  ·  …"}
            </p>
          </div>
        </article>
      </Link>
    </Reveal>
  );
}
