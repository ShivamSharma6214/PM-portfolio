/** Section 12 — Contact & Footer. */

import { profile } from "./profile";
import type { SectionMeta } from "./types";

export const contactMeta: SectionMeta = {
  id: "contact",
  eyebrow: "06 · Contact",
  heading: "Let’s talk",
};

export const contact = {
  body: [
    "I’m looking for an Associate or Technical Product Management role, ideally somewhere the technical layer is the product rather than a delivery detail.",
    "If you’re hiring for something like that — or you want to argue with a decision in one of the case studies above — email is the fastest way to reach me.",
  ],
  details: [
    { label: "Email", value: profile.email, copy: true },
    { label: "Phone", value: profile.phone },
    { label: "Location", value: profile.location },
    { label: "Availability", value: "Open to Associate / Technical PM roles" },
    { label: "Graduating", value: profile.graduating },
  ],
} as const;

interface FooterLink {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

export const footer = {
  name: profile.name,
  tagline: "Product judgment, backed by a working build.",
  links: [
    { label: "Work", href: "/#work" },
    { label: "How I Work", href: "/#practice" },
    { label: "Skills", href: "/#skills" },
    { label: "Background", href: "/#background" },
    { label: "Résumé", href: profile.resumeHref, external: true },
    { label: "GitHub", href: profile.links.github, external: true },
    { label: "LinkedIn", href: profile.links.linkedin, external: true },
    { label: "Email", href: `mailto:${profile.email}` },
  ] satisfies readonly FooterLink[],
  status: [profile.locationShort, "Open to Associate / Technical PM roles"],
  bottom: "© 2026 Shivam Sharma · Built with Next.js and TypeScript · Designed and built by me",
  note: "Every number on this site carries the conditions it was measured under. If something here doesn’t hold up, tell me.",
} as const;
