import Link from "next/link";
import { getAllCaseStudies } from "@/lib/case-studies";
import { formatDate } from "@/lib/blog";
import { SectionHeading, Tag, CoverImage } from "./ui";

export default function CaseStudies() {
  const studies = getAllCaseStudies().slice(0, 2);
  if (studies.length === 0) return null;

  return (
    <section className="border-t border-border/60 py-20">
      <div className="mx-auto max-w-content px-5">
        <div className="border-l-2 border-accent pl-5">
          <SectionHeading
            eyebrow="Deep dives"
            title="Case studies"
            sub="How specific systems got built — the problem, the decisions, and the outcome."
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {studies.map((s) => (
            <Link
              key={s.slug}
              href={`/case-study/${s.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50"
            >
              <CoverImage cover={s.cover} title={s.title} />
              <div className="font-mono text-xs text-muted">
                {formatDate(s.date)} · {s.client} · {s.readingMinutes} min read
              </div>
              <h3 className="mt-2 text-lg font-semibold group-hover:text-accent">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {s.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/case-study" className="text-sm text-accent hover:underline">
            View all case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
