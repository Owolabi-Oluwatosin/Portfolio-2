import { ImageResponse } from "next/og";
import { projects, profile } from "@/lib/content";

export const alt = "Project cover image";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  const title = project?.name ?? "Project";
  const tagline = project?.tagline ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#08090c",
          color: "#e8eaf0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 64,
            height: 6,
            borderRadius: 4,
            background: "#5b8cff",
            marginBottom: 32,
          }}
        />
        {tagline && (
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#38e0b0",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: 4,
              marginBottom: 16,
            }}
          >
            {tagline}
          </div>
        )}
        <div style={{ display: "flex", fontSize: 56, fontWeight: 700, lineHeight: 1.15 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#8b93a7", marginTop: 32 }}>
          {profile.name}
        </div>
      </div>
    ),
    { ...size }
  );
}
