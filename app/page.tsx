import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/content/profile";
import { featuredProjects } from "@/content/projects";
import { annotations } from "@/content/pipeline";
import { PipelineDiagram } from "@/components/PipelineDiagram";

export default function Home() {
  return (
    <>
      <Hero />

      {/* ---------------------------- Focus ---------------------------- */}
      <section
        aria-labelledby="focus-label"
        className="border-b border-line-1 py-16 md:py-20"
      >
        <div className="container-edge">
          <Reveal>
            <h2 id="focus-label" className="label-mono text-muted">
              What I work on
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-px overflow-hidden border border-line-2 bg-line-2 md:grid-cols-3">
            {profile.focus.map((f, i) => (
              <Reveal as="li" key={f.area} delay={i * 0.06}>
                <div className="h-full bg-e1 p-6 md:p-7">
                  <p className="label-mono text-primary">{f.area}</p>
                  <p className="mt-4 text-sm leading-relaxed text-dim">
                    {f.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------- Featured work -------------------------- */}
      <section
        aria-labelledby="work-label"
        className="border-b border-line-1 py-16 md:py-24"
      >
        <div className="container-edge">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="work-label" className="label-mono text-muted">
                Selected work
              </h2>
              <Link
                href="/work"
                className="label-mono inline-flex items-center gap-2 text-primary transition-colors duration-150 hover:text-ink"
              >
                All projects <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>

          <ul className="mt-8 flex flex-col gap-4 md:mt-10">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------ Architecture teaser ------------------------ */}
      <section
        aria-labelledby="arch-label"
        className="border-b border-line-1 py-16 md:py-24"
      >
        <div className="container-edge">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 id="arch-label" className="label-mono text-muted">
                  System architecture
                </h2>
                <p className="mt-4 max-w-[54ch] font-display text-[1.375rem] leading-snug font-semibold tracking-[-0.02em] text-ink md:text-[1.75rem]">
                  Seventy-six agents, seven waves, and a hard barrier at every
                  seam.
                </p>
              </div>
              <Link
                href="/architecture"
                className="label-mono inline-flex items-center gap-2 text-primary transition-colors duration-150 hover:text-ink"
              >
                Full breakdown <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 border border-line-2 bg-e1 p-5 shadow-e1 md:p-8">
              <PipelineDiagram />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[70ch] text-sm leading-relaxed text-muted">
              {annotations[0].body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------ Contact ------------------------------ */}
      <section aria-labelledby="cta-label" className="py-16 md:py-24">
        <div className="container-edge">
          <Reveal>
            <div className="border border-line-2 bg-e1 p-8 shadow-e1 md:p-12">
              <h2
                id="cta-label"
                className="max-w-[22ch] font-display text-[1.75rem] leading-tight font-semibold tracking-[-0.025em] text-ink md:text-[2.25rem]"
              >
                Currently available for new work.
              </h2>
              <p className="mt-5 max-w-[56ch] text-sm leading-relaxed text-dim md:text-base">
                Remote worldwide, and open to relocation. If you&rsquo;re
                building something where a confident wrong answer is expensive,
                that&rsquo;s the work I want.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="label-mono inline-flex items-center gap-2 rounded-[2px] bg-primary px-5 py-3 font-medium text-bg transition-colors duration-150 hover:bg-primary/85"
                >
                  {profile.contact.email}
                </a>
                <Link
                  href="/about"
                  className="label-mono inline-flex items-center gap-2 rounded-[2px] border border-line-3 px-5 py-3 text-ink transition-colors duration-150 hover:border-line-4 hover:text-primary"
                >
                  More about me
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
