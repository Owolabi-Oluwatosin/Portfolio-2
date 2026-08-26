import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/content";
import { SectionHeading } from "@/components/ui";
import { SITE } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Services — Fintech, Real-Time & Codebase Rescue",
  description:
    "Full-stack product development, real-time systems (Socket.IO/BullMQ), fintech payments integration, and codebase rescue — focused engagements where I own the outcome.",
  alternates: { canonical: `${SITE.url}/services` },
};

const faqs = [
  {
    q: "Looking for a fintech payments developer?",
    a: "I build payment integration and crypto/card deposit systems — settlement engines, ledgers, and withdrawal workflows with the audit trail fintech needs, built on real money at scale at PlayZeet.",
  },
  {
    q: "Need a real-time systems developer?",
    a: "I work with Socket.IO, BullMQ, and Redis daily — live matching engines, background job queues, and reconciliation pipelines that stay correct under load.",
  },
  {
    q: "Need a codebase rescue developer for a legacy migration?",
    a: "I diagnose production bugs, untangle legacy code, add missing tests, and get deployments stable again — then leave the codebase in better shape than I found it.",
  },
  {
    q: "Hiring a full-stack product developer or founding engineer?",
    a: "I own builds end to end — schema, API, real-time layer, and client — as a founding engineer for hire or an embedded full-stack developer on your team.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-content px-5 pb-20 pt-10">
      <JsonLd data={faqJsonLd} />
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
      <div className="mt-14 border-l-2 border-accent pl-5">
        <SectionHeading eyebrow="FAQ" title="Common questions" />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-2xl border border-border bg-surface p-7">
            <h3 className="text-base font-semibold">{f.q}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
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
