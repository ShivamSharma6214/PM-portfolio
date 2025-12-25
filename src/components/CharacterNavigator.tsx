"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  characterTravel,
  dropdownVariants,
  glintVariants,
  navLabelVariants,
  ropeVariants,
} from "@/src/components/animationPresets";

export type NavKey = "home" | "projects" | "about" | "contact";

type NavItem = {
  id: NavKey;
  label: string;
  hint: string;
  position: { x: number; y: number };
};

type Props = {
  onNavigate?: (key: NavKey) => void;
};

const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Home",
    hint: "reset vantage point",
    position: { x: -40, y: 48 },
  },
  {
    id: "projects",
    label: "Projects",
    hint: "pulls docs into view",
    position: { x: 96, y: -60 },
  },
  {
    id: "about",
    label: "About",
    hint: "trajectory + toolkit",
    position: { x: -132, y: -74 },
  },
  {
    id: "contact",
    label: "Contact",
    hint: "availability + routes",
    position: { x: 122, y: 72 },
  },
];

const projectNotes = [
  {
    title: "Pulse Atlas",
    line: "Realtime ops cockpit that fused metrics with narrative notes to keep crews aligned.",
    tags: ["B2B", "Realtime", "Design-to-build"],
  },
  {
    title: "North Star Docs",
    line: "Living documentation pattern for PMs to ship updates without slowing engineers.",
    tags: ["Product Systems", "Docs", "Story-first"],
  },
];

export function CharacterNavigator({ onNavigate }: Props) {
  const [active, setActive] = useState<NavKey>("home");
  const activeItem = useMemo(
    () => NAV_ITEMS.find((item) => item.id === active) ?? NAV_ITEMS[0],
    [active]
  );
  const projectsAnchor = { x: 96, y: -140 };

  useEffect(() => {
    // Keep sections aligned with interaction; recruiters never wonder where they landed.
    onNavigate?.(active);
    const section = document.getElementById(`section-${active}`);
    section?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [active, onNavigate]);

  return (
    <div className="relative isolate flex w-full max-w-5xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/40 p-6 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.45)] backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
      <header className="flex items-center justify-between gap-3 text-sm uppercase tracking-[0.14em] text-slate-600 dark:text-slate-200">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Live navigation</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-white dark:bg-white dark:text-slate-900">{activeItem.label}</span>
          <span className="text-slate-500 dark:text-slate-300">{activeItem.hint}</span>
        </div>
      </header>

      <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-linear-to-br from-amber-100 via-white to-sky-100 p-3 ring-1 ring-slate-200/60 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 dark:ring-slate-700/60">
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-95 w-95 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-slate-900/10 via-slate-900/20 to-slate-900/30 blur-3xl dark:from-white/10 dark:via-white/20 dark:to-white/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <motion.path
            d="M130 260 Q 220 200 300 220 T 470 180"
            fill="none"
            stroke="url(#navStroke)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="6 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="navStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.7" />
            </linearGradient>
          </defs>
        </svg>

        <motion.div
          className="absolute left-1/2 top-1/2 h-14 w-12 -translate-x-1/2 -translate-y-1/2"
          animate={{ x: activeItem.position.x, y: activeItem.position.y }}
          transition={characterTravel}
        >
          <div className="relative h-full w-full">
            <motion.div
              className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-[14px] bg-slate-900 shadow-lg ring-4 ring-white/70 dark:bg-white dark:ring-slate-800"
              animate={{ rotate: [0, -4, 0, 4, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute left-1/2 top-1/2 h-2 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-[1px] dark:bg-slate-900/50"
                variants={glintVariants}
                initial="initial"
                animate="shimmer"
              />
              <div className="absolute inset-x-2 bottom-1 flex justify-between">
                <div className="h-2 w-2 rounded-full bg-white/90 dark:bg-slate-900" />
                <div className="h-2 w-2 rounded-full bg-white/90 dark:bg-slate-900" />
              </div>
            </motion.div>
            <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-2 text-[10px] uppercase tracking-[0.18em] text-slate-600/70 dark:text-slate-200/80">
              <span>guide</span>
            </div>
          </div>
        </motion.div>

        {NAV_ITEMS.map((item) => {
          const isActive = item.id === active;
          return (
            <motion.button
              key={item.id}
              className="group absolute rounded-full px-4 py-2 text-sm font-semibold text-slate-800 shadow-[0_10px_30px_-15px_rgba(15,23,42,0.45)] backdrop-blur transition hover:-translate-y-2 hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 dark:text-white dark:shadow-[0_10px_30px_-15px_rgba(15,23,42,0.75)] dark:hover:bg-white/10"
              style={{
                left: `calc(50% + ${item.position.x}px)`,
                top: `calc(50% + ${item.position.y}px)`,
                transform: "translate(-50%, -50%)",
              }}
              variants={navLabelVariants}
              initial="idle"
              animate={isActive ? "active" : "idle"}
              whileHover="hover"
              onClick={() => setActive(item.id)}
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>{item.label}</span>
              </div>
              <p className="mt-1 text-xs font-normal text-slate-500 group-hover:text-slate-700 dark:text-slate-300 dark:group-hover:text-white">
                {item.hint}
              </p>
            </motion.button>
          );
        })}

        <AnimatePresence>
          {active === "projects" && (
            <>
              <motion.div
                className="absolute h-32 w-0.75 rounded-full bg-linear-to-b from-slate-900 via-slate-800 to-slate-600 shadow-[0_10px_20px_-12px_rgba(15,23,42,0.65)] dark:from-white dark:via-slate-100 dark:to-slate-300"
                style={{
                  left: `calc(50% + ${projectsAnchor.x}px)`,
                  top: `calc(50% + ${projectsAnchor.y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
                variants={ropeVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              />
              <motion.div
                className="absolute w-65 max-w-[72vw] -translate-x-1/2 rounded-2xl bg-white/95 p-4 shadow-2xl ring-1 ring-slate-200/80 dark:bg-slate-800/95 dark:ring-slate-700"
                style={{
                  left: `calc(50% + ${projectsAnchor.x - 10}px)`,
                  top: `calc(50% + ${projectsAnchor.y + 130}px)`,
                  transform: "translate(-50%, -50%)",
                }}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-300">
                  <span>Docs pulled down</span>
                  <span>In preview</span>
                </div>
                <div className="flex flex-col gap-3">
                  {projectNotes.map((note) => (
                    <div
                      key={note.title}
                      className="rounded-xl border border-slate-200/70 bg-linear-to-br from-amber-50 via-white to-sky-50 p-3 text-left shadow-sm dark:border-slate-700 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700"
                    >
                      <div className="flex items-center justify-between gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                        <span>{note.title}</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-amber-600 dark:text-amber-300">live</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-200">{note.line}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-200">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/70 px-2 py-1 ring-1 ring-slate-200/80 dark:bg-slate-900/60 dark:ring-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
