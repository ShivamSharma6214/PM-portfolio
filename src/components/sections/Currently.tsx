import Link from "next/link";
import { ArrowUpRight } from "@/src/components/ui/Button";
import { Reveal, RevealChild, Stagger } from "@/src/components/motion/Reveal";
import { Section, SectionHead } from "@/src/components/layout/Section";
import { currently, currentlyMeta, currentlyTransition } from "@/src/content/currently";

/**
 * Currently.
 *
 * No imagery — typography and date rules only, as the visual direction specifies.
 * Three rows separated by hairlines: a status dot, the name in display type, the role
 * in mono, the summary at reading size, the period right-aligned. The interest comes
 * from the alignment and the rules, and the whole row is the link target.
 */
export function Currently() {
  return (
    <Section id={currentlyMeta.id}>
      <SectionHead meta={currentlyMeta} layout="split" />

      <div className="shell mt-14 lg:mt-16">
        <Stagger className="ruled border-t border-line" stagger={0.08} as="ul">
          {currently.map((entry) => (
            <RevealChild key={entry.name} as="li" y={16}>
              <Link
                href={`/work/${entry.caseStudy}`}
                className="group relative grid grid-cols-1 items-baseline gap-x-8 gap-y-3 py-7 transition-colors duration-[var(--dur-hover)] lg:grid-cols-12 lg:py-9"
              >
                {/* Name */}
                <div className="flex items-baseline gap-3 lg:col-span-4">
                  <span
                    aria-hidden="true"
                    className={`mt-[0.55em] size-1.5 shrink-0 rounded-full ${
                      entry.live ? "bg-accent" : "bg-ink-4"
                    }`}
                  />
                  <h3 className="text-h3 font-medium text-ink transition-colors duration-[var(--dur-hover)] group-hover:text-accent-hover">
                    {entry.name}
                  </h3>
                </div>

                {/* Role */}
                <p className="font-mono text-mono uppercase leading-[1.6] tracking-[0.12em] text-ink-3 lg:col-span-2">
                  {entry.role}
                </p>

                {/* Summary */}
                <p className="max-w-[46ch] text-sm text-ink-2 lg:col-span-4">
                  {entry.summary}
                </p>

                {/* Period */}
                <div className="flex items-baseline gap-3 lg:col-span-2 lg:justify-end">
                  <time className="num font-mono text-mono uppercase tracking-[0.12em] text-ink-3">
                    {entry.period}
                  </time>
                  <ArrowUpRight className="shrink-0 text-ink-4 transition-[transform,color] duration-[var(--dur-hover)] group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-accent" />
                </div>
              </Link>
            </RevealChild>
          ))}
        </Stagger>

        {/* Transition into Work */}
        <Reveal delay={0.1} className="mt-12 lg:mt-14">
          <p className="narrative flex max-w-[52ch] items-start gap-4 text-base text-ink-3">
            <span
              aria-hidden="true"
              className="mt-[0.7em] h-px w-8 shrink-0 bg-line-2"
            />
            {currentlyTransition}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
