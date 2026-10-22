"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getPost,
  putPost,
  parsePost,
  serializePost,
  slugify,
  pathForSlug,
  GitHubContentError,
} from "@/lib/githubContent";
import { getStoredToken } from "@/lib/adminSession";

export default function EditorPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-5 pt-16 text-sm text-muted">Loading…</div>}>
      <Editor />
    </Suspense>
  );
}

function Editor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editPath = searchParams.get("path");
  const isEditMode = Boolean(editPath);

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ text: string; commitUrl?: string } | null>(null);
  const [sha, setSha] = useState<string | undefined>(undefined);

  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState("general");
  const [excerpt, setExcerpt] = useState("");
  const [cover, setCover] = useState("");
  const [draft, setDraft] = useState(true);
  const [content, setContent] = useState("");
  const [commitMessage, setCommitMessage] = useState("");
  const [tab, setTab] = useState<"write" | "preview">("write");

  useEffect(() => {
    const stored = getStoredToken();
    setToken(stored);
    if (!stored || !editPath) return;

    (async () => {
      try {
        const { body, sha: fileSha } = await getPost(stored, editPath);
        const { data, content: mdxBody } = parsePost(body);
        setSlug(editPath.split("/").pop()!.replace(/\.mdx?$/, ""));
        setTitle((data.title as string) ?? "");
        setDate((data.date as string) ?? new Date().toISOString().slice(0, 10));
        setCategory((data.category as string) ?? "general");
        setExcerpt((data.excerpt as string) ?? "");
        setCover((data.cover as string) ?? "");
        setDraft(data.draft === true);
        setContent(mdxBody);
        setSha(fileSha);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post.");
      } finally {
        setLoading(false);
      }
    })();
  }, [editPath]);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!isEditMode) setSlug(slugify(value));
  }

  async function handleSave() {
    if (!token) return;
    if (!slug || !title) {
      setError("Title (and slug) are required.");
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const data = {
        title,
        date,
        category,
        excerpt,
        ...(cover ? { cover } : {}),
        draft,
      };
      const raw = serializePost(data, content);
      const path = editPath ?? pathForSlug(slug);
      const result = await putPost(
        token,
        path,
        raw,
        commitMessage || `${isEditMode ? "Update" : "Add"} ${slug}`,
        sha
      );
      setSha(result.sha);
      setCommitMessage("");
      setSuccess({ text: "Committed to GitHub. Site will rebuild in ~1-2 min." });
      if (!isEditMode) router.replace(`/admin/editor?path=${encodeURIComponent(path)}`);
    } catch (err) {
      setError(err instanceof GitHubContentError ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  if (!token) {
    return (
      <div className="mx-auto max-w-md px-5 pb-20 pt-16">
        <p className="text-sm text-muted">Not authenticated.</p>
        <Link href="/admin" className="mt-2 inline-block text-sm text-accent">
          Go to admin login →
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="mx-auto max-w-3xl px-5 pt-16 text-sm text-muted">Loading post…</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-16">
      <Link href="/admin" className="text-sm text-muted hover:text-accent">
        ← Back to admin
      </Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">
        {isEditMode ? "Edit post" : "New post"}
      </h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
          Title
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="rounded-lg border border-border bg-surface px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          Slug
          <input
            value={slug}
            onChange={(e) => setSlug(slugify(e.target.value))}
            disabled={isEditMode}
            className="rounded-lg border border-border bg-surface px-3 py-2 font-mono text-xs disabled:opacity-60"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-border bg-surface px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          Category
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-border bg-surface px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          Cover image URL
          <input
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            placeholder="/images/blog/..."
            className="rounded-lg border border-border bg-surface px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
          Excerpt
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="rounded-lg border border-border bg-surface px-3 py-2"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={draft} onChange={(e) => setDraft(e.target.checked)} />
          Draft (hidden from the public site)
        </label>
      </div>

      <div className="mt-6">
        <div className="flex gap-2 border-b border-border">
          <button
            type="button"
            onClick={() => setTab("write")}
            className={`px-3 py-2 text-sm ${tab === "write" ? "border-b-2 border-accent text-fg" : "text-muted"}`}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={`px-3 py-2 text-sm ${tab === "preview" ? "border-b-2 border-accent text-fg" : "text-muted"}`}
          >
            Preview
          </button>
        </div>
        {tab === "write" ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            spellCheck={false}
            placeholder="Write your post in MDX/Markdown…"
            className="mt-3 w-full resize-y rounded-lg border border-border bg-surface p-4 font-mono text-sm"
          />
        ) : (
          <div className="prose-post mt-3 rounded-lg border border-border bg-surface p-4">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || "*Nothing to preview yet.*"}</ReactMarkdown>
          </div>
        )}
      </div>

      <input
        value={commitMessage}
        onChange={(e) => setCommitMessage(e.target.value)}
        placeholder="Commit message (optional)"
        className="mt-4 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
      />

      <div className="mt-4 flex items-center gap-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-bg disabled:opacity-50"
        >
          {saving ? "Committing…" : "Save to GitHub"}
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {success && <p className="text-sm text-emerald-400">{success.text}</p>}
      </div>
    </div>
  );
}
