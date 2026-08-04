"use client";

import { useEffect, useState } from "react";

export interface TocEntry {
  readonly id: string;
  readonly label: string;
}

/**
 * Case-study contents rail.
 *
 * A long-form document deserves a map. Sticky on wide screens, hidden on small ones
 * where it would cost more than it gives.
 */
export function CaseStudyToc({ entries }: { entries: readonly TocEntry[] }) {
  const [active, setActive] = useState<string | null>(entries[0]?.id ?? null);

  useEffect(() => {
    const targets = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((record) => record.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.5, 1] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [entries]);

  return (
    <nav
      aria-label="Case study contents"
      className="hidden xl:sticky xl:top-[calc(var(--header-h)+3rem)] xl:block"
    >
      <div>
        <p className="mb-5 font-mono text-mono uppercase tracking-[0.14em] text-ink-4">
          Contents
        </p>
        <ol className="space-y-1">
          {entries.map((entry, index) => {
            const isActive = active === entry.id;
            return (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`group flex items-baseline gap-2.5 py-1 text-xs transition-colors duration-[var(--dur-hover)] ${
                    isActive ? "text-accent" : "text-ink-3 hover:text-ink"
                  }`}
                >
                  <span
                    className={`num font-mono text-mono tracking-[0.1em] ${
                      isActive ? "text-accent" : "text-ink-4"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{entry.label}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
