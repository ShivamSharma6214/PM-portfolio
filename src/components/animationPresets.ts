import { Transition, Variants } from "framer-motion";

// Shared spring motion used for character travel so movement feels weighted and intentional.
export const characterTravel: Transition = {
  type: "spring",
  stiffness: 160,
  damping: 18,
  mass: 1.1,
};

export const navLabelVariants: Variants = {
  idle: { opacity: 0.78, y: 0 },
  hover: { opacity: 1, y: -4 },
  active: { opacity: 1, y: -6, scale: 1.02 },
};

// Rope drop used when the character pulls the Projects list into view.
export const ropeVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0, originY: 0 },
  visible: {
    scaleY: 1,
    opacity: 1,
    originY: 0,
    transition: { type: "spring", stiffness: 120, damping: 12 },
  },
};

export const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 16 },
  },
};

export const glintVariants: Variants = {
  initial: { opacity: 0, rotate: 6 },
  shimmer: {
    opacity: [0, 0.5, 0],
    rotate: [6, -4, 6],
    transition: { repeat: Infinity, duration: 3.6, ease: "easeInOut" },
  },
};

export const floatingNoteVariants: Variants = {
  initial: { opacity: 0, y: 16, rotate: -1 },
  enter: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: "spring", stiffness: 120, damping: 14, delay: 0.1 },
  },
};
