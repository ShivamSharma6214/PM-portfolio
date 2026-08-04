"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { buttons } from "@/src/content/microcopy";

interface CopyButtonProps {
  value: string;
  className?: string;
  /** Accessible name, since "Copy" alone is ambiguous out of context. */
  label: string;
}

/** `Copy` → `Copied`. Mono, beside the address. No icon. */
export function CopyButton({ value, className = "", label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard denied — the address is selectable text either way.
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className={`relative inline-flex h-8 items-center justify-center overflow-hidden rounded-full border border-line bg-card px-3.5 font-mono text-mono uppercase tracking-[0.13em] text-ink-3 shadow-e1 transition-colors duration-[var(--dur-hover)] hover:border-line-2 hover:text-ink ${className}`}
    >
      {/* Both labels are laid out in a hidden sibling so the pill never changes width. */}
      <span aria-hidden="true" className="invisible whitespace-nowrap">
        {buttons.copied}
      </span>
      <span className="absolute inset-0 grid place-items-center">
        {reduced ? (
          <span aria-live="polite">{copied ? buttons.copied : buttons.copy}</span>
        ) : (
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={copied ? "copied" : "copy"}
              aria-live="polite"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-110%", opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={copied ? "text-accent" : undefined}
            >
              {copied ? buttons.copied : buttons.copy}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </button>
  );
}
