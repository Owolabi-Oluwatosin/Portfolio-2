import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { SectionHeading } from "@/components/ui";
import BlogPostCard from "@/components/BlogPostCard";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering notes, architecture decisions, and the occasional post-mortem from production systems.",
  alternates: { canonical: `${SITE.url}/blog` },
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-content px-5 pb-20 pt-10">
      <div className="border-l-2 border-accent pl-5">
        <SectionHeading
          eyebrow="Writing"
          title="Blog"
          sub="Engineering notes, architecture decisions, and the occasional post-mortem."
        />
      </div>
      {posts.length === 0 ? (
        <p className="text-muted">No posts yet — drop an .mdx file in /content/blog.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogPostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
