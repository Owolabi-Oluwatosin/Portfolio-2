import JsonLd from "@/components/JsonLd";

type ArticleJsonLdProps = {
  type?: "Article" | "BlogPosting" | "TechArticle";
  url: string;
  headline: string;
  description?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  image?: string;
  keywords?: string[];
};

export function ArticleJsonLd({
  type = "Article",
  url,
  headline,
  description,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  image,
  keywords,
}: ArticleJsonLdProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": type,
        headline,
        ...(description ? { description } : {}),
        datePublished,
        dateModified: dateModified ?? datePublished,
        author: {
          "@type": "Person",
          name: authorName,
          ...(authorUrl ? { url: authorUrl } : {}),
        },
        ...(image ? { image } : {}),
        ...(keywords && keywords.length > 0 ? { keywords: keywords.join(", ") } : {}),
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      }}
    />
  );
}

export type BreadcrumbItem = { name: string; item: string };

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: it.item,
        })),
      }}
    />
  );
}
