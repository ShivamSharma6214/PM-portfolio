/**
 * Section 10 — Work. Case studies.
 *
 * Ordered by what is hardest to fake. Every field is transcribed from the source
 * content; the `metrics` values are exact splits of the achievement lines in
 * Section 11, so no number appears without the condition it was measured under.
 *
 * Links resolve to the "link-unavailable" clauses from Section 4 rather than to a
 * dead `#`. Replace them with real URLs as they become available.
 */

import { unavailable, emptyStates } from "./microcopy";
import type { Project, SectionMeta } from "./types";

export const workMeta: SectionMeta = {
  id: "work",
  eyebrow: "02 · Work",
  heading: "Four products, start to finish",
  intro:
    "Each write-up covers the same ground: what the problem was, how I scoped it, what I built, what broke, and what I’d do differently. Ordered by what I think is hardest to fake.",
};

export const projects: readonly Project[] = [
  /* ======================================================================== */
  {
    slug: "cutehelper",
    name: "CuteHelper",
    status: "In development",
    role: "Founder & Product Engineer",
    kind: "AI Desktop Companion",
    period: "Feb 2026 — Present",
    metaTitle: "CuteHelper — Voice-first AI desktop companion",
    cardBlurb:
      "A transparent, always-on-top AI companion that listens instead of waiting to be typed at. RICE-scoped to two workflows, built front to back, instrumented to test whether it teaches or just answers.",
    rationale:
      "Founder-level ownership across product and engineering. The rarest combination on the page.",
    metrics: [],
    overview: [
      "CuteHelper is a transparent, always-on-top desktop AI companion built to cut context switching for students and knowledge workers. I own it end to end: the discovery that justified it, the RICE scoring that cut it down, the PRD and architecture that specified it, the Electron application that implements it, and the instrumentation that will tell me whether the core idea holds.",
      "The design principle is “teach, don’t do.” That distinction is the entire product, and it’s also the hardest thing to verify — which is why the metrics matter more here than anywhere else I’ve worked.",
    ],
    problem: [
      "Every AI assistant asks you to leave what you’re doing. You switch to a browser tab, describe the thing on your screen in words, wait, read the answer, and switch back — and by then you’ve lost the thread you were holding.",
      "For students and knowledge workers, that switch is the cost, not the answer. The assistant is fast; getting to the assistant is slow.",
      "There’s a second, quieter problem. An assistant that’s good at giving answers is very good at removing the need to understand them. For a student, that’s not a feature — it’s the failure mode.",
    ],
    goals: [
      {
        label: "Product goal",
        body: "Reduce the cost of asking to near zero — no window switch, no typing, no describing what’s already on screen — without turning the tool into something that does the work for you.",
      },
      {
        label: "Success criteria",
        body: "Because “does it teach?” isn’t directly observable, I defined three proxies and instrumented for them:",
        items: [
          "Follow-up rate — a user who asks a second, better question was taught something. A user who takes the first answer and leaves probably wasn’t.",
          "Average query length — questions getting longer over time suggests the user is engaging with the reasoning, not just requesting output.",
          "Response gap — how long between the answer and the next action. Too short suggests copy-paste; some pause suggests reading.",
        ],
      },
      {
        label: "",
        body: "None of these is conclusive alone. Together they say something about whether the loop works.",
      },
      {
        label: "Scope goal",
        body: "Ship two workflows properly rather than the whole candidate set partially.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "Interaction layer — always-on-top transparent window",
          body: "An Electron renderer that floats above whatever the user is working in. Transparency and always-on-top aren’t styling choices; they’re the mechanism that eliminates the context switch. If the companion sits in the workspace rather than beside it, there’s nothing to switch to.",
        },
        {
          name: "Voice input — Groq Whisper",
          body: "Speech-to-text on the input path, so asking costs a sentence instead of a window change and a paragraph of typing.",
        },
        {
          name: "Vision and reasoning — LLaMA 4 Scout",
          body: "A vision-capable model, so the companion can work from what’s actually on screen rather than from the user’s description of it. This is what makes the voice path viable: “what’s wrong with this?” is only a usable query if the model can see the “this.”",
        },
        {
          name: "Application shell — Electron, React, TypeScript",
          body: "Electron for the OS-level window behaviour that a web app cannot do. React and TypeScript for the interface, with types carrying the contract between the audio pipeline, the vision context and the response surface.",
        },
        {
          name: "Instrumentation layer",
          body: "Event capture for the three KPIs above, feeding the question of where the “teach, don’t do” loop breaks down.",
        },
      ],
      footnote:
        "The system architecture behind this sits in the project’s own PRD, which I authored alongside the user stories and acceptance criteria. This is the layer view.",
      flow: [
        { label: "Voice input", detail: "ask by speaking" },
        { label: "Groq Whisper", detail: "speech-to-text on the input path" },
        { label: "On-screen context", detail: "what’s actually on screen" },
        { label: "LLaMA 4 Scout", detail: "vision and reasoning" },
        { label: "Response surface", detail: "teach, don’t do" },
      ],
    },
    features: {
      columns: ["Feature", "What it does", "Why it survived RICE"],
      rows: [
        {
          feature: "Voice-first query",
          what: "Ask by speaking; Groq Whisper transcribes",
          why: "Removes the largest cost in the loop — typing a description of something visible",
        },
        {
          feature: "Screen-aware context",
          what: "LLaMA 4 Scout reasons over what’s on screen",
          why: "Makes short spoken queries sufficient; without vision, voice input is useless",
        },
        {
          feature: "Transparent always-on-top window",
          what: "Companion floats over the active workspace",
          why: "The context switch is the problem; this is the mechanism that removes it",
        },
        {
          feature: "“Teach, don’t do” response shaping",
          what: "Responses guide rather than complete",
          why: "The differentiating principle of the product",
        },
        {
          feature: "Behavioural instrumentation",
          what: "Follow-up rate, query length, response gap",
          why: "Without it, there’s no way to know if the principle is working",
        },
      ],
    },
    decisions: {
      items: [
        {
          title: "Voice-first over a chat window.",
          body: "The obvious build is a chat box. I chose voice, and it was the decision the whole product hinged on. A chat window reintroduces exactly what CuteHelper exists to remove: you stop, you focus somewhere else, you type. Voice keeps the user’s hands and eyes where the work is. The cost is real — transcription latency, accuracy on technical vocabulary, and the fact that voice is socially awkward in shared spaces. I took those costs because the alternative solved nothing.",
        },
        {
          title: "Vision model over user-supplied context.",
          body: "Voice input only works if the query can be short. “Why is this failing?” is a two-second question and a two-paragraph typing job — the difference is whether the model can see the screen. Choosing a vision-capable model made the voice decision viable instead of merely novel.",
        },
        {
          title: "Electron over a web app.",
          body: "Transparent, always-on-top, present across every application is not something a browser tab can be. Electron’s overhead is well documented and I accepted it, because the window behaviour is the product.",
        },
        {
          title: "RICE before writing any code.",
          body: "I scored the candidate feature set and cut to two workflows. The value wasn’t the ranking — it was having a defensible reason to say no to features I wanted to build. Scoring first meant the scope argument happened before implementation instead of halfway through it.",
        },
        {
          title: "Instrumenting a principle, not just usage.",
          body: "Most analytics tell you whether people used the thing. I needed to know whether the thing taught them anything, which isn’t directly measurable. Defining three imperfect proxies and being explicit that they’re proxies was a deliberate choice over picking one metric and pretending it was the truth.",
        },
      ],
    },
    challenges: [
      {
        title: "Specifying a principle precisely enough to build against.",
        body: "“Teach, don’t do” is a good sentence and a terrible requirement. Turning it into acceptance criteria — what a response may and may not contain — was the hardest writing on the project, and it’s still the part most likely to need revision.",
      },
      {
        title: "Measuring something that resists measurement.",
        body: "There is no event that fires when a user learns something. Every metric available is a proxy, and each one has an obvious alternative explanation. Holding three of them together and reasoning about the pattern is a weaker method than I’d like, and I don’t have a better one yet.",
      },
      {
        title: "Voice as an input surface.",
        body: "Speech-to-text on technical vocabulary is unreliable in exactly the situations where a student most needs help. It also assumes an environment where speaking aloud is acceptable — which a library is not.",
      },
      {
        title: "Being the only reviewer.",
        body: "Owning product and engineering means nobody catches a bad spec before it becomes a bad build. On UrbanIQ there were ten other people on the project and three roles’ requirements to reconcile against. Here the only external check is the instrumentation, and that arrives after the fact.",
      },
    ],
    lessons: [
      {
        title: "Prioritization is only real when it deletes something.",
        body: "RICE didn’t tell me what to build; it gave me a defensible reason not to build things. That’s the actual output of a prioritization framework, and I’d been treating it as a ranking exercise before this.",
      },
      {
        title: "Interaction model is a product decision, not a design detail.",
        body: "Voice over chat wasn’t a UI preference — it determined the model choice, the platform choice and the entire value proposition. I now treat interaction model as something that belongs in the PRD, not the design review.",
      },
      {
        title: "A metric you can’t defend is worse than admitting you can’t measure it.",
        body: "Picking a single number as a stand-in for “does this teach?” would have looked more rigorous and been less honest. Naming the proxies as proxies keeps the reasoning inspectable.",
      },
      {
        title: "Building what I spec makes me a worse optimist and a better spec writer.",
        body: "Every requirement I wrote, I paid for in implementation. That feedback loop is the most useful thing about doing both jobs.",
      },
    ],
    futureImprovements: {
      items: [
        "Get enough usage data on follow-up rate to say something defensible about whether the “teach, don’t do” loop holds. The instrumentation exists; the reading is what’s outstanding.",
        "Improve transcription reliability on technical vocabulary, which is where voice input fails most often and matters most.",
        "Add a text input path for environments where speaking isn’t viable, without letting it become the default and undo the core decision.",
        "Expand beyond the two RICE-selected workflows only once those two show retention, not before.",
        "Reduce Electron’s memory footprint — an always-on companion that costs the user resources all day is a companion they close.",
      ],
    },
    technologies: {
      statedLabel: "Named in the résumé for this project",
      stated: [
        "Electron",
        "React",
        "TypeScript",
        "Groq Whisper",
        "LLaMA 4 Scout (vision)",
        "RICE",
        "PRD Authoring",
        "User Stories & Acceptance Criteria",
        "System Architecture",
      ],
      impliedLabel: "Strongly implied by the work described",
      implied: [
        "LLM Integration",
        "Prompt Engineering",
        "Voice Interfaces",
        "Context-Aware Systems",
        "KPI Definition",
      ],
    },
    links: [{ label: "Open the live product", unavailable: unavailable.notPublic }],
    mediaPlaceholder: emptyStates.mediaSlot,
  },

  /* ======================================================================== */
  {
    slug: "urbaniq",
    name: "UrbanIQ",
    status: "Delivered",
    role: "Product Manager",
    kind: "Institutional Complaint & Document Management Platform",
    period: "Jan 2024 — Dec 2024",
    metaTitle: "UrbanIQ — AI-assisted complaint platform",
    cardBlurb:
      "Led a 10-person team building an AI-assisted complaint and document management platform. 4,000+ submissions processed in live use, three user roles reconciled, resolution time cut 30% in load testing.",
    rationale:
      "Ten people, three roles, 4,000+ real submissions, measured outcomes. The strongest evidence of product rigour.",
    metrics: [
      { value: "4,000+", label: "submissions processed in live use" },
      { value: "30%", label: "resolution-time reduction in load testing" },
      { value: "10", label: "person team led" },
      { value: "3", label: "user roles reconciled into 15+ prioritized stories" },
    ],
    overview: [
      "UrbanIQ is an AI-assisted complaint and document management platform for institutional workflows. I was the Product Manager on a team of ten, and I owned the roadmap from PRD through deployment.",
      "It went into live use and processed 4,000+ real submissions. That number is the reason this project matters more than anything else I’ve built: the specs were tested by actual people with actual complaints, and afterwards there was enough data to find out where the specs were wrong.",
    ],
    problem: [
      "Institutional complaint and document handling puts three roles — requester, handler and administrator — on the same process with different requirements of it. Each one needs something the others don’t, and each one’s needs constrain the others’.",
      "That is what makes it a product problem rather than a software problem. Building three tools is easy; building one system whose data means the same thing to all three is not. Routing, resolution time and departmental SLA performance all depend on getting that reconciliation right first.",
    ],
    goals: [
      {
        label: "Product goal",
        body: "One system where all three roles get what they need from the same data, submissions route themselves, and the bottlenecks become visible.",
      },
      {
        label: "Definition of done — the actual hard part",
        body: "Reconcile three roles’ requirements — requester, handler, administrator — into one prioritized backlog with acceptance criteria precise enough to build against.",
      },
      {
        label: "Measurable targets",
        items: [
          "Reduce time from submission to resolution.",
          "Route submissions without manual triage.",
          "Make SLA performance visible by department.",
        ],
      },
    ],
    architecture: {
      layers: [
        {
          name: "Role-based access across three user types",
          body: "Requester, handler and administrator each see a different product built on the same underlying records. Getting this right at the data layer was what allowed a single system to serve three conflicting sets of expectations.",
        },
        {
          name: "AI-based classification on ingest",
          body: "Incoming submissions are classified by content and auto-routed to the correct handler queue, replacing manual triage. This is the piece that removed the manual step at the front of the process.",
        },
        {
          name: "Approval workflow",
          body: "A staged approval path through handlers and administrators. The order of these stages turned out to be the single highest-leverage variable in the whole system — see Technical Decisions.",
        },
        {
          name: "Analytics layer",
          body: "Python and pandas for exploratory analysis, Metabase for the dashboards that made SLA breach patterns visible by department.",
        },
      ],
      flow: [
        { label: "Submission", detail: "requester" },
        { label: "AI classification", detail: "on ingest" },
        { label: "Handler queue", detail: "auto-routed" },
        { label: "Staged approval", detail: "through handlers and administrators" },
        { label: "SLA analytics", detail: "by department" },
      ],
    },
    features: {
      columns: ["Feature", "What it does", "Impact"],
      rows: [
        {
          feature: "AI complaint classification",
          what: "Reads submission content and auto-routes to the right queue",
          why: "Removed the manual triage step at the front of the process",
        },
        {
          feature: "Three role-based experiences",
          what: "Requester, handler and administrator views over shared records",
          why: "One system instead of three, with 15+ user stories reconciling the conflicts",
        },
        {
          feature: "Staged approval workflow",
          what: "Structured path from submission to resolution",
          why: "Reordering these stages cut resolution time 30% in load testing",
        },
        {
          feature: "Document management",
          what: "Institutional document requests handled in the same pipeline as complaints",
          why: "One platform covering both, rather than a complaint tool and a document tool",
        },
        {
          feature: "SLA analytics by department",
          what: "Metabase dashboards over 4,000+ submissions",
          why: "Surfaced breach clustering nobody had predicted, which changed prioritization",
        },
      ],
    },
    decisions: {
      items: [
        {
          title: "Reordering the approval workflow instead of optimising each stage.",
          body: "The instinct with a slow process is to make each step faster. The EDA said the delay wasn’t in any single stage — it was in the sequence, where work waited for an approval that didn’t need to come first. Reordering the stages cut resolution time 30% in load testing. It’s the best return I’ve gotten from a change that added no features at all.",
        },
        {
          title: "AI classification over a routing rules engine.",
          body: "Rules would have been more predictable and easier to debug. But a rules engine over free-text complaints becomes a keyword list that fails on anything phrased unexpectedly — which is a lot of real complaints. Classification handled the variance. The cost was accepting probabilistic routing in a workflow where being wrong has a human on the other end, so misroutes had to be recoverable by design rather than prevented.",
        },
        {
          title: "One system with role-based views over three separate tools.",
          body: "Three tools would have shipped faster and each role would have gotten exactly what it asked for. But the administrator’s throughput view is only meaningful if it’s reading the same records the handler is closing. Splitting the system would have split the truth.",
        },
        {
          title: "Reconciling all three roles before writing any stories.",
          body: "I could have written each role’s stories in that role’s own language and discovered the contradictions during QA. Instead I reconciled the requirements across all three roles first, which is why the 15+ prioritized user stories carried acceptance criteria precise enough to build against. It was slow, and it was the highest-value work on the project.",
        },
        {
          title: "Running EDA after launch and letting it change the roadmap.",
          body: "The analysis on 4,000+ submissions wasn’t a report for stakeholders — it fed back into prioritization. SLA breaches clustered by department in ways the original roadmap hadn’t anticipated, and the roadmap changed.",
        },
      ],
    },
    challenges: [
      {
        title: "Three roles, one set of acceptance criteria.",
        body: "Requester, handler and administrator each come at the same process from a different position, and each has a different reason to care about it. Reconciling those three sets of requirements into 15+ prioritized user stories with acceptance criteria was the central product problem — the software was comparatively easy afterwards.",
      },
      {
        title: "Coordinating ten people as a student.",
        body: "Leading a 10-person student build is not the same as managing a team — alignment has to come from written specs clear enough to be self-executing, because nothing else is enforcing it. That is the main reason my PRDs and acceptance criteria got sharp.",
      },
      {
        title: "Probabilistic routing in a process with real consequences.",
        body: "AI classification will misroute. When the misrouted thing is somebody’s complaint, “the classifier is usually right” is not a defence. Designing for recoverable misroutes rather than trying to eliminate them was the necessary reframe.",
      },
      {
        title: "Measuring an improvement I couldn’t measure in production.",
        body: "The 30% resolution-time reduction was measured in load testing. Load testing isn’t live behaviour, and I state it that way every time. Being able to say what a number does and doesn’t cover is part of the number.",
      },
    ],
    lessons: [
      {
        title: "The hardest part of product is definitional, not technical.",
        body: "Ten people, three roles, one working platform — and the bottleneck was never engineering. It was getting agreement on what a word meant. I now treat “do all stakeholders mean the same thing by this?” as the first question on any spec.",
      },
      {
        title: "Sequence beats speed.",
        body: "A 30% reduction in load testing came from reordering stages, not from making anything faster. Look at the shape of a process before optimising its parts.",
      },
      {
        title: "Written specs are the instrument, not the artefact.",
        body: "On a 10-person student build, the only reliable instrument is a document precise enough that nobody needs to ask what it meant. Writing to that standard made me better at the job than any amount of coordinating in meetings would have.",
      },
      {
        title: "Post-launch analysis is part of the product, not a report about it.",
        body: "Running EDA on 4,000+ submissions and changing the roadmap because of it is the loop that makes prioritization honest. Without it, prioritization is just confident guessing.",
      },
      {
        title: "Qualify your numbers or lose the room.",
        body: "“Cut resolution time 30% in load testing” is a weaker sentence than “cut resolution time 30%” and a far stronger position to defend. The qualifier is what makes the claim worth something.",
      },
    ],
    futureImprovements: {
      items: [
        "Measure the resolution-time improvement in production rather than load testing, and publish the difference between the two.",
        "Track classification accuracy over time and build an explicit correction loop so misroutes retrain routing rather than just getting fixed.",
        "Give requesters proactive status updates instead of a page they have to check — most of the requester’s frustration was informational, not procedural.",
        "Turn the department-level SLA findings into alerting rather than a dashboard someone has to open.",
        "Revisit the approval sequence with production data now that the load-test finding is known to matter.",
      ],
    },
    technologies: {
      statedLabel: "Named in the résumé for this project",
      stated: [
        "Python (pandas)",
        "Metabase",
        "AI Classification",
        "Exploratory Data Analysis",
        "PRD Authoring",
        "User Stories & Acceptance Criteria",
        "Roadmapping",
      ],
      impliedLabel: "In the global skills list, not attributed to UrbanIQ",
      implied: [
        "KPI Definition",
        "Agile & Scrum",
        "Jira",
        "Jupyter",
        "NumPy",
        "matplotlib",
      ],
    },
    links: [{ label: "Open the live product", unavailable: unavailable.notPublic }],
    mediaPlaceholder: emptyStates.mediaSlot,
  },

  /* ======================================================================== */
  {
    slug: "servicehub",
    name: "ServiceHub Private Limited",
    status: "Delivered",
    role: "Freelance Product Developer",
    kind: "Services Marketplace",
    period: "2026 — Present",
    metaTitle: "ServiceHub — Two-sided services marketplace",
    cardBlurb:
      "Sole developer on a paid engagement. Requirements elicited from the client, MVP scoped against a fixed budget, one role-based application serving two distinct experiences plus an admin panel.",
    rationale: "Paid client work. Almost no student has this.",
    metrics: [{ value: "1", label: "paying client" }],
    overview: [
      "ServiceHub is an on-demand marketplace connecting customers with local service providers. It was a paid client engagement and I was the sole developer — requirements, architecture, build, deployment and handover.",
      "The distinctive thing about it isn’t the product; it’s the constraint. A fixed budget and a fixed timeline with one developer means every scope conversation is a trade-off conversation, and I was the one having them, directly with the client.",
    ],
    problem: [
      "The client needed a working two-sided marketplace: customers finding and booking local service providers, providers managing what came in. And they needed the operational tooling to actually run it, which is the part that tends to get discovered late.",
      "The constraint was the real problem. Fixed budget, fixed timeline, one developer. Under those conditions the failure mode isn’t building the wrong thing — it’s agreeing to build all of it.",
    ],
    goals: [
      {
        label: "Product goal",
        body: "A marketplace serving both sides, deployed and handed over, plus an admin panel that lets the client operate it without a developer.",
      },
      {
        label: "Delivery goal",
        body: "An MVP that ships inside the budget and the timeline, with the trade-offs agreed explicitly rather than absorbed silently.",
      },
      {
        label: "Handover goal",
        body: "The client owns a running system at the end, not a dependency on me.",
      },
    ],
    architecture: {
      layers: [
        {
          name: "One role-based application, two experiences",
          body: "Rather than two codebases, a single application where role determines the product a user gets — customer or service provider. Shared authentication, shared data model, divergent interfaces.",
        },
        {
          name: "Separate admin panel",
          body: "Operations deliberately live outside the marketplace application. Admin users have a different job, a different risk profile and a different release cadence than either side of the marketplace, and coupling them would have made every operational change a marketplace deployment.",
        },
        {
          name: "Data and backend layer",
          body: "REST APIs between the application and its services.",
        },
        {
          name: "Frontend",
          body: "A React application.",
        },
      ],
      flow: [
        { label: "Shared authentication", detail: "shared data model" },
        { label: "Role-based routing", detail: "customer or service provider" },
        { label: "Customer marketplace", detail: "find and book" },
        { label: "Provider experience", detail: "manage incoming work" },
        { label: "Admin panel", detail: "outside the marketplace application" },
      ],
    },
    features: {
      columns: ["Feature", "What it does", "Why it was in the MVP"],
      rows: [
        {
          feature: "Customer marketplace",
          what: "Find and book local service providers",
          why: "Half the two-sided market — without it there’s no product",
        },
        {
          feature: "Provider experience",
          what: "Providers manage incoming work",
          why: "The other half; a marketplace with one side is a directory",
        },
        {
          feature: "Role-based authentication",
          what: "One auth system routes users to their experience",
          why: "The architectural decision that made one codebase viable for two products",
        },
        {
          feature: "Admin operations panel",
          what: "Client runs day-to-day operations independently",
          why: "Surfaced in requirements elicitation; without it the client needs a developer forever",
        },
        {
          feature: "Deployment & handover",
          what: "Client owns a running system",
          why: "The engagement isn’t delivered until this is true",
        },
      ],
    },
    decisions: {
      items: [
        {
          title: "One role-based application instead of two parallel apps.",
          body: "Two apps would have been cleaner in isolation and twice the maintenance surface — and I was the entire maintenance team. Role-based routing over shared auth and a shared data model meant one deployment path, one set of dependencies, one place to fix a bug. I could make that call confidently precisely because I was the person who’d pay for the wrong one.",
        },
        {
          title: "Admin panel separate, everything else together.",
          body: "The consistent-sounding decision would have been to put admin behind another role in the same app. I split it, because operations and marketplace change for unrelated reasons at unrelated times. Coupling them would have meant redeploying the customer-facing product to change an internal workflow. The rule I was applying: share what shares a reason to change.",
        },
        {
          title: "Elicit requirements directly rather than work from the brief.",
          body: "I ran the requirements conversation with the client myself rather than working from a feature list. That’s where the operational needs surfaced — the separate admin panel is the piece that determines whether the client can run the business after handover, and it comes out of asking what has to happen daily rather than what the product should have.",
        },
        {
          title: "Negotiate trade-offs in the open.",
          body: "With a fixed budget, every added feature removes another one. I put those exchanges to the client explicitly rather than quietly absorbing scope and hoping the timeline held. Uncomfortable conversations early instead of silent scope creep later.",
        },
        {
          title: "Managed infrastructure over a hand-rolled backend.",
          body: "One developer against a fixed timeline. Managed data infrastructure and a typed ORM buy time that goes into product surface instead of plumbing. The trade-off is platform coupling, which is the right trade at this scale and the wrong one at a much larger one.",
        },
      ],
    },
    challenges: [
      {
        title: "Being every role at once.",
        body: "Product manager, architect, engineer, deployer and account manager, with no one to check any of it. The mitigation was writing decisions down before implementing them — if a choice couldn’t survive being written as a sentence, it usually wasn’t a good choice.",
      },
      {
        title: "Fixed budget as a design constraint.",
        body: "Budget wasn’t a project-management detail; it decided architecture. One codebase over two, managed services over custom infrastructure, both sides of the marketplace shipped properly over a wider surface shipped partially. Every one of those is a budget decision wearing technical clothes.",
      },
      {
        title: "A client who knows the business, not the software.",
        body: "A client buying software knows their business, not what a feature costs to build. Translating “can we also do X” into “X costs roughly this much of Y” — in terms they could make a call on — was most of the value I added before writing any code.",
      },
      {
        title: "Delivering to a client means someone else’s business depends on it.",
        body: "A personal project failing is a bad evening. This failing is a client’s operations. That changed how I thought about the admin panel, error paths and handover documentation.",
      },
    ],
    lessons: [
      {
        title: "Requirements elicitation is where the product gets found.",
        body: "The separate admin panel — arguably the most important deliverable for the client’s ability to operate after handover — came out of asking what has to happen daily, not out of a feature discussion. I now treat any feature list as a starting hypothesis rather than a specification.",
      },
      {
        title: "Architecture is a budget document.",
        body: "“One role-based app or two?” is a technical question with a financial answer. Being the person who pays for the decision makes you decide differently, and better.",
      },
      {
        title: "Say the trade-off out loud.",
        body: "Every added feature removes another one when the budget is fixed. Putting that exchange to the client explicitly, rather than absorbing it quietly, is the difference between a scoped MVP and an open-ended build. Absorbing scope silently is the most common way solo delivery fails.",
      },
      {
        title: "Split by reason to change, not by resemblance.",
        body: "Admin looks like it belongs in the app and doesn’t belong in its deployment cycle. Coupling by similarity is a trap; coupling by shared cause of change is the actual rule.",
      },
      {
        title: "Handover is a feature.",
        body: "The engagement wasn’t finished when the code worked. It was finished when the client could run the thing without me.",
      },
    ],
    futureImprovements: {
      items: [
        "Instrument the two-sided funnel — booking completion by side — so scope conversations after MVP are driven by data instead of intuition.",
        "Extend the admin panel from operations into reporting, so the client can answer their own business questions.",
        "Add provider-side analytics; providers currently manage work without visibility into their own performance.",
        "Formalise the handover with runbook documentation, so operational knowledge doesn’t live in my head.",
        "Revisit the single-application decision if provider requirements diverge much further from customer requirements.",
      ],
    },
    technologies: {
      statedLabel: "Confirmed from the résumé",
      stated: [
        "Requirements Elicitation",
        "MVP Definition",
        "Stakeholder & Client Management",
        "System Architecture",
        "Role-Based Application Design",
      ],
      impliedLabel: "In the global skills list, not attributed to ServiceHub",
      implied: ["React", "Next.js", "TypeScript", "Supabase", "Prisma", "REST APIs", "Git"],
    },
    links: [
      { label: "Open the live product", unavailable: unavailable.clientRestricted },
    ],
    mediaPlaceholder: emptyStates.mediaSlot,
  },

  /* ======================================================================== */
  {
    slug: "docmize",
    name: "Docmize",
    status: "In progress",
    role: "Software Developer Intern",
    kind: "AI Hospital Management System",
    period: "2026 — Present",
    metaTitle: "Docmize — AI hospital management system",
    cardBlurb:
      "Frontend interfaces and dashboards for an AI-integrated hospital management system covering appointments and patient workflows, built inside an existing team and codebase.",
    rationale:
      "Team context — proves he works inside someone else’s codebase, not only greenfield.",
    metrics: [],
    overview: [
      "At Docmize I build frontend interfaces and dashboards for an AI-integrated hospital management system covering appointments and patient workflows. It’s the one project on this page where I didn’t choose the architecture, and that’s exactly what makes it valuable to me.",
      "Everything else here I specced and built myself. This is the environment where I have to translate product requirements into someone else’s codebase, coordinating with backend and design, and it has made me a better spec writer than any project where I got my own way.",
    ],
    problem: [
      "Hospital software has a density problem. A lot of information, several roles, clinical consequences for a confusing screen, and users who are mid-task and not in a position to explore an interface.",
      "Appointments and patient workflows are where that density concentrates. The engineering problem is making dense information legible; the product problem is deciding what a given role needs on screen and what is noise to them.",
    ],
    goals: [
      {
        label: "Product goal",
        body: "Interfaces and dashboards for appointments and patient workflows where the AI-assisted parts are legible to the person using them — not opaque suggestions on a busy screen.",
      },
      {
        label: "Engineering goal",
        body: "Translate product requirements into modular, scalable healthcare workflows that fit the existing architecture rather than working around it.",
      },
      {
        label: "Collaboration goal",
        body: "Coordinate with backend and design so the frontend is a shared contract, not a set of assumptions.",
      },
    ],
    architecture: {
      preface:
        "This is a team codebase and the architecture predates me, so what follows is my layer rather than the system.",
      layers: [
        {
          name: "Frontend layer",
          body: "Interfaces and dashboards for appointments and patient workflows, built as modular components so healthcare workflows can be composed and extended rather than rebuilt per screen.",
        },
        {
          name: "AI-assisted experience layer",
          body: "Product requirements for AI-assisted features translated into user-facing flows — the work being to make the AI legible and interruptible in a clinical context, not just present.",
        },
        {
          name: "Integration surface",
          body: "The contract with backend services, agreed with the backend team rather than inferred from response shapes.",
        },
      ],
      footnote: "Fuller architectural detail isn’t mine to publish.",
    },
    features: {
      columns: ["Area", "What I build", ""],
      rows: [
        {
          feature: "Appointment interfaces",
          what: "Scheduling and appointment workflows in the frontend",
          why: "",
        },
        {
          feature: "Patient workflow dashboards",
          what: "Dense clinical information rendered legibly",
          why: "",
        },
        {
          feature: "AI-assisted experiences",
          what: "Product requirements for AI features turned into usable flows",
          why: "",
        },
        {
          feature: "Modular workflow components",
          what: "Scalable, reusable healthcare workflow pieces rather than per-screen builds",
          why: "",
        },
      ],
    },
    decisions: {
      preface:
        "The system-level decisions on this project aren’t mine to claim. Within my layer:",
      items: [
        {
          title: "Modular composition over per-screen implementation.",
          body: "Healthcare workflows repeat with variation — the same appointment logic appears in several places with different roles and constraints. Building composable workflow components rather than screens means variation is configuration, and the next requirement is a change rather than a rewrite.",
        },
        {
          title: "Fit the existing architecture rather than work around it.",
          body: "The tempting move as a new contributor is to build alongside what’s there in a way you find cleaner. Working within the established patterns costs some short-term speed and is the reason the codebase stays maintainable by the people who’ll have it after my internship.",
        },
        {
          title: "Treat the API contract as a coordination artefact.",
          body: "The interface between frontend and backend is where assumptions become bugs. Agreeing it explicitly with the backend team, rather than inferring it from a response shape, is the cheapest debugging I do.",
        },
      ],
    },
    challenges: [
      {
        title: "Working inside decisions I didn’t make.",
        body: "Every other project on this page, I chose the structure. Here I inherit it, and my judgment about what’s better is frequently missing context about why something is the way it is. Learning to ask before improving is the actual skill.",
      },
      {
        title: "Density without simplification.",
        body: "Clinical users need a lot on screen. You can’t solve that by hiding things — hidden information in a clinical workflow is a hazard. The problem is hierarchy, not reduction, and it’s harder.",
      },
      {
        title: "AI features in a context with consequences.",
        body: "An AI suggestion in a consumer app that’s wrong is an annoyance. In a patient workflow it’s something else. The interface has to make it clear what’s a suggestion, where it came from, and how to override it.",
      },
      {
        title: "Coordination cost as a feature of the job.",
        body: "Working with backend and design is slower than deciding alone and produces things that survive after I leave. Recalibrating my sense of “productive” around that took a while.",
      },
    ],
    lessons: [
      {
        title: "Requirements read differently when you’ll implement them.",
        body: "Reading someone else’s requirements and building against them has changed how I write my own. I’m more specific about edge cases and less casual about phrases like “handle appropriately.”",
      },
      {
        title: "Constraints you didn’t choose are the useful ones.",
        body: "My own projects reflect my preferences. This one doesn’t, and working inside someone else’s structure has taught me more per week than greenfield does.",
      },
      {
        title: "Legibility is the product in high-stakes software.",
        body: "A hospital dashboard that’s beautiful and ambiguous is a worse product than one that’s plain and unmistakable. This has permanently changed how I think about interface polish.",
      },
      {
        title: "“Modular and scalable” is a claim about the future.",
        body: "The test of whether a component was well designed is what the next requirement costs. Nothing else.",
      },
    ],
    futureImprovements: {
      preface: "Framed as what I’d want to push for, not as decisions I own:",
      items: [
        "Instrument the appointment and patient workflows so requirement debates are settled with usage data.",
        "Make AI-assisted suggestions consistently traceable — source and confidence visible at the point of use in every flow.",
        "Extend the modular workflow components as coverage grows, with the next-requirement cost as the test of whether they’re right.",
        "Push interface-contract agreements earlier in the cycle, before implementation rather than during it.",
      ],
    },
    technologies: {
      statedLabel: "Named in the résumé for this project",
      stated: [
        "Frontend interfaces and dashboards",
        "AI Workflow Design",
        "Modular, scalable workflow architecture",
      ],
      impliedLabel: "In the global skills list, not attributed to Docmize",
      implied: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "REST APIs",
        "Agile & Scrum",
        "Jira",
        "Notion",
      ],
    },
    links: [
      { label: "Open the live product", unavailable: unavailable.clientRestricted },
    ],
    mediaPlaceholder: unavailable.screensPendingClearance,
  },
];

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
