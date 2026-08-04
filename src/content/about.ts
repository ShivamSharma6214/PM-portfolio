/** Section 7 — About. */

import type { FocusBlock, JourneyBeat, SectionMeta } from "./types";

export const aboutMeta: SectionMeta = {
  id: "about",
  heading: "About",
};

export const professionalSummary: readonly string[] = [
  "I’m a final-year Computer Science student who ended up working across the seam most teams put a handoff in.",
  "The pattern is consistent across everything I’ve built: run the discovery, write the PRD, decide what doesn’t ship, build it, deploy it, then instrument it to find out whether the spec was right. On UrbanIQ that meant leading ten people and reconciling three user roles with different definitions of “resolved.” On ServiceHub it meant negotiating scope directly with a client against a fixed budget. On CuteHelper it means owning every layer, from the RICE score that killed features to the Electron main process.",
  "I’m not a PM who can read code, and I’m not an engineer who writes tickets. I do both, and the reason I keep doing both is that the specs get better when you know what they cost to build.",
];

/** Four beats. Each one names what changed. */
export const journey: readonly JourneyBeat[] = [
  {
    year: "2024",
    title: "Leading before managing.",
    body: "UrbanIQ was ten people and three user roles that disagreed about what a resolved complaint looked like. I learned that the hard part of product isn’t deciding what to build — it’s getting three groups to accept the same definition of done. It shipped, and it processed 4,000+ submissions in live use.",
  },
  {
    year: "2024",
    title: "Letting the data argue back.",
    body: "After launch I ran exploratory analysis on all 4,000+ submissions in Python and Metabase. SLA breaches clustered by department in a way nobody had predicted. That’s when instrumentation stopped being a checkbox on the roadmap and became the reason I trust or distrust my own specs.",
  },
  {
    year: "2025",
    title: "Sharpening the method.",
    body: "A year of deliberate practice alongside coursework: two published end-to-end case studies covering problem discovery, user research, opportunity sizing, competitive analysis and prioritization, done alongside the product management certifications. Writing product thinking down for an audience is a different skill from doing it.",
  },
  {
    year: "2026",
    title: "Building at three altitudes.",
    body: "Now: a client product where I’m the only developer and the requirements come straight from the person paying, a team codebase at Docmize where I have to fit someone else’s architecture, and CuteHelper, where every decision is mine and every mistake is too.",
  },
];

export const currentFocus: readonly FocusBlock[] = [
  {
    label: "What I’m working on right now",
    body: "whether CuteHelper’s “teach, don’t do” principle survives contact with real users. I’m instrumenting follow-up rate, average query length and response gap to find where the loop breaks down — because a companion that answers for you and a companion that teaches you look identical in a demo and completely different in the data.",
  },
  {
    label: "What I’m getting better at",
    body: "working inside an existing codebase and someone else’s architectural decisions. Docmize is the first environment where I’m not the one who chose the structure, and it’s made me a better spec writer — a requirement reads differently when you know what it costs the person implementing it.",
  },
  {
    label: "What I’m looking for",
    body: "an Associate or Technical Product Management role on a product where the technical layer is the product, not a delivery detail. AI products, developer tools, or anything where the spec has to be written by someone who understands what the model can and can’t do.",
  },
];

export const personalNote = "Based in Gurugram, Haryana. Graduating August 2026.";
