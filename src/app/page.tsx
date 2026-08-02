import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import FeaturedProjects from "@/components/FeaturedProjects";
import CaseStudies from "@/components/CaseStudies";
import TechStack from "@/components/TechStack";
import RecentPosts from "@/components/RecentPosts";
import Newsletter from "@/components/Newsletter";
import ContactCTA from "@/components/ContactCTA";
import JsonLd from "@/components/JsonLd";
import ScrollReveal from "@/components/ScrollReveal";
import { SITE } from "@/lib/seo";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  alternates: { canonical: SITE.url },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: SITE.url,
  sameAs: [profile.github, profile.linkedin, profile.x, profile.upwork].filter(
    Boolean
  ),
};

export default function Home() {
  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={personJsonLd} />
      <Hero />
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal>
        <FeaturedProjects />
      </ScrollReveal>
      <ScrollReveal>
        <CaseStudies />
      </ScrollReveal>
      <ScrollReveal>
        <TechStack />
      </ScrollReveal>
      <ScrollReveal>
        <RecentPosts />
      </ScrollReveal>
      <ScrollReveal>
        <Newsletter />
      </ScrollReveal>
      <ScrollReveal>
        <ContactCTA />
      </ScrollReveal>
    </>
  );
}
