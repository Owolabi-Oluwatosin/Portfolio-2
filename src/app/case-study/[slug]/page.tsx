import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllCaseStudies, getCaseStudy } from "@/lib/case-studies";
import { formatDate } from "@/lib/blog";
import { profile } from "@/lib/content";
import { SITE } from "@/lib/seo";
import { Tag, CaseStudyCover } from "@/components/ui";
import JsonLd from "@/components/JsonLd";

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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    datePublished: study.date,
    dateModified: study.date,
    author: { "@type": "Person", name: profile.name, url: SITE.url },
    image: `${SITE.url}/case-study/${study.slug}/opengraph-image`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Studies",
        item: `${SITE.url}/case-study`,
      },
      { "@type": "ListItem", position: 3, name: study.title, item: url },
    ],
  };

  return (
    <article className="mx-auto max-w-2xl px-5 pb-20 pt-10">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
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
          <CaseStudyCover cover={study.cover} title={study.title} />
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
