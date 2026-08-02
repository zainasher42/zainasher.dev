export type ProjectStatus = "LIVE" | "IN PRODUCTION · NDA" | "OPEN SOURCE";

export interface ProjectSection {
  heading: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  /** One-line positioning, used on cards and as the detail-page lede. */
  tagline: string;
  status: ProjectStatus;
  /** Chronology label for the index rail. */
  period: string;
  problem: string;
  substance: string;
  metrics: { value: string; label: string }[];
  stack: string[];
  link?: { label: string; href: string };
  noLinkNote?: string;
  /** Long-form detail, shown only on the project page. */
  detail: ProjectSection[];
  /** Featured projects surface on the home page. */
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "multi-agent-litigation-platform",
    title: "Multi-agent litigation platform",
    tagline:
      "~40 specialized LLM agents composed into staged synthesis pipelines.",
    status: "IN PRODUCTION · NDA",
    period: "2026",
    problem:
      "Litigation teams spend enormous associate hours on work product that's high-volume but structurally repetitive. The bottleneck isn't legal judgment — it's the mechanical work between judgments.",
    substance:
      "~40 specialized LLM agents composed into seven staged synthesis pipelines via LangGraph — foundation, discovery, motion practice, hearing prep, deposition, experts, final strategy. Multi-provider abstraction across Claude, Gemini, and OpenAI with automatic failover. Every handoff between stages is a Pydantic-validated schema with explicit status enums and mandatory evidence citations, which is what makes ~40 agents agree with each other.",
    metrics: [
      { value: "~60%", label: "reduction in token spend" },
      { value: "~40", label: "specialized agents" },
      { value: "Live", label: "in production with paying users" },
    ],
    stack: [
      "FastAPI",
      "LangGraph",
      "Claude",
      "Gemini",
      "OpenAI",
      "Pinecone",
      "PostgreSQL",
      "SQLAlchemy 2.0 async",
      "Celery",
      "Redis",
      "Next.js",
    ],
    noLinkNote: "Architecture walkthrough available on request",
    featured: true,
    detail: [
      {
        heading: "The contract is the architecture",
        body: "Every handoff between stages is a Pydantic-validated schema with explicit status enums and mandatory evidence citations. Agents cannot pass prose to each other — only typed payloads that fail loudly when a field is missing or a citation is absent. This is what makes ~40 agents agree with each other: the validation boundary catches disagreement at the seam rather than letting it compound downstream.",
      },
      {
        heading: "Staged synthesis, not a swarm",
        body: "The pipeline runs as seven ordered stages via LangGraph rather than as freely-communicating agents. Each stage consumes the previous stage's typed output and emits its own. Ordering is explicit, so a failure is attributable to a stage rather than to an emergent interaction, and any stage can be re-run in isolation against a stored payload.",
      },
      {
        heading: "Provider abstraction and failover",
        body: "Each stage routes across Claude, Gemini, and OpenAI behind a single interface, with automatic failover when a provider errors or times out. Model choice is a per-stage configuration concern rather than something baked into agent code, which makes it cheap to move a stage to a different model when its evaluation numbers justify it.",
      },
      {
        heading: "Cost engineering",
        body: "Shared case context is cached with a stable prefix and memoized per session rather than re-read per agent. With ~40 agents touching overlapping context, naive re-reading dominated spend; prefix caching and session memoization cut roughly 60% of token cost without changing any output.",
      },
    ],
  },
  {
    slug: "agentic-rag-legal-documents",
    title: "Agentic RAG for legal document analysis",
    tagline:
      "Hybrid retrieval and cross-document inference over venture-financing deal documents.",
    status: "IN PRODUCTION · NDA",
    period: "2026",
    // NDA: "venture-financing deal documents" is the ceiling of specificity.
    // No document types, no clause names, nothing identifying the practice area.
    problem:
      "Venture-financing deal documents need structured extraction and cross-document analysis that keyword search can't do and pure vector search gets wrong.",
    substance:
      "Hybrid retrieval combining LLM-generated queries with curated seed queries per question type. Gemini for vision-based OCR on scanned pages, Claude for legal reasoning. ~20 single-responsibility services handling chunking, exhibit splitting, and cross-document inference.",
    metrics: [
      { value: "~20", label: "single-responsibility services" },
      { value: "Page-level", label: "summarization at index time" },
    ],
    stack: [
      "FastAPI",
      "Pinecone",
      "Claude",
      "Gemini",
      "MongoDB",
      "Celery",
      "GCP Storage",
      "Next.js",
    ],
    noLinkNote: "Architecture walkthrough available on request",
    featured: true,
    detail: [
      {
        heading: "Why pure vector search fails here",
        body: "Deal documents are full of near-identical boilerplate that embeds to nearly the same vector. A query about a specific negotiated term retrieves dozens of chunks that all look alike, and the one carrying the actual term is not reliably among the top results. Retrieval has to combine semantic search with query patterns that know what the relevant clause structurally looks like.",
      },
      {
        heading: "Hybrid retrieval with curated seeds",
        body: "Each question type carries a set of curated seed queries alongside LLM-generated ones. The seeds encode what an experienced reader would go looking for; the generated queries adapt to the specific document set. Merging both consistently beats either alone, particularly on documents where the relevant clause uses non-standard language.",
      },
      {
        heading: "Vision OCR for scanned exhibits",
        body: "A significant share of deal documents arrive as scans, often with handwritten annotations and signature pages that matter. Gemini handles vision-based OCR on those pages, with exhibit splitting to separate a single scanned bundle into individually addressable documents before indexing.",
      },
      {
        heading: "Page-level summarization at index time",
        body: "Every page gets summarized when it is indexed rather than at query time. This front-loads the cost once per document instead of paying it on every retrieval, and gives the retrieval layer a compact, self-describing representation to match against alongside raw chunks.",
      },
    ],
  },
  {
    slug: "ask-fastapi-docs",
    title: "Ask FastAPI Docs",
    tagline:
      "A public RAG system built to show the parts most demos skip.",
    status: "OPEN SOURCE",
    period: "2025",
    problem:
      "Most public RAG demos prove that a framework works on a toy dataset. They skip the parts that decide whether a real system holds up.",
    substance:
      "Hybrid retrieval (vector + PostgreSQL full-text, merged via Reciprocal Rank Fusion). Structure-aware chunking that splits on headings and prepends section paths so every chunk is self-describing. XML-structured prompts built around caching boundaries. SSE streaming with a typed event bus. A golden-set eval suite where failing cases stay in the report rather than being tuned away.",
    metrics: [
      { value: "94%", label: "pass rate across 18 eval pairs" },
      { value: "~$0.05", label: "to ingest the full corpus" },
    ],
    stack: ["Python", "FastAPI", "PostgreSQL + pgvector", "Next.js", "OpenAI"],
    link: {
      label: "github.com/zainasher42/fastapi-docs-rag",
      href: "https://github.com/zainasher42/fastapi-docs-rag",
    },
    featured: true,
    detail: [
      {
        heading: "Reciprocal Rank Fusion over two retrievers",
        body: "Vector search and PostgreSQL full-text search each fail in a different direction: embeddings miss exact identifiers and API symbol names, full-text misses paraphrase. RRF merges both ranked lists without needing a tuned weight between them, which matters because the right weight differs per query and there is no principled way to pick one globally.",
      },
      {
        heading: "Structure-aware chunking",
        body: "Chunks split on heading boundaries and carry their section path as a prefix, so every chunk is self-describing. A chunk that reads 'Dependencies > Sub-dependencies > Caching' before its content retrieves correctly for queries about caching in a way that a bare paragraph of prose does not.",
      },
      {
        heading: "Prompts built around caching boundaries",
        body: "Prompts are XML-structured with the stable content first and the volatile content last, so the cacheable prefix stays byte-identical across requests. Structuring for the cache boundary rather than for readability is what brings ingest cost down to roughly five cents for the full corpus.",
      },
      {
        heading: "Evals where failures stay visible",
        body: "The golden-set suite covers 18 question/answer pairs and currently passes 94%. The failing cases stay in the report rather than being tuned away or removed from the set. A suite that always passes measures nothing; the value is in watching which cases break when retrieval changes.",
      },
    ],
  },
  {
    slug: "artie",
    title: "Artie",
    tagline: "Full-stack AI product for media planning and brand matching.",
    status: "LIVE",
    period: "2025",
    problem:
      "Media planning and brand matching, with AI doing the analysis rather than a spreadsheet.",
    substance:
      "Full-stack AI product built end to end. Async FastAPI backend with Celery/Redis workers, multi-LLM layer with automatic OpenAI/Gemini fallback, SSE streaming to the UI, React 18 SPA on AWS Amplify.",
    metrics: [{ value: "Live", label: "with real users" }],
    stack: [
      "FastAPI",
      "MongoDB",
      "Celery",
      "Redis",
      "OpenAI",
      "Gemini",
      "React 18",
      "Vite",
      "AWS Amplify",
    ],
    link: { label: "artie.co", href: "https://artie.co" },
    featured: false,
    detail: [
      {
        heading: "Built end to end",
        body: "Backend, LLM layer, and frontend, shipped as one product. An async FastAPI service handles request orchestration, with Celery and Redis carrying the long-running analysis work off the request path so the UI stays responsive while jobs run.",
      },
      {
        heading: "Multi-LLM with automatic fallback",
        body: "The model layer routes across OpenAI and Gemini with automatic fallback on error or timeout. For a live product, provider availability is an operational concern rather than a design-time choice, so failover is built into the abstraction rather than handled per call site.",
      },
      {
        heading: "Streaming to the interface",
        body: "Analysis streams to the React SPA over SSE, so users see partial results as they are produced instead of waiting on a spinner for a complete response. The client is a React 18 SPA built with Vite and deployed on AWS Amplify.",
      },
    ],
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const featuredProjects = projects.filter((p) => p.featured);
