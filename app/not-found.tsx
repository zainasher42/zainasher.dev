import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-edge flex min-h-[60svh] flex-col justify-center py-20">
      <p className="label-mono text-primary">404</p>
      <h1 className="mt-5 max-w-[18ch] font-display text-[2rem] leading-tight font-semibold tracking-[-0.03em] text-ink md:text-[2.75rem]">
        That page doesn&rsquo;t exist.
      </h1>
      <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-dim">
        The link may be out of date. The work is all still here.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link
          href="/"
          className="label-mono inline-flex items-center gap-2 rounded-[2px] bg-primary px-5 py-3 font-medium text-bg transition-colors duration-150 hover:bg-primary/85"
        >
          Home
        </Link>
        <Link
          href="/work"
          className="label-mono inline-flex items-center gap-2 rounded-[2px] border border-line-3 px-5 py-3 text-ink transition-colors duration-150 hover:border-line-4 hover:text-primary"
        >
          View the work
        </Link>
      </div>
    </div>
  );
}
