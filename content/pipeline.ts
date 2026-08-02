/**
 * Data for the signature architecture diagram.
 *
 * NDA: architecture only. No client name, no case data, no proprietary prompt
 * content. Stage names and payload type names are generic enough to publish.
 *
 * Deliberately no per-stage agent counts. The ~40 total is real; any split
 * across the seven stages would be invented, and every number on this site has
 * to survive being questioned in an interview.
 */

export interface PipelineStage {
  name: string;
}

export interface PipelineContract {
  /** The typed payload handed from one stage to the next. */
  payload: string;
}

export const stages: PipelineStage[] = [
  { name: "FOUNDATION" },
  { name: "DISCOVERY" },
  { name: "MOTION PRACTICE" },
  { name: "HEARING PREP" },
  { name: "DEPOSITION" },
  { name: "EXPERTS" },
  { name: "FINAL STRATEGY" },
];

/** One fewer than the stage count — these sit between the nodes. */
export const contracts: PipelineContract[] = [
  { payload: "CaseFoundation" },
  { payload: "DiscoveryPlan" },
  { payload: "MotionSet" },
  { payload: "HearingBrief" },
  { payload: "DepositionPlan" },
  { payload: "ExpertReport" },
];

/** Single caption beneath the diagram, in place of per-node counts. */
export const pipelineCaption = "~40 agents across seven stages";

export const annotations = [
  {
    anchor: "On the contracts",
    body: "Every handoff is a Pydantic-validated schema with explicit status enums and mandatory evidence citations — which is what makes ~40 agents agree with each other.",
  },
  {
    anchor: "On the providers",
    body: "Each stage routes across Claude, Gemini, and OpenAI with automatic failover.",
  },
  {
    anchor: "On cost",
    body: "Shared case context is cached with a stable prefix and memoized per session rather than re-read per agent — roughly 60% of token spend.",
  },
];

/**
 * Reading-order description for screen readers. A non-sighted visitor should
 * get the same information the drawing carries, including the contracts.
 */
export const pipelineDescription = (() => {
  const steps = stages.map((stage, i) => {
    const contract = contracts[i];
    const handoff = contract
      ? ` It hands off a ${contract.payload} payload to the next stage.`
      : "";
    return `Stage ${i + 1} of ${stages.length}: ${stage.name}.${handoff}`;
  });
  return [
    `A left-to-right pipeline of ${stages.length} stages containing approximately 40 agents in total.`,
    ...steps,
    "Each arrow between stages is a typed, schema-validated contract rather than free text.",
  ].join(" ");
})();
