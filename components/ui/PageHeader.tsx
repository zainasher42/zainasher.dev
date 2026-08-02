import type { ReactNode } from "react";

/**
 * Shared masthead for the interior pages. The faint grid texture lives here
 * as a background layer, masked so it fades out well before the text.
 */
export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line-1">
      {/* Decorative only, never behind the text: the mask fades it to nothing
          before it reaches the copy. */}
      <div
        aria-hidden="true"
        className="grid-texture pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.5),transparent_70%)]"
      />
      <div className="container-edge relative">
        <div className="py-16 md:py-24">
          <p className="label-mono rise-in text-primary">{eyebrow}</p>
          <h1
            className="rise-in mt-5 max-w-[20ch] font-display text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.03em] text-ink md:text-[3rem] lg:text-[3.5rem]"
            style={{ animationDelay: "75ms" }}
          >
            {title}
          </h1>
          {lede && (
            <p
              className="rise-in mt-6 max-w-[62ch] text-base leading-relaxed text-dim md:text-[1.0625rem]"
              style={{ animationDelay: "150ms" }}
            >
              {lede}
            </p>
          )}
          {children && (
            <div className="rise-in mt-8" style={{ animationDelay: "225ms" }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
