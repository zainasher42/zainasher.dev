/**
 * Generates every Open Graph card at build time into public/og/.
 *
 * The site targets `output: 'export'`, so next/og's ImageResponse route can't
 * be used — it needs a server runtime. These render the same design to static
 * PNGs via sharp instead, which also means zero cost at request time.
 *
 * Run: node scripts/generate-og.mjs  (wired into `npm run build`)
 */
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "og");
mkdirSync(outDir, { recursive: true });

const BG = "#080B14";
const E1 = "#0F1420";
const E2 = "#161D2E";
const LINE = "#2E3A52";
const INK = "#E8ECF4";
const DIM = "#96A1B8";
const MUTED = "#8492AA";
const PRIMARY = "#22D3EE";
const ACCENT = "#818CF8";

// Keep in sync with content/profile.ts domain.
const SITE = "zainasher-dev.vercel.app";

const MONO = "JetBrains Mono, DejaVu Sans Mono, monospace";
const SANS = "Instrument Sans, DejaVu Sans, sans-serif";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Greedy wrap at an approximate character width for the given font size. */
function wrap(text, size, maxWidth) {
  const perChar = size * 0.54;
  const max = Math.floor(maxWidth / perChar);
  const words = String(text).split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > max && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

/** The pipeline strip along the bottom — the site's visual signature. */
function stageStrip(y) {
  const names = ["SPINE", "RECORD", "PROOF", "THEORY", "THEMES", "ANALYSIS", "BRIEFS", "BLUEPRINT"];
  const w = 112;
  const gap = 13;
  const x0 = 80;
  return names
    .map((n, i) => {
      const x = x0 + i * (w + gap);
      const first = i === 0;
      return `
    <rect x="${x}" y="${y}" width="${w}" height="52" fill="${E2}" stroke="${first ? PRIMARY : LINE}" stroke-width="1" rx="2"/>
    <rect x="${x}" y="${y + 1}" width="2" height="50" fill="${first ? PRIMARY : ACCENT}"/>
    <text x="${x + w / 2}" y="${y + 31}" text-anchor="middle" fill="${DIM}"
          font-family="${MONO}" font-size="10.5" letter-spacing="0.6">${n}</text>
    ${i < names.length - 1 ? `<rect x="${x + w + gap / 2 - 2}" y="${y + 24}" width="4" height="4" fill="${PRIMARY}"/>` : ""}`;
    })
    .join("");
}

/**
 * One card. `chip` is the status/section label; `title` wraps to two lines.
 */
function card({ eyebrow, title, chip, chipTone = "primary", showStrip = true }) {
  const size = title.length > 34 ? 62 : 76;
  const lines = wrap(title, size, 1000).slice(0, 2);
  const startY = 232 - (lines.length - 1) * (size * 0.56);
  const tone = chipTone === "accent" ? ACCENT : PRIMARY;

  const chipEl = chip
    ? (() => {
        const w = chip.length * 10.2 + 34;
        return `
  <rect x="80" y="300" width="${w}" height="34" fill="none" stroke="${tone}" stroke-opacity="0.45" rx="2"/>
  <text x="${80 + w / 2}" y="322" text-anchor="middle" fill="${tone}" font-family="${MONO}"
        font-size="15" letter-spacing="1.6">${esc(chip)}</text>`;
      })()
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect x="0" y="0" width="6" height="630" fill="${PRIMARY}"/>

  <rect x="80" y="86" width="9" height="9" fill="${PRIMARY}"/>
  <text x="106" y="95" fill="${PRIMARY}" font-family="${MONO}" font-size="17" letter-spacing="2.2">${esc(
    eyebrow.toUpperCase(),
  )}</text>

  ${lines
    .map(
      (l, i) =>
        `<text x="80" y="${startY + i * (size * 1.12)}" fill="${INK}" font-family="${SANS}"
        font-size="${size}" font-weight="600" letter-spacing="-2">${esc(l)}</text>`,
    )
    .join("\n  ")}

  ${chipEl}

  <line x1="80" y1="428" x2="1120" y2="428" stroke="${LINE}" stroke-width="1"/>
  <text x="80" y="470" fill="${INK}" font-family="${MONO}" font-size="19" letter-spacing="1.4">ZAIN ASHER</text>
  <text x="1120" y="470" text-anchor="end" fill="${MUTED}" font-family="${MONO}" font-size="19" letter-spacing="1.4">${SITE}</text>

  ${showStrip ? stageStrip(508) : ""}
</svg>`;
}

// --- the set of cards -------------------------------------------------------
// Kept in sync by hand with content/projects.ts; a mismatch only affects the
// share card, never the page.
const cards = [
  {
    file: "default.png",
    eyebrow: "Available for work — remote or relocation",
    title: "I build production AI systems.",
    chip: null,
  },
  {
    file: "work.png",
    eyebrow: "Selected work",
    title: "Systems in production.",
    chip: "4 PROJECTS",
  },
  {
    file: "architecture.png",
    eyebrow: "Multi-agent litigation pipeline",
    title: "The barriers are the architecture.",
    chip: "76 AGENTS · 7 WAVES",
  },
  {
    file: "how-i-work.png",
    eyebrow: "How I work",
    title: "Specs first, code second.",
    chip: "CURSOR · CLAUDE CODE",
  },
  {
    file: "writing.png",
    eyebrow: "Writing",
    title: "Notes on building these systems.",
    chip: "7 POSTS",
  },
  {
    file: "about.png",
    eyebrow: "About",
    title: "How I work.",
    chip: "EMBER AI",
  },
  {
    file: "work-multi-agent-litigation-platform.png",
    eyebrow: "Selected work",
    title: "Multi-agent litigation platform",
    chip: "IN PRODUCTION · NDA",
    chipTone: "accent",
  },
  {
    file: "work-agentic-rag-legal-documents.png",
    eyebrow: "Selected work",
    title: "Agentic RAG for legal document analysis",
    chip: "IN PRODUCTION · NDA",
    chipTone: "accent",
  },
  {
    file: "work-ask-fastapi-docs.png",
    eyebrow: "Selected work",
    title: "Ask FastAPI Docs",
    chip: "OPEN SOURCE",
  },
  {
    file: "work-artie.png",
    eyebrow: "Selected work",
    title: "Artie",
    chip: "LIVE",
  },
];

for (const { file, ...spec } of cards) {
  await sharp(Buffer.from(card(spec))).png().toFile(join(outDir, file));
  console.log("wrote public/og/" + file);
}
