"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    if (!email.includes("@") || loading) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to subscribe. Please try again.");
        return;
      }

      setDone(true);
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="border-y border-border/60 bg-surface/40 py-16">
      <div className="mx-auto max-w-content px-5">
        <div className="rounded-2xl border border-border bg-bg p-8 sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Ship notes
          </p>
          <h3 className="mt-2 max-w-xl text-xl font-semibold sm:text-2xl">
            Real work in progress: what I'm building, learning, and shipping.
          </h3>
          <div className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              disabled={done}
              className="flex-1 rounded-full border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent disabled:opacity-60"
            />
            <button
              onClick={submit}
              disabled={loading || done}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-all hover:brightness-110 active:scale-95 disabled:opacity-60 disabled:active:scale-100"
            >
              {done ? "Subscribed ✓" : loading ? "Subscribing…" : "Subscribe"}
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        </div>
      </div>
    </section>
  );
}
