"use client";

import { useState } from "react";
import { techStack, techCategories } from "@/lib/content";
import { SectionHeading } from "./ui";

type Filter = "All" | (typeof techCategories)[number];

export default function TechStack() {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...techCategories];
  const items =
    filter === "All"
      ? techStack
      : techStack.filter((t) => t.category === filter);

  return (
    <section className="border-t border-border/60 bg-bg py-20">
      <div className="mx-auto max-w-content px-5">
        <div className="border-l-2 border-accent pl-5">
          <SectionHeading
            eyebrow="Toolbox"
            title="Tech stack"
            sub="The tools I reach for to build scalable, maintainable systems."
          />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95 ${
                filter === f
                  ? "border-accent bg-accent text-bg"
                  : "border-border text-muted hover:border-fg/30 hover:text-fg"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {items.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.name}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-surface px-4 py-5 text-center transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface/80"
              >
                <Icon
                  size={28}
                  className="shrink-0 transition-transform group-hover:scale-110"
                  style={{ color: t.color ?? "#5b8cff" }}
                />
                <span className="text-sm text-fg/90">{t.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
