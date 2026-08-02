import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/content";
import { Tag, ProjectCover } from "./ui";

const statusColor: Record<Project["status"], string> = {
  Live: "text-accent-2 border-accent-2/40",
  "In progress": "text-amber-400 border-amber-400/40",
  "Case study": "text-accent border-accent/40",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50"
    >
      <ProjectCover project={project} className="mb-4" />

      <div className="mb-4 flex items-center justify-between">
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs ${statusColor[project.status]}`}
        >
          {project.status}
        </span>
        {project.featured && (
          <span className="font-mono text-xs text-muted">featured</span>
        )}
      </div>

      <h3 className="flex items-center gap-1 text-lg font-semibold">
        {project.name}
        <ArrowRight
          size={16}
          className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </h3>
      <p className="mt-0.5 text-sm text-accent-2">{project.tagline}</p>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </Link>
  );
}
