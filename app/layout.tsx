import type { Metadata } from "next";
import { Instrument_Sans, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { profile } from "@/content/profile";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
  // Only the weights the design uses, so no byte is downloaded unused.
  weight: ["500", "600"],
  // Carries the h1 — the LCP element. Preloaded so the headline doesn't
  // repaint when the face arrives.
  preload: true,
  adjustFontFallback: true,
});

// All three faces preload. Measured: withholding preload from body/mono to
// prioritise the display face pushed FCP 0.8s -> 1.4s and CLS 0 -> 0.005,
// because the fold uses all three. Keep them together.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  adjustFontFallback: true,
});

const title = `${profile.name} — ${profile.role}`;
const description =
  "Software engineer building production AI systems: multi-agent orchestration, agentic RAG, and the reliability work underneath.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description,
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  keywords: [
    "AI engineer",
    "multi-agent systems",
    "agentic RAG",
    "LLM infrastructure",
    "LangGraph",
    "FastAPI",
    profile.name,
  ],
  openGraph: {
    type: "website",
    url: profile.siteUrl,
    siteName: profile.domain,
    title,
    description,
    locale: "en_US",
    images: [
      {
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og/default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/** JSON-LD Person schema. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.siteUrl,
  jobTitle: profile.role,
  worksFor: { "@type": "Organization", name: profile.company },
  email: `mailto:${profile.contact.email}`,
  sameAs: [profile.contact.githubUrl, profile.contact.linkedinUrl],
  knowsAbout: [
    "Multi-agent LLM systems",
    "Retrieval-augmented generation",
    "LLM infrastructure",
    "Python",
    "TypeScript",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-bg text-ink">
        <a href="#main" className="skip-link label-mono">
          Skip to content
        </a>
        <SiteNav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        {/* Cookieless page-level analytics: no consent flow required, and it
            works on a static export. Referrer data is the point — this URL
            goes into cold outreach and applications. */}
        <Analytics />
      </body>
    </html>
  );
}
