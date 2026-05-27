"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// 7-day taps series
const data = [4, 7, 5, 9, 11, 8, 13];
const max = Math.max(...data);
const W = 320;
const H = 90;
const padX = 8;
const stepX = (W - padX * 2) / (data.length - 1);

const points = data.map((v, i) => ({
  x: padX + i * stepX,
  y: H - 8 - (v / max) * (H - 24),
}));
const path = points
  .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
  .join(" ");
const areaPath = `${path} L ${points[points.length - 1].x} ${H} L ${points[0].x} ${H} Z`;

export default function ActivityChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const days = ["月", "火", "水", "木", "金", "土", "日"];

  return (
    <div className="rounded-2xl glass p-5 relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-teal-400/15 blur-3xl pointer-events-none" />
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[10px] font-mono tracking-[0.2em] text-white/45">
            ACTIVITY · 7 DAYS
          </div>
          <div className="mt-1 font-display text-lg font-semibold">タップ推移</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-mono text-white/40">TOTAL</div>
          <div className="font-mono text-teal-300 font-bold text-xl">
            {data.reduce((a, b) => a + b, 0)}
          </div>
        </div>
      </div>

      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full mt-3"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#37e7c0" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#37e7c0" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="actStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7df5dc" />
            <stop offset="60%" stopColor="#37e7c0" />
            <stop offset="100%" stopColor="#9d7bff" />
          </linearGradient>
        </defs>

        {/* gridlines */}
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1={0}
            y1={H * g}
            x2={W}
            y2={H * g}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.5"
          />
        ))}

        {/* area fill */}
        <motion.path
          d={areaPath}
          fill="url(#actGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />

        {/* line */}
        <motion.path
          d={path}
          fill="none"
          stroke="url(#actStroke)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
        />

        {/* dots */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i === points.length - 1 ? 4 : 2.5}
            fill={i === points.length - 1 ? "#37e7c0" : "#0a0c10"}
            stroke="#37e7c0"
            strokeWidth="1.4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
          />
        ))}
      </svg>

      <div className="mt-2 flex justify-between text-[10px] font-mono text-white/35">
        {days.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}
