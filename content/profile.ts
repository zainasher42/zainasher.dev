export const profile = {
  name: "Zain Asher",
  role: "Software Engineer",
  company: "Ember AI",
  domain: "zainasher.dev",
  siteUrl: "https://zainasher.dev",
  copyrightYear: 2026,

  // Not a region list: naming specific markets reads as a limit rather than an
  // opening, and "remote worldwide" alone reads out sponsorship/relocation
  // roles, which are a large part of the target set.
  availability: "Available for work — Remote or relocation",

  headline: "I build production AI systems.",
  headlineSub:
    "Multi-agent orchestration, agentic RAG, and the unglamorous reliability work underneath.",

  subline:
    "Engineer at Ember AI, shipping multi-agent and document-retrieval systems for legal tech and media — currently in production with paying users.",

  about: [
    "I'm a software engineer at Ember AI, building production AI systems for clients in legal tech and media. Most of my work is multi-agent orchestration and document-heavy retrieval — the kind of systems where a confident wrong answer costs someone real money.",
    "I work AI-first. Cursor and Claude Code are my primary implementation tools, and I write detailed specs as my unit of work rather than typing code directly. What that shifted isn't my speed — it's where the leverage sits. Architecture and data modeling matter more now, not less.",
    "Most of what I've built lives in private client repositories, which is why the one system I can show in full is open source, end to end — retrieval, evals, and the failing cases left in the report.",
  ],

  /** Short, factual capability lines for the about page. Not a skills bar. */
  focus: [
    {
      area: "Orchestration",
      body: "Staged multi-agent pipelines with typed handoffs — LangGraph, Pydantic schema contracts, explicit stage ordering over emergent agent chatter.",
    },
    {
      area: "Retrieval",
      body: "Hybrid search over document-heavy corpora — vector plus full-text merged with RRF, structure-aware chunking, evals that keep their failures visible.",
    },
    {
      area: "Infrastructure",
      body: "Async Python services, Celery/Redis job pipelines, multi-provider LLM abstraction with failover, and the cost engineering that makes it affordable.",
    },
  ],

  contact: {
    email: "zainasher42@gmail.com",
    github: "github.com/zainasher42",
    githubUrl: "https://github.com/zainasher42",
    linkedin: "/in/zain-asher-3960321b2",
    linkedinUrl: "https://www.linkedin.com/in/zain-asher-3960321b2",
    location: "Pakistan  ·  open to relocation",
    timezone: "UTC+5  ·  overlaps EU mornings, US early",
    timezoneShort: "UTC+5",
  },

  // The published PDF is the NDA-safe revision: clients are described as
  // "Ember AI client · under NDA" rather than named. Keep it that way when
  // replacing the file at public/zain-asher-resume.pdf.
  resumeUrl: "/zain-asher-resume.pdf" as string | null,
} as const;
