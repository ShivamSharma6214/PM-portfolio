"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const accent = "#0f766e";

export type NavKey = "home" | "projects" | "about" | "contact";

type NavItem = {
  id: NavKey;
  label: string;
  detail: string;
  position: { x: number; y: number };
};

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", detail: "Reset to overview", position: { x: -180, y: -40 } },
  { id: "projects", label: "Projects", detail: "Decisions and artifacts", position: { x: 160, y: -20 } },
  { id: "about", label: "About", detail: "Trajectory", position: { x: -120, y: 120 } },
  { id: "contact", label: "Contact", detail: "Availability", position: { x: 140, y: 120 } },
];

const PANEL_COPY: Record<NavKey, { title: string; lines: string[] }> = {
  home: { title: "Home", lines: ["System map overview", "Calm reset point"] },
  projects: {
    title: "Projects",
    lines: ["Decisions, artifacts, operator notes", "Outcome-focused, not a grid"],
  },
  about: { title: "About", lines: ["Trajectory across product + docs", "Teams led: pods, design partnerships"] },
  contact: { title: "Contact", lines: ["Availability: consulting and product roles", "Email: sharmashivam6214@gmail.com"] },
};

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function WorkspaceNavigation() {
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const [hasMoved, setHasMoved] = useState(false);
  const [activePanel, setActivePanel] = useState<NavKey | null>(null);
  const [cursorPoint, setCursorPoint] = useState({ x: 0, y: 0 });

  const nearest = useMemo(() => {
    if (!hasMoved) return null;
    let winner: NavKey | null = null;
    let best = Infinity;
    NAV_ITEMS.forEach((item) => {
      const d = distance(cursorPoint, item.position);
      if (d < best) {
        best = d;
        winner = item.id;
      }
    });
    return winner;
  }, [cursorPoint, hasMoved]);

  return (
    <div className="relative isolate flex flex-col gap-4 rounded-2xl border border-slate-300 bg-white p-6 shadow-[0_14px_34px_-26px_rgba(15,23,42,0.45)]">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-slate-700">
        <span>Workspace field</span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
          <span>Move to reveal</span>
        </span>
      </div>

      <div
        ref={fieldRef}
        className="relative mt-2 h-128 w-full overflow-hidden rounded-xl border border-slate-200 bg-[#fdfcf9]"
      >
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-40">
          {[...Array(24)].map((_, idx) => (
            <div key={idx} className="border border-slate-200/70" />
          ))}
        </div>

        <motion.div
          drag
          dragConstraints={fieldRef}
          dragElastic={0.12}
          dragMomentum={false}
          className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-slate-900 bg-white shadow-md"
          whileTap={{ scale: 0.96 }}
          onDragStart={() => setHasMoved(true)}
          onDrag={(event, info) => {
            const rect = fieldRef.current?.getBoundingClientRect();
            if (!rect) return;
            setCursorPoint({ x: info.point.x - rect.left - rect.width / 2, y: info.point.y - rect.top - rect.height / 2 });
          }}
          onDragEnd={() => setActivePanel(nearest ?? null)}
        >
          <div className="absolute inset-2 rounded-full" style={{ backgroundColor: accent }} />
        </motion.div>

        <AnimatePresence>
          {hasMoved && (
            <motion.div
              className="absolute left-1/2 top-1/2 h-px w-px"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {NAV_ITEMS.map((item) => {
                const isNearest = nearest === item.id;
                return (
                  <motion.button
                    key={item.id}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-md border border-slate-300 bg-white px-4 py-2 text-left shadow-sm"
                    style={{ left: item.position.x, top: item.position.y }}
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 170, damping: 18 }}
                    onClick={() => setActivePanel(item.id)}
                  >
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: accent }} />
                      <span>{item.label}</span>
                    </div>
                    <p className="text-xs text-slate-600">{item.detail}</p>
                    <motion.div
                      className="mt-2 h-0.5 w-full"
                      style={{ backgroundColor: accent }}
                      animate={{ scaleX: isNearest ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                    />
                  </motion.button>
                );
              })}

              {NAV_ITEMS.map((item) => (
                <motion.div
                  key={`line-${item.id}`}
                  className="absolute origin-center"
                  style={{
                    left: item.position.x,
                    top: item.position.y,
                    width: 1,
                    height: 1,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div
                    className="pointer-events-none"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: Math.max(1, Math.abs(item.position.x)),
                      height: Math.max(1, Math.abs(item.position.y)),
                      transform: `translate(${item.position.x > 0 ? -item.position.x : 0}px, ${item.position.y > 0 ? -item.position.y : 0}px)`,
                      borderLeft: `1px solid ${accent}`,
                      borderTop: `1px solid ${accent}`,
                      opacity: 0.25,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {activePanel && (
          <motion.div
            key={activePanel}
            className="relative w-full overflow-hidden rounded-xl border border-slate-300 bg-white p-4 shadow-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-600">Panel</p>
                <h2 className="text-xl font-semibold text-slate-900">{PANEL_COPY[activePanel].title}</h2>
              </div>
              <button
                className="rounded-md border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-800 hover:bg-slate-100"
                onClick={() => setActivePanel(null)}
              >
                Close
              </button>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {PANEL_COPY[activePanel].lines.map((line) => (
                <li key={line} className="flex items-center gap-2">
                  <span className="h-1.5 w-4" style={{ backgroundColor: accent }} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
