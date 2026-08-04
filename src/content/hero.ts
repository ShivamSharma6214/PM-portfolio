/** Section 5 — Hero. Three lines, each doing a different job: reframe, claim, proof. */

import type { ProofPoint } from "./types";

export const hero = {
  eyebrow: "Student on paper. Four products in the world.",
  headline: "I write the PRD, then I ship it.",
  /**
   * The same headline, broken for the line-by-line mask reveal. The break sits at
   * the comma — the identical split the source content specifies for the OG image.
   */
  headlineLines: ["I write the PRD,", "then I ship it."],
  subheadline:
    "Builder-PM working on AI-first products — discovery and PRDs through hands-on development, then instrumentation of what users actually did.",
  lede: "Final-year Computer Science student, graduating August 2026. I’ve led a 10-person build, delivered a marketplace for a paying client as sole developer, and shipped a platform that processed 4,000+ submissions in live use. Currently interning at Docmize on an AI hospital management system while building CuteHelper, a voice-first AI desktop companion.",
  /** Four cells, mono, no icons. This is the 12-second read. */
  proof: [
    { value: "4", label: "products built end to end" },
    { value: "10", label: "person team led" },
    { value: "4,000+", label: "submissions processed in live use" },
    { value: "1", label: "paying client" },
  ] satisfies readonly ProofPoint[],
  availability:
    "Open to Associate and Technical Product Management roles · Gurugram, India · IST (GMT+5:30)",
  scrollCue: "Scroll",
  portraitAlt:
    "Shivam Sharma, seated in the room he works in, looking towards the camera.",
} as const;

/**
 * Technology strip. The four groupings are Shivam’s own, taken verbatim from the
 * GitHub profile README copy in Section 3 — not a generated logo cloud.
 */
export const techStrip = [
  {
    label: "Product",
    items: ["discovery", "PRDs", "RICE", "roadmapping", "KPI definition"],
  },
  {
    label: "Build",
    items: ["React", "Next.js", "TypeScript", "Electron", "Supabase", "Prisma"],
  },
  {
    label: "AI",
    items: ["LLM integration", "prompt engineering", "voice interfaces"],
  },
  {
    label: "Data",
    items: ["SQL", "Python (pandas, NumPy)", "Metabase", "Mixpanel"],
  },
] as const;
