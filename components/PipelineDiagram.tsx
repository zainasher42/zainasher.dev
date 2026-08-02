import {
  contracts,
  pipelineCaption,
  pipelineDescription,
  stages,
} from "@/content/pipeline";

/* ---------------------------------------------------------------------------
   Hand-authored geometry. A diagramming library produces something that looks
   like every other generated diagram; this needs to look drawn.

   The gap must clear the longest payload name ("DepositionPlan") at the label
   font size, or the labels get clipped by the neighbouring node rectangles.
--------------------------------------------------------------------------- */
const NODE_W = 126;
const NODE_H = 80;
const GAP = 110;
const PITCH = NODE_W + GAP;
const PAD_X = 2;
const TOP = 76;
const VB_W = PAD_X * 2 + stages.length * NODE_W + (stages.length - 1) * GAP;
const VB_H = TOP + NODE_H + 36;

const nodeX = (i: number) => PAD_X + i * PITCH;
const MID_Y = TOP + NODE_H / 2;
const LABEL_Y = TOP - 32;

/** The one element on the site that carries a glow. */
const GLOW_INDEX = 0;

export function PipelineDiagram() {
  // Stages fade in left to right, each contract label a beat after the node it
  // leaves. Pure CSS: the animation is a fade, which does not justify an
  // animation runtime, and `both` fill keeps it visible without JS.
  const anim = (i: number, extra = 0) => ({
    className: "pipe-in",
    style: { animationDelay: `${i * 80 + extra}ms` },
  });

  return (
    <>
      {/* One description serving both renderings — the SVG is labelled by it
          and the mobile list is decorative, so a screen reader gets it once. */}
      <p className="sr-only-text">{pipelineDescription}</p>

      {/* -------------------- Desktop: horizontal -------------------- */}
      <div className="hidden md:block">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full"
          role="img"
          aria-labelledby="pipeline-title pipeline-desc"
          preserveAspectRatio="xMidYMid meet"
        >
          <title id="pipeline-title">
            Multi-agent litigation pipeline architecture
          </title>
          <desc id="pipeline-desc">{pipelineDescription}</desc>

          <defs>
            <marker
              id="contract-arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 7 4 L 0 7 z" fill="var(--color-primary)" />
            </marker>
          </defs>

          {contracts.map((contract, i) => {
            const x1 = nodeX(i) + NODE_W;
            const x2 = nodeX(i + 1);
            const midX = (x1 + x2) / 2;
            return (
              <g key={contract.payload} {...anim(i, 160)}>
                <line
                  x1={x1 + 10}
                  y1={MID_Y}
                  x2={x2 - 11}
                  y2={MID_Y}
                  stroke="var(--color-line-3)"
                  strokeWidth="1"
                  markerEnd="url(#contract-arrow)"
                />
                <line
                  x1={midX}
                  y1={MID_Y - 5}
                  x2={midX}
                  y2={LABEL_Y + 9}
                  stroke="var(--color-line-2)"
                  strokeWidth="1"
                />
                <rect
                  x={midX - 2.5}
                  y={MID_Y - 2.5}
                  width="5"
                  height="5"
                  fill="var(--color-primary)"
                />
                <text
                  x={midX}
                  y={LABEL_Y}
                  textAnchor="middle"
                  fill="var(--color-accent)"
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                  fontWeight="500"
                >
                  {contract.payload}
                </text>
              </g>
            );
          })}

          {stages.map((stage, i) => {
            const x = nodeX(i);
            const words = stage.name.split(" ");
            const isGlow = i === GLOW_INDEX;
            return (
              <g
                key={stage.name}
                style={anim(i).style}
                className={`pipe-in${isGlow ? " signature-glow" : ""}`}
              >
                <rect
                  x={x}
                  y={TOP}
                  width={NODE_W}
                  height={NODE_H}
                  fill="var(--color-e2)"
                  stroke={
                    isGlow ? "var(--color-primary)" : "var(--color-line-3)"
                  }
                  strokeWidth="1"
                  rx="2"
                />
                {/* Leading-edge mark: cyan on the entry stage, neutral after. */}
                <rect
                  x={x}
                  y={TOP + 1}
                  width="2"
                  height={NODE_H - 2}
                  fill={
                    isGlow ? "var(--color-primary)" : "var(--color-accent)"
                  }
                />
                {/* Vertically centred: with the agent count gone there is no
                    second line to balance against. */}
                <text
                  x={x + NODE_W / 2}
                  y={words.length > 1 ? TOP + NODE_H / 2 - 3 : TOP + NODE_H / 2 + 4}
                  textAnchor="middle"
                  fill="var(--color-ink)"
                  fontFamily="var(--font-mono)"
                  fontSize="11.5"
                  fontWeight="500"
                  letterSpacing="0.05em"
                >
                  {words.length > 1 ? (
                    <>
                      <tspan x={x + NODE_W / 2}>{words[0]}</tspan>
                      <tspan x={x + NODE_W / 2} dy="14">
                        {words.slice(1).join(" ")}
                      </tspan>
                    </>
                  ) : (
                    stage.name
                  )}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* -------------------- Mobile: vertical reflow --------------------
          A genuine restatement in DOM, not the horizontal drawing shrunk and
          not hidden behind a scroll container. */}
      <ol className="flex flex-col md:hidden" aria-hidden="true">
        {stages.map((stage, i) => (
          <li key={stage.name}>
            <div
              className={`relative rounded-[2px] border bg-e2 py-4 pr-4 pl-5 ${
                i === GLOW_INDEX
                  ? "signature-glow border-primary"
                  : "border-line-3"
              }`}
            >
              <span
                className={`absolute inset-y-0 left-0 w-[2px] ${
                  i === GLOW_INDEX ? "bg-primary" : "bg-accent"
                }`}
              />
              <p className="label-mono text-ink">{stage.name}</p>
            </div>

            {contracts[i] && (
              <div className="flex items-center gap-3 py-3 pl-5">
                <span className="h-7 w-px shrink-0 bg-line-3" />
                <span className="size-1.5 shrink-0 bg-primary" />
                <span className="font-mono text-[0.8125rem] font-medium text-accent">
                  {contracts[i].payload}
                </span>
              </div>
            )}
          </li>
        ))}
      </ol>

      {/* Replaces the per-node counts: the ~40 total is real, any per-stage
          split would not be. */}
      <p className="label-mono mt-6 text-muted">{pipelineCaption}</p>
    </>
  );
}
