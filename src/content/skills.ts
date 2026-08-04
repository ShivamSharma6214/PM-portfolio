/**
 * Section 9 — Skills.
 *
 * Grouped as a hiring manager would want to scan them, with every entry pointing
 * at where it was used. No proficiency bars, no self-ratings, no percentages.
 *
 * Two evidence levels, exactly as the source content marks them:
 *   "stated"   (✓) — the résumé states this skill in that project’s bullets.
 *   "inferred" (○) — plausible mapping, not yet attributed in writing.
 *
 * The empty cells are deliberate. They are what make the filled ones mean something.
 */

import type { EvidencedSkill, SectionMeta, SkillGroup } from "./types";

export const skillsMeta: SectionMeta = {
  id: "skills",
  eyebrow: "04 · Toolkit",
  heading: "What I use, and where I used it",
  intro:
    "Every item below appears in work I’ve done. Hover a skill to highlight where it was used.",
};

/** Column key: CH CuteHelper · UIQ UrbanIQ · SH ServiceHub · DZ Docmize · CS Published case studies */
export const projectColumns = {
  CH: { short: "CH", name: "CuteHelper", slug: "cutehelper" },
  UIQ: { short: "UIQ", name: "UrbanIQ", slug: "urbaniq" },
  SH: { short: "SH", name: "ServiceHub", slug: "servicehub" },
  DZ: { short: "DZ", name: "Docmize", slug: "docmize" },
  CS: { short: "CS", name: "Published case studies", slug: null },
} as const;

export const evidenceLegend = [
  { level: "stated", label: "Named in that project’s write-up" },
  { level: "inferred", label: "In my toolkit — not yet attributed to a project" },
] as const;

export const skillGroups: readonly SkillGroup[] = [
  {
    name: "Product",
    columns: ["CH", "UIQ", "SH", "DZ", "CS"],
    rows: [
      {
        skill: "Product Discovery",
        cells: { CH: "stated", UIQ: "inferred", SH: "stated", CS: "stated" },
      },
      { skill: "User Research", cells: { CH: "inferred", UIQ: "inferred", CS: "stated" } },
      { skill: "PRD Authoring", cells: { CH: "stated", UIQ: "stated" } },
      {
        skill: "User Stories & Acceptance Criteria",
        cells: { CH: "stated", UIQ: "stated" },
      },
      {
        skill: "Feature Prioritization (RICE)",
        cells: { CH: "stated", UIQ: "inferred", CS: "stated" },
      },
      { skill: "Roadmapping", cells: { UIQ: "stated" } },
      { skill: "MVP Definition", cells: { CH: "stated", SH: "stated" } },
      {
        skill: "Stakeholder & Client Management",
        cells: { UIQ: "inferred", SH: "stated", DZ: "inferred" },
      },
      { skill: "KPI Definition", cells: { CH: "stated", UIQ: "inferred" } },
      { skill: "Agile & Scrum", cells: { UIQ: "inferred", DZ: "inferred" } },
    ],
    note: "Opportunity Sizing and Competitive Analysis belong to the published case studies too — they’re in the product analysis method list rather than repeated here.",
  },
  {
    name: "AI Product",
    columns: ["CH", "UIQ", "SH", "DZ"],
    rows: [
      { skill: "LLM Integration", cells: { CH: "stated", UIQ: "inferred", DZ: "inferred" } },
      { skill: "AI Workflow Design", cells: { CH: "stated", UIQ: "inferred", DZ: "stated" } },
      { skill: "Prompt Engineering", cells: { CH: "inferred" } },
      { skill: "Voice Interfaces", cells: { CH: "stated" } },
      { skill: "Context-Aware Systems", cells: { CH: "stated" } },
    ],
  },
  {
    name: "Engineering",
    columns: ["CH", "UIQ", "SH", "DZ"],
    rows: [
      { skill: "Electron", cells: { CH: "stated" } },
      {
        skill: "React",
        cells: { CH: "stated", UIQ: "inferred", SH: "inferred", DZ: "inferred" },
      },
      { skill: "TypeScript", cells: { CH: "stated", SH: "inferred" } },
      { skill: "Next.js", cells: { SH: "inferred", DZ: "inferred" } },
      {
        skill: "JavaScript",
        cells: { CH: "inferred", UIQ: "inferred", SH: "inferred", DZ: "inferred" },
      },
      { skill: "Python", cells: { UIQ: "stated" } },
      { skill: "Supabase", cells: { SH: "inferred" } },
      { skill: "Prisma", cells: { SH: "inferred" } },
      { skill: "REST APIs", cells: { UIQ: "inferred", SH: "inferred", DZ: "inferred" } },
      {
        skill: "Git",
        cells: { CH: "inferred", UIQ: "inferred", SH: "inferred", DZ: "inferred" },
      },
    ],
  },
];

/** Data & Analytics is split in two on purpose. An honest boundary is load-bearing. */
export const dataAnalytics = {
  name: "Data & Analytics",
  shippedLabel: "Used in shipped work",
  shipped: [
    { skill: "Python — pandas", where: "UrbanIQ" },
    { skill: "Metabase", where: "UrbanIQ" },
    { skill: "Exploratory Data Analysis", where: "UrbanIQ — on 4,000+ submissions" },
  ] satisfies readonly EvidencedSkill[],
  workingLabel: "Working knowledge — coursework and certification",
  working: [
    "SQL (JOINs, CTEs, window functions)",
    "NumPy",
    "matplotlib",
    "Mixpanel",
    "Funnel & Cohort Analysis",
    "Retention Analysis",
    "A/B Testing",
    "Google Looker Studio",
    "Jupyter",
  ],
} as const;

export const tools = [
  { tool: "Jira", where: "Docmize, UrbanIQ", level: "inferred" },
  { tool: "Notion", where: "Across projects; published case studies", level: "inferred" },
  { tool: "Jupyter", where: "UrbanIQ", level: "inferred" },
  { tool: "Google Looker Studio", where: "Coursework", level: "coursework" },
] as const;

export const skillsMatrixCaption =
  "The empty cells are the point — they’re what makes the filled ones mean something.";

export const skillsClosing =
  "The list is short on purpose. Nothing on it is here because it looks good on a list.";
