import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/content";
import { SectionHeading } from "@/components/ui";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack product builds, real-time and background systems, fintech payments integration, and codebase rescues — focused engagements where I own the outcome.",
  alternates: { canonical: `${SITE.url}/services` },
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-content px-5 pb-20 pt-10">
      <div className="border-l-2 border-accent pl-5">
        <SectionHeading
          eyebrow="How I can help"
          title="Services"
          sub="Focused engagements where I own the outcome, not just the tickets."
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {services.map((s) => (
          <div key={s.title} className="rounded-2xl border border-border bg-surface p-7">
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 rounded-2xl border border-border bg-bg p-8 text-center">
        <h3 className="text-xl font-semibold">Not sure which fits?</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Tell me what you&apos;re building and I&apos;ll tell you the shortest
          path to shipping it.
        </p>
        <Link
          href="/#contact"
          className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-all hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-95"
        >
          Start a conversation
        </Link>
      </div>
    </div>
  );
}
