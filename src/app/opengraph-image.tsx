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
            display: "flex",
            fontSize: 24,
            color: "#38e0b0",
            fontFamily: "monospace",
          }}
        >
          {"// available for select work"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            marginTop: 20,
          }}
        >
          {profile.name}
        </div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 20, gap: 12 }}>
          <span style={{ display: "flex", color: "#e8eaf0" }}>{profile.role}</span>
          <span style={{ display: "flex", color: "#8b93a7" }}>{`— ${profile.subtitle}`}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 36, gap: 14 }}>
          {profile.highlights.map((h) => (
            <div
              key={h}
              style={{ display: "flex", alignItems: "center", fontSize: 22, color: "#8b93a7" }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  background: "#38e0b0",
                  marginRight: 16,
                }}
              />
              {h}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
