"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import NfcCard from "@/components/NfcCard";

export default function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 80, damping: 16, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 80, damping: 16, mass: 0.6 });

  // parallax outputs
  const phoneX = useTransform(smx, [-0.5, 0.5], [10, -10]);
  const phoneY = useTransform(smy, [-0.5, 0.5], [8, -8]);
  const cardX = useTransform(smx, [-0.5, 0.5], [22, -22]);
  const cardY = useTransform(smy, [-0.5, 0.5], [18, -18]);
  const orbX = useTransform(smx, [-0.5, 0.5], [-30, 30]);
  const orbY = useTransform(smy, [-0.5, 0.5], [-20, 20]);

  useEffect(() => {
    if (reduced) return;
    function onMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - (r.left + r.width / 2)) / r.width;
      const py = (e.clientY - (r.top + r.height / 2)) / r.height;
      mx.set(Math.max(-0.5, Math.min(0.5, px)));
      my.set(Math.max(-0.5, Math.min(0.5, py)));
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced]);

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center min-h-[480px] select-none"
    >
      {/* Background orbs */}
      <motion.div
        style={reduced ? undefined : { x: orbX, y: orbY }}
        className="absolute inset-0 grid place-items-center pointer-events-none"
      >
        <div className="orb w-[420px] h-[420px] bg-teal-500/40" />
      </motion.div>

      {/* Rings */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative w-[380px] h-[380px]">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-teal-400/30"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.6, 1.8], opacity: [0.6, 0] }}
              transition={{
                duration: 3.4,
                delay: i * 1.1,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
          <div className="absolute inset-0 rounded-full border border-teal-400/25" />
          <div className="absolute inset-6 rounded-full border border-teal-400/15" />
          <div className="absolute inset-12 rounded-full border border-teal-400/10" />
          {/* Orbital dots */}
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const r = 190;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            return (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-teal-300"
                style={{ x, y, marginLeft: -4, marginTop: -4 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1], scale: [0, 1, 0.7, 1] }}
                transition={{
                  duration: 3.6,
                  delay: 0.6 + i * 0.18,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Phone */}
      <motion.div
        style={reduced ? undefined : { x: phoneX, y: phoneY }}
        initial={{ y: 30, opacity: 0, rotate: -8 }}
        animate={{ y: 0, opacity: 1, rotate: -8 }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
        className="relative z-10"
      >
        <div className="w-[230px] h-[440px] rounded-[42px] bg-gradient-to-b from-ink-700 to-ink-900 border border-white/[0.1] shadow-2xl shadow-black/60 p-2">
          <div className="w-full h-full rounded-[36px] bg-ink-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full" />
            <div className="relative px-4 pt-12 pb-4 h-full flex flex-col">
              <div className="text-[9px] font-mono tracking-[0.2em] text-white/40">
                TAGR · TAP
              </div>
              <div className="mt-2 font-display text-base font-semibold">
                かざして、つながる
              </div>
              <div className="text-[11px] text-white/50 mt-1 leading-relaxed">
                連絡先、自己紹介、記録 — タップ1回で完了
              </div>

              {/* Live-typing-like progress */}
              <motion.div
                className="mt-4 h-1 rounded-full bg-white/8 overflow-hidden"
                aria-hidden
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-teal-300 via-accent-violet to-teal-300"
                  initial={{ width: "0%" }}
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{
                    duration: 3.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              <div className="mt-auto">
                <motion.div
                  className="rounded-xl glass p-3"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                >
                  <div className="text-[10px] font-mono text-teal-200/80 tracking-[0.18em] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
                    CONNECTED
                  </div>
                  <div className="text-sm font-semibold mt-1">佐藤 健司</div>
                  <div className="text-[11px] text-white/45">
                    Cloud Dragon · 2分前
                  </div>
                </motion.div>
                <div className="mt-3 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-300/15 border border-teal-300/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-[0.2em] text-teal-200">
                      NFC READY
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating card */}
      <motion.div
        style={reduced ? undefined : { x: cardX, y: cardY }}
        initial={{ opacity: 0, y: 30, rotate: 10 }}
        animate={{
          opacity: 1,
          y: [0, -10, 0],
          rotate: 10,
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.4 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute z-20 right-2 bottom-4"
      >
        <NfcCard variant="compact" />
      </motion.div>

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute top-6 left-2 px-3 py-1.5 rounded-full glass text-[10px] font-mono tracking-[0.18em] text-teal-200"
      >
        💼 WORK FACE
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-4 px-3 py-1.5 rounded-full glass text-[10px] font-mono tracking-[0.18em] text-violet-200"
      >
        🐉 COMMUNITY
      </motion.div>
    </div>
  );
}
