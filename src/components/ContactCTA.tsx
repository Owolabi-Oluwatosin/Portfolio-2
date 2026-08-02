import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/content";
import { XIcon, UpworkIcon } from "./ui";

const channels = [
  { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: profile.x, label: "X (Twitter)", Icon: XIcon },
  { href: profile.upwork, label: "Upwork", Icon: UpworkIcon },
  { href: profile.github, label: "GitHub", Icon: Github },
];

export default function ContactCTA() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-content px-5 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Let&apos;s talk
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          {/* Have a system that needs building — or fixing? */}
          Got a system to build — or a broken one to fix?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          I take on a small number of projects at a time so each one gets real
          attention. If you&apos;re building something ambitious, let&apos;s
          scope it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg transition-all hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-95"
          >
            Get in touch
          </a>
          {profile.calLink && (
            <a
              href={profile.calLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Book a free call"
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-fg transition-all hover:border-accent hover:text-accent active:scale-95"
            >
              Book a free call
            </a>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
          {channels.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex items-center gap-2 text-muted transition-colors hover:text-accent"
            >
              <Icon size={16} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
