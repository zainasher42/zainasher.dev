import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { workflow, workflowLede, workflowTools } from "@/content/workflow";

export const metadata: Metadata = {
  title: "How I work",
  description:
    "An AI-first engineering workflow: markdown specs as the unit of work, generated code reviewed like a junior's pull request, and what stays hand-written.",
  alternates: { canonical: "/how-i-work" },
  openGraph: { images: ["/og/how-i-work.png"] },
  twitter: { images: ["/og/how-i-work.png"] },
};

export default function HowIWorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="How I work"
        title="Specs first, code second."
        lede={workflowLede}
      />

      <div className="container-edge py-14 md:py-20">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
          <div className="flex flex-col gap-14">
            {workflow.map((section, i) => (
              <Reveal as="article" key={section.heading} delay={i * 0.04}>
                <h2 className="font-display text-[1.375rem] leading-snug font-semibold tracking-[-0.02em] text-ink md:text-[1.625rem]">
                  {section.heading}
                </h2>
                <div className="mt-5 flex flex-col gap-4">
                  {section.body.map((para) => (
                    <p
                      key={para.slice(0, 40)}
                      className="max-w-[64ch] text-sm leading-relaxed text-dim md:text-base"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <div className="border border-line-2 bg-e1 p-6 shadow-e1">
                <h2 className="label-mono text-muted">Daily tools</h2>
                <dl className="mt-5 flex flex-col gap-4">
                  {workflowTools.map((tool) => (
                    <div key={tool.name}>
                      <dt className="font-mono text-[0.8125rem] font-medium text-primary">
                        {tool.name}
                      </dt>
                      <dd className="mt-1 text-[0.8125rem] leading-relaxed text-muted">
                        {tool.use}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </aside>
        </div>

        <Reveal delay={0.08}>
          <p className="mt-16 border-t border-line-2 pt-8 text-sm text-muted">
            The same argument, applied to agents rather than engineers:{" "}
            <Link
              href="/architecture"
              className="text-primary underline-offset-4 transition-colors duration-150 hover:underline"
            >
              the pipeline architecture →
            </Link>
          </p>
        </Reveal>
      </div>
    </>
  );
}
