import Link from "next/link";
import { BranchDiagram, FlowDiagram, LayerStack } from "@/src/components/diagrams/Diagrams";
import { CaseStudyToc, type TocEntry } from "@/src/components/case-study/CaseStudyToc";
import { MaskLines } from "@/src/components/motion/MaskLines";
import { Reveal, RevealChild, Stagger } from "@/src/components/motion/Reveal";
import { ArrowRight, ArrowUpRight, Button } from "@/src/components/ui/Button";
import { Chip, Eyebrow, MediaSlot, Status } from "@/src/components/ui/primitives";
import { buttons } from "@/src/content/microcopy";
import { projects } from "@/src/content/projects";
import type { Project } from "@/src/content/types";

/* ==========================================================================
   Building blocks
   ========================================================================== */

function Block({
  id,
  index,
  total,
  title,
  children,
  wide = false,
}: {
  id: string;
  index: number;
  total: number;
  title: string;
  children: React.ReactNode;
  /** Wide blocks break out of the prose measure — tables, diagrams, grids. */
  wide?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line pt-10 lg:pt-12">
      <Reveal y={14}>
        <Eyebrow className="flex items-center gap-3 text-ink-4">
          <span aria-hidden="true" className="h-px w-7 shrink-0 bg-line-2" />
          <span className="num">
            {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </Eyebrow>
        <h2 className="mt-4 text-[clamp(1.5rem,1.5vw+1.1rem,2.25rem)] font-medium leading-[1.12] tracking-[-0.028em] text-ink">
          {title}
        </h2>
      </Reveal>
      <div className={`mt-8 ${wide ? "" : "max-w-[68ch]"}`}>{children}</div>
    </section>
  );
}

function Paragraphs({ items }: { items: readonly string[] }) {
  return (
    <Reveal delay={0.05} className="space-y-5">
      {items.map((paragraph) => (
        <p key={paragraph} className="text-base text-ink-2">
          {paragraph}
        </p>
      ))}
    </Reveal>
  );
}

/** Numbered editorial blocks. Used for decisions, challenges and lessons. */
function NamedBlocks({
  items,
  numbered = false,
  columns = 1,
}: {
  items: readonly { title: string; body: string }[];
  numbered?: boolean;
  columns?: 1 | 2;
}) {
  return (
    <Stagger
      as="ol"
      stagger={0.06}
      className={
        columns === 2
          ? "grid gap-x-10 gap-y-9 md:grid-cols-2"
          : "space-y-9 lg:space-y-10"
      }
    >
      {items.map((item, index) => (
        <RevealChild key={item.title} as="li" y={14}>
          <div className={numbered ? "flex gap-5 lg:gap-7" : "border-t-2 border-ink pt-5"}>
            {numbered ? (
              <span
                aria-hidden="true"
                className="num shrink-0 pt-0.5 font-mono text-mono tracking-[0.14em] text-ink-4"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : null}
            <div>
              <h3 className="text-h4 font-medium text-ink">{item.title}</h3>
              <p className="mt-3 max-w-[64ch] text-base text-ink-2">{item.body}</p>
            </div>
          </div>
        </RevealChild>
      ))}
    </Stagger>
  );
}

function ProjectDiagram({ project, compact }: { project: Project; compact?: boolean }) {
  const flow = project.architecture.flow;
  if (!flow) return null;
  const label = "Architecture";
  return project.slug === "servicehub" ? (
    <BranchDiagram nodes={flow} label={label} compact={compact} />
  ) : (
    <FlowDiagram nodes={flow} label={label} compact={compact} />
  );
}

/* ==========================================================================
   Case study
   ========================================================================== */

export function CaseStudy({ project }: { project: Project }) {
  const index = projects.findIndex((entry) => entry.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const toc: TocEntry[] = [
    { id: "problem", label: "Problem" },
    { id: "goal", label: "Goal" },
    { id: "architecture", label: "Architecture" },
    { id: "features", label: "Key features" },
    { id: "decisions", label: "Technical decisions" },
    { id: "challenges", label: "Challenges" },
    { id: "lessons", label: "Lessons learned" },
    { id: "future", label: "Future improvements" },
    { id: "technologies", label: "Technologies" },
  ];

  const hasWhy = project.features.rows.some((row) => row.why.length > 0);
  const TOC_TOTAL = toc.length;

  return (
    <>
      {/* ------------------------------------------------------------- Header */}
      <header className="shell pt-10 lg:pt-14">
        <Reveal y={10}>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 font-mono text-mono-lg uppercase tracking-[0.13em] text-ink-2 transition-colors duration-[var(--dur-hover)] hover:text-accent-hover"
          >
            <span className="link-draw">{buttons.caseStudyBack}</span>
          </Link>
        </Reveal>

        <div className="mt-9 grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal y={10}>
              <Status status={project.status} />
            </Reveal>

            <MaskLines
              as="h1"
              lines={[project.name]}
              className="mt-5 text-h1 font-medium text-ink"
            />

            <Reveal delay={0.06} className="mt-5">
              <p className="font-mono text-mono uppercase leading-[1.7] tracking-[0.12em] text-ink-3">
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
            </Reveal>

            <Reveal delay={0.1} className="mt-9 space-y-5">
              {project.overview.map((paragraph) => (
                <p
                  key={paragraph}
                  className="narrative max-w-[58ch] text-lede text-ink-2"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>

            {/* Metrics, where the content has qualified ones. */}
            {project.metrics.length ? (
              <Stagger
                className="mt-11 grid gap-x-8 gap-y-6 sm:grid-cols-2"
                stagger={0.06}
              >
                {project.metrics.map((metric) => (
                  <RevealChild key={metric.label} y={10}>
                    <div className="border-t border-line pt-4">
                      <span className="num block text-h3 font-medium tracking-[-0.03em] text-ink">
                        {metric.value}
                      </span>
                      <span className="mt-1.5 block font-mono text-mono uppercase leading-[1.55] tracking-[0.11em] text-ink-3">
                        {metric.label}
                      </span>
                    </div>
                  </RevealChild>
                ))}
              </Stagger>
            ) : null}

            {/* Links, or the honest reason there isn't one. */}
            <Reveal delay={0.14} className="mt-11">
              <ul className="flex flex-wrap items-center gap-x-3 gap-y-3">
                {project.links.map((link) =>
                  link.href ? (
                    <li key={link.label}>
                      <Button href={link.href} variant="secondary" size="sm" external>
                        {link.label}
                        <ArrowUpRight className="text-ink-3" />
                      </Button>
                    </li>
                  ) : (
                    <li
                      key={link.label}
                      className="inline-flex items-center gap-2.5 rounded-full border border-dashed border-line-2 px-4 py-2 font-mono text-mono uppercase tracking-[0.12em] text-ink-3"
                    >
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-ink-4" />
                      {link.unavailable}
                    </li>
                  ),
                )}
              </ul>
            </Reveal>
          </div>

          {/* The architecture, up front — it is the strongest visual available. */}
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal y={20} delay={0.08}>
              {project.architecture.flow ? (
                <div className="rounded-[10px] border border-line bg-card p-6 shadow-e1 lg:p-7">
                  <ProjectDiagram project={project} />
                </div>
              ) : (
                <MediaSlot label={project.mediaPlaceholder} ratio="4 / 3" />
              )}
            </Reveal>
          </div>
        </div>
      </header>

      {/* --------------------------------------------------------------- Body */}
      <div className="shell mt-20 lg:mt-28">
        <div className="grid gap-x-12 lg:grid-cols-12">
          <div className="xl:col-span-2">
            <CaseStudyToc entries={toc} />
          </div>

          <div className="space-y-16 lg:col-span-12 lg:space-y-20 xl:col-span-9 xl:col-start-4">
            <Block id="problem" index={1} total={TOC_TOTAL} title="Problem">
              <Paragraphs items={project.problem} />
            </Block>

            <Block id="goal" index={2} total={TOC_TOTAL} title="Goal">
              <Stagger className="space-y-9" stagger={0.06}>
                {project.goals.map((goal, goalIndex) => (
                  <RevealChild key={`${goal.label}-${goalIndex}`} y={12}>
                    {goal.label ? (
                      <Eyebrow className="mb-3 text-ink-4">{goal.label}</Eyebrow>
                    ) : null}
                    {goal.body ? (
                      <p className="text-base text-ink-2">{goal.body}</p>
                    ) : null}
                    {goal.items ? (
                      <ul className="mt-4 space-y-3">
                        {goal.items.map((item) => (
                          <li key={item} className="relative pl-6 text-base text-ink-2">
                            <span
                              aria-hidden="true"
                              className="absolute left-0 top-[0.72em] h-px w-3 bg-line-2"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </RevealChild>
                ))}
              </Stagger>
            </Block>

            <Block id="architecture" index={3} total={TOC_TOTAL} title="Architecture" wide>
              {project.architecture.preface ? (
                <Reveal className="mb-8">
                  <p className="max-w-[68ch] text-base text-ink-2">
                    {project.architecture.preface}
                  </p>
                </Reveal>
              ) : null}

              <Reveal delay={0.04}>
                <LayerStack layers={project.architecture.layers} />
              </Reveal>

              {project.architecture.footnote ? (
                <Reveal delay={0.06} className="mt-7">
                  <p className="narrative max-w-[62ch] text-sm text-ink-3">
                    {project.architecture.footnote}
                  </p>
                </Reveal>
              ) : null}

              {/* Where a screenshot will go. Held to a contained width so the absence
                  reads as a reserved slot rather than as a void. */}
              <Reveal y={18} delay={0.08} className="mt-12">
                <MediaSlot
                  label={project.mediaPlaceholder}
                  ratio="16 / 10"
                  className="max-w-[36rem]"
                />
              </Reveal>
            </Block>

            <Block id="features" index={4} total={TOC_TOTAL} title="Key features" wide>
              <Stagger as="ol" className="border-t border-line" stagger={0.05}>
                {project.features.rows.map((row) => (
                  <RevealChild
                    key={row.feature}
                    as="li"
                    y={10}
                    className="border-b border-line"
                  >
                    <div className="grid gap-x-8 gap-y-2 py-6 lg:grid-cols-12">
                      <h3 className="text-h4 font-medium text-ink lg:col-span-4">
                        {row.feature}
                      </h3>
                      <p
                        className={`text-base text-ink-2 ${hasWhy ? "lg:col-span-4" : "lg:col-span-8"}`}
                      >
                        {row.what}
                      </p>
                      {hasWhy ? (
                        <p className="text-sm text-ink-3 lg:col-span-4">
                          {row.why ? (
                            <>
                              <span className="mb-1 block font-mono text-mono uppercase tracking-[0.12em] text-ink-4">
                                {project.features.columns[2]}
                              </span>
                              {row.why}
                            </>
                          ) : null}
                        </p>
                      ) : null}
                    </div>
                  </RevealChild>
                ))}
              </Stagger>
            </Block>

            <Block id="decisions" index={5} total={TOC_TOTAL} title="Technical decisions" wide>
              {project.decisions.preface ? (
                <Reveal className="mb-8">
                  <p className="max-w-[68ch] text-base text-ink-2">
                    {project.decisions.preface}
                  </p>
                </Reveal>
              ) : null}
              <NamedBlocks items={project.decisions.items} numbered />
            </Block>

            <Block id="challenges" index={6} total={TOC_TOTAL} title="Challenges" wide>
              <NamedBlocks items={project.challenges} columns={2} />
            </Block>

            <Block id="lessons" index={7} total={TOC_TOTAL} title="Lessons learned" wide>
              <NamedBlocks items={project.lessons} columns={2} />
            </Block>

            <Block id="future" index={8} total={TOC_TOTAL} title="Future improvements">
              {project.futureImprovements.preface ? (
                <Reveal className="mb-6">
                  <p className="text-base text-ink-2">
                    {project.futureImprovements.preface}
                  </p>
                </Reveal>
              ) : null}
              <Stagger as="ol" className="space-y-4" stagger={0.05}>
                {project.futureImprovements.items.map((item, itemIndex) => (
                  <RevealChild key={item} as="li" y={10}>
                    <div className="flex gap-5">
                      <span
                        aria-hidden="true"
                        className="num shrink-0 pt-1 font-mono text-mono tracking-[0.14em] text-ink-4"
                      >
                        {String(itemIndex + 1).padStart(2, "0")}
                      </span>
                      <p className="text-base text-ink-2">{item}</p>
                    </div>
                  </RevealChild>
                ))}
              </Stagger>
            </Block>

            <Block id="technologies" index={9} total={TOC_TOTAL} title="Technologies used" wide>
              <div className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
                <Reveal>
                  <Eyebrow className="mb-4 text-ink-4">
                    {project.technologies.statedLabel}
                  </Eyebrow>
                  <ul className="flex flex-wrap gap-1.5">
                    {project.technologies.stated.map((tech) => (
                      <li key={tech}>
                        <Chip>{tech}</Chip>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                {project.technologies.implied?.length ? (
                  <Reveal delay={0.06}>
                    <Eyebrow className="mb-4 text-ink-4">
                      {project.technologies.impliedLabel}
                    </Eyebrow>
                    <ul className="flex flex-wrap gap-1.5">
                      {project.technologies.implied.map((tech) => (
                        <li key={tech}>
                          <Chip tone="outline">{tech}</Chip>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ) : null}
              </div>
            </Block>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ Next case */}
      <div className="mt-24 border-t border-line lg:mt-32">
        <Link
          href={`/work/${next.slug}`}
          className="group block transition-colors duration-[var(--dur-hover)] hover:bg-card"
        >
          <div className="shell flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4 py-12 lg:py-16">
            <div>
              <Eyebrow className="mb-3 text-ink-4">Next case study</Eyebrow>
              <p className="text-h2 font-medium text-ink transition-colors duration-[var(--dur-hover)] group-hover:text-accent-hover">
                {next.name}
              </p>
            </div>
            <span className="inline-flex items-center gap-2.5 text-sm font-medium text-ink-2">
              <span className="link-draw">{buttons.projectCard}</span>
              <ArrowRight className="transition-transform duration-[var(--dur-hover)] group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </div>
    </>
  );
}
