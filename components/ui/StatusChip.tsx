import type { ProjectStatus } from "@/content/projects";

/**
 * Status is colour-coded by how reachable the work is: cyan for things a
 * visitor can open, violet for shipped-but-private, neutral for the rest.
 */
export function StatusChip({ status }: { status: ProjectStatus }) {
  const live = status === "LIVE";
  const open = status === "OPEN SOURCE";
  const tone = live
    ? "border-primary/40 text-primary"
    : open
      ? "border-accent/40 text-accent"
      : "border-line-3 text-muted";

  return (
    <span
      className={`label-mono inline-flex shrink-0 items-center gap-2 rounded-[2px] border px-2.5 py-1 ${tone}`}
    >
      {live && (
        <span aria-hidden="true" className="block size-1.5 bg-primary" />
      )}
      {status}
    </span>
  );
}
