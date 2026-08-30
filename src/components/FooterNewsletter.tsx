"use client";

import { useState } from "react";
import { useNotification } from "./NotificationProvider";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  async function submit() {
    if (!email.includes("@") || loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      console.log("res:", res)
      
      const data = await res.json();

      if (!res.ok) {
        showNotification({ variant: "danger", message: data.error || "Failed to subscribe. Please try again." });
        return;
      }

      if (data.code === "ALREADY_SUBSCRIBED") {
        showNotification({ variant: "warning", message: data.message || "You're already subscribed." });
        return;
      }

      setDone(true);
      setTimeout(() => {
        setDone(false)
        setEmail("")
      ,6000});
    } catch {
      showNotification({ variant: "danger", message: "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
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
          disabled={loading || done}
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-bg transition-all hover:brightness-110 active:scale-95"
        >
          {done ? "Subscribed ✓" : loading ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
    </div>
  );
}
