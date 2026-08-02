import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software engineer at Ember AI building production AI systems for legal tech and media. Available for remote work worldwide and open to relocation.",
  alternates: { canonical: "/about" },
  openGraph: { images: ["/og/about.png"] },
  twitter: { images: ["/og/about.png"] },
};

function ConfigRow({
  field,
  children,
}: {
  field: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 border-t border-line-2 py-3.5 first:border-t-0 first:pt-0 sm:flex-row sm:gap-6">
      <dt className="label-mono shrink-0 text-primary sm:w-24 sm:pt-0.5">
        {field}
      </dt>
      <dd className="font-mono text-[0.8125rem] leading-relaxed break-words text-dim">
        {children}
      </dd>
    </div>
  );
}

export default function AboutPage() {
  const { contact } = profile;

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="How I work."
        lede="Engineer at Ember AI. Multi-agent orchestration and document-heavy retrieval, mostly for clients where a confident wrong answer is expensive."
      />

      <div className="container-edge py-14 md:py-20">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
          <div>
            <Reveal>
              <div className="flex max-w-[64ch] flex-col gap-5">
                {profile.about.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-base leading-relaxed text-dim md:text-[1.0625rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="label-mono mt-14 text-muted">Focus areas</h2>
              <div className="mt-6 flex flex-col gap-6">
                {profile.focus.map((f) => (
                  <article key={f.area}>
                    <h3 className="font-display text-[1.0625rem] font-semibold tracking-[-0.015em] text-ink">
                      {f.area}
                    </h3>
                    <p className="mt-2 max-w-[64ch] text-sm leading-relaxed text-dim">
                      {f.body}
                    </p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <div className="border border-line-2 bg-e1 p-6 shadow-e1 lg:sticky lg:top-24">
              <p className="label-mono mb-5 text-muted">contact</p>
              <dl>
                <ConfigRow field="Email">
                  <a
                    href={`mailto:${contact.email}`}
                    className="transition-colors duration-150 hover:text-primary"
                  >
                    {contact.email}
                  </a>
                </ConfigRow>
                <ConfigRow field="GitHub">
                  <a
                    href={contact.githubUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition-colors duration-150 hover:text-primary"
                  >
                    {contact.github}
                  </a>
                </ConfigRow>
                <ConfigRow field="LinkedIn">
                  <a
                    href={contact.linkedinUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition-colors duration-150 hover:text-primary"
                  >
                    {contact.linkedin}
                  </a>
                </ConfigRow>
                <ConfigRow field="Location">{contact.location}</ConfigRow>
                <ConfigRow field="Timezone">{contact.timezone}</ConfigRow>
                {profile.resumeUrl && (
                  <ConfigRow field="Résumé">
                    <a
                      href={profile.resumeUrl}
                      className="inline-flex items-center gap-2 transition-colors duration-150 hover:text-primary"
                    >
                      Download PDF <span aria-hidden="true">↓</span>
                    </a>
                  </ConfigRow>
                )}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
