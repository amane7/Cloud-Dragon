"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: sx, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 z-[70] h-[2px] bg-gradient-to-r from-teal-300 via-accent-violet to-teal-300"
    />
  );
}
