import Link from "next/link";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-line-1"
    >
      {/* Decorative grid, background layer only. The radial mask keeps it
          well away from the text. */}
      <div
        aria-hidden="true"
        className="grid-texture pointer-events-none absolute inset-0 [mask-image:radial-gradient(120%_80%_at_85%_15%,rgba(0,0,0,0.55),transparent_65%)]"
      />

      <div className="container-edge relative">
        {/* Not a forced full viewport: at 1440x900 that leaves a dead band
            under the buttons. Tall enough to own the fold, short enough that
            the next section signals there is more. */}
        <div className="flex min-h-[min(78svh,44rem)] flex-col justify-center py-20 md:py-24">
          <p className="rise-in label-mono flex items-center gap-2.5 text-primary">
            <span aria-hidden="true" className="block size-1.5 bg-primary" />
            {profile.availability}
          </p>

          <h1
            id="hero-heading"
            className="rise-in mt-7 max-w-[13ch] font-display text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-ink md:mt-9 md:text-[3.5rem] lg:text-[4.5rem]"
            style={{ animationDelay: "75ms" }}
          >
            {profile.headline}
          </h1>

          <p
            className="rise-in mt-6 max-w-[46ch] text-[1.125rem] leading-[1.35] font-medium tracking-[-0.01em] text-dim md:text-[1.375rem]"
            style={{ animationDelay: "150ms" }}
          >
            {profile.headlineSub}
          </p>

          <p
            className="rise-in mt-7 max-w-[58ch] text-sm leading-relaxed text-muted md:text-base"
            style={{ animationDelay: "225ms" }}
          >
            {profile.subline}
          </p>

          <div
            className="rise-in mt-10 flex flex-wrap items-center gap-3 md:mt-12"
            style={{ animationDelay: "300ms" }}
          >
            <Link
              href="/work"
              className="label-mono inline-flex items-center gap-2 rounded-[2px] bg-primary px-5 py-3 font-medium text-bg transition-colors duration-150 hover:bg-primary/85"
            >
              View the work
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/architecture"
              className="label-mono inline-flex items-center gap-2 rounded-[2px] border border-line-3 px-5 py-3 text-ink transition-colors duration-150 hover:border-line-4 hover:text-primary"
            >
              System architecture
            </Link>
            <a
              href={profile.contact.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="label-mono inline-flex items-center gap-2 px-3 py-3 text-dim transition-colors duration-150 hover:text-primary"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
