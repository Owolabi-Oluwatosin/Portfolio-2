import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllCaseStudies, getCaseStudy } from "@/lib/case-studies";
import { formatDate } from "@/lib/blog";
import { profile } from "@/lib/content";
import { SITE } from "@/lib/seo";
import { Tag, CoverImage } from "@/components/ui";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/ArticleJsonLd";

export function generateStaticParams() {
  return getAllCaseStudies().map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  const url = `${SITE.url}/case-study/${study.slug}`;
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: url },
    authors: [{ name: profile.name, url: SITE.url }],
    openGraph: {
      type: "article",
      title: study.title,
      description: study.summary,
      url,
      publishedTime: study.date,
      authors: [SITE.url],
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const url = `${SITE.url}/case-study/${study.slug}`;

  return (
    <article className="mx-auto max-w-2xl px-5 pb-20 pt-10">
      <ArticleJsonLd
        type="Article"
        url={url}
        headline={study.title}
        description={study.summary}
        datePublished={study.date}
        authorName={profile.name}
        authorUrl={SITE.url}
        image={`${SITE.url}/case-study/${study.slug}/opengraph-image`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE.url },
          { name: "Case Studies", item: `${SITE.url}/case-study` },
          { name: study.title, item: url },
        ]}
      />
      <Link href="/case-study" className="text-sm text-muted hover:text-accent">
        ← All case studies
      </Link>
      <div className="mt-6 font-mono text-xs text-muted">
        {formatDate(study.date)} · {study.client} · {study.readingMinutes} min read
      </div>
      <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {study.title}
      </h1>
      {study.cover && (
        <div className="mt-6">
          <CoverImage cover={study.cover} title={study.title} />
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {study.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <div className="prose-post mt-8">
        <MDXRemote source={study.content} />
      </div>
    </article>
  );
}
