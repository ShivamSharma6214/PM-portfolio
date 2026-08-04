import { Section, SectionHead } from "@/src/components/layout/Section";
import { DrawRule } from "@/src/components/motion/DrawRule";
import { Reveal } from "@/src/components/motion/Reveal";
import { practiceClosing, practiceMeta, practiceSteps } from "@/src/content/practice";

/**
 * How I Work.
 *
 * The numerals are the graphic — set large and low-contrast, with a hairline spine
 * running down the margin that draws itself as the section enters and a tick at each
 * step. The spine sits outside the numerals rather than through them: a rule crossing
 * a glyph reads as an accident, a rule in the margin reads as a document.
 *
 * No icons. A lightbulb next to "Discovery" would undo the tone of the entire site.
 */
export function Practice() {
  return (
    <Section id={practiceMeta.id}>
      <SectionHead meta={practiceMeta} headingLines={["How I decide", "what to build"]} />

      <div className="shell mt-16 lg:mt-20">
        <div className="relative">
          <DrawRule
            orientation="vertical"
            tone="line"
            duration={1.5}
            className="absolute left-0 top-4 hidden h-[calc(100%-5rem)] w-px md:block"
          />

          <ol className="space-y-14 lg:space-y-20">
            {practiceSteps.map((step, index) => (
              <li key={step.number} className="relative md:pl-9">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[1.15rem] hidden h-px w-4 bg-line-2 md:block"
                />
                <Reveal y={20} delay={index * 0.04}>
                  <div className="grid gap-x-10 gap-y-4 md:grid-cols-12">
                    <div className="md:col-span-3 lg:col-span-2">
                      <span
                        aria-hidden="true"
                        className="num block font-sans text-numeral font-medium leading-[0.8] tracking-[-0.05em] text-ink-4/40"
                      >
                        {step.number}
                      </span>
                    </div>

                    <div className="md:col-span-9 lg:col-span-8 lg:col-start-4">
                      <h3 className="text-h3 font-medium text-ink">{step.name}</h3>
                      <p className="mt-4 max-w-[58ch] text-base text-ink-2">{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* Closing line — the loop, set as this section's one pull quote and aligned
            to the step text so it reads as the last step's consequence. */}
        <Reveal delay={0.08} className="mt-16 lg:mt-20">
          <div className="border-t border-line pt-9 md:pl-9">
            <div className="grid md:grid-cols-12">
              <p className="narrative max-w-[46ch] text-h3 font-normal leading-[1.35] text-ink md:col-span-9 lg:col-span-8 lg:col-start-4">
                {practiceClosing}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
