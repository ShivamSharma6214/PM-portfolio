"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ElementType } from "react";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface MaskLinesProps {
  /** Explicit lines. Authored, not measured — so the break never lands badly. */
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  /** Seconds between lines. 60ms is the house stagger. */
  stagger?: number;
  delay?: number;
}

/**
 * Line-by-line mask reveal. Headings only.
 *
 * Each line sits in an `overflow-hidden` box and slides up from beneath it, so the
 * type reads as uncovered rather than as flown in. 900ms per line, 60ms stagger.
 *
 * The in-view observer sits on the heading itself, never on the masked span. A span
 * translated fully below its clipping parent has an empty intersection rectangle, so
 * observing it would mean waiting on an element that cannot become visible until the
 * animation it is waiting for has already run.
 */
export function MaskLines({
  lines,
  as: Tag = "h2",
  className,
  stagger = 0.06,
  delay = 0,
}: MaskLinesProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });

  if (reduced) {
    return (
      <Tag className={className}>
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, index) => (
        <span
          key={line}
          className="block overflow-hidden"
          // Descenders would otherwise be clipped by the mask.
          style={{ paddingBottom: "0.09em", marginBottom: "-0.09em" }}
        >
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.9,
              delay: delay + index * stagger,
              ease: EASE_OUT_EXPO,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
