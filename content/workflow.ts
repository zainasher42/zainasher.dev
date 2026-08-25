/**
 * The AI-first workflow. Prose, deliberately — no icons, no feature grid.
 *
 * This is the most differentiating material on the site: several target roles
 * name daily Cursor/Claude Code use as an explicit requirement, and most
 * candidates cannot describe the workflow beyond "I use AI."
 */

export interface WorkflowSection {
  heading: string;
  body: string[];
}

// Deliberately no duration: a specific figure dates the page and needs
// updating to stay true.
export const workflowLede =
  "I don't hand-write most production code any more. I still ship more, faster, and at higher quality than when I wrote everything myself. The interesting part isn't that AI writes the code — it's what that changes about where the work actually happens.";

export const workflow: WorkflowSection[] = [
  {
    heading: "The spec is the unit of work",
    body: [
      "I write a markdown spec before implementation starts. Not a ticket or a paragraph of intent — a document that names the data model, the failure modes, the interfaces between components, and the cases the result has to handle. It is the artifact I actually author.",
      "Writing it is where the thinking happens. Most of the decisions that determine whether a system holds up get made there, and they get made whether or not you write them down. Writing them down means they get made deliberately, and it means the reasoning survives past the moment.",
      "A spec that is precise enough for an AI tool to implement correctly is, not coincidentally, precise enough for a human engineer to implement correctly. When implementation comes back wrong, the spec was usually ambiguous. That is a fast, honest feedback loop on my own clarity.",
    ],
  },
  {
    heading: "Reviewing output like a senior reviews a junior's PR",
    body: [
      "Generated code gets the same review a capable junior's pull request gets: read every line, check the edge cases, ask why this approach rather than another, reject what doesn't hold up. The tool is fast and genuinely good, and it is also confidently wrong in ways that pattern-match to correct code.",
      "The failure mode I watch for is plausibility. Output that looks right, uses the correct idioms, and quietly mishandles an empty list or a timeout. Catching that requires knowing what correct looks like in the specific system, which is why this workflow demands more domain knowledge than writing the code by hand, not less.",
      "I am accountable for everything that ships under my name. \"The model wrote it\" is not a defence I would accept from anyone else, so I don't offer it.",
    ],
  },
  {
    heading: "Where the leverage moved",
    body: [
      "What changed isn't my typing speed. It's that the expensive mistakes moved upstream. When implementation is cheap, a bad data model is no longer partly hidden behind the effort of building it — you get to the consequences faster, at scale, and the wrong abstraction propagates through more code before anyone notices.",
      "So architecture and data modeling matter more now, not less. The schema you choose, the boundaries between services, the shape of the contract between two components — those are the decisions AI cannot make for you, and they are the ones that determine whether the system survives its second year.",
      "This is the same argument as the pipeline diagram on this site. Typed state and hard barriers between waves are what keep 76 agents consistent \u2014 not better instructions to each one. Typed thinking between spec and implementation is what keeps a codebase consistent. The pattern is the same at both scales.",
    ],
  },
  {
    heading: "What I still do by hand",
    body: [
      "Data modeling and schema design. These are decisions with long half-lives and expensive reversals, and reasoning through them is the work rather than an obstacle to it. I want the friction.",
      "Anything touching authentication, permissions, or money. Not because a model can't write it, but because the review burden for security-critical code is high enough that generating a plausible draft first doesn't save real time — and a subtly wrong permission check is exactly the kind of error that looks correct.",
      "Debugging genuinely novel failures. When something breaks in a way I don't recognise, describing the problem well enough to delegate usually means I have already understood it. At that point I may as well fix it.",
      "Deciding what to build. Obvious, but worth saying: the tools are very good at answering the question you asked, which makes asking the wrong question more expensive than it used to be.",
    ],
  },
];

export const workflowTools = [
  { name: "Cursor", use: "primary editor; inline and multi-file implementation" },
  { name: "Claude Code", use: "spec-driven implementation, refactors, code review" },
  { name: "Markdown specs", use: "the authored artifact — versioned alongside the code" },
  { name: "Paired evals", use: "prompt and retrieval changes measured, not eyeballed" },
];
