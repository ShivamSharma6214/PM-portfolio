"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, Transition } from "framer-motion";

export type NavKey = "home" | "projects" | "about" | "contact";

const accent = "#0f766e";

const NODES: { id: NavKey; label: string; note: string; pos: { x: number; y: number } }[] = [
  { id: "home", label: "Home", note: "overview", pos: { x: -120, y: -40 } },
  { id: "projects", label: "Projects", note: "decisions, artifacts", pos: { x: 160, y: -20 } },
  { id: "about", label: "About", note: "trajectory", pos: { x: -40, y: 120 } },
  { id: "contact", label: "Contact", note: "availability", pos: { x: 180, y: 120 } },
];

const PANEL: Record<NavKey, { title: string; lines: string[] }> = {
  home: { title: "Home", lines: ["Blueprint overview", "Navigation anchor"] },
  projects: { title: "Projects", lines: ["Decisions and artifacts", "Context before delivery"] },
  about: { title: "About", lines: ["Trajectory across product and docs", "Systems thinking"] },
  contact: { title: "Contact", lines: ["Availability: consulting + product", "Email: sharmashivam6214@gmail.com"] },
};

const panelTransition: Transition = { type: "spring", stiffness: 200, damping: 22 };

export function ControlTable() {
  const [active, setActive] = useState<NavKey | null>(null);

  const origin = useMemo(() => ({ x: 0, y: 0 }), []);

  return (
    <div className="relative isolate flex flex-col gap-4 rounded-xl border border-slate-300 bg-white p-6">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-slate-700">
        <span>Living blueprint</span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: accent }} />
          <span>Interaction reveals structure</span>
        </span>
      </div>

      <div className="relative mt-2 grid min-h-120 place-items-center overflow-hidden rounded-lg border border-slate-200 bg-[#f9f8f4]">
        {/* Light grid using simple lines to avoid gradients */}
        <div className="pointer-events-none absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute inset-y-0 w-px bg-slate-200/70"
              style={{ left: `${(i + 1) * 16}%` }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute inset-x-0 h-px bg-slate-200/70"
              style={{ top: `${(i + 1) * 20}%` }}
            />
          ))}
        </div>

        <svg className="absolute inset-0" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <g transform="translate(400 260)">
            {NODES.map((node) => (
              <AnimatePresence key={`line-${node.id}`}>
                {active === node.id && (
                  <motion.line
                    x1={origin.x}
                    y1={origin.y}
                    x2={node.pos.x}
                    y2={node.pos.y}
                    stroke={accent}
                    strokeWidth={1.5}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    exit={{ pathLength: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                )}
              </AnimatePresence>
            ))}
          </g>
        </svg>

        <div className="relative h-full w-full" aria-hidden>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.16em] text-slate-500">
            <div className="mx-auto mb-2 h-2 w-2 rounded-sm border border-slate-400" />
            <p className="text-center">Control point</p>
          </div>

          {NODES.map((node) => (
            <motion.button
              key={node.id}
              onClick={() => setActive(active === node.id ? null : node.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-sm border border-slate-300 px-3 py-2 text-left shadow-[0_0_0_1px_rgba(15,23,42,0.04)]"
              style={{
                left: `calc(50% + ${node.pos.x}px)`,
                top: `calc(50% + ${node.pos.y}px)`,
              }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <span className="h-2 w-2 rounded-sm border border-slate-400" style={{ backgroundColor: active === node.id ? accent : "transparent" }} />
                <span>{node.label}</span>
              </div>
              <p className="text-[11px] text-slate-600">{node.note}</p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key={active}
            className="relative overflow-hidden rounded-lg border border-slate-300 bg-white p-4"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={panelTransition}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm uppercase tracking-[0.16em] text-slate-700">Layer detail</div>
              <button
                className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-700"
                onClick={() => setActive(null)}
              >
                Close
              </button>
            </div>
            <div className="mt-3 border-t border-slate-200 pt-3">
              <h2 className="text-xl font-semibold text-slate-900">{PANEL[active].title}</h2>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {PANEL[active].lines.map((line) => (
                  <li key={line} className="flex items-center gap-2">
                    <span className="h-1 w-5" style={{ backgroundColor: accent }} />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
