import {
  pipelineCaption,
  pipelineDescription,
  waves,
} from "@/content/pipeline";

/* ---------------------------------------------------------------------------
   Hand-authored geometry. A diagramming library produces something that looks
   like every other generated diagram; this needs to look drawn.

   Node height encodes step count, so the hourglass is visible rather than
   asserted: single-step waves pinch, the 25-step wave bulges. That shape is
   the argument — two 1-step bottlenecks gate the widest fan-out.
--------------------------------------------------------------------------- */
const NODE_W = 116;
const GAP = 34;
const PITCH = NODE_W + GAP;
const PAD_X = 2;

const MAX_STEPS = Math.max(...waves.map((w) => w.steps));
const MIN_H = 44;
const MAX_H = 150;
/** Square-root scale: linear would make the 1-step waves invisible slivers. */
const heightFor = (steps: number) =>
  MIN_H + (MAX_H - MIN_H) * Math.sqrt((steps - 1) / (MAX_STEPS - 1));

const VB_W = PAD_X * 2 + waves.length * NODE_W + (waves.length - 1) * GAP;
const LABEL_BAND = 40; // wave id + step count above each node
const MID_Y = LABEL_BAND + MAX_H / 2;
const VB_H = LABEL_BAND + MAX_H + 46; // room for the name below

const nodeX = (i: number) => PAD_X + i * PITCH;

/** The one element on the site that carries a glow: the widest wave. */
const GLOW_INDEX = waves.reduce(
  (best, w, i) => (w.steps > waves[best].steps ? i : best),
  0,
);

export function PipelineDiagram() {
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
            Multi-agent litigation pipeline: seven-wave DAG
          </title>
          <desc id="pipeline-desc">{pipelineDescription}</desc>

          {waves.map((wave, i) => {
            const x = nodeX(i);
            const h = heightFor(wave.steps);
            const y = MID_Y - h / 2;
            const isGlow = i === GLOW_INDEX;
            const words = wave.name.split(" ");
            const nameY = MID_Y + MAX_H / 2 + 20;

            return (
              <g
                key={wave.id}
                className={`pipe-in${isGlow ? " signature-glow" : ""}`}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                {/* Wave id + step count, above the node. */}
                <text
                  x={x + NODE_W / 2}
                  y={LABEL_BAND - 22}
                  textAnchor="middle"
                  fill="var(--color-muted)"
                  fontFamily="var(--font-mono)"
                  fontSize="10"
                  letterSpacing="0.08em"
                >
                  WAVE {wave.id}
                </text>
                <text
                  x={x + NODE_W / 2}
                  y={LABEL_BAND - 7}
                  textAnchor="middle"
                  fill={isGlow ? "var(--color-primary)" : "var(--color-accent)"}
                  fontFamily="var(--font-mono)"
                  fontSize="12.5"
                  fontWeight="500"
                >
                  {wave.steps} {wave.steps === 1 ? "step" : "steps"}
                </text>

                {/* The node. Height encodes concurrency. */}
                <rect
                  x={x}
                  y={y}
                  width={NODE_W}
                  height={h}
                  fill="var(--color-e2)"
                  stroke={
                    isGlow ? "var(--color-primary)" : "var(--color-line-3)"
                  }
                  strokeWidth="1"
                  rx="2"
                />
                <rect
                  x={x}
                  y={y + 1}
                  width="2"
                  height={h - 2}
                  fill={isGlow ? "var(--color-primary)" : "var(--color-accent)"}
                />

                {/* Hard barrier between waves: a double rule, not an arrow.
                    Waves are gates, not handoffs. */}
                {i < waves.length - 1 && (
                  <>
                    <line
                      x1={x + NODE_W + GAP / 2 - 3}
                      y1={MID_Y - MAX_H / 2}
                      x2={x + NODE_W + GAP / 2 - 3}
                      y2={MID_Y + MAX_H / 2}
                      stroke="var(--color-line-2)"
                      strokeWidth="1"
                    />
                    <line
                      x1={x + NODE_W + GAP / 2 + 3}
                      y1={MID_Y - MAX_H / 2}
                      x2={x + NODE_W + GAP / 2 + 3}
                      y2={MID_Y + MAX_H / 2}
                      stroke="var(--color-line-2)"
                      strokeWidth="1"
                    />
                  </>
                )}

                {/* Wave name, below the node, wrapped to two lines. */}
                <text
                  x={x + NODE_W / 2}
                  y={nameY}
                  textAnchor="middle"
                  fill="var(--color-ink)"
                  fontFamily="var(--font-mono)"
                  fontSize="9.5"
                  fontWeight="500"
                  letterSpacing="0.04em"
                >
                  {words.length > 2 ? (
                    <>
                      <tspan x={x + NODE_W / 2}>
                        {words.slice(0, 2).join(" ")}
                      </tspan>
                      <tspan x={x + NODE_W / 2} dy="12">
                        {words.slice(2).join(" ")}
                      </tspan>
                    </>
                  ) : words.length === 2 ? (
                    <>
                      <tspan x={x + NODE_W / 2}>{words[0]}</tspan>
                      <tspan x={x + NODE_W / 2} dy="12">
                        {words[1]}
                      </tspan>
                    </>
                  ) : (
                    wave.name
                  )}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* -------------------- Mobile: vertical reflow --------------------
          A genuine restatement in DOM, not the horizontal drawing shrunk and
          not hidden behind a scroll container. Bar width encodes step count. */}
      <ol className="flex flex-col md:hidden" aria-hidden="true">
        {waves.map((wave, i) => {
          const isGlow = i === GLOW_INDEX;
          const pct = Math.round((wave.steps / MAX_STEPS) * 100);
          return (
            <li key={wave.id}>
              <div
                className={`relative rounded-[2px] border bg-e2 py-3 pr-4 pl-5 ${
                  isGlow ? "signature-glow border-primary" : "border-line-3"
                }`}
              >
                <span
                  className={`absolute inset-y-0 left-0 w-[2px] ${
                    isGlow ? "bg-primary" : "bg-accent"
                  }`}
                />
                <div className="flex items-baseline justify-between gap-3">
                  <p className="label-mono text-ink">{wave.name}</p>
                  <p
                    className={`shrink-0 font-mono text-[0.75rem] font-medium ${
                      isGlow ? "text-primary" : "text-accent"
                    }`}
                  >
                    {wave.steps}
                  </p>
                </div>
                <p className="mt-1 font-mono text-[0.6875rem] text-muted">
                  Wave {wave.id}
                </p>
                {/* Width-as-concurrency, so the hourglass survives the reflow. */}
                <div className="mt-2.5 h-[3px] w-full bg-line-2">
                  <div
                    className={`h-full ${isGlow ? "bg-primary" : "bg-accent"}`}
                    style={{ width: `${Math.max(pct, 4)}%` }}
                  />
                </div>
              </div>

              {i < waves.length - 1 && (
                <div className="flex items-center gap-3 py-2.5 pl-5">
                  <span className="h-5 w-px shrink-0 bg-line-3" />
                  <span className="font-mono text-[0.6875rem] tracking-[0.06em] text-muted">
                    barrier
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <p className="label-mono mt-6 text-muted">{pipelineCaption}</p>
    </>
  );
}
