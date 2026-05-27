"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ReactNode, useRef, MouseEvent } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg";

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  ariaLabel?: string;
}

const variantClass: Record<Variant, string> = {
  primary:
    "bg-teal-300 text-ink-950 hover:bg-teal-200 shadow-xl shadow-teal-500/30 hover:shadow-teal-500/40",
  ghost:
    "bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20",
  outline:
    "border border-white/15 text-white/85 hover:bg-white/5 hover:border-white/25",
};
const sizeClass: Record<Size, string> = {
  md: "px-5 py-2.5 text-[13px]",
  lg: "px-6 py-3.5 text-sm",
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  iconLeft,
  iconRight,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const ix = useSpring(x, { stiffness: 260, damping: 22, mass: 0.3 });
  const iy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.3 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * 0.22);
    y.set((e.clientY - cy) * 0.22);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const innerStyle = reduced
    ? undefined
    : { x: ix.get() * 0.5 ? undefined : undefined };

  const base = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus-ring overflow-hidden whitespace-nowrap",
    variantClass[variant],
    sizeClass[size],
    className
  );

  const content = (
    <>
      {/* Hover shimmer */}
      <span
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100"
        style={{
          background:
            "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
          mixBlendMode: "overlay",
        }}
      />
      <motion.span
        className="relative inline-flex items-center gap-2"
        style={reduced ? undefined : { x: ix, y: iy, scale: 1 }}
      >
        {iconLeft}
        <span>{children}</span>
        {iconRight}
      </motion.span>
    </>
  );

  const wrapper = (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={reduced ? undefined : { x: sx, y: sy }}
      className="inline-block"
    >
      {href ? (
        <Link href={href} aria-label={ariaLabel} className={base}>
          {content}
        </Link>
      ) : (
        <button onClick={onClick} aria-label={ariaLabel} className={base}>
          {content}
        </button>
      )}
    </motion.div>
  );

  return wrapper;
}
