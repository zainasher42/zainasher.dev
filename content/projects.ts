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
      "76 specialized LLM agents compiled into a seven-wave DAG with hard barriers between waves.",
    status: "IN PRODUCTION · NDA",
    period: "2026",
    problem:
      "Litigation teams spend enormous associate hours on work product that's high-volume but structurally repetitive. The bottleneck isn't legal judgment — it's the mechanical work between judgments.",
    substance:
      "76 specialized LLM agents compiled to LangGraph state graphs over typed state, composed into a seven-wave DAG in which waves act as hard barriers. Multi-provider abstraction across Claude, Gemini, and OpenAI with automatic failover. Retrieval ran on Pinecone before migrating to pgvector co-located in the primary Postgres, preserving the service interface so 32+ call sites were untouched.",
    metrics: [
      { value: "76", label: "specialized agents" },
      { value: "25", label: "concurrent steps at the widest wave" },
      { value: "~60%", label: "reduction in token spend" },
    ],
    stack: [
      "FastAPI",
      "LangGraph",
      "Claude",
      "Gemini",
      "OpenAI",
      "Pinecone \u2192 PostgreSQL + pgvector",
      "Bedrock Titan Embed V2",
      "SQLAlchemy 2.0 async",
      "Celery",
      "Redis",
      "ECS Fargate",
      "Terraform",
      "Next.js",
    ],
    noLinkNote: "Architecture walkthrough available on request",
    featured: true,
    detail: [
      {
        heading: "Waves as hard barriers",
        body: "The pipeline runs as a seven-wave DAG rather than freely-communicating agents. Steps inside a wave execute concurrently; wave N starts only once every step in N\u22121 has finished, by success, skip, or failure. That barrier is what keeps 76 agents consistent \u2014 no agent ever reads half-built upstream state, and a failure is attributable to a step rather than to an emergent interaction.",
      },
      {
        heading: "The shape is an hourglass",
        body: "Single-step waves at the start gate a 25-step fan-out in the middle. Those bottlenecks are the highest-leverage failures in the system: everything downstream inherits their output. It also means the widest wave\u2019s concurrency is in-process \u2014 asyncio.gather inside one container \u2014 so throughput scales with provider concurrency limits rather than with infrastructure.",
      },
      {
        heading: "What makes it agentic, not just RAG",
        body: "46 of the 76 agents run a bounded loop. A plan node has the model author its own queries and decide whether to search at all; a validate node then judges whether coverage is sufficient and can re-enter retrieval with new queries, capped so it terminates. The other 30 never touch the vector store \u2014 their evidence is upstream analysis output, which is correct for them.",
      },
      {
        heading: "Pinecone, then pgvector",
        body: "Retrieval shipped first on Pinecone \u2014 managed index, semaphore-bounded async calls, and a per-vector metadata ceiling to work around. It now runs on pgvector co-located in the primary Postgres, with Bedrock Titan Embed V2 pinned to 1024 dimensions so the index never has to migrate. Co-location is the payoff: an agent joins semantic hits against relational facts without crossing a service boundary or reconciling two consistency models. The migration preserved the service interface so 32+ call sites were untouched \u2014 at the cost of a class still named after the thing it no longer is.",
      },
      {
        heading: "Cost engineering",
        body: "Prompt assembly sorts cache-stable sections first and attaches cache-control markers; variable sections follow uncached. Shared case context is prefetched and memoized per session rather than re-read per agent, and cooperative cancellation checks between retries and streaming events give sub-second abort. With dozens of agents in a chain sharing one case dossier, that ordering is what makes a full run affordable: roughly 60% less token spend than the first working version.",
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
