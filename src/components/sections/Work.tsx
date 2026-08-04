import Link from "next/link";
import { Section, SectionHead } from "@/src/components/layout/Section";
import { BranchDiagram, FlowDiagram } from "@/src/components/diagrams/Diagrams";
import { Reveal } from "@/src/components/motion/Reveal";
import { ArrowRight } from "@/src/components/ui/Button";
import { Chip, MediaSlot, Status } from "@/src/components/ui/primitives";
import { a11y, buttons } from "@/src/content/microcopy";
import { projects, workMeta } from "@/src/content/projects";
import type { Project } from "@/src/content/types";

/**
 * Which visual each project carries on the index.
 *
 * Chosen so no two entries look alike, and so each one shows the thing that project
 * is actually strongest on: CuteHelper's pipeline, UrbanIQ's measured outcomes,
 * ServiceHub's branch architecture, and — for Docmize — the honest absence.
 */
const INDEX_VISUAL: Record<string, "flow" | "metrics" | "branch" | "media"> = {
  cutehelper: "flow",
  urbaniq: "metrics",
  servicehub: "branch",
  docmize: "media",
};

function ProjectVisual({ project }: { project: Project }) {
  const kind = INDEX_VISUAL[project.slug] ?? "media";
  const flow = project.architecture.flow;

  if (kind === "metrics" && project.metrics.length) {
    return (
      <div className="grid grid-cols-2 rounded-[10px] border border-line bg-card shadow-e1">
        {project.metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={`px-5 py-5 ${index % 2 === 0 ? "border-r border-line" : ""} ${
              index < project.metrics.length - 2 ? "border-b border-line" : ""
            }`}
          >
            <span className="num block text-h3 font-medium tracking-[-0.03em] text-ink">
              {metric.value}
            </span>
            <span className="mt-1.5 block font-mono text-mono uppercase leading-[1.55] tracking-[0.11em] text-ink-3">
              {metric.label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "branch" && flow) {
    return <BranchDiagram nodes={flow} label="Architecture" compact />;
  }

  if (kind === "flow" && flow) {
    return <FlowDiagram nodes={flow} label="Architecture" compact emphasisIndex={3} />;
  }

  return <MediaSlot label={project.mediaPlaceholder} ratio="4 / 3" />;
}

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;

  return (
    <article className="relative">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
      <div className="grid items-start gap-x-10 gap-y-8 py-12 lg:grid-cols-12 lg:py-16">
        {/* Index + status rail */}
        <div className="flex items-baseline justify-between gap-4 lg:col-span-2 lg:flex-col lg:items-start lg:gap-5">
          <span
            aria-hidden="true"
            className="num font-mono text-mono tracking-[0.16em] text-ink-4"
          >
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <Status status={project.status} />
        </div>

        {/* Copy */}
        <div className={`lg:col-span-6 ${flip ? "lg:order-3 lg:col-start-7" : ""}`}>
          <h3 className="text-h2 font-medium leading-[1.05] text-ink">
            <Link
              href={`/work/${project.slug}`}
              aria-label={a11y.projectCardLink(project.name)}
              className="link-draw"
            >
              {project.name}
            </Link>
          </h3>

          <p className="mt-4 font-mono text-mono uppercase leading-[1.7] tracking-[0.12em] text-ink-3">
            {project.role}
            <span aria-hidden="true" className="mx-2 text-ink-4">
              ·
            </span>
            {project.kind}
            <span aria-hidden="true" className="mx-2 text-ink-4">
              ·
            </span>
            <time>{project.period}</time>
          </p>

          <p className="narrative mt-6 max-w-[46ch] text-lede text-ink-2">
            {project.cardBlurb}
          </p>

          <ul className="mt-7 flex flex-wrap gap-1.5">
            {project.technologies.stated.slice(0, 5).map((tech) => (
              <li key={tech}>
                <Chip>{tech}</Chip>
              </li>
            ))}
          </ul>

          <Link
            href={`/work/${project.slug}`}
            aria-label={a11y.projectCardLink(project.name)}
            className="group mt-8 inline-flex items-center gap-2.5 text-sm font-medium text-ink transition-colors duration-[var(--dur-hover)] hover:text-accent-hover"
          >
            <span className="link-draw">{buttons.projectCard}</span>
            <ArrowRight className="shrink-0 transition-transform duration-[var(--dur-hover)] group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Visual */}
        <div
          className={`lg:col-span-4 ${flip ? "lg:order-2 lg:col-start-3" : "lg:col-start-9"}`}
        >
          <ProjectVisual project={project} />
        </div>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <Section id={workMeta.id}>
      <SectionHead
        meta={workMeta}
        headingLines={["Four products,", "start to finish"]}
        layout="split"
      />

      <div className="shell mt-14 lg:mt-16">
        {projects.map((project, index) => (
          <Reveal key={project.slug} y={24}>
            <ProjectEntry project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
