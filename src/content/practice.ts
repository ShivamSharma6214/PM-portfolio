/**
 * Section 8 — How I Work.
 *
 * Not a generic process diagram. These five steps are the lifecycle actually run
 * across CuteHelper, ServiceHub and UrbanIQ, so they hold up when someone probes them.
 */

import type { PracticeStep, SectionMeta } from "./types";

export const practiceMeta: SectionMeta = {
  id: "practice",
  eyebrow: "03 · Method",
  heading: "How I decide what to build",
  intro:
    "Five steps, in the order I actually run them. Each example below is from a real build, not an illustration.",
};

export const practiceSteps: readonly PracticeStep[] = [
  {
    number: "01",
    name: "Discovery",
    body: "Find out what has to become true, not what features were asked for. On ServiceHub I elicited requirements directly from the client — which is what surfaced the operational needs that became a separate admin panel.",
  },
  {
    number: "02",
    name: "Prioritization",
    body: "Decide what doesn’t ship. On CuteHelper I ran a RICE framework across the candidate feature set and cut the MVP to the two highest-impact workflows. Prioritization only means something when it removes things.",
  },
  {
    number: "03",
    name: "Specification",
    body: "Write it down so it can be disagreed with. PRD, user stories, acceptance criteria, system architecture. On UrbanIQ that meant reconciling three user roles — requester, handler, administrator — into 15+ prioritized stories where “done” meant the same thing to all three.",
  },
  {
    number: "04",
    name: "Build",
    body: "Ship it myself where I can. React, Next.js, TypeScript, Electron, Supabase, Prisma. On ServiceHub, one role-based application served two distinct experiences instead of two parallel codebases — a decision I could only make because I was the one maintaining it.",
  },
  {
    number: "05",
    name: "Instrumentation",
    body: "Find out whether the spec was right. On UrbanIQ I ran EDA on 4,000+ submissions and fed SLA-breach patterns back into prioritization. On CuteHelper I’m tracking follow-up rate, average query length and response gap. A roadmap that never changes after launch wasn’t a roadmap.",
  },
];

export const practiceClosing =
  "The loop matters more than any single step. Step 05 is what makes step 02 honest next time.";
