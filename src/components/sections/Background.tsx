import Link from "next/link";
import { Section, SectionHead } from "@/src/components/layout/Section";
import { Reveal, RevealChild, Stagger } from "@/src/components/motion/Reveal";
import { ArrowUpRight } from "@/src/components/ui/Button";
import { Eyebrow } from "@/src/components/ui/primitives";
import {
  achievements,
  achievementsIntro,
  backgroundMeta,
  certifications,
  education,
  experience,
  leadership,
} from "@/src/content/background";

/** Splits "4,000+ submissions processed in live use" into its figure and its clause. */
function splitAchievement(text: string) {
  const match = /^([\d,]+\+?%?|Two|Paid)\s+(.*)$/.exec(text);
  if (!match) return { figure: null as string | null, rest: text };
  return { figure: match[1], rest: match[2] };
}

/**
 * Background.
 *
 * No imagery. A timeline with hairline rules; the university name and the
 * certification issuers are the visual content. Certification badges would make this
 * look like a LinkedIn widget, so it is set entirely in type.
 */
export function Background() {
  return (
    <Section id={backgroundMeta.id}>
      <SectionHead
        meta={backgroundMeta}
        headingLines={["Experience, education,", "credentials"]}
        layout="split"
      />

      <div className="shell mt-14 lg:mt-16">
        {/* --------------------------------------------------------- Experience */}
        <Stagger as="ol" className="border-t border-line" stagger={0.06}>
          {experience.map((entry) => (
            <RevealChild
              key={`${entry.org}-${entry.role}`}
              as="li"
              y={16}
              className="border-b border-line"
            >
              <div className="grid gap-x-10 gap-y-5 py-9 lg:grid-cols-12 lg:py-11">
                {/* Period rail */}
                <div className="lg:col-span-3">
                  <time className="num font-mono text-mono uppercase tracking-[0.13em] text-ink-3">
                    {entry.period}
                  </time>
                </div>

                <div className="lg:col-span-9">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-h3 font-medium text-ink">{entry.role}</h3>
                    <span aria-hidden="true" className="text-ink-4">
                      —
                    </span>
                    {entry.caseStudy ? (
                      <Link
                        href={`/work/${entry.caseStudy}`}
                        className="group inline-flex items-center gap-1.5 text-h3 font-medium text-ink-2 transition-colors duration-[var(--dur-hover)] hover:text-accent-hover"
                      >
                        <span className="link-draw">{entry.org}</span>
                        <ArrowUpRight className="mt-1 shrink-0 text-ink-4 transition-[transform,color] duration-[var(--dur-hover)] group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-accent" />
                      </Link>
                    ) : (
                      <span className="text-h3 font-medium text-ink-2">{entry.org}</span>
                    )}
                  </div>

                  {entry.context ? (
                    <p className="mt-2 font-mono text-mono uppercase tracking-[0.12em] text-ink-3">
                      {entry.context}
                    </p>
                  ) : null}

                  <ul className="mt-5 space-y-3">
                    {entry.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="relative max-w-[70ch] pl-6 text-base text-ink-2"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[0.72em] h-px w-3 bg-line-2"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealChild>
          ))}
        </Stagger>

        {/* ------------------------------------------- Education + Certifications */}
        <div className="mt-16 grid gap-x-12 gap-y-14 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal y={14}>
              <Eyebrow className="mb-6 text-ink-4">Education</Eyebrow>
              <h3 className="text-h3 font-medium text-ink">{education.degree}</h3>
              <p className="mt-4 text-base text-ink-2">{education.institution}</p>
              <p className="num mt-2 font-mono text-mono uppercase tracking-[0.13em] text-ink-3">
                {education.period}
              </p>
              <p className="narrative mt-8 max-w-[52ch] text-base text-ink-2">
                {education.note}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal y={14} delay={0.06}>
              <Eyebrow className="mb-6 text-ink-4">Certifications</Eyebrow>
              <dl className="ruled border-t border-line">
                {certifications.map((certification) => (
                  <div
                    key={certification.name}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
                  >
                    <dt className="max-w-[42ch] text-base font-medium text-ink">
                      {certification.name}
                    </dt>
                    <dd className="font-mono text-mono uppercase tracking-[0.13em] text-ink-3">
                      {certification.issuer}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* ------------------------------------------------------- Achievements */}
        <div className="mt-20 lg:mt-24">
          <Reveal y={12}>
            <Eyebrow className="mb-4 text-ink-4">Achievements</Eyebrow>
            <p className="mb-8 max-w-[52ch] text-sm text-ink-3">{achievementsIntro}</p>
          </Reveal>

          <Stagger
            className="grid gap-px overflow-hidden rounded-[10px] bg-line sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.05}
          >
            {achievements.map((item) => {
              const { figure, rest } = splitAchievement(item.achievement);
              return (
                <RevealChild key={item.achievement} y={12} className="bg-card p-6">
                  {figure ? (
                    <>
                      <span className="num block text-h2 font-medium leading-none tracking-[-0.032em] text-ink">
                        {figure}
                      </span>
                      <p className="mt-3 text-sm font-medium text-ink">{rest}</p>
                    </>
                  ) : (
                    <p className="text-h4 font-medium text-ink">{item.achievement}</p>
                  )}
                  <p className="mt-2.5 text-xs text-ink-3">{item.context}</p>
                </RevealChild>
              );
            })}
          </Stagger>
        </div>

        {/* --------------------------------------------------------- Leadership */}
        <div className="mt-20 lg:mt-24">
          <Reveal y={12}>
            <Eyebrow className="mb-8 text-ink-4">Leadership</Eyebrow>
          </Reveal>
          <Stagger className="grid gap-x-10 gap-y-10 lg:grid-cols-3" stagger={0.07}>
            {leadership.map((item) => (
              <RevealChild key={item.title} y={16}>
                <div className="h-full border-t-2 border-ink pt-6">
                  <h3 className="text-h4 font-medium text-ink">{item.title}</h3>
                  <p className="mt-3 text-base text-ink-2">{item.body}</p>
                </div>
              </RevealChild>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
