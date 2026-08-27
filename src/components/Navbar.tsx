"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/content";
import { UpworkIcon } from "@/components/ui";

const links = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/case-study", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/70 backdrop-blur">
      <nav className="mx-auto flex max-w-content items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
        >
          <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-border">
            <Image
              src="/icon.png"
              alt={`${profile.shortName} avatar`}
              fill
              sizes="32px"
              className="object-cover"
            />
          </span>
          <span>
            {profile.shortName}
            <span className="text-accent">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative text-sm transition-colors ${
                    active ? "text-accent" : "text-muted hover:text-fg"
                  }`}
                >
                  {l.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
                  )}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-fg transition-all hover:border-accent hover:text-accent active:scale-95"
            >
              Get in touch
            </Link>
          </div>

          <a
            href={profile.upwork}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-bg transition-all hover:brightness-110 active:scale-95 sm:px-4 sm:text-sm"
          >
            <UpworkIcon size={13} />
            Hire on Upwork
          </a>

          <button
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`flex items-center gap-2 text-sm ${
                    active ? "text-accent" : "text-muted hover:text-fg"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                  {l.label}
                </Link>
              );
            })}
            <Link
              href="/#contact"
              className="text-sm font-medium text-accent"
              onClick={() => setOpen(false)}
            >
              Get in touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
