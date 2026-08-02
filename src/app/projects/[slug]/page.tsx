import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { projects, profile, type Project } from "@/lib/content";
import { SITE } from "@/lib/seo";
import { Tag, ProjectCover } from "@/components/ui";
import JsonLd from "@/components/JsonLd";

const statusColor: Record<Project["status"], string> = {
  Live: "text-accent-2 border-accent-2/40",
  "In progress": "text-amber-400 border-amber-400/40",
  "Case study": "text-accent border-accent/40",
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  const url = `${SITE.url}/projects/${project.slug}`;
  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: project.name,
      description: project.tagline,
      url,
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const url = `${SITE.url}/projects/${project.slug}`;

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    creator: { "@type": "Person", name: profile.name, url: SITE.url },
    url,
    ...(project.href ? { sameAs: [project.href] } : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${SITE.url}/projects`,
      },
      { "@type": "ListItem", position: 3, name: project.name, item: url },
    ],
  };

  return (
    <article className="mx-auto max-w-2xl px-5 py-20">
      <JsonLd data={creativeWorkJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Link href="/projects" className="text-sm text-muted hover:text-accent">
        ← All projects
      </Link>

      <div className="mt-6 flex items-center gap-3">
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs ${statusColor[project.status]}`}
        >
          {project.status}
        </span>
        {project.featured && (
          <span className="font-mono text-xs text-muted">featured</span>
        )}
      </div>

      <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {project.name}
      </h1>
      <p className="mt-2 text-lg text-accent-2">{project.tagline}</p>

      <div className="mt-6">
        <ProjectCover project={project} />
      </div>

      <div className="prose-post mt-8">
        <p>{project.description}</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      {project.href && (
        <div className="mt-8">
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-all hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-95"
          >
            Visit live site
            <ArrowUpRight size={16} />
          </a>
        </div>
      )}
    </article>
  );
}
