import { Section, SectionHead } from "@/src/components/layout/Section";
import { Reveal } from "@/src/components/motion/Reveal";
import { SkillsMatrix } from "@/src/components/sections/SkillsMatrix";
import { Chip, Eyebrow } from "@/src/components/ui/primitives";
import {
  dataAnalytics,
  skillsClosing,
  skillsMatrixCaption,
  skillsMeta,
  tools,
} from "@/src/content/skills";

/**
 * Skills.
 *
 * One matrix, not five tables and not an icon grid. Skills down the left, projects
 * across the top, a filled square where they intersect — and the interaction is the
 * visualisation: hovering a skill lights the projects it came from and dims the rest.
 *
 * The matrix is held to seven columns rather than stretched across the full width; a
 * row whose name and marks sit 900px apart cannot be read as a row. The freed column
 * carries Data & Analytics and Tools, which keeps their honest boundary — three tools
 * that appear in a project bullet, the rest declared as coursework — in view beside
 * the graphic instead of buried below it.
 */
export function Skills() {
  return (
    <Section id={skillsMeta.id}>
      <SectionHead
        meta={skillsMeta}
        headingLines={["What I use,", "and where I used it"]}
        layout="split"
      />

      <div className="shell mt-14 lg:mt-16">
        <div className="grid gap-x-14 gap-y-16 lg:grid-cols-12">
          {/* ------------------------------------------------------- The matrix */}
          <div className="lg:col-span-7">
            <Reveal>
              <SkillsMatrix />
            </Reveal>

            <Reveal delay={0.06} className="mt-8">
              <p className="narrative max-w-[52ch] text-base text-ink-3">
                {skillsMatrixCaption}
              </p>
            </Reveal>
          </div>

          {/* --------------------------------------- Data & Analytics, then Tools */}
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal>
              <h3 className="text-h3 font-medium text-ink">{dataAnalytics.name}</h3>
            </Reveal>

            <Reveal delay={0.05} className="mt-7">
              <Eyebrow className="mb-4 text-ink-4">{dataAnalytics.shippedLabel}</Eyebrow>
              <dl className="ruled border-t border-line">
                {dataAnalytics.shipped.map((item) => (
                  <div key={item.skill} className="py-3.5">
                    <dt className="flex items-start gap-2.5 text-sm text-ink">
                      <span
                        aria-hidden="true"
                        className="mt-[0.4em] size-[11px] shrink-0 rounded-[2px] bg-accent/85"
                      />
                      {item.skill}
                    </dt>
                    <dd className="mt-1 pl-[1.4rem] font-mono text-mono uppercase tracking-[0.12em] text-ink-3">
                      {item.where}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.1} className="mt-9">
              <Eyebrow className="mb-4 text-ink-4">{dataAnalytics.workingLabel}</Eyebrow>
              <ul className="flex flex-wrap gap-1.5">
                {dataAnalytics.working.map((item) => (
                  <li key={item}>
                    <Chip tone="outline">{item}</Chip>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.05} className="mt-14">
              <h3 className="text-h3 font-medium text-ink">Tools</h3>
              <dl className="ruled mt-7 border-t border-line">
                {tools.map((item) => (
                  <div
                    key={item.tool}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5"
                  >
                    <dt className="flex items-center gap-2.5 text-sm text-ink">
                      <span
                        aria-hidden="true"
                        className={`size-[11px] shrink-0 rounded-[2px] ${
                          item.level === "inferred"
                            ? "border border-line-2"
                            : "bg-line-2"
                        }`}
                      />
                      {item.tool}
                    </dt>
                    <dd className="font-mono text-mono uppercase tracking-[0.12em] text-ink-3">
                      {item.where}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* Closing line */}
        <Reveal delay={0.06} className="mt-16 lg:mt-20">
          <div className="border-t border-line pt-8">
            <p className="narrative max-w-[44ch] text-h3 font-normal leading-[1.35] text-ink">
              {skillsClosing}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
