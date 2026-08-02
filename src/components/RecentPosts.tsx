import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { SectionHeading } from "./ui";
import BlogPostCard from "./BlogPostCard";

export default function RecentPosts() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-content px-5">
        <div className="border-l-2 border-accent pl-5">
          <SectionHeading
            eyebrow="Writing"
            title="Recent posts"
            sub="Notes from the codebase — the bugs, the architecture calls, the lessons."
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogPostCard key={p.slug} post={p} />
          ))}
        </div>
        <div className="mt-8">
          <Link href="/blog" className="text-sm text-accent hover:underline">
            View all posts →
          </Link>
        </div>
      </div>
    </section>
  );
}
