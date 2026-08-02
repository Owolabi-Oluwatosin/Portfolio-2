import Link from "next/link";
import { projects } from "@/lib/content";
import ProjectCard from "./ProjectCard";
import { SectionHeading } from "./ui";

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  return (
    <section className="py-20">
      <div className="mx-auto max-w-content px-5">
        <div className="border-l-2 border-accent pl-5">
          <SectionHeading
            eyebrow="Selected work"
            title="Featured projects"
            sub="Production platforms I've built and shipped — most of them handling real users or real money."
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className="mt-8">
          <Link href="/projects" className="text-sm text-accent hover:underline">
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
