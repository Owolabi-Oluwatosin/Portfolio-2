import { testimonials, profile } from "@/lib/content";
import { StarRating, SectionHeading } from "./ui";

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between gap-3">
        <StarRating />
        <a
          href={profile.upwork}
          target="_blank"
          rel="noreferrer"
          className="whitespace-nowrap text-xs font-medium text-accent hover:underline"
        >
          Click to verify ↗
        </a>
      </div>
      <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-fg/90">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <div className="mt-4 flex flex-wrap gap-2">
        {t.traits.map((tr) => (
          <span key={tr} className="rounded-full bg-bg px-2.5 py-0.5 text-xs text-muted">
            {tr}
          </span>
        ))}
      </div>
      <figcaption className="mt-4 border-t border-border pt-3 text-xs text-muted">
        <span className="text-fg">{t.author}</span> · {t.role}
        <div className="mt-0.5">{t.project}</div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const loop = [...testimonials, ...testimonials];
  return (
    <section className="border-y border-border/60 bg-bg py-20">
      <div className="mx-auto max-w-content px-5">
        <div className="border-l-2 border-accent pl-5">
          <SectionHeading eyebrow="Testimonials" title="What clients say" />
        </div>
      </div>
      <div className="group relative overflow-hidden">
        <div className="flex w-max gap-5 px-5 animate-marquee group-hover:[animation-play-state:paused]">
          {loop.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-content px-5">
        <a
          href={profile.upwork}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-accent hover:underline"
        >
          View full Upwork profile →
        </a>
      </div>
    </section>
  );
}
