/** Section 6 — Currently. Momentum is the strongest signal a student can send. */

import type { CurrentlyEntry, SectionMeta } from "./types";

export const currentlyMeta: SectionMeta = {
  id: "currently",
  eyebrow: "01 · Now",
  heading: "Three things in flight",
  intro:
    "All three are live right now — a team codebase, a client product built and handed over, and one of my own in active development.",
};

export const currently: readonly CurrentlyEntry[] = [
  {
    name: "Docmize",
    period: "2026 — Present",
    role: "Software Developer Intern",
    summary:
      "Frontend interfaces and dashboards for an AI-integrated hospital management system, working inside an existing engineering team and codebase.",
    live: true,
    caseStudy: "docmize",
  },
  {
    name: "ServiceHub Private Limited",
    period: "2026 — Present",
    role: "Freelance Product Developer",
    summary:
      "Sole developer on a paid client engagement — a two-sided services marketplace, built and handed over.",
    live: true,
    caseStudy: "servicehub",
  },
  {
    name: "CuteHelper",
    period: "Feb 2026 — Present",
    role: "Founder & Product Engineer",
    summary:
      "Voice-first AI desktop companion, instrumented to test whether its core loop actually works.",
    live: true,
    caseStudy: "cutehelper",
  },
];

export const currentlyTransition =
  "Each of those has a full write-up below — the problem, the calls I made, and what the numbers said afterwards.";
