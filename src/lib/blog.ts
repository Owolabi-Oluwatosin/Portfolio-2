import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { readingTime } from "./readingTime";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  cover?: string;
  draft?: boolean;
  tags: string[];
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        category: data.category ?? "general",
        excerpt: data.excerpt ?? "",
        cover: data.cover ?? undefined,
        draft: data.draft === true,
        tags: Array.isArray(data.tags) ? data.tags : [],
        readingMinutes: readingTime(content),
      };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const mdx = path.join(BLOG_DIR, `${slug}.mdx`);
  const md = path.join(BLOG_DIR, `${slug}.md`);
  const file = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null;
  if (!file) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    category: data.category ?? "general",
    excerpt: data.excerpt ?? "",
    cover: data.cover ?? undefined,
    draft: data.draft === true,
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingMinutes: readingTime(content),
    content,
  };
}

export { formatDate } from "./date";
