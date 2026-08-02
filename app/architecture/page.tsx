import type { Metadata } from "next";
import Link from "next/link";
import { PipelineDiagram } from "@/components/PipelineDiagram";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { annotations, contracts, stages } from "@/content/pipeline";

export const metadata: Metadata = {
  title: "System architecture",
  description:
    "The multi-agent litigation pipeline: seven stages, ~40 agents, and a Pydantic-validated contract at every handoff.",
  alternates: { canonical: "/architecture" },
  openGraph: { images: ["/og/architecture.png"] },
  twitter: { images: ["/og/architecture.png"] },
};

export default function ArchitecturePage() {
  return (
    <>
      <PageHeader
        eyebrow="Multi-agent litigation pipeline"
        title="The contracts are the architecture."
        lede="Seven staged synthesis steps, roughly forty specialized agents, and a typed payload at every handoff. The diagram below is the thing I would whiteboard in an interview — architecture only, no client data."
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
            <dl className="mt-8 grid gap-px overflow-hidden border border-line-2 bg-line-2 sm:grid-cols-3">
              {[
                { v: String(stages.length), l: "pipeline stages" },
                { v: "~40", l: "specialized agents" },
                { v: String(contracts.length), l: "typed handoff contracts" },
              ].map((s) => (
                <div key={s.l} className="bg-e1 p-6">
                  <dd className="font-display text-[2rem] leading-none font-semibold tracking-[-0.03em] text-primary">
                    {s.v}
                  </dd>
                  <dt className="mt-3 text-sm text-muted">{s.l}</dt>
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

      {/* Contract table — the argument, stated explicitly */}
      <section aria-labelledby="contracts-label">
        <div className="container-edge py-14 md:py-20">
          <Reveal>
            <h2 id="contracts-label" className="label-mono text-muted">
              The handoff contracts
            </h2>
            <p className="mt-5 max-w-[64ch] text-sm leading-relaxed text-dim md:text-base">
              Agents cannot pass prose to each other. Every stage boundary is a
              validated schema with explicit status enums and mandatory
              evidence citations, so disagreement fails at the seam instead of
              compounding downstream.
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="mt-8 overflow-hidden border border-line-2">
              {contracts.map((c, i) => (
                <li
                  key={c.payload}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line-2 bg-e1 px-5 py-4 last:border-b-0"
                >
                  <span className="font-mono text-[0.875rem] font-medium text-accent">
                    {c.payload}
                  </span>
                  <span className="label-mono text-muted">
                    {stages[i].name} → {stages[i + 1].name}
                  </span>
                </li>
              ))}
            </ul>
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
