# zainasher.dev

Personal engineering portfolio. Static Next.js site, no server runtime.

## Stack

- **Next.js 16** (App Router) + **TypeScript** strict
- **Tailwind CSS v4** — CSS-first `@theme` in `app/globals.css`, no `tailwind.config.ts`
- **`output: 'export'`** — fully static; no API routes, no database, no environment variables
- **Vercel Analytics** — cookieless, no consent flow
- Animation is CSS keyframes plus one `IntersectionObserver`; no animation library

Runtime dependencies: `next`, `react`, `react-dom`, `@vercel/analytics`.

## Commands

```bash
npm run dev     # dev server
npm run build   # generates OG cards, then builds the static export to out/
npm run lint    # eslint
npx tsc --noEmit
npx serve out   # preview the production build ('next start' does not work with output: export)
```

`npm run build` runs `scripts/generate-og.mjs` first, which renders every Open
Graph card to `public/og/` via sharp. `next/og` is not used because its
`ImageResponse` route needs a server runtime, which `output: 'export'` rules out.

## Content

All copy lives in typed objects under `content/` so it can be edited without
touching components:

| File | Contents |
|---|---|
| `profile.ts` | identity, availability, about copy, focus areas, contact, `resumeUrl` |
| `projects.ts` | four projects — slug, status, period, metrics, stack, long-form detail |
| `writing.ts` | published LinkedIn posts, ISO-dated, newest first |
| `pipeline.ts` | pipeline stages, typed handoff contracts, annotations, a11y description |
| `workflow.ts` | the AI-first workflow page |

Adding a project to `projects.ts` generates its route via `generateStaticParams`.
Add a matching entry to the `cards` array in `scripts/generate-og.mjs` so it gets
its own share image.

## Two standing constraints

**NDA.** Two projects are under client NDA. Describe architecture only — never
name the client, never link to code, never quote client data. "Venture-financing
deal documents" is the ceiling of specificity for the document-analysis project;
no document types, no clause names. This applies to the pipeline diagram as much
as to the prose. The published résumé at `public/zain-asher-resume.pdf` is the
NDA-safe revision; keep it that way when replacing the file.

**Every number must be defensible.** Each figure traces to a source: `94% / 18
eval pairs` and `~$0.05` to the fastapi-docs-rag README, the rest to the résumé.
Do not add a metric the content does not support, and do not invent a breakdown
of a real total — the pipeline diagram deliberately shows no per-stage agent
counts for that reason.

## Deploy

Vercel, static export from `out/`. Production domain `zainasher.dev`.
Analytics reports once deployed; the `/_vercel/insights/script.js` request 404s
locally, which is expected.
