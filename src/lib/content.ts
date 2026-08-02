// ─────────────────────────────────────────────────────────────
// Content layer. Everything the site renders comes from here or
// from /content/blog/*.mdx. To move to a CMS later (TinaCMS,
// Payload, Sanity), replace the exports below with fetch calls —
// the components consume these shapes and won't need to change.
// ─────────────────────────────────────────────────────────────

import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNestjs,
  SiNodedotjs,
  SiGo,
  SiSocketdotio,
  SiPostgresql,
  SiPrisma,
  SiTypeorm,
  SiRedis,
  SiMongodb,
  SiFirebase,
  SiKotlin,
  SiWebrtc,
  SiSanity,
  SiTrello,
  SiDocker,
  SiVercel,
  SiRender,
  SiHetzner,
  SiGithubactions,
  SiGit,
  SiPuppeteer,
  SiFigma,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { GenericTechIcon } from "@/components/icons";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  status: "Live" | "In progress" | "Case study";
  featured?: boolean;
  mobile?: boolean;
  href?: string;
  image?: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  project: string;
  traits: string[];
};

export type TechItem = {
  name: string;
  category: TechCategory;
  icon: IconType;
  color?: string;
};
export type TechCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps"
  | "Tools";

export const profile = {
  name: "Owolabi Oluwatosin Daniel",
  shortName: "Daniel Owolabi",
  role: "Senior Full-Stack Engineer",
  subtitle: "Real-time platforms · Fintech · AI products",
  intro:
    "I build production-grade web and mobile platforms end to end — from database schema and real-time backends to the UI clients ship. Founding engineer behind PlayZeet, a live peer-to-peer sports-betting platform serving real money at scale.",
  highlights: [
    "Founding engineer — built PlayZeet end to end",
    "Real-time systems: Socket.IO, BullMQ, Redis",
    "Fintech-grade settlement & payments",
  ],
  location: "Nigeria (remote-first)",
  email: "owolabioluwatosiny2k@gmail.com", // TODO: replace with your public contact address
  upwork: "https://www.upwork.com/freelancers/~017f49e3fd7ac7a273?mp_source=share", // TODO: paste your Upwork profile URL
  github: "https://github.com/Owolabi-Oluwatosin",
  linkedin: "https://www.linkedin.com/in/owolabi-oluwatosin/", // TODO: paste your LinkedIn URL
  x: "https://x.com/oluwatosiny2k", // TODO: paste your X/Twitter URL
  calLink: "https://cal.com/danielcoding/15min", // TODO: optional cal.com link, e.g. https://cal.com/yourname/intro
};

export const projects: Project[] = [
  {
    slug: "playzeet",
    name: "PlayZeet",
    tagline: "Peer-to-peer sports betting platform",
    description:
      "Founding engineer on a peer-to-peer, group, and novelty sports-betting platform. Owned frontend and backend end to end: bet-matching engine (lay bets, brave-take applicability, currency-equivalence logic), a pari-mutuel payout formula for group bets, a scheduled settlement job, JWT session management with multi-layer expiry detection, and a Puppeteer-based SSR/SEO layer for the React SPA. Integrated crypto (NOWPayments) and card (Flutterwave) deposits with BullMQ reconciliation.",
    tags: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "BullMQ", "Redis", "Socket.IO", "React"],
    status: "Live",
    featured: true,
    href: "https://playzeet.com",
    image: "/images/projects/playzeet.png",
  },
  {
    slug: "playzeet-blog",
    name: "PlayZeet Blog & CMS",
    tagline: "SEO-ready React blog with role-based CMS",
    description:
      "A full-stack blog and content platform for PlayZeet, built as a React + NestJS monorepo and containerized with Docker. Solves the SEO problem inherent to client-rendered React through server-side rendering/prerendering, and ships a CMS with role-based admin authentication for content management.",
    tags: ["React", "NestJS", "TypeScript", "Docker", "SSR/SEO"],
    status: "Live",
    featured: true,
    href: "https://beta.playzeet.com",
    image: "/images/projects/blog-playzeet.png",
  },
  {
    slug: "esdiac-global-system-inc.",
    name: "Esdiac Global System Inc.",
    tagline: "Video Calling Web Application and Telecom Provider",
    description:
      "Over nearly four years at Esdiac Global Systems Inc., I've built mobile and web applications across the company's product suite — including video calling solutions, a security agency app, the Provider App, the core Esdiac app, and Esdiac Payment. Working remotely alongside the CTO and the wider team, I've delivered these projects end-to-end while continually sharpening my skills across a range of technologies.",
    tags: [
      "TypeScript",
      "JavaScript",
      "Node.js",
      "NestJS",
      "Express.js",
      "React.js",
      "Next.js",
      "React Native",
      "Tailwind CSS",
      "CSS",
      "Socket.io",
      "WebSocket",
      "Webrtc",
      "Elastic Stack (ELK)",
      "Sentry", 
      "Kotlin",
      "API Development",
      "Web Development",
      "Web Applications",
      "Mobile Application Development",
      "AWS",
      "Amazon S3",
      "Docker"
    ],
    status: "Live",
    featured: true,
    href: "https://esdiac.com",
    image: "/images/projects/esdiac.png",
  },
  {
    slug: "vitascan",
    name: "VitaScan",
    tagline: "Health-monitoring mobile app",
    description:
      "A React Native (Expo) health-monitoring app with native voice guidance. Built the client and resolved native module registration for on-device speech after EAS builds.",
    tags: ["React Native", "Expo", "TypeScript"],
    status: "In progress",
    featured: true,
    href: "",
    image: "/images/projects/vitascann-rotated.jpeg",
  },
  {
    slug: "media-vault",
    name: "Media Vault",
    tagline: "Social aggregation for a blog platform",
    description:
      "A full media-vault feature for a React/NestJS blog app, aggregating social feeds through Curator.io with a clean ingestion and display pipeline.",
    tags: ["React", "NestJS", "TypeScript", "Curator.io"],
    status: "Live",
    href: "https://blog.playzeet.com/media-vault",
    image: "/images/projects/media-vault.png",
  },
  {
    slug: "realtime-video",
    name: "Real-time Video & Recognition",
    tagline: "Streaming + AI facial recognition",
    description:
      "At Esdiac Global Systems: real-time video/audio systems, AI facial-recognition pipelines, and data dashboards for live operational monitoring.",
    tags: ["WebRTC", "AI", "Node.js", "Dashboards"],
    status: "Case study",
    href: "",
    image: "/images/projects/facial-recognition-rotated.jpeg",
  },
];

export const testimonials: Testimonial[] = [
  // TODO: Replace these with your own verified reviews (Upwork, LinkedIn, clients).
  // Do NOT ship placeholder or borrowed quotes to production.
  {
    quote: "Daniel is very experienced and resourceful. He communicates well, brainstorms ideas with me, and comes up with great solutions. He meets deadlines, and I consider his skills exceptional. He also implemented a caching mechanism that updates every minute to improve performance. I will work with him again.",
    author: "Oluwashina Martins",
    role: "Founder Engineer, Startup",
    project: "TypeScript, PostgreSQL via Prisma (and some TypeORM), Redis + BullMQ for queues/jobs, Socket.IO for real-time, RESTful API, NestJS, with Puppeteer-based SSR for SEO on the React SPA",
    traits: ["Clear Communicator", "Collaborative", "Solution Oriented", "Reliable", "Committed to Quality"],
  },
  {
    quote: "Excellent experience in working with Daniel. He understood the requirements clearly and came up with multiple approaches and finally got the task done.",
    author: "Vishal",
    role: "CTO",
    project: "React, Next.js, TailwindCSS, TypeScript, On-Page SEO",
    traits: ["Clear Communicator", "Solution Oriented", "Accountable for Outcomes"],
  },
  {
    quote:
      "Has proven himself to be efficient in CSS, I will definitely use his services again in the future",
    author: "Andrew",
    role: "Product Lead",
    project: "CSS, HTML, CSS 3, HTML5, Web Design",
    traits: ["Reliable"],
  },
  // {
  //   quote: "Excellent experience in working with Daniel. He understood the requirements clearly and came up with multiple approaches and finally got the task done.",
  //   author: "Bash",
  //   role: "CTO",
  //   project: "React, Next.js, TailwindCSS, TypeScript",
  //   traits: ["Clear Communicator", "Solution Oriented", "Accountable for Outcomes", "Committed to Quality"],
  // },
];

export const techStack: TechItem[] = [
  { name: "React", category: "Frontend", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", category: "Frontend", icon: SiNextdotjs, color: "#ffffff" },
  { name: "React Native", category: "Frontend", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", category: "Frontend", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "NestJS", category: "Backend", icon: SiNestjs, color: "#E0234E" },
  { name: "Node.js", category: "Backend", icon: SiNodedotjs, color: "#339933" },
  { name: "Go", category: "Backend", icon: SiGo, color: "#00ADD8" },
  { name: "Kotlin", category: "Backend", icon: SiKotlin, color: "#7F52FF" },
  { name: "Socket.IO", category: "Backend", icon: SiSocketdotio, color: "#e8eaf0" },
  { name: "BullMQ", category: "Backend", icon: GenericTechIcon },
  { name: "REST APIs", category: "Backend", icon: GenericTechIcon },
  { name: "Sanity", category: "Backend", icon: SiSanity, color: "#F03E2F" },
  { name: "PostgreSQL", category: "Database", icon: SiPostgresql, color: "#4169E1" },
  { name: "Prisma", category: "Database", icon: SiPrisma, color: "#e8eaf0" },
  { name: "TypeORM", category: "Database", icon: SiTypeorm, color: "#FE0803" },
  { name: "Redis", category: "Database", icon: SiRedis, color: "#DC382D" },
  { name: "MongoDB", category: "Database", icon: SiMongodb, color: "#47A248" },
  { name: "Firebase", category: "Database", icon: SiFirebase, color: "#FFCA28" },
  { name: "Docker", category: "DevOps", icon: SiDocker, color: "#2496ED" },
  { name: "Vercel", category: "DevOps", icon: SiVercel, color: "#ffffff" },
  { name: "Render", category: "DevOps", icon: SiRender, color: "#46E3B7" },
  { name: "Hetzner", category: "DevOps", icon: SiHetzner, color: "#D50C2D" },
  { name: "GitHub Actions", category: "DevOps", icon: SiGithubactions, color: "#2088FF" },
  { name: "AWS", category: "DevOps", icon: FaAws, color: "#FF9900" },
  { name: "Git", category: "Tools", icon: SiGit, color: "#F05032" },
  { name: "Playwright", category: "Tools", icon: GenericTechIcon },
  { name: "Puppeteer", category: "Tools", icon: SiPuppeteer, color: "#40B5A4" },
  { name: "Figma", category: "Tools", icon: SiFigma, color: "#F24E1E" },
  { name: "WebRTC", category: "Tools", icon: SiWebrtc, color: "#e8eaf0" },
  { name: "Trello", category: "Tools", icon: SiTrello, color: "#0052CC" },
];

export const techCategories: TechCategory[] = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Tools",
];

export const services = [
  {
    title: "Full-stack product build",
    body: "Design, build, and ship a production app end to end — schema, API, real-time layer, and the client. The way PlayZeet got built.",
  },
  {
    title: "Real-time & background systems",
    body: "Socket.IO, BullMQ/Redis queues, scheduled jobs, reconciliation pipelines. Systems that stay correct under load and money.",
  },
  {
    title: "Fintech & payments integration",
    body: "Card and crypto deposits, settlement engines, ledgers, and withdrawal workflows with the audit trail fintech needs.",
  },
  {
    title: "Rescue & scale existing codebases",
    body: "Diagnose the production bug, fix the deployment, add the tests, and leave the codebase in better shape than I found it.",
  },
];
