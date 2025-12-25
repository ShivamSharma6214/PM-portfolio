"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type EdgeKey = "left" | "top" | "right" | "home" | null;

const accent = "#0f766e";

function distanceToCenter(point: { x: number; y: number }, ref: HTMLDivElement | null) {
  if (!ref) return 999;
  const rect = ref.getBoundingClientRect();
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const dx = point.x - cx;
  const dy = point.y - cy;
  return Math.sqrt(dx * dx + dy * dy);
}

export function EdgeReveal() {
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const [edge, setEdge] = useState<EdgeKey>(null);
  const [homePulse, setHomePulse] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const threshold = 72;

  const handleMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setPointer({ x, y });
    if (!hasMoved) setHasMoved(true);
    const distLeft = x;
    const distRight = rect.width - x;
    const distTop = y;

    let next: EdgeKey = null;
    const minDist = Math.min(distLeft, distRight, distTop);
    if (minDist <= threshold) {
      if (distLeft === minDist) next = "left";
      else if (distRight === minDist) next = "right";
      else next = "top";
    }
    setEdge(next);
  };

  const handleLeave = () => setEdge(null);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const radius = Math.sqrt(x * x + y * y);
    if (radius < 120) {
      setEdge("home");
      setHomePulse(true);
      setTimeout(() => setHomePulse(false), 500);
    }
  };

  return (
    <div
      ref={fieldRef}
      className="relative isolate h-[78vh] w-full select-none bg-[#fdfbf7]"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: accent }}
        animate={{
          width: homePulse ? 14 : 10,
          height: homePulse ? 14 : 10,
          scale: 1 + Math.max(0, 0.3 - Math.min(0.3, distanceToCenter(pointer, fieldRef.current) / 400)),
          opacity: 1,
        }}
        transition={{ duration: 0.15, ease: "linear" }}
      />

      <AnimatePresence>
        {!hasMoved && (
          <motion.div
            className="absolute left-1/2 top-[52%] -translate-x-1/2 text-sm font-semibold uppercase tracking-[0.24em] text-slate-700"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3, ease: "linear" }}
          >
            Move
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {edge === "left" && (
          <motion.div
            key="left"
            className="absolute left-0 top-1/2 -translate-y-1/2 text-left"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 18, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
          >
            <div className="text-3xl font-semibold tracking-[0.18em] text-slate-900">PROJECTS</div>
            <div className="mt-1 text-sm font-semibold uppercase tracking-[0.24em] text-slate-700">Decisions · Artifacts</div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {edge === "right" && (
          <motion.div
            key="right"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-right"
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: -18, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
          >
            <div className="text-3xl font-semibold tracking-[0.18em] text-slate-900">CONTACT</div>
            <div className="mt-1 text-sm font-semibold uppercase tracking-[0.24em] text-slate-700">Availability</div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {edge === "top" && (
          <motion.div
            key="top"
            className="absolute left-1/2 top-0 -translate-x-1/2 text-center"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 18, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
          >
            <div className="text-3xl font-semibold tracking-[0.18em] text-slate-900">ABOUT</div>
            <div className="mt-1 text-sm font-semibold uppercase tracking-[0.24em] text-slate-700">Trajectory</div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {edge === "home" && (
          <motion.div
            key="home"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
          >
            <div className="text-2xl font-semibold tracking-[0.2em] text-slate-900">HOME</div>
            <div className="mt-1 text-sm font-semibold uppercase tracking-[0.24em] text-slate-700">Reset</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
