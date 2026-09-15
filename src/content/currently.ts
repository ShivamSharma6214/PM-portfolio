/** Section 6 — Currently. Momentum is the strongest signal a student can send. */

import type { CurrentlyEntry, SectionMeta } from "./types";

export const currentlyMeta: SectionMeta = {
  id: "currently",
  eyebrow: "01 · Now",
  heading: "Where the work stands",
  intro:
    "One in active development, two delivered and closed out this year — a product of my own, a team codebase, and a client engagement handed over.",
};

export const currently: readonly CurrentlyEntry[] = [
  {
    name: "CuteHelper",
    period: "Feb 2026 — present",
    role: "Founder & Product Engineer",
    summary:
      "Voice-first AI desktop companion, instrumented to test whether its core loop actually works.",
    live: true,
    caseStudy: "cutehelper",
  },
  {
    name: "Docmize",
    period: "Feb 2026 — May 2026",
    role: "Junior Software Developer Intern",
    summary:
      "Product requirements translated into healthcare workflows and AI-assisted experiences for clinical staff, inside an existing engineering team and codebase.",
    live: false,
    caseStudy: "docmize",
  },
  {
    name: "ServiceHub Private Limited",
    period: "Jan 2026 — Feb 2026",
    role: "Freelance Product Consultant",
    summary:
      "Sole developer on a paid client engagement — a two-sided services marketplace, built and handed over.",
    live: false,
    caseStudy: "servicehub",
  },
];

export const currentlyTransition =
  "Each of those has a full write-up below — the problem, the calls I made, and what the numbers said afterwards.";
