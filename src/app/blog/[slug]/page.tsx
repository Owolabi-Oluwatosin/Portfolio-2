import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import { getAllPosts, getPost, formatDate } from "@/lib/blog";
import { profile } from "@/lib/content";
import { SITE } from "@/lib/seo";
import { stripMarkdown } from "@/lib/excerpt";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/ArticleJsonLd";
import { CoverImage, Tag } from "@/components/ui";
import PostAudioPlayer from "@/components/PostAudioPlayer";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

// Drafts are excluded from getAllPosts(); block on-demand rendering of any
// slug outside that set so an unpublished draft can never be reached by URL.
export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  const url = `${SITE.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    authors: [{ name: profile.name, url: SITE.url }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      authors: [SITE.url],
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const url = `${SITE.url}/blog/${post.slug}`;
  const spokenText = `${post.title}. ${stripMarkdown(post.content)}`;

  return (
    <article className="mx-auto max-w-2xl px-5 pb-20 pt-10">
      <ArticleJsonLd
        type="BlogPosting"
        url={url}
        headline={post.title}
        description={post.excerpt}
        datePublished={post.date}
        authorName={profile.name}
        authorUrl={SITE.url}
        image={`${SITE.url}/blog/${post.slug}/opengraph-image`}
        keywords={post.tags}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: SITE.url },
          { name: "Blog", item: `${SITE.url}/blog` },
          { name: post.title, item: url },
        ]}
      />
      <Link href="/blog" className="text-sm text-muted hover:text-accent">
        ← All posts
      </Link>
      <div className="mt-6 font-mono text-xs text-muted">
        {formatDate(post.date)} · {post.category} · {post.readingMinutes} min read
      </div>
      <h1 className="mt-2 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {post.title}
      </h1>
      {post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      )}
      <PostAudioPlayer text={spokenText} />
      {post.cover && (
        <div className="mt-6">
          <CoverImage cover={post.cover} title={post.title} />
        </div>
      )}
      <div className="prose-post mt-8">
        <MDXRemote
          source={post.content}
          options={{ mdxOptions: { rehypePlugins: [[rehypeHighlight, { detect: true }]] } }}
        />
      </div>
    </article>
  );
}
