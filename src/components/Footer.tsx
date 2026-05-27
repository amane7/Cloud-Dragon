"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const PRODUCT_LINKS = [
  { href: "/app", label: "App" },
  { href: "/app/tap", label: "Tap to Connect" },
  { href: "/network", label: "人脈ネットワーク" },
  { href: "/identity", label: "マルチコンテキストID" },
  { href: "/trust", label: "信用スコア" },
];

const COMPANY_LINKS = [
  { href: "/business-plan", label: "事業計画" },
  { href: "/business-plan#team", label: "Team" },
  { href: "/business-plan#contact", label: "Contact" },
  { href: "mailto:hello@tagr.cloud", label: "hello@tagr.cloud", external: true },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] mt-24 overflow-hidden">
      {/* Decorative dragon line */}
      <svg
        viewBox="0 0 1200 80"
        className="absolute inset-x-0 -top-px h-12 w-full pointer-events-none opacity-50"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="dragonGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#37e7c0" stopOpacity="0" />
            <stop offset="50%" stopColor="#37e7c0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#9d7bff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 40 Q 200 0 400 40 T 800 40 T 1200 40"
          stroke="url(#dragonGrad)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <Reveal className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <motion.div
                whileHover={{ rotate: [0, -6, 6, 0] }}
                transition={{ duration: 0.6 }}
                className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-teal-300 to-teal-600 grid place-items-center text-ink-950 font-black text-sm shadow-lg shadow-teal-500/30"
              >
                T
                <span className="sparkle" style={{ top: -3, right: -3 }} />
              </motion.div>
              <div>
                <div className="font-display font-bold tracking-tight">
                  Tagr<span className="text-teal-300">.</span>
                </div>
                <div className="text-[10px] text-white/40 font-mono tracking-[0.2em]">
                  CLOUD · DRAGON / NFC × ID
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm text-white/55 max-w-md leading-relaxed">
              かざすだけで、人と人がつながる。<br />
              いくつもの顔をもつ私たちのための、<br />
              新しいIDのかたち。
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/60 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-300 dot-pulse text-teal-300" />
              β · v0.1 · 2026
            </div>

            {/* Dragon signature */}
            <div className="mt-7 max-w-md">
              <svg
                viewBox="0 0 240 36"
                className="w-full h-9"
                aria-hidden
              >
                <defs>
                  <linearGradient id="signGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7df5dc" />
                    <stop offset="50%" stopColor="#37e7c0" />
                    <stop offset="100%" stopColor="#9d7bff" />
                  </linearGradient>
                </defs>
                {/* Dragon-like wavy signature */}
                <motion.path
                  d="M5 22 C 25 4, 45 32, 70 14 S 110 30, 135 16 S 175 28, 200 14 S 225 24, 235 18"
                  stroke="url(#signGrad)"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
                />
                <motion.circle
                  cx="235"
                  cy="18"
                  r="1.8"
                  fill="#9d7bff"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5, type: "spring", stiffness: 240 }}
                />
              </svg>
              <div className="mt-1 text-[10px] font-mono tracking-[0.22em] text-white/35">
                CLOUD DRAGON — SIGNATURE
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h4 className="text-[11px] font-mono tracking-[0.2em] text-white/40 mb-4">
              PRODUCT
            </h4>
            <ul className="space-y-2.5 text-sm text-white/65">
              {PRODUCT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="link-anim inline-flex items-center gap-1 hover:text-white"
                  >
                    {l.label}
                    <span className="arrow opacity-0 group-hover:opacity-100">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h4 className="text-[11px] font-mono tracking-[0.2em] text-white/40 mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-sm text-white/65">
              {COMPANY_LINKS.map((l) =>
                l.external ? (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="link-anim inline-flex items-center gap-1 hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ) : (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="link-anim inline-flex items-center gap-1 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </Reveal>
        </div>

        {/* Final CTA */}
        <Reveal delay={0.1}>
          <div className="mt-12 rounded-2xl holo p-6 md:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono tracking-[0.22em] text-teal-200/80">
                LAST CALL
              </div>
              <div className="mt-1 font-display text-xl md:text-2xl font-semibold">
                次にタップで出会うのは、誰だろう。
              </div>
            </div>
            <Link
              href="/app/tap"
              className="link-anim px-5 py-2.5 rounded-lg bg-teal-300 text-ink-950 font-semibold text-sm hover:bg-teal-200 transition shadow-lg shadow-teal-500/30 whitespace-nowrap"
            >
              タップを体験する <span className="arrow">→</span>
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-white/40 font-mono">
          <div>© 2026 Cloud Dragon. All rights reserved.</div>
          <div className="flex gap-5">
            <span>TAGR / NFC × ID</span>
            <span>PITCH · V0.1 · 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
