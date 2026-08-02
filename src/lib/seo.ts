import { profile } from "./content";

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.danielood.com";

export const SITE = {
  url: rawUrl.replace(/\/$/, ""),
  name: profile.name,
  title: `${profile.name} — ${profile.role}`,
  description: profile.intro,
  github: profile.github,
  linkedin: profile.linkedin,
  x: profile.x,
  upwork: profile.upwork,
};
