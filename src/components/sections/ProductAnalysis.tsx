import { Reveal, RevealChild, Stagger } from "@/src/components/motion/Reveal";
import { Chip, Eyebrow, Hairline } from "@/src/components/ui/primitives";
import { analysis } from "@/src/content/analysis";

/**
 * Product analysis — the published Notion case studies.
 *
 * The two titles and URLs are not in the source content, and guessing which products
 * were analysed would be the most damaging error available on this page. So the
 * section renders what is real: the framing, the arc each write-up runs, and the
 * methods. The panel is drawn as two stacked sheets rotated half a degree in
 * opposite directions — two documents, not two tiles. The `Read on Notion` CTA is
 * intentionally absent until a real URL exists; there are no dead links on this site.
 */
export function ProductAnalysis() {
  return (
    <div className="relative bg-card">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
      <div
        className="shell"
        style={{ paddingBlock: "clamp(4rem, 8vh, 6.5rem)" }}
      >
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
          {/* Copy */}
          <div className="lg:col-span-6">
            <Reveal y={12}>
              <Eyebrow className="mb-6 flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-7 shrink-0 bg-line-2" />
                Also published
              </Eyebrow>
            </Reveal>

            <Reveal>
              <h3 className="text-h2 font-medium text-ink">{analysis.heading}</h3>
            </Reveal>

            <Reveal delay={0.06} className="mt-6">
              <p className="narrative max-w-[46ch] text-lede text-ink-2">
                {analysis.intro}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <p className="max-w-[52ch] text-base text-ink-2">{analysis.distinction}</p>
            </Reveal>

            <Reveal delay={0.14} className="mt-8 space-y-5">
              {analysis.framing.map((paragraph) => (
                <p key={paragraph} className="max-w-[52ch] text-base text-ink-2">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.18} className="mt-9">
              <Eyebrow className="mb-3.5 text-ink-4">Methods</Eyebrow>
              <ul className="flex flex-wrap gap-1.5">
                {analysis.methods.map((method) => (
                  <li key={method}>
                    <Chip tone="outline">{method}</Chip>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* The documents */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal y={20} delay={0.08}>
              <div className="relative">
                {/* Two sheets. The one behind is the second write-up. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -rotate-[0.5deg] rounded-[10px] border border-line bg-paper shadow-e1"
                />
                <div className="relative rotate-[0.5deg] rounded-[10px] border border-line bg-card p-7 shadow-e2 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <p className="font-mono text-mono uppercase tracking-[0.13em] text-ink-3">
                      {analysis.status}
                    </p>
                    <time className="num font-mono text-mono uppercase tracking-[0.13em] text-ink-4">
                      {analysis.period}
                    </time>
                  </div>

                  <h4 className="mt-5 text-h3 font-medium text-ink">
                    {analysis.cardTitle}
                  </h4>

                  <p className="mt-4 text-sm text-ink-2">{analysis.cardBlurb}</p>

                  <Hairline className="my-7" />

                  <Eyebrow className="mb-4 text-ink-4">What each write-up covers</Eyebrow>
                  <Stagger className="ruled border-t border-line" as="ol" stagger={0.05}>
                    {analysis.stages.map((stage, index) => (
                      <RevealChild key={stage.stage} as="li" y={8} className="py-3.5">
                        <div className="flex items-baseline gap-3.5">
                          <span
                            aria-hidden="true"
                            className="num font-mono text-mono tracking-[0.13em] text-ink-4"
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <p className="text-h4 font-medium text-ink">{stage.stage}</p>
                            <p className="mt-1 text-xs text-ink-3">{stage.what}</p>
                          </div>
                        </div>
                      </RevealChild>
                    ))}
                  </Stagger>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
