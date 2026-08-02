"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit() {
    if (!email.includes("@")) return;
    // TODO: wire to your provider (Buttondown, ConvertKit, Resend, etc.)
    setDone(true);
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
              className="flex-1 rounded-full border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
            />
            <button
              onClick={submit}
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-all hover:brightness-110 active:scale-95"
            >
              {done ? "Subscribed ✓" : "Subscribe"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
