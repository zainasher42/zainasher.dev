/**
 * Data for the signature architecture diagram.
 *
 * NDA: architecture only. No client name, no case data, no proprietary prompt
 * content. Wave names and step counts are generic enough to publish.
 *
 * Every figure here is source-backed against the architecture write-up. There
 * are deliberately no per-wave agent counts — inventing a per-wave split of
 * the 76 agents would not survive being questioned.
 *
 * NOTE ON THE STEP TOTAL: the write-up states "56 steps" in its headline
 * figures, but its own per-wave table sums to 53 (1+10+1+2+3+25+9+2). Rather
 * than print a total that contradicts the table beside it, or invent three
 * steps to close the gap, TOTAL_STEPS is derived from the per-wave numbers.
 * Reconcile against the codebase and correct the wave table if 56 is right.
 */

export interface PipelineWave {
  /** Display label. Wave 2.5 is real — a half-step barrier in the source. */
  id: string;
  name: string;
  /** Concurrent steps in this wave. */
  steps: number;
}

export const waves: PipelineWave[] = [
  { id: "0", name: "CASE SPINE", steps: 1 },
  { id: "1", name: "FOUNDATIONAL RECORD", steps: 10 },
  { id: "2", name: "ORDER OF PROOF", steps: 1 },
  { id: "2.5", name: "CASE THEORY", steps: 2 },
  { id: "3", name: "THEMES", steps: 3 },
  { id: "4", name: "DEEP ANALYSIS", steps: 25 },
  { id: "5", name: "BRIEFS & ACTION PLANS", steps: 9 },
  { id: "6", name: "MASTER BLUEPRINT", steps: 2 },
];

export const TOTAL_AGENTS = 76;
export const TOTAL_STEPS = waves.reduce((sum, w) => sum + w.steps, 0);
export const RETRIEVING_AGENTS = 47;

/**
 * The source calls this a seven-wave DAG while listing eight rows, because
 * wave 2.5 is a half-step barrier rather than a wave of its own. `waves` has
 * eight entries to draw; WAVE_COUNT is what the architecture is called.
 */
export const WAVE_COUNT = 7;

/** Caption beneath the diagram. */
export const pipelineCaption = `${TOTAL_AGENTS} agents · ${WAVE_COUNT} waves · barriers between every stage`;

/** Agent taxonomy — four tiers, not one template. Counts are source-backed. */
export const tiers = [
  {
    tier: "A",
    shape: "Plain async function, no graph",
    count: 2,
    retrieval: "None",
  },
  {
    tier: "B",
    shape: "Linear: initialize → compress → draft",
    count: 27,
    retrieval: "Never touches the vector store",
  },
  {
    tier: "C",
    shape: "Single-pass retrieval",
    count: 1,
    retrieval: "Model-authored queries, no loop",
  },
  {
    tier: "D",
    shape: "Bounded agentic loop",
    count: 46,
    retrieval: "validate → supplement → validate",
  },
];

export const annotations = [
  {
    anchor: "On the barriers",
    body: "Steps inside a wave run concurrently; waves are hard barriers. Wave N starts only once every step in N−1 has finished — by success, skip, or failure — so no agent ever reads half-built upstream state.",
  },
  {
    anchor: "On the hourglass",
    body: "Single-step bottlenecks at Wave 0 and Wave 2 gate a 25-way fan-out at Wave 4. That makes those two steps the highest-leverage failures in the system: everything downstream inherits their output.",
  },
  {
    anchor: "On what agentic means",
    body: "46 of 76 agents run a bounded loop — the model authors its own queries and can decide not to search at all, then a validate node judges whether coverage is sufficient and can re-enter retrieval, capped so it terminates.",
  },
];

/**
 * Reading-order description for screen readers. A non-sighted visitor should
 * get the same information the drawing carries.
 */
export const pipelineDescription = (() => {
  const steps = waves.map(
    (w, i) =>
      `Wave ${w.id}: ${w.name}, ${w.steps} ${
        w.steps === 1 ? "step" : "concurrent steps"
      }.${i < waves.length - 1 ? " A hard barrier follows before the next wave begins." : ""}`,
  );
  return [
    `A left-to-right pipeline of ${WAVE_COUNT} waves containing ${TOTAL_STEPS} steps in total, drawn from ${TOTAL_AGENTS} specialized agents.`,
    ...steps,
    "The shape is an hourglass: single-step waves gate the 25-step widest wave.",
  ].join(" ");
})();
