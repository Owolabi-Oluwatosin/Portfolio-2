import type { Metadata } from "next";
import { projects } from "@/lib/content";
import ProjectCard from "@/components/ProjectCard";
import { SectionHeading } from "@/components/ui";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Production platforms and systems I've built and shipped — real-time betting infrastructure, fintech payments, health apps, and internal tooling.",
  alternates: { canonical: `${SITE.url}/projects` },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-content px-5 pb-20 pt-10">
      <div className="border-l-2 border-accent pl-5">
        <SectionHeading
          eyebrow="Portfolio"
          title="All projects"
          sub="Everything from real-time betting infrastructure to health apps and internal tooling."
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
