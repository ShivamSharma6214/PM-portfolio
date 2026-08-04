import { ImageResponse } from "next/og";
import { ogImage, seo } from "@/src/content/seo";

export const alt = seo.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OG image: type only, no photograph — a portrait at this size crops badly in every
 * feed. Near-black ground, off-white type, one hairline rule. Nothing else.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0B",
          padding: "76px 84px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#6B6A68",
          }}
        >
          {ogImage.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {ogImage.headline.map((line) => (
            <div
              key={line}
              style={{
                fontSize: 96,
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                color: "#F4F3F1",
                fontWeight: 500,
              }}
            >
              {line}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ height: 1, width: "100%", background: "rgba(255,255,255,0.14)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {ogImage.proof.map((line) => (
              <div
                key={line}
                style={{
                  fontSize: 21,
                  letterSpacing: "0.06em",
                  color: "#A3A2A0",
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
