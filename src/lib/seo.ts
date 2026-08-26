import { profile } from "./content";

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.danielood.com";

export const SITE = {
  url: rawUrl.replace(/\/$/, ""),
  name: profile.name,
  title: `${profile.shortName} — Fintech, Real-Time & Full-Stack Engineer`,
  description:
    "Full-stack engineer specializing in fintech payments integration, real-time systems (Socket.IO/BullMQ), codebase rescue, and full-stack product builds.",
  github: profile.github,
  linkedin: profile.linkedin,
  x: profile.x,
  upwork: profile.upwork,
};
