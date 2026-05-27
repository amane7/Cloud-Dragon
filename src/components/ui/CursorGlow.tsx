"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 18, mass: 0.4 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener?.("change", onChange);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      mq.removeEventListener?.("change", onChange);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed top-0 left-0 z-[60] w-[420px] h-[420px] rounded-full"
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(55,231,192,0.22) 0%, rgba(55,231,192,0.05) 35%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </motion.div>
  );
}
