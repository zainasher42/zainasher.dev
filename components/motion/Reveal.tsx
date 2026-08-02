"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll reveal: fades in once at ~20% viewport entry.
 *
 * A plain IntersectionObserver rather than Framer Motion — the animation is a
 * fade and an 8px translate, which does not justify shipping an animation
 * runtime on a static site.
 *
 * Content renders visible by default and is only hidden once the observer is
 * attached on the client. The failure mode of a scroll reveal must never be a
 * blank page: without JS, or before hydration, everything is simply visible.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Honour reduced motion: no observer, no transform, stay visible.
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    // Already in view on load (above the fold) — skip straight to shown so
    // nothing flashes.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setState("shown");
      return;
    }

    setState("hidden");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState("shown");
            io.disconnect();
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // The ref type varies with the tag; the element is only measured.
      ref={ref as React.Ref<never>}
      data-reveal={state}
      style={state === "shown" ? { transitionDelay: `${delay * 1000}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
