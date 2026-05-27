"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ReactNode, useRef, MouseEvent } from "react";
import { cn } from "@/lib/cn";

interface Props {
  children: ReactNode;
  className?: string;
  max?: number; // degrees
  scale?: number;
  glare?: boolean;
}

export default function Tilt3D({
  children,
  className,
  max = 10,
  scale = 1.02,
  glare = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.5 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);

  // glare position
  const gx = useTransform(sx, [-0.5, 0.5], ["0%", "100%"]);
  const gy = useTransform(sy, [-0.5, 0.5], ["0%", "100%"]);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    x.set(px);
    y.set(py);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        reduced
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1200,
              transformStyle: "preserve-3d",
              scale,
            }
      }
      className={cn("relative will-change-transform", className)}
    >
      {children}
      {glare && !reduced && (
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{
            background: useTransform(
              [gx, gy],
              ([gxv, gyv]) =>
                `radial-gradient(420px circle at ${gxv} ${gyv}, rgba(255,255,255,0.18), transparent 50%)`
            ) as any,
            mixBlendMode: "overlay",
          }}
        />
      )}
    </motion.div>
  );
}
