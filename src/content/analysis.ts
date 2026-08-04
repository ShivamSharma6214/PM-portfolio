/**
 * Section 10.5 — Product Analysis. Published case studies.
 *
 * The two Notion titles and URLs are deliberately absent: the source content
 * refuses to guess which products were analysed, and naming the wrong one would be
 * the single most damaging error on the page. `studies` stays empty until the real
 * titles and links exist, and the section renders its framing copy without them.
 */

export const analysis = {
  heading: "Product analysis",
  intro:
    "Two end-to-end case studies, written up and published. Different muscle from the builds: no code to hide behind, just the argument.",
  period: "Jan 2025 — Jan 2026",
  status: "Published",
  cardTitle: "Two published product case studies",
  cardBlurb:
    "End-to-end analyses covering problem discovery, user research, opportunity sizing, competitive analysis and feature prioritization. Written alongside final-year coursework and the product management certifications.",
  cta: "Read on Notion →",
  distinction:
    "The case studies above are products I built or helped build. These two are products I analysed — the discipline of taking something already in the world and reasoning about what should happen to it next, without the safety net of being able to just go build it.",
  framing: [
    "Building a product you specced yourself is a closed loop — if the analysis is wrong, you find out in the build and quietly fix both. Analysing a product you don’t own removes that. The reasoning has to stand up on its own, in writing, to a reader who can check it.",
    "Both of these run the full arc: what the problem actually is, what users said, how large the opportunity is, who else is solving it, and what I’d build first. The prioritization section is the one I’d point an interviewer at.",
  ],
  stages: [
    {
      stage: "Problem discovery",
      what: "Establishes the problem exists and is worth solving, before proposing anything",
    },
    {
      stage: "User research",
      what: "Grounds the problem in what users said, not what seemed likely",
    },
    {
      stage: "Opportunity sizing",
      what: "Puts a magnitude on it — the difference between a real problem and an interesting one",
    },
    {
      stage: "Competitive analysis",
      what: "Who’s already solving this, how, and where the gap is",
    },
    {
      stage: "Feature prioritization",
      what: "What ships first, and the reasoning that makes that defensible",
    },
  ],
  methods: [
    "Problem Discovery",
    "User Research",
    "Opportunity Sizing",
    "Competitive Analysis",
    "Feature Prioritization",
    "Notion",
  ],
  /** Fill in with the two real titles and Notion URLs. */
  studies: [] as readonly { title: string; href: string; summary?: string }[],
} as const;
