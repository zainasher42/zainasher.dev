import type { Metadata } from "next";
import Link from "next/link";
import { PipelineDiagram } from "@/components/PipelineDiagram";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  RETRIEVING_AGENTS,
  TOTAL_AGENTS,
  WAVE_COUNT,
  annotations,
  tiers,
} from "@/content/pipeline";

export const metadata: Metadata = {
  title: "System architecture",
  description: `The multi-agent litigation pipeline: ${TOTAL_AGENTS} agents compiled into a ${WAVE_COUNT}-wave DAG, with waves acting as hard barriers.`,
  alternates: { canonical: "/architecture" },
  openGraph: { images: ["/og/architecture.png"] },
  twitter: { images: ["/og/architecture.png"] },
};

export default function ArchitecturePage() {
  return (
    <>
      <PageHeader
        eyebrow="Multi-agent litigation pipeline"
        title="The barriers are the architecture."
        lede={`${TOTAL_AGENTS} specialized agents compiled to LangGraph state graphs, composed into a ${WAVE_COUNT}-wave DAG. Steps inside a wave run concurrently; waves are hard barriers. The diagram below is the thing I would whiteboard in an interview — architecture only, no client data.`}
      />

      {/* Diagram */}
      <section aria-label="Pipeline diagram" className="border-b border-line-1">
        <div className="container-edge py-12 md:py-16">
          <Reveal>
            <div className="border border-line-2 bg-e1 p-5 shadow-e1 md:p-10">
              <PipelineDiagram />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <dl className="mt-8 grid gap-px overflow-hidden border border-line-2 bg-line-2 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { v: String(TOTAL_AGENTS), l: "specialized agents" },
                { v: String(WAVE_COUNT), l: "sequential waves" },
                { v: "25", l: "concurrent steps at the widest wave" },
                {
                  v: `${RETRIEVING_AGENTS}/${TOTAL_AGENTS}`,
                  l: "agents that retrieve at all",
                },
              ].map((s) => (
                <div key={s.l} className="bg-e1 p-6">
                  <dd className="font-display text-[2rem] leading-none font-semibold tracking-[-0.03em] text-primary">
                    {s.v}
                  </dd>
                  <dt className="mt-3 text-sm leading-snug text-muted">
                    {s.l}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Annotations */}
      <section aria-labelledby="notes-label" className="border-b border-line-1">
        <div className="container-edge py-14 md:py-20">
          <Reveal>
            <h2 id="notes-label" className="label-mono text-muted">
              How it holds together
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
            {annotations.map((note, i) => (
              <Reveal key={note.anchor} delay={i * 0.06}>
                <article>
                  <h3 className="label-mono text-primary">{note.anchor}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-dim">
                    {note.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Agent taxonomy — replaces the old contract table */}
      <section aria-labelledby="tiers-label" className="border-b border-line-1">
        <div className="container-edge py-14 md:py-20">
          <Reveal>
            <h2 id="tiers-label" className="label-mono text-muted">
              Four tiers, not one template
            </h2>
            <p className="mt-5 max-w-[66ch] text-sm leading-relaxed text-dim md:text-base">
              &ldquo;Multi-agent&rdquo; usually means one prompt shape repeated.
              These agents fall into four genuinely different shapes, and the
              difference is whether they retrieve at all — {TOTAL_AGENTS -
                RETRIEVING_AGENTS}{" "}
              of {TOTAL_AGENTS} never touch the vector store, because their
              evidence is upstream analysis rather than raw documents.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="mt-8 overflow-hidden border border-line-2">
              {tiers.map((t) => (
                <li
                  key={t.tier}
                  className="grid gap-x-6 gap-y-2 border-b border-line-2 bg-e1 px-5 py-4 last:border-b-0 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-baseline"
                >
                  <span className="font-mono text-[0.875rem] font-medium text-primary">
                    Tier {t.tier}
                  </span>
                  <span className="text-sm text-ink">
                    {t.shape}
                    <span className="mt-1 block text-[0.8125rem] text-muted">
                      {t.retrieval}
                    </span>
                  </span>
                  <span className="label-mono shrink-0 text-accent">
                    {t.count} agents
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* The honest part */}
      <section aria-labelledby="honest-label">
        <div className="container-edge py-14 md:py-20">
          <Reveal>
            <h2 id="honest-label" className="label-mono text-muted">
              What absorbing failures costs you
            </h2>
            <div className="mt-5 flex max-w-[66ch] flex-col gap-4">
              <p className="text-sm leading-relaxed text-dim md:text-base">
                Per-step errors are swallowed so one bad agent doesn&rsquo;t
                halt the whole chain. For a pipeline this long that is the right
                call — but it creates a second obligation that is easy to skip.
              </p>
              <p className="text-sm leading-relaxed text-dim md:text-base">
                If you absorb failures, you owe the user an aggregate.
                Otherwise a run where several steps failed reports the same
                terminal state as a clean one, and &ldquo;completed&rdquo;
                quietly stops meaning &ldquo;complete.&rdquo; The hourglass
                sharpens it: because nothing halts, a failure at a single-step
                wave produces 25 downstream steps running against missing input
                rather than an early stop.
              </p>
              <p className="text-sm leading-relaxed text-dim md:text-base">
                Naming that is more useful than claiming the system is clean.
                It is the kind of thing I would rather discuss in an interview
                than have discovered in one.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 text-sm text-muted">
              This pipeline is one of two NDA projects.{" "}
              <Link
                href="/work/multi-agent-litigation-platform"
                className="text-primary underline-offset-4 transition-colors duration-150 hover:underline"
              >
                Read the full project breakdown →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
