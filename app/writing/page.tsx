import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { writing } from "@/content/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays on multi-agent architecture, RAG failure modes, and cost engineering for LLM systems.",
  alternates: { canonical: "/writing" },
  openGraph: { images: ["/og/writing.png"] },
  twitter: { images: ["/og/writing.png"] },
};

export default function WritingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Notes on building these systems."
        lede="Mostly about what breaks in production and why the fix is usually structural rather than a better prompt."
      />

      <div className="container-edge py-14 md:py-20">
        <ul className="flex flex-col">
          {writing.map((entry, i) => (
            <Reveal as="li" key={entry.title} delay={i * 0.04}>
              <a
                href={entry.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group grid gap-x-10 gap-y-3 border-b border-line-2 py-7 transition-colors duration-150 first:border-t md:grid-cols-[auto_minmax(0,1fr)] md:py-8"
              >
                <time
                  dateTime={entry.isoDate}
                  className="label-mono text-muted md:pt-1.5"
                >
                  {entry.date}
                </time>
                <div>
                  <h2 className="font-display text-[1.125rem] leading-snug font-semibold tracking-[-0.015em] text-ink transition-colors duration-150 group-hover:text-primary md:text-[1.375rem]">
                    {entry.title}
                    <span
                      aria-hidden="true"
                      className="ml-2 inline-block text-muted transition-colors duration-150 group-hover:text-primary"
                    >
                      ↗
                    </span>
                  </h2>
                  <p className="mt-2.5 max-w-[68ch] text-sm leading-relaxed text-dim">
                    {entry.summary}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  );
}
