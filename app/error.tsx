"use client";

import { Button } from "@/src/components/ui/Button";
import { errorPage as copy } from "@/src/content/microcopy";
import { profile } from "@/src/content/profile";

/** 500. Same restraint as the 404: one unfinished rule, then the copy. */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main
      id="main"
      className="shell flex min-h-[80svh] flex-col justify-center py-24"
    >
      <p className="font-mono text-mono uppercase tracking-[0.14em] text-ink-3">
        {copy.heading}
      </p>

      <div aria-hidden="true" className="mt-8 h-px w-1/2 max-w-[34rem] bg-line-2" />

      <div className="mt-12 max-w-[46ch] space-y-6">
        {copy.body.map((paragraph, index) => (
          <p
            key={paragraph}
            className={`narrative whitespace-pre-line ${
              index === 0
                ? "text-h3 leading-[1.25] text-ink"
                : "text-lede text-ink-2"
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-3">
        <Button onClick={reset} variant="primary">
          {copy.actions.primary}
        </Button>
        <Button href="/#work" variant="secondary">
          {copy.actions.secondary}
        </Button>
      </div>

      <p className="mt-10 font-mono text-mono uppercase tracking-[0.13em] text-ink-3">
        {copy.footnote}{" "}
        <a href={`mailto:${profile.email}`} className="link-draw text-ink-2">
          {profile.email}
        </a>
      </p>
    </main>
  );
}
