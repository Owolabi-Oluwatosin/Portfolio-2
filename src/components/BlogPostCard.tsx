import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/blog";
import { Tag } from "@/components/ui";

export default function BlogPostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1 hover:border-accent/50"
    >
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-bg p-4">
        {post.cover ? (
          <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-105">
            <Image
              src={post.cover}
              alt={`${post.title} cover image`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/25 to-accent-2/25 p-6 text-center">
            <span className="line-clamp-3 font-semibold text-fg/70">
              {post.title}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-accent">
            {post.category}
          </span>
          <span className="font-mono text-xs text-muted">
            {post.updated && post.updated !== post.date
              ? `Updated ${formatDate(post.updated)}`
              : formatDate(post.date)}
            {" · "}
            {post.readingMinutes} min read
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
