import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Production AI systems: multi-agent litigation pipelines, agentic RAG over legal documents, open-source retrieval, and full-stack AI products.",
  alternates: { canonical: "/work" },
  openGraph: { images: ["/og/work.png"] },
  twitter: { images: ["/og/work.png"] },
};

export default function WorkIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title="Systems in production."
        lede="Four projects. Two are under client NDA, described by architecture rather than by name. The other two you can open and read."
      />

      <div className="container-edge py-14 md:py-20">
        <ul className="flex flex-col gap-4">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              headingLevel="h2"
            />
          ))}
        </ul>
      </div>
    </>
  );
}
