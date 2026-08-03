import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { profile } from "@/lib/content";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const avatar = readFileSync(join(process.cwd(), "public/images/me.jpeg")).toString("base64");
  const avatarSrc = `data:image/jpeg;base64,${avatar}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px",
          background: "#08090c",
          color: "#e8eaf0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 740 }}>
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
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.15,
              marginTop: 20,
            }}
          >
            {profile.name}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 28, marginTop: 20, gap: 10 }}>
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
        <img
          src={avatarSrc}
          width={220}
          height={220}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            border: "4px solid #1c1f27",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
