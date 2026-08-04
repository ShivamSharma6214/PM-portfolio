/** Section 11 — Background. Experience, education, certifications, achievements, leadership. */

import type {
  Achievement,
  Certification,
  ExperienceEntry,
  NamedBlock,
  SectionMeta,
} from "./types";

export const backgroundMeta: SectionMeta = {
  id: "background",
  eyebrow: "05 · Background",
  heading: "Experience, education, credentials",
  intro: "The formal version, for anyone who needs it in this shape.",
};

export const experience: readonly ExperienceEntry[] = [
  {
    role: "Software Developer Intern",
    org: "Docmize",
    context: "AI Hospital Management System",
    period: "2026 — Present",
    caseStudy: "docmize",
    bullets: [
      "Build frontend interfaces and dashboards for an AI-integrated hospital management system covering appointments and patient workflows.",
      "Translate product requirements into modular, scalable healthcare workflows and AI-assisted user experiences.",
      "Work within an existing engineering team and codebase, coordinating with backend and design.",
    ],
  },
  {
    role: "Freelance Product Developer",
    org: "ServiceHub Private Limited",
    context: "Services Marketplace",
    period: "2026 — Present",
    caseStudy: "servicehub",
    bullets: [
      "Sole developer on a paid client engagement, building an on-demand marketplace connecting customers with local service providers.",
      "Elicited requirements directly from the client and scoped an MVP deliverable within a fixed budget and timeline, negotiating trade-offs directly.",
      "Architected a single role-based application serving distinct customer and service-provider experiences, plus a separate admin panel for operations.",
      "Owned the full delivery cycle: requirements, architecture, build, deployment and handover.",
    ],
  },
  {
    role: "Founder & Product Engineer",
    org: "CuteHelper",
    context: "AI Desktop Companion",
    period: "Feb 2026 — Present",
    caseStudy: "cutehelper",
    bullets: [
      "Own end-to-end product direction for a transparent, always-on-top desktop AI companion built to cut context switching for students and knowledge workers.",
      "Ran product discovery and used a RICE framework to scope the MVP to the two highest-impact workflows; authored the PRD, user stories, acceptance criteria and system architecture.",
      "Chose a voice-first interaction model over a chat window and implemented it with Electron, React, TypeScript, Groq Whisper and LLaMA 4 Scout (vision).",
      "Instrumenting follow-up rate, average query length and response gap to test where the “teach, don’t do” loop breaks down in real usage.",
    ],
  },
  {
    role: "Independent Product Work",
    org: "Case Studies & Certification",
    context: "",
    period: "Jan 2025 — Jan 2026",
    bullets: [
      "Published two end-to-end product case studies covering problem discovery, user research, opportunity sizing, competitive analysis and feature prioritization, alongside final-year coursework and the product management certifications below.",
    ],
  },
  {
    role: "Product Manager",
    org: "UrbanIQ",
    context: "Institutional Complaint & Document Management Platform",
    period: "Jan 2024 — Dec 2024",
    caseStudy: "urbaniq",
    bullets: [
      "Led a 10-person team building an AI-assisted complaint and document management platform for institutional workflows, with 4,000+ submissions processed in live use.",
      "Reconciled requirements across 3 distinct user roles — requester, handler, administrator — into 15+ prioritized user stories with acceptance criteria.",
      "Owned the roadmap from PRD through deployment, drove AI-based complaint classification to auto-route submissions, and cut resolution time 30% in load testing by reordering the approval workflow.",
      "Ran EDA on 4,000+ submissions in Python, pandas and Metabase, surfacing SLA breaches by department and resolution-time bottlenecks, and fed findings back into prioritization.",
    ],
  },
];

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  institution: "I.K. Gujral Punjab Technical University",
  period: "Expected August 2026",
  note: "Final year. The coursework has run alongside the builds rather than behind them — UrbanIQ and the published case studies were both done during it.",
} as const;

export const certifications: readonly Certification[] = [
  { name: "Google Project Management Professional Certificate", issuer: "Coursera" },
  { name: "Electronic Arts Product Management Job Simulation", issuer: "Forage" },
  { name: "Machine Learning Training", issuer: "Internshala" },
];

/** Drawn from the shipped work — no separate awards to list. */
export const achievementsIntro = "Drawn from the shipped work — no separate awards to list.";

export const achievements: readonly Achievement[] = [
  {
    achievement: "4,000+ submissions processed in live use",
    context: "UrbanIQ went into real institutional use, not a demo",
  },
  {
    achievement: "30% resolution-time reduction in load testing",
    context: "Achieved by reordering the approval workflow, not by adding features",
  },
  {
    achievement: "Paid client engagement delivered solo",
    context: "ServiceHub — requirements through handover, inside a fixed budget",
  },
  {
    achievement: "10-person team led",
    context: "UrbanIQ, as a student, alongside final-year coursework",
  },
  {
    achievement: "3 user roles reconciled into 15+ prioritized stories",
    context: "With acceptance criteria precise enough to build against",
  },
  {
    achievement: "Two product case studies published",
    context: "End-to-end, independently, alongside final-year coursework",
  },
];

export const leadership: readonly NamedBlock[] = [
  {
    title: "UrbanIQ — ten people, one backlog.",
    body: "I led a 10-person team as a student. In that setting alignment comes from documents precise enough to be self-executing: a PRD, 15+ prioritized user stories, and acceptance criteria reconciled across requester, handler and administrator. That constraint is the reason I write specs the way I do.",
  },
  {
    title: "ServiceHub — the client-facing seam.",
    body: "Sole developer on a paid engagement means being the person who says “that costs this much of that.” I ran the requirements conversation and the trade-off negotiation directly, in terms the client could make decisions in.",
  },
  {
    title: "CuteHelper — deciding alone.",
    body: "Founding something removes the person who tells you a feature isn’t worth it. RICE and the instrumentation plan exist because I needed an external check on my own judgment.",
  },
];
