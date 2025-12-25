"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const accent = "#0f766e";

type SectionKey = "projects" | "about" | "contact";

type Section = {
  key: SectionKey;
  title: string;
  line: string;
};

const SECTIONS: Section[] = [
  { key: "projects", title: "Projects", line: "Decisions, artifacts, outcomes" },
  { key: "about", title: "About", line: "Trajectory, practice" },
  { key: "contact", title: "Contact", line: "Availability" },
];

export function SpreadBoard() {
  const [active, setActive] = useState<SectionKey | null>("projects");

  const sizing = useMemo(() => {
    return {
      projects: active === "projects" ? 1.2 : 0.9,
      about: active === "about" ? 1.1 : 0.9,
      contact: active === "contact" ? 1.05 : 0.85,
    } satisfies Record<SectionKey, number>;
  }, [active]);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-12 gap-6">
        {SECTIONS.map((section) => (
          <motion.section
            key={section.key}
            layout
            onClick={() => setActive(section.key)}
            className="cursor-pointer border-b border-slate-200 pb-4"
            style={{
              gridColumn:
                section.key === "projects" ? "span 7 / span 7" : section.key === "about" ? "span 3 / span 3" : "span 2 / span 2",
            }}
            animate={{
              flexGrow: sizing[section.key],
              opacity: active && active !== section.key ? 0.65 : 1,
              x: active === section.key ? 0 : 0,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 26 }}
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-slate-600">
              <span>{section.title}</span>
              <span className="h-px flex-1 mx-3" style={{ backgroundColor: active === section.key ? accent : "#cbd5e1" }} />
              <span className="text-[10px] font-semibold" style={{ color: active === section.key ? accent : "#64748b" }}>
                {active === section.key ? "focused" : "ready"}
              </span>
            </div>
            <motion.div
              layout
              className="mt-3 text-3xl font-semibold tracking-tight text-slate-900"
              animate={{ letterSpacing: active === section.key ? "0.02em" : "0em" }}
              transition={{ duration: 0.2 }}
            >
              {section.title}
            </motion.div>
            <motion.p
              layout
              className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-700"
              animate={{ color: active === section.key ? accent : "#334155" }}
              transition={{ duration: 0.2 }}
            >
              {section.line}
            </motion.p>

            <motion.div
              layout
              className="mt-4 text-sm leading-relaxed text-slate-700"
              animate={{ opacity: active === section.key ? 1 : 0.78, y: active === section.key ? 0 : 2 }}
              transition={{ duration: 0.25 }}
            >
              {section.key === "projects" && (
                <div className="space-y-1">
                  <div>Ops cockpit, narrative specs, launch capsules.</div>
                  <div className="text-[12px] uppercase tracking-[0.18em]" style={{ color: accent }}>
                    Outcomes oriented
                  </div>
                </div>
              )}
              {section.key === "about" && (
                <div className="space-y-1">
                  <div>Product + documentation lead. Systems over slides.</div>
                  <div className="text-[12px] uppercase tracking-[0.18em]" style={{ color: accent }}>
                    Trajectory
                  </div>
                </div>
              )}
              {section.key === "contact" && (
                <div className="space-y-1">
                  <div>Available for product leadership and consults.</div>
                  <div className="text-[12px] uppercase tracking-[0.18em]" style={{ color: accent }}>
                    Email: sharmashivam6214@gmail.com
                  </div>
                </div>
              )}
            </motion.div>
          </motion.section>
        ))}
      </div>

      <motion.div
        layout
        className="flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-slate-600"
      >
        <span style={{ backgroundColor: accent }} className="h-2 w-2 rounded-full" />
        <span>Click a section to focus. Others stay in view.</span>
      </motion.div>
    </div>
  );
}
