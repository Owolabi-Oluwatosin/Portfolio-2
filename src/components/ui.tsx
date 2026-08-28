import Image from "next/image";
import { Star } from "lucide-react";
import type { Project } from "@/lib/content";

export function StarRating({ size = 14 }: { size?: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && (
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {sub && <p className="mt-3 text-muted">{sub}</p>}
    </div>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-muted">
      {children}
    </span>
  );
}

export function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

export function CoverImage({
  cover,
  title,
}: {
  cover?: string;
  title: string;
}) {
  if (!cover) return null;
  return (
    <div className="relative mb-4 flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-bg p-4">
      <div className="relative h-full w-full">
        <Image
          src={cover}
          alt={`${title} cover image`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}

export function ProjectCover({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  // Phone screenshots are tall/portrait — force-cropping them into a 16:9
  // box zooms in on the middle. Show the full screenshot at its natural
  // shape in a centered "phone frame" instead, inside a box the same
  // height as every other card so the grid stays aligned.
  if (project.mobile && project.image) {
    // A rotated portrait image needs a square bounding box — rotating a
    // still-portrait-shaped box would clip the now-sideways content.
    // const innerClass = project.rotate
    //   ? "relative aspect-square h-full rotate-90"
    //   : "relative h-full w-32 py-4 sm:w-40";

    return (
      <div
        className={`relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-bg ${className}`}
      >
        <div className="relative h-full w-32 py-4 sm:w-40">
          <Image
            src={project.image}
            alt={`${project.name} cover image`}
            fill
            sizes={"(min-width: 640px) 160px, 128px"}
            className={"object-contain"}
          />
        </div>
      </div>
    );
  }

  if (project.image) {
    return (
      <div className={`relative aspect-video w-full overflow-hidden rounded-xl border border-border ${className}`}>
        <Image
          src={project.image}
          alt={`${project.name} cover image`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-gradient-to-br from-accent/20 to-accent-2/20 ${className}`}
    >
      <span className="font-mono text-4xl font-semibold text-fg/30">
        {project.name.charAt(0)}
      </span>
    </div>
  );
}

export function UpworkIcon({ size = 16 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-[4px] border border-current font-mono font-semibold leading-none"
      style={{ width: size, height: size, fontSize: size * 0.58 }}
      aria-hidden="true"
    >
      U
    </span>
  );
}
