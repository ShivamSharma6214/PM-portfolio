"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const accent = "#5efc8d";

export function SystemCursor() {
  const mvX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mvY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const x = useSpring(mvX, { stiffness: 180, damping: 22, mass: 0.6 });
  const y = useSpring(mvY, { stiffness: 180, damping: 22, mass: 0.6 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mvX.set(e.clientX);
      mvY.set(e.clientY);
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, [mvX, mvY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 shadow-[0_0_18px_rgba(94,252,141,0.45)] mix-blend-screen"
      style={{ x, y, backgroundColor: "rgba(255,255,255,0.1)", boxShadow: `0 0 12px ${accent}` }}
    />
  );
}
