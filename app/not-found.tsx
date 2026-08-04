import type { Metadata } from "next";
import { SiteHeader } from "@/src/components/layout/SiteHeader";
import { Button } from "@/src/components/ui/Button";
import { notFound as copy } from "@/src/content/microcopy";
import { profile } from "@/src/content/profile";

export const metadata: Metadata = {
  title: copy.metaTitle,
  description: copy.metaDescription,
  robots: { index: false, follow: true },
};

/**
 * 404.
 *
 * A single hairline that stops halfway across the viewport, with the copy beneath it.
 * The unfinished rule carries the whole idea — no broken-robot illustration and no
 * 404 set in giant numerals.
 */
export default function NotFound() {
  return (
    <>
      <SiteHeader variant="sub" />
      <main id="main" className="shell flex min-h-[70svh] flex-col justify-center py-24">
        <p className="font-mono text-mono uppercase tracking-[0.14em] text-ink-3">
          {copy.heading}
        </p>

        {/* The rule stops halfway. That is the joke and the whole graphic. */}
        <div aria-hidden="true" className="mt-8 h-px w-1/2 max-w-[34rem] bg-line-2" />

        <div className="mt-12 max-w-[46ch] space-y-6">
          {copy.body.map((paragraph) => (
            <p
              key={paragraph}
              className="narrative whitespace-pre-line text-lede text-ink-2 first:text-h3 first:leading-[1.25] first:text-ink"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Button href="/#work" variant="primary">
            {copy.actions.primary}
          </Button>
          <Button href={`mailto:${profile.email}`} variant="secondary">
            {copy.actions.secondary}
          </Button>
        </div>
      </main>
    </>
  );
}
