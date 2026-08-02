import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/content";
import { SectionHeading } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description: `${profile.name} is a ${profile.role.toLowerCase()} based in ${profile.location}, building production-grade web and mobile platforms end to end.`,
  alternates: { canonical: `${SITE.url}/about` },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: `${SITE.url}/about`,
  sameAs: [profile.github, profile.linkedin, profile.x, profile.upwork].filter(
    Boolean
  ),
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 pb-20 pt-10">
      <JsonLd data={personJsonLd} />
      <div className="border-l-2 border-accent pl-5">
        <SectionHeading eyebrow="About" title={profile.name} />
      </div>
      <div className="space-y-5 leading-relaxed text-muted">
        <p>
          I&apos;m a {profile.role.toLowerCase()} based in {profile.location}. I
          build production platforms end to end — the database schema, the
          real-time backend, the payment and settlement logic, and the client
          people actually use.
        </p>
        <p>
          Most recently I&apos;ve been the founding engineer on{" "}
          <span className="text-fg">PlayZeet</span>, a peer-to-peer sports
          betting platform, where I own both frontend and backend: a bet-matching
          engine, a pari-mutuel settlement system, JWT session management, crypto
          and card deposits, and a Puppeteer-based SSR layer for SEO. Before that
          I worked on real-time video/audio systems and AI facial recognition.
        </p>
        <p>
          I came into engineering sideways — a background in Applied Geology, then
          UI/UX design on Fiverr in 2019, then full-stack. That path is why I care
          as much about how a product feels as how the backend holds up under load.
        </p>
        <p>
          I&apos;m currently sharpening system design and cloud architecture, and
          I&apos;m open to select full-stack work.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/#contact"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-all hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-95"
        >
          Work with me
        </Link>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-fg transition-all hover:border-accent hover:text-accent active:scale-95"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}
