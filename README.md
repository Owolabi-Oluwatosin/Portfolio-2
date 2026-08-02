# Portfolio — Owolabi Oluwatosin Daniel

Next.js 14 (App Router) + TypeScript + Tailwind. Content is MDX/TS in-repo —
no CMS required, free forever. Structured so you can add TinaCMS or Payload later
without touching components.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## Where the content lives

| Content            | File                                   |
|--------------------|----------------------------------------|
| Name, bio, links   | `src/lib/content.ts` → `profile`       |
| Projects           | `src/lib/content.ts` → `projects`      |
| Testimonials       | `src/lib/content.ts` → `testimonials`  |
| Tech stack         | `src/lib/content.ts` → `techStack`     |
| Services           | `src/lib/content.ts` → `services`      |
| Blog posts         | `content/blog/*.mdx`                    |

Search the code for `TODO:` — those mark the links, email, and testimonials you
need to fill in before going live.

## Add a blog post

Create `content/blog/my-post.mdx`:

```mdx
---
title: "My post"
date: "2026-02-01"
category: "backend"
excerpt: "One-line summary for the cards."
---

Body in **Markdown / MDX**.
```

## Design tokens

Colors and fonts live in `tailwind.config.ts`. Adjust `accent` / `accent-2`
to re-skin the whole site.

## Deploy

Push to GitHub, import into Vercel, done. Zero config.

## Upgrade path to a visual CMS (optional)

Content is already isolated in `src/lib/content.ts` and `content/blog`. To add a
visual editor later:
- **TinaCMS** — edits your existing MDX in place, free tier. Lowest-friction.
- **Payload CMS** — TypeScript, runs inside this Next app; needs a Postgres/Mongo DB.

Swap the exports in `content.ts` for CMS fetches; the components stay the same.
