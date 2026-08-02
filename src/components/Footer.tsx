import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/content";
import { XIcon, UpworkIcon } from "./ui";
import FooterNewsletter from "./FooterNewsletter";

const quickLinks = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/case-study", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

const contactLinks = [
  { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: profile.x, label: "X (Twitter)", Icon: XIcon },
  { href: profile.upwork, label: "Upwork", Icon: UpworkIcon },
  { href: profile.github, label: "GitHub", Icon: Github },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-mono text-sm font-semibold">
            {profile.shortName}
            <span className="text-accent">.</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {profile.role}. {profile.subtitle}. Building reliable systems for
            teams that ship.
          </p>
        </div>

        <FooterNewsletter />

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-fg/80 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
            Connect
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {contactLinks.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex items-center gap-2 text-fg/80 transition-colors hover:text-accent"
                >
                  <Icon size={16} />
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="flex items-center gap-2 text-fg/80 transition-colors hover:text-accent"
              >
                <Mail size={16} />
                Email
              </a>
            </li>
          </ul>
          <a
            href={profile.upwork}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-fg transition-all hover:border-accent hover:text-accent active:scale-95"
          >
            <UpworkIcon size={14} />
            Hire on Upwork
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-content items-center justify-between px-5 py-5 text-xs text-muted">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a href="#top" className="transition-colors hover:text-accent">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
