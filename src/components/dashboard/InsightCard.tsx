"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Counter from "@/components/ui/Counter";

interface Props {
  label: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  delta?: { value: number; positive?: boolean; suffix?: string };
  hint?: string;
  icon?: ReactNode;
}

export default function InsightCard({
  label,
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  delta,
  hint,
  icon,
}: Props) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="rounded-2xl glass p-4 card-shimmer relative overflow-hidden"
    >
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-mono tracking-[0.2em] text-white/45">
          {label}
        </div>
        {icon && (
          <div className="w-7 h-7 rounded-md bg-teal-300/10 border border-teal-300/20 grid place-items-center text-teal-300">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <Counter
          value={value}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          className="font-display text-2xl font-bold text-gradient-teal"
        />
        {delta && (
          <span
            className={`text-[11px] font-mono ${
              delta.positive ? "text-teal-300" : "text-rose-300"
            }`}
          >
            {delta.positive ? "▲" : "▼"} {delta.value}
            {delta.suffix ?? ""}
          </span>
        )}
      </div>
      {hint && <div className="mt-1 text-[11px] text-white/45">{hint}</div>}

      <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-teal-400/8 blur-3xl pointer-events-none" />
    </motion.div>
  );
}
