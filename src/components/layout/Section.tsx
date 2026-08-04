import type { ReactNode } from "react";
import { MaskLines } from "@/src/components/motion/MaskLines";
import { Reveal } from "@/src/components/motion/Reveal";
import { Eyebrow } from "@/src/components/ui/primitives";
import type { SectionMeta } from "@/src/content/types";

/**
 * Section shell.
 *
 * Every section opens on a full-bleed hairline. That rule is the spine of the page —
 * it is what makes a long scroll read as a document with numbered parts rather than a
 * stack of unrelated panels. Bodies below the head are deliberately all different.
 */
export function Section({
  id,
  children,
  className = "",
  bleed = false,
  tone = "paper",
}: {
  id: string;
  children: ReactNode;
  className?: string;
  /** Skip the opening hairline where two sections should read as one movement. */
  bleed?: boolean;
  tone?: "paper" | "card";
}) {
  return (
    <section
      id={id}
      data-section={id}
      className={`relative scroll-mt-24 ${tone === "card" ? "bg-card" : ""} ${className}`}
      style={{ paddingBlock: "var(--section-y)" }}
    >
      {bleed ? null : (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-line"
        />
      )}
      {children}
    </section>
  );
}

/**
 * Section head. Two arrangements only:
 *   "split"   — heading left, intro in a right-hand column. For dense sections.
 *   "stacked" — heading, then intro beneath at prose measure. For narrative ones.
 */
export function SectionHead({
  meta,
  headingLines,
  layout = "stacked",
  className = "",
  children,
}: {
  meta: SectionMeta;
  /** Explicit line breaks for the mask reveal. Defaults to one line. */
  headingLines?: readonly string[];
  layout?: "split" | "stacked";
  className?: string;
  children?: ReactNode;
}) {
  const lines = headingLines ?? [meta.heading];

  return (
    <header className={`shell ${className}`}>
      <div
        className={
          layout === "split"
            ? "grid gap-x-10 gap-y-8 lg:grid-cols-12"
            : "max-w-[46rem]"
        }
      >
        <div className={layout === "split" ? "lg:col-span-7" : ""}>
          {meta.eyebrow ? (
            <Reveal y={12}>
              <Eyebrow className="mb-6 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-7 shrink-0 bg-line-2"
                />
                {meta.eyebrow}
              </Eyebrow>
            </Reveal>
          ) : null}

          <MaskLines
            as="h2"
            lines={lines}
            className="text-h2 font-medium text-ink"
          />
        </div>

        {meta.intro ? (
          <div
            className={
              layout === "split"
                ? "lg:col-span-5 lg:pt-3"
                : "mt-6 max-w-[42rem]"
            }
          >
            <Reveal delay={0.08}>
              <p className="narrative text-lede text-ink-2">{meta.intro}</p>
            </Reveal>
          </div>
        ) : null}
      </div>
      {children}
    </header>
  );
}
