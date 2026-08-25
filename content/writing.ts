export interface WritingEntry {
  title: string;
  summary: string;
  /** Display label, e.g. "Jun 2026". */
  date: string;
  /** ISO date, used for ordering and the <time datetime> attribute. */
  isoDate: string;
  href: string;
}

/**
 * Published LinkedIn posts, newest first.
 *
 * Titles are drawn from what each post actually argues rather than from a
 * separate headline, so a reader who clicks through finds the piece they were
 * promised. Dates are the post dates.
 */
export const writing: WritingEntry[] = [
  {
    title: "The contract is the architecture",
    summary:
      "The most common mistake in production LLM systems: teams iterating on prompts when they should be iterating on output schemas.",
    date: "Jun 2026",
    isoDate: "2026-06-09",
    href: "https://www.linkedin.com/posts/zain-asher-3960321b2_aiengineering-llm-productionai-activity-7470065699672174594-xzQ7",
  },
  {
    title: "Architecting multi-agent systems in production",
    summary:
      "Orchestrating dozens of specialized LLM agents at Ember AI through LangGraph, with cost engineering that cut token spend by ~60%.",
    date: "May 2026",
    isoDate: "2026-05-31",
    href: "https://www.linkedin.com/posts/zain-asher-3960321b2_aiengineering-llm-productionai-activity-7466992259436015616-ghUe",
  },
  {
    title: "I shipped a public RAG demo",
    summary:
      "What's in it, and why the failing eval cases stayed in the report instead of being tuned away.",
    date: "May 2026",
    isoDate: "2026-05-24",
    href: "https://www.linkedin.com/posts/zain-asher-3960321b2_aiengineering-rag-llm-activity-7464432343429050368-ewSg",
  },
  {
    title: "I stopped writing code first",
    summary:
      "Eight months ago I changed how I work: specs as the unit of work, not keystrokes. What that shifted wasn't speed.",
    date: "May 2026",
    isoDate: "2026-05-20",
    href: "https://www.linkedin.com/posts/zain-asher-3960321b2_aiengineering-llm-productionai-activity-7462964554134642689-JvDk",
  },
  {
    title: "Cost engineering for LLM systems",
    summary:
      "The most underrated production skill in AI right now — and the levers that actually move token spend.",
    date: "May 2026",
    isoDate: "2026-05-17",
    href: "https://www.linkedin.com/posts/zain-asher-3960321b2_production-aiengineering-llm-activity-7461919863821918208-hxOG",
  },
  {
    title: "Four ways your RAG system silently fails in production",
    summary:
      "Every team I've seen ship RAG has been bitten by at least one of these. None of them throw an error.",
    date: "May 2026",
    isoDate: "2026-05-10",
    href: "https://www.linkedin.com/posts/zain-asher-3960321b2_aiengineering-llm-productionai-activity-7459360245660930048-kaQu",
  },
  {
    title: "Eight months without hand-writing production code",
    summary:
      "Still shipping more, faster, and at higher quality. Why 'AI writes the code' is the least interesting part of the workflow.",
    date: "May 2026",
    isoDate: "2026-05-07",
    href: "https://www.linkedin.com/posts/zain-asher-3960321b2_developertools-aiengineering-llm-activity-7458090740703997952-V1X7",
  },
];
