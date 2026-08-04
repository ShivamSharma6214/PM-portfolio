"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

interface DrawRuleProps {
  /** Sizing and placement for the rule's track. */
  className?: string;
  /** Seconds. 900ms under the hero headline; longer for the Method spine. */
  duration?: number;
  delay?: number;
  orientation?: "horizontal" | "vertical";
  tone?: "line" | "line-2";
}

const TONE = { line: "bg-line", "line-2": "bg-line-2" } as const;

/**
 * A single hairline that draws itself. The only motion in the hero besides the
 * headline mask, and the connective tissue down the Method section.
 *
 * The observer sits on the track, not on the scaled bar — a bar at `scale 0` has no
 * area to intersect with, so it could never trigger its own reveal.
 */
export function DrawRule({
  className = "",
  duration = 0.9,
  delay = 0,
  orientation = "horizontal",
  tone = "line-2",
}: DrawRuleProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -5% 0px" });
  const axis = orientation === "horizontal" ? "scaleX" : "scaleY";

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      {reduced ? (
        <div className={`h-full w-full ${TONE[tone]}`} />
      ) : (
        <motion.div
          className={`h-full w-full ${TONE[tone]}`}
          style={{
            transformOrigin:
              orientation === "horizontal" ? "left center" : "center top",
          }}
          initial={{ [axis]: 0 }}
          animate={inView ? { [axis]: 1 } : { [axis]: 0 }}
          transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </div>
  );
}
