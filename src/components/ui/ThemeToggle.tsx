"use client";

import { useEffect, useState } from "react";
import { a11y } from "@/src/content/microcopy";

type Choice = "auto" | "light" | "dark";

const STORAGE_KEY = "theme";

const OPTIONS: readonly { value: Choice; label: string }[] = [
  { value: "auto", label: "Auto" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

/** Mirrors the inline pre-paint script in the layout. */
function apply(choice: Choice) {
  const root = document.documentElement;
  if (choice === "auto") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", choice);
}

/**
 * Theme control.
 *
 * Three states, because the default genuinely is "follow the desktop" and a two-state
 * switch gives no way back to it once you've touched it. `Auto` sets no attribute at
 * all, which lets the `prefers-color-scheme` rule in the stylesheet own the decision —
 * so the OS preference keeps working even with JavaScript disabled.
 *
 * No icon: a sun and a moon would be the only pictograms on a site whose rule is one
 * glyph, the external-link arrow. Mono labels match the eyebrow language instead.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [choice, setChoice] = useState<Choice>("auto");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stored: Choice = "auto";
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === "light" || raw === "dark") stored = raw;
    } catch {
      // Storage blocked — the control still works for this page view.
    }
    setChoice(stored);
    setReady(true);
  }, []);

  function choose(next: Choice) {
    setChoice(next);
    apply(next);
    try {
      if (next === "auto") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Non-fatal: the choice holds until reload.
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label={a11y.themeGroup}
      className={`inline-flex items-center rounded-full border border-line bg-card p-0.5 shadow-e1 ${className}`}
    >
      {OPTIONS.map((option) => {
        const active = ready && choice === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={
              option.value === "light"
                ? a11y.themeToLight
                : option.value === "dark"
                  ? a11y.themeToDark
                  : a11y.themeAuto
            }
            onClick={() => choose(option.value)}
            className={`rounded-full px-2.5 py-1 font-mono text-mono uppercase tracking-[0.11em] transition-colors duration-[var(--dur-hover)] ${
              active
                ? "bg-inset text-ink"
                : "text-ink-4 hover:text-ink-2"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
