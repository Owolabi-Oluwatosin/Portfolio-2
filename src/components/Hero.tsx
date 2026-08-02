import Link from "next/link";
import { profile } from "@/lib/content";
import { StarRating } from "./ui";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-content px-5 pb-20 pt-24 sm:pt-32">
        <p className="animate-fade-up font-mono text-sm text-accent-2 [animation-delay:0ms]">
          {"// "}available for select work
        </p>
        <h1 className="animate-fade-up mt-5 text-5xl font-bold leading-[0.98] tracking-tight [animation-delay:80ms] sm:text-6xl lg:text-[4.5rem]">
          {profile.name}
        </h1>
        <p className="animate-fade-up mt-5 max-w-2xl text-xl text-muted [animation-delay:160ms] sm:text-2xl">
          <span className="text-fg">{profile.role}</span> — {profile.subtitle}
        </p>
        <p className="animate-fade-up mt-6 max-w-2xl leading-relaxed text-muted [animation-delay:220ms]">
          {profile.intro}
        </p>

        <ul className="animate-fade-up mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted [animation-delay:280ms]">
          {profile.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2">
              <span className="text-accent-2">✦</span>
              {h}
            </li>
          ))}
        </ul>

        <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-3 [animation-delay:340ms]">
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-all hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-95"
          >
            Get in touch
          </a>
          {profile.calLink && (
            <a
              href={profile.calLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border bg-transparent px-6 py-3 text-sm font-semibold text-fg transition-all hover:border-accent hover:text-accent active:scale-95"
            >
              Book a free call
            </a>
          )}
          <Link
            href="/projects"
            className="ml-1 inline-flex items-center gap-1 px-2 text-sm text-muted transition-colors hover:text-accent"
          >
            View my work <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="animate-fade-up mt-8 flex items-center gap-3 text-sm text-muted [animation-delay:400ms]">
          <StarRating />
          <span>5.0 · verified client work</span>
        </div>
      </div>
    </section>
  );
}
