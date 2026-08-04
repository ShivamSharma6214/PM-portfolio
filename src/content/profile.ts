/** Identity, contact details and the brand system. Section 2 and Section 3. */

export const profile = {
  name: "Shivam Sharma",
  role: "Associate Product Manager · AI Products",
  email: "sharmashivam6214@gmail.com",
  phone: "+91 8360900804",
  location: "Gurugram, Haryana, India · IST (GMT+5:30)",
  locationShort: "Gurugram, India · IST",
  graduating: "Expected August 2026",
  siteUrl: "https://shivam-sharma-portfolio-theta.vercel.app",
  resumeHref: "/Shivam-Sharma-Product-Manager-Resume.pdf",
  links: {
    linkedin: "https://linkedin.com/in/shivamsharma6214",
    github: "https://github.com/ShivamSharma6214",
  },
} as const;

/** Section 2 — Personal Brand System. */
export const brand = {
  tagline: "I write the PRD, then I ship it.",
  secondaryTaglines: [
    "Product judgment, backed by a working build.",
    "Discovery to deployment, without a handoff.",
    "AI products, specced and shipped by the same person.",
    "The spec, the build, and the instrumentation after.",
    "Student on paper. Four products in the world.",
  ],
  mission:
    "To build AI products that make people more capable rather than more dependent — deciding what to build with the same rigour as how to build it.",
  adjectives: [
    {
      word: "Rigorous",
      gloss: "RICE, PRDs, acceptance criteria, EDA.",
    },
    {
      word: "Hands-on",
      gloss: "Electron, React, TypeScript, solo delivery.",
    },
    {
      word: "Considered",
      gloss: "The judgment calls — voice over chat, one role-based app over two.",
    },
  ],
} as const;

/** Section 3 — Bios. The medium bio carries the About section’s opening. */
export const bios = {
  short:
    "Shivam Sharma is a final-year Computer Science student and builder-PM who takes AI products from discovery to deployment. He has led a 10-person build, delivered a marketplace for a paying client as sole developer, and shipped a platform that processed 4,000+ submissions in live use. Based in Gurugram, India.",
  medium: [
    "Shivam Sharma is a final-year Computer Science student at I.K. Gujral Punjab Technical University and a builder-PM: he runs the discovery, writes the PRD, then builds the product himself.",
    "He founded CuteHelper, a voice-first AI desktop companion, scoping its MVP with a RICE framework to the two highest-impact workflows and implementing it in Electron, React and TypeScript with Groq Whisper and LLaMA 4 Scout. As sole developer on a paid engagement for ServiceHub Private Limited, he elicited requirements directly from the client and delivered a two-sided services marketplace and admin panel inside a fixed budget. Earlier, as Product Manager on UrbanIQ, he led a 10-person team building an AI-assisted complaint platform that processed 4,000+ submissions in live use, reconciling three user roles into 15+ prioritized user stories.",
    "He is looking for an Associate or Technical Product Management role where product judgment and technical depth compound.",
  ],
} as const;
