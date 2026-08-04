"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  /** Seconds. Use small values — this is a reveal, not a sequence. */
  delay?: number;
  /** Travel distance in px. 24 is the house default. */
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
}

/**
 * Section reveal: opacity 0→1, translateY 24px→0, 700ms, ease-out-expo.
 *
 * Runs once and settles — nothing here loops, pulses or bounces. With
 * `prefers-reduced-motion` the element renders in its final state immediately and
 * no placeholder or apology is shown.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </Component>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Seconds between children. 60ms is the house stagger. */
  stagger?: number;
  as?: "div" | "ul" | "ol" | "dl";
}

/** Parent that staggers `RevealChild` descendants. */
export function Stagger({
  children,
  className,
  stagger = 0.06,
  as = "div",
}: StaggerProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </Component>
  );
}

interface RevealChildProps {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "article" | "dt" | "dd";
}

export function RevealChild({
  children,
  className,
  y = 20,
  as = "div",
}: RevealChildProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        shown: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
    >
      {children}
    </Component>
  );
}
