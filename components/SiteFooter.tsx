import Link from "next/link";
import { profile } from "@/content/profile";

const nav = [
  { href: "/work", label: "Work" },
  { href: "/architecture", label: "Architecture" },
  { href: "/how-i-work", label: "How I work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line-1">
      <div className="container-edge">
        <div className="grid gap-10 py-12 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] md:py-14">
          <div>
            <p className="font-mono text-[0.8125rem] font-medium tracking-[0.04em] text-ink">
              {profile.name}
            </p>
            <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-dim">
              Building production AI systems — multi-agent orchestration,
              agentic RAG, and the reliability work underneath.
            </p>
            <p className="label-mono mt-5 flex items-center gap-2 text-primary">
              <span aria-hidden="true" className="block size-1.5 bg-primary" />
              Available for work
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="label-mono text-muted">Pages</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-dim transition-colors duration-150 hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="label-mono text-muted">Elsewhere</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="text-sm text-dim transition-colors duration-150 hover:text-primary"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href={profile.contact.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-dim transition-colors duration-150 hover:text-primary"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href={profile.contact.linkedinUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-dim transition-colors duration-150 hover:text-primary"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href="/zain-asher-resume.pdf"
                  className="text-sm text-dim transition-colors duration-150 hover:text-primary"
                >
                  Résumé ↓
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line-1 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono text-muted">
            © {profile.copyrightYear} {profile.name}
          </p>
          <p className="label-mono text-muted">
            {profile.contact.location.split("·")[0].trim()} · {profile.contact.timezoneShort}
          </p>
        </div>
      </div>
    </footer>
  );
}
