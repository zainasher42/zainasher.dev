"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";

const links = [
  { href: "/work", label: "Work" },
  { href: "/architecture", label: "Architecture" },
  { href: "/how-i-work", label: "How I work" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Derived rather than an effect: the menu is open only while the route it
  // was opened on is still the current one, so navigating closes it without
  // a second render pass.
  const open = openedAt === pathname;
  const setOpen = (next: boolean) => setOpenedAt(next ? pathname : null);

  // Escape closes and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenedAt(null);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line-1 bg-bg/90 backdrop-blur-[2px]">
      <div className="container-edge">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 font-mono text-[0.8125rem] font-medium tracking-[0.04em] text-ink transition-colors duration-150 hover:text-primary"
            aria-label={`${profile.name} — home`}
          >
            <span
              aria-hidden="true"
              className="block size-2 shrink-0 bg-primary"
            />
            {profile.wordmark}
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden sm:block">
            <ul className="flex items-center gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`label-mono block px-3 py-2 transition-colors duration-150 ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-dim hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile toggle — four text links do not fit below 640px. */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="label-mono -mr-2 flex items-center gap-2.5 px-2 py-2 text-dim transition-colors duration-150 hover:text-ink sm:hidden"
          >
            {open ? "Close" : "Menu"}
            <span aria-hidden="true" className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-200 ${
                  open ? "top-1.5 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-200 ${
                  open ? "top-1.5 -rotate-45" : "top-2.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line-1 bg-e1 sm:hidden"
      >
        <nav aria-label="Primary mobile">
          <ul className="container-edge flex flex-col py-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`label-mono block border-b border-line-2 py-4 transition-colors duration-150 last:border-b-0 ${
                    isActive(link.href) ? "text-primary" : "text-dim"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
