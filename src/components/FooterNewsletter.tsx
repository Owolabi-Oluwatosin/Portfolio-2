"use client";

import { useState } from "react";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit() {
    if (!email.includes("@")) return;
    // TODO: wire to your provider (Buttondown, ConvertKit, Resend, etc.)
    setDone(true);
  }

  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
        Ship notes
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-fg/80">
        Real work in progress: what I'm building, learning, and shipping.
      </p>
      <div className="mt-4 flex flex-col gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Email address"
          className="rounded-full border border-border bg-bg px-4 py-2 text-sm outline-none focus:border-accent"
        />
        <button
          onClick={submit}
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-bg transition-all hover:brightness-110 active:scale-95"
        >
          {done ? "Subscribed ✓" : "Subscribe"}
        </button>
      </div>
    </div>
  );
}
