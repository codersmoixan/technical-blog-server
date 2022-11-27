import type { Variants } from "framer-motion";

export const contentVariants: Variants = {
  open: {
    clipPath: "none",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5,
      delayChildren: 0.3,
      staggerChildren: 0.05
    }
  },
  closed: {
    clipPath: "none",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.5
    }
  }
}

export const stiffnessVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};
