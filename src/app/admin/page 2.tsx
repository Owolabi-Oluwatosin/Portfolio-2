"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Pencil, Trash2, Eye, EyeOff, LogOut, Plus } from "lucide-react";
import {
  listPosts,
  validateToken,
  deletePost,
  getPost,
  parsePost,
  serializePost,
  putPost,
  GitHubContentError,
  type RemotePostMeta,
} from "@/lib/githubContent";
import { getStoredToken, setStoredToken, clearStoredToken } from "@/lib/adminSession";
import { formatDate } from "@/lib/date";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [tokenInput, setTokenInput] = useState("");
  const [gateError, setGateError] = useState<string | null>(null);
  const [validating, setValidating] = useState(false);

  const [posts, setPosts] = useState<RemotePostMeta[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [busySlug, setBusySlug] = useState<string | null>(null);

  const loadPosts = useCallback(async (activeToken: string) => {
    setLoadingPosts(true);
    setListError(null);
    try {
      const result = await listPosts(activeToken);
      setPosts(result);
    } catch (err) {
      setListError(err instanceof Error ? err.message : "Failed to load posts.");
    } finally {
      setLoadingPosts(false);
    }
  }, []);

  useEffect(() => {
    const stored = getStoredToken();
    if (stored) {
      setToken(stored);
      loadPosts(stored);
    }
  }, [loadPosts]);

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    setValidating(true);
    setGateError(null);
    try {
      await validateToken(tokenInput);
      setStoredToken(tokenInput);
      setToken(tokenInput);
      setTokenInput("");
      loadPosts(tokenInput);
    } catch (err) {
      setGateError(
        err instanceof GitHubContentError ? err.message : "Couldn't reach GitHub. Check your connection."
      );
    } finally {
      setValidating(false);
    }
  }

  function handleLogout() {
    clearStoredToken();
    setToken(null);
    setPosts([]);
  }

  async function handleDelete(post: RemotePostMeta) {
    if (!token) return;
    if (!confirm(`Delete "${post.title}"? This commits a delete to main and can't be undone here.`)) {
      return;
    }
    setBusySlug(post.slug);
    try {
      await deletePost(token, post.path, post.sha, `Delete ${post.slug}`);
      await loadPosts(token);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setBusySlug(null);
    }
  }

  async function handleToggleDraft(post: RemotePostMeta) {
    if (!token) return;
    setBusySlug(post.slug);
    try {
      const { body, sha } = await getPost(token, post.path);
      const { data, content } = parsePost(body);
      const raw = serializePost({ ...data, draft: !post.draft }, content);
      await putPost(
        token,
        post.path,
        raw,
        `${post.draft ? "Publish" : "Unpublish"} ${post.slug}`,
        sha
      );
      await loadPosts(token);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setBusySlug(null);
    }
  }

  if (!token) {
    return (
      <div className="mx-auto max-w-md px-5 pb-20 pt-16">
        <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
        <p className="mt-2 text-sm text-muted">
          Paste a GitHub fine-grained PAT scoped to this repo (Contents: Read & write). It's kept only
          in this tab's session storage and is never sent anywhere but api.github.com.
        </p>
        <form onSubmit={handleUnlock} className="mt-6 flex flex-col gap-3">
          <input
            type="password"
            autoComplete="off"
            spellCheck={false}
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="github_pat_..."
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 font-mono text-sm outline-none focus:border-accent"
          />
          {gateError && <p className="text-sm text-red-400">{gateError}</p>}
          <button
            type="submit"
            disabled={validating || !tokenInput}
            className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-bg disabled:opacity-50"
          >
            {validating ? "Checking…" : "Unlock"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 pb-20 pt-16">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Blog admin</h1>
          <p className="mt-1 text-sm text-muted">
            {posts.length} {posts.length === 1 ? "post" : "posts"} in content/blog
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/editor"
            className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-bg"
          >
            <Plus size={16} /> New post
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-sm text-muted hover:text-fg"
            title="Forget token for this tab"
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
      </div>

      {loadingPosts && <p className="mt-8 text-sm text-muted">Loading posts…</p>}
      {listError && <p className="mt-8 text-sm text-red-400">{listError}</p>}

      {!loadingPosts && !listError && (
        <ul className="mt-8 flex flex-col gap-3">
          {posts.map((post) => (
            <li
              key={post.path}
              className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {post.draft && (
                    <span className="rounded-full bg-amber-400/15 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-amber-400">
                      Draft
                    </span>
                  )}
                  <span className="font-mono text-xs text-muted">
                    {formatDate(post.date)} · {post.category}
                  </span>
                </div>
                <h2 className="mt-1 truncate font-semibold">{post.title}</h2>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleDraft(post)}
                  disabled={busySlug === post.slug}
                  title={post.draft ? "Publish" : "Unpublish"}
                  className="rounded-lg border border-border p-2 text-muted hover:text-fg disabled:opacity-50"
                >
                  {post.draft ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <Link
                  href={`/admin/editor?path=${encodeURIComponent(post.path)}`}
                  className="rounded-lg border border-border p-2 text-muted hover:text-fg"
                  title="Edit"
                >
                  <Pencil size={16} />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(post)}
                  disabled={busySlug === post.slug}
                  title="Delete"
                  className="rounded-lg border border-border p-2 text-red-400 hover:bg-red-400/10 disabled:opacity-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
          {posts.length === 0 && <p className="text-sm text-muted">No posts yet.</p>}
        </ul>
      )}
    </div>
  );
}
