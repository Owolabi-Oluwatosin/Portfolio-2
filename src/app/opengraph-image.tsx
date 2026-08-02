import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
          {profile.name}
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#8b93a7", marginTop: 20 }}>
          {profile.role}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#38e0b0",
            marginTop: 40,
            fontFamily: "monospace",
          }}
        >
          {profile.subtitle}
        </div>
      </div>
    ),
    { ...size }
  );
}
