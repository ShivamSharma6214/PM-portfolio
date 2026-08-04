import { Section } from "@/src/components/layout/Section";
import { Reveal, RevealChild, Stagger } from "@/src/components/motion/Reveal";
import { Eyebrow } from "@/src/components/ui/primitives";
import {
  aboutMeta,
  currentFocus,
  journey,
  personalNote,
  professionalSummary,
} from "@/src/content/about";
import { brand } from "@/src/content/profile";

/**
 * About.
 *
 * The one unnumbered section on the page — deliberately, because it is the only part
 * that is a person rather than a record. "About" drops to the eyebrow and the opening
 * sentence of the professional summary carries the display line, which is a far
 * stronger first line than the word "About" set large.
 *
 * No photograph here. The four Journey years are the graphic, per the visual
 * direction, and a second portrait would compete with the hero.
 */
export function About() {
  const [opener, ...rest] = professionalSummary;

  return (
    <Section id={aboutMeta.id}>
      <div className="shell">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
          {/* Opening statement */}
          <div className="lg:col-span-7">
            <Reveal y={12}>
              <Eyebrow className="mb-6 flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-7 shrink-0 bg-line-2" />
                {aboutMeta.heading}
              </Eyebrow>
            </Reveal>

            {/* A mask reveal is for short authored lines. This opener wraps to four
                lines at desktop width, and sliding a 230px block reads as a lurch —
                so it fades and rises like any other body element. */}
            <Reveal y={16}>
              <h2 className="narrative max-w-[34ch] text-h2 font-normal leading-[1.12] text-ink">
                {opener}
              </h2>
            </Reveal>

            <Reveal delay={0.08} className="mt-9 space-y-6">
              {rest.map((paragraph) => (
                <p key={paragraph} className="max-w-[62ch] text-base text-ink-2">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>

          {/* Mission + the three adjectives */}
          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal y={18} delay={0.06}>
              <figure className="rounded-[10px] border border-line bg-card p-7 shadow-e1">
                <Eyebrow className="text-ink-4">Mission</Eyebrow>
                <blockquote className="mt-5">
                  <p className="narrative text-lede leading-[1.5] text-ink">
                    {brand.mission}
                  </p>
                </blockquote>
              </figure>
            </Reveal>

            <Reveal y={18} delay={0.12} className="mt-8">
              <Eyebrow className="mb-5 text-ink-4">How that shows up</Eyebrow>
              <dl className="ruled border-t border-line">
                {brand.adjectives.map((item) => (
                  <div key={item.word} className="py-4">
                    <dt className="text-h4 font-medium text-ink">{item.word}</dt>
                    <dd className="mt-1 text-sm text-ink-2">{item.gloss}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </aside>
        </div>

        {/* ------------------------------------------------------------- Journey */}
        <div className="mt-20 lg:mt-28">
          <Reveal y={12}>
            <Eyebrow className="mb-8 flex items-center gap-3 text-ink-4">
              <span aria-hidden="true" className="h-px w-7 shrink-0 bg-line-2" />
              Journey
            </Eyebrow>
          </Reveal>

          <Stagger as="ol" className="border-t border-line" stagger={0.08}>
            {journey.map((beat) => (
              <RevealChild
                key={`${beat.year}-${beat.title}`}
                as="li"
                y={16}
                className="border-b border-line"
              >
                <div className="grid gap-x-10 gap-y-3 py-9 lg:grid-cols-12 lg:py-11">
                  <p
                    aria-hidden="true"
                    className="num font-sans text-[clamp(2.75rem,4.5vw,4rem)] font-medium leading-[0.85] tracking-[-0.045em] text-ink-4/45 lg:col-span-2"
                  >
                    {beat.year}
                  </p>
                  <div className="lg:col-span-9 lg:col-start-4">
                    <h3 className="text-h3 font-medium text-ink">
                      <span className="sr-only">{beat.year} — </span>
                      {beat.title}
                    </h3>
                    <p className="mt-4 max-w-[62ch] text-base text-ink-2">{beat.body}</p>
                  </div>
                </div>
              </RevealChild>
            ))}
          </Stagger>
        </div>

        {/* -------------------------------------------------------- Current focus */}
        <div className="mt-20 lg:mt-24">
          <Reveal y={12}>
            <Eyebrow className="mb-8 flex items-center gap-3 text-ink-4">
              <span aria-hidden="true" className="h-px w-7 shrink-0 bg-line-2" />
              Current focus
            </Eyebrow>
          </Reveal>

          <Stagger className="grid gap-x-10 gap-y-10 lg:grid-cols-3" stagger={0.08}>
            {currentFocus.map((block) => (
              <RevealChild key={block.label} y={16}>
                <div className="h-full border-t-2 border-ink pt-6">
                  <p className="text-base text-ink-2">
                    <strong className="font-medium text-ink">{block.label}:</strong>{" "}
                    {block.body}
                  </p>
                </div>
              </RevealChild>
            ))}
          </Stagger>
        </div>

        {/* Personal note */}
        <Reveal delay={0.06} className="mt-16">
          <p className="font-mono text-mono uppercase tracking-[0.14em] text-ink-3">
            {personalNote}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
