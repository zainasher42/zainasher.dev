import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { StatusChip } from "@/components/ui/StatusChip";
import { getProject, projects } from "@/content/projects";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  // Static card generated per slug by scripts/generate-og.mjs.
  const image = `/og/work-${project.slug}.png`;
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — Zain Asher`,
      description: project.tagline,
      url: `/work/${project.slug}`,
      images: [image],
    },
    twitter: { images: [image] },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <header className="relative overflow-hidden border-b border-line-1">
        <div
          aria-hidden="true"
          className="grid-texture pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.5),transparent_70%)]"
        />
        <div className="container-edge relative py-14 md:py-20">
          <Link
            href="/work"
            className="label-mono inline-flex items-center gap-2 text-muted transition-colors duration-150 hover:text-primary"
          >
            <span aria-hidden="true">←</span> All work
          </Link>

          <div className="rise-in mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <StatusChip status={project.status} />
            <span className="label-mono text-muted">{project.period}</span>
          </div>

          <h1
            className="rise-in mt-5 max-w-[20ch] font-display text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.03em] text-ink md:text-[3rem]"
            style={{ animationDelay: "75ms" }}
          >
            {project.title}
          </h1>

          <p
            className="rise-in mt-6 max-w-[62ch] text-base leading-relaxed text-dim md:text-[1.0625rem]"
            style={{ animationDelay: "150ms" }}
          >
            {project.tagline}
          </p>

          {project.link ? (
            <a
              href={project.link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="rise-in label-mono mt-8 inline-flex items-center gap-2 rounded-[2px] border border-line-3 px-4 py-2.5 text-ink transition-colors duration-150 hover:border-primary hover:text-primary"
              style={{ animationDelay: "225ms" }}
            >
              {project.link.label} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            project.noLinkNote && (
              <p
                className="rise-in label-mono mt-8 text-muted"
                style={{ animationDelay: "225ms" }}
              >
                {project.noLinkNote}
              </p>
            )
          )}
        </div>
      </header>

      {/* Metrics rail */}
      <section aria-label="Key metrics" className="border-b border-line-1">
        <div className="container-edge">
          {/* Column count follows the metric count so there is never an empty
              cell — the gap-px technique renders holes as filled panels. */}
          <dl
            className={`grid gap-x-10 gap-y-8 py-8 md:py-10 ${
              project.metrics.length >= 3
                ? "sm:grid-cols-3"
                : project.metrics.length === 2
                  ? "sm:grid-cols-2"
                  : "sm:grid-cols-1"
            }`}
          >
            {project.metrics.map((m) => (
              <div key={m.label} className="border-l-2 border-primary pl-5">
                <dd className="font-display text-[2rem] leading-none font-semibold tracking-[-0.03em] text-primary md:text-[2.5rem]">
                  {m.value}
                </dd>
                <dt className="mt-3 text-sm leading-snug text-muted">
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="container-edge py-14 md:py-20">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
          {/* Long-form detail */}
          <div>
            <Reveal>
              <h2 className="label-mono text-muted">The problem</h2>
              <p className="mt-5 max-w-[64ch] text-base leading-relaxed text-dim md:text-[1.0625rem]">
                {project.problem}
              </p>
            </Reveal>

            <div className="mt-14 flex flex-col gap-12">
              {project.detail.map((section, i) => (
                <Reveal key={section.heading} delay={i * 0.05}>
                  <article>
                    <h2 className="font-display text-[1.25rem] leading-snug font-semibold tracking-[-0.02em] text-ink md:text-[1.5rem]">
                      {section.heading}
                    </h2>
                    <p className="mt-4 max-w-[64ch] text-sm leading-relaxed text-dim md:text-base">
                      {section.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Stack rail */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <div className="border border-line-2 bg-e1 p-6 shadow-e1">
                <h2 className="label-mono text-muted">Stack</h2>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="font-mono text-[0.8125rem] text-dim"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>

      {/* Next project */}
      <section aria-label="Next project" className="border-t border-line-1">
        <div className="container-edge py-12 md:py-16">
          <Link href={`/work/${next.slug}`} className="group block">
            <p className="label-mono text-muted">Next project</p>
            <p className="mt-4 flex items-center gap-3 font-display text-[1.5rem] leading-tight font-semibold tracking-[-0.02em] text-ink transition-colors duration-150 group-hover:text-primary md:text-[2rem]">
              {next.title}
              <span
                aria-hidden="true"
                className="text-primary transition-transform duration-150 group-hover:translate-x-1"
              >
                →
              </span>
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
