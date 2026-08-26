"use client";

// Client-side GitHub Contents API wrapper for the blog admin panel.
// Every call here goes straight from the browser to api.github.com using a
// token the admin pastes in for the session — there is no server of ours in
// this path. Each successful write is a real commit to `main`; Vercel's
// GitHub integration picks it up and redeploys.

import matter from "gray-matter";

const OWNER = "Owolabi-Oluwatosin";
const REPO = "Portfolio-2";
const BRANCH = "main";
const BLOG_DIR = "content/blog";
const IMAGE_DIR = "public/images/blog";

// GitHub's Contents API (the one this whole file uses) rejects files much
// past 1MB — larger files need the separate Git Data/blobs API, which is out
// of scope here. Enforced client-side so uploads fail with a clear message
// instead of a raw 422 from GitHub.
export const MAX_IMAGE_BYTES = 1_000_000;

const API_BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;

export type RemotePostMeta = {
  slug: string;
  path: string;
  sha: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  cover?: string;
  draft: boolean;
};

export type RemotePost = RemotePostMeta & { body: string };

export class GitHubContentError extends Error {}

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
}

async function readError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    return data.message || `GitHub API error (${res.status})`;
  } catch {
    return `GitHub API error (${res.status})`;
  }
}

// Confirms the token can read this repo's contents. Throws with a readable
// message on failure so the gate can show it, rather than silently unlocking.
export async function validateToken(token: string): Promise<void> {
  const res = await fetch(`${API_BASE}`, { headers: headers(token) });
  if (!res.ok) {
    if (res.status === 401) throw new GitHubContentError("Invalid or expired token.");
    if (res.status === 404)
      throw new GitHubContentError(
        "Token doesn't have access to this repo (check the fine-grained PAT's repo scope)."
      );
    throw new GitHubContentError(await readError(res));
  }
}

function decodeBase64(content: string): string {
  // GitHub returns base64 content, possibly with embedded newlines.
  return decodeURIComponent(escape(atob(content.replace(/\n/g, ""))));
}

function encodeBase64(content: string): string {
  return btoa(unescape(encodeURIComponent(content)));
}

// Text-safe encoding (above) mangles arbitrary bytes, so binary uploads
// (images) go through this byte-for-byte version instead.
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000; // avoid blowing the call stack on String.fromCharCode(...bytes)
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function sanitizeFileName(name: string): string {
  const dot = name.lastIndexOf(".");
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const ext = dot > 0 ? name.slice(dot).toLowerCase().replace(/[^a-z0-9.]/g, "") : "";
  return `${base || "image"}${ext}`;
}

function toMeta(slug: string, path: string, sha: string, data: Record<string, unknown>): RemotePostMeta {
  return {
    slug,
    path,
    sha,
    title: (data.title as string) ?? slug,
    date: (data.date as string) ?? "",
    category: (data.category as string) ?? "general",
    excerpt: (data.excerpt as string) ?? "",
    cover: (data.cover as string) ?? undefined,
    draft: data.draft === true,
  };
}

export async function listPosts(token: string): Promise<RemotePostMeta[]> {
  const res = await fetch(`${API_BASE}/contents/${BLOG_DIR}?ref=${BRANCH}`, {
    headers: headers(token),
  });

  if (res.status === 404) return []; // no posts directory yet
  if (!res.ok) throw new GitHubContentError(await readError(res));

  const entries: { name: string; path: string; sha: string; type: string }[] = await res.json();
  const files = entries.filter((e) => e.type === "file" && /\.mdx?$/.test(e.name));

  const posts = await Promise.all(
    files.map(async (file) => {
      const post = await getPost(token, file.path);
      return toMeta(file.name.replace(/\.mdx?$/, ""), file.path, post.sha, matter(post.body).data);
    })
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(token: string, path: string): Promise<{ body: string; sha: string }> {
  const res = await fetch(`${API_BASE}/contents/${path}?ref=${BRANCH}`, {
    headers: headers(token),
  });
  if (!res.ok) throw new GitHubContentError(await readError(res));
  const data = await res.json();
  return { body: decodeBase64(data.content), sha: data.sha };
}

export function parsePost(raw: string): { data: Record<string, unknown>; content: string } {
  const { data, content } = matter(raw);
  return { data, content };
}

export function serializePost(data: Record<string, unknown>, content: string): string {
  return matter.stringify(content, data);
}

export function pathForSlug(slug: string): string {
  return `${BLOG_DIR}/${slug}.mdx`;
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// sha: omit for a brand-new file, pass the current sha when updating one.
export async function putPost(
  token: string,
  path: string,
  raw: string,
  message: string,
  sha?: string
): Promise<{ sha: string }> {
  const res = await fetch(`${API_BASE}/contents/${path}`, {
    method: "PUT",
    headers: headers(token),
    body: JSON.stringify({
      message,
      content: encodeBase64(raw),
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!res.ok) {
    if (res.status === 409)
      throw new GitHubContentError("File changed elsewhere since you loaded it. Reload and retry.");
    throw new GitHubContentError(await readError(res));
  }

  const data = await res.json();
  return { sha: data.content.sha };
}

// Commits an image file to public/images/blog/<slug>/<timestamp>-<name> and
// returns the site-relative URL it'll be servable at once Vercel redeploys.
export async function uploadImage(
  token: string,
  file: File,
  slug: string
): Promise<{ url: string; path: string }> {
  if (file.size > MAX_IMAGE_BYTES) {
    throw new GitHubContentError(
      `"${file.name}" is ${(file.size / 1_000_000).toFixed(1)}MB — compress it below 1MB and try again.`
    );
  }

  const buffer = await file.arrayBuffer();
  const folder = slug || "uploads";
  const fileName = `${Date.now()}-${sanitizeFileName(file.name)}`;
  const path = `${IMAGE_DIR}/${folder}/${fileName}`;

  const res = await fetch(`${API_BASE}/contents/${path}`, {
    method: "PUT",
    headers: headers(token),
    body: JSON.stringify({
      message: `Add image ${fileName}`,
      content: arrayBufferToBase64(buffer),
      branch: BRANCH,
    }),
  });

  if (!res.ok) throw new GitHubContentError(await readError(res));

  return { url: `/images/blog/${folder}/${fileName}`, path };
}

export async function deletePost(
  token: string,
  path: string,
  sha: string,
  message: string
): Promise<void> {
  const res = await fetch(`${API_BASE}/contents/${path}`, {
    method: "DELETE",
    headers: headers(token),
    body: JSON.stringify({ message, sha, branch: BRANCH }),
  });
  if (!res.ok) throw new GitHubContentError(await readError(res));
}
