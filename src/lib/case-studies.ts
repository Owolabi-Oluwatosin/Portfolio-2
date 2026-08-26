import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { readingTime } from "./readingTime";

const CASE_STUDY_DIR = path.join(process.cwd(), "content", "case-studies");

export type CaseStudyMeta = {
  slug: string;
  title: string;
  date: string;
  client: string;
  summary: string;
  tags: string[];
  cover?: string;
  readingMinutes: number;
};

export type CaseStudy = CaseStudyMeta & { content: string };

export function getAllCaseStudies(): CaseStudyMeta[] {
  if (!fs.existsSync(CASE_STUDY_DIR)) return [];
  return fs
    .readdirSync(CASE_STUDY_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(CASE_STUDY_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        client: data.client ?? "",
        summary: data.summary ?? "",
        tags: data.tags ?? [],
        cover: data.cover ?? undefined,
        readingMinutes: readingTime(content),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getCaseStudy(slug: string): CaseStudy | null {
  const mdx = path.join(CASE_STUDY_DIR, `${slug}.mdx`);
  const md = path.join(CASE_STUDY_DIR, `${slug}.md`);
  const file = fs.existsSync(mdx) ? mdx : fs.existsSync(md) ? md : null;
  if (!file) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    client: data.client ?? "",
    summary: data.summary ?? "",
    tags: data.tags ?? [],
    cover: data.cover ?? undefined,
    readingMinutes: readingTime(content),
    content,
  };
}
