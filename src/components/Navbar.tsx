"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/app", label: "App" },
  { href: "/network", label: "人脈" },
  { href: "/identity", label: "いくつもの顔" },
  { href: "/trust", label: "信用スコア" },
  { href: "/business-plan", label: "事業計画" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function triggerCmdK() {
    // Dispatch synthetic ⌘K to open palette
    const evt = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    window.dispatchEvent(evt);
  }

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className={cn(
        "sticky top-0 z-50 transition-[background,border-color,backdrop-filter] duration-300",
        scrolled
          ? "bg-ink-950/85 border-b border-white/[0.08] backdrop-blur-xl"
          : "bg-transparent border-b border-transparent backdrop-blur-0"
      )}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-300 to-teal-600 grid place-items-center text-ink-950 font-black text-sm shadow-lg shadow-teal-500/30">
              T
            </div>
            <div className="absolute inset-0 rounded-lg bg-teal-300/30 blur-md -z-10 group-hover:bg-teal-300/70 transition" />
            <span className="sparkle" style={{ top: -3, right: -3 }} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-[15px] tracking-tight">
              Tagr<span className="text-teal-300">.</span>
            </span>
            <span className="text-[9px] text-white/40 font-mono tracking-[0.18em] mt-0.5">
              CLOUD · DRAGON
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-[13px] text-white/70">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "nav-link transition hover:text-white",
                pathname === n.href && "active text-white"
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={triggerCmdK}
            aria-label="検索を開く"
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 hover:border-white/25 text-white/65 hover:text-white transition focus-ring"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-5-5" />
            </svg>
            <span className="text-[12px]">検索</span>
            <kbd className="text-[10px] font-mono px-1 py-0.5 rounded bg-white/5 border border-white/10 text-white/55">
              ⌘K
            </kbd>
          </button>
          <Link
            href="/app"
            className="px-3.5 py-1.5 rounded-md text-[13px] text-white/80 hover:text-white border border-white/10 hover:border-white/25 transition"
          >
            ログイン
          </Link>
          <Link
            href="/app/tap"
            className="relative px-4 py-1.5 rounded-md text-[13px] font-medium text-ink-950 bg-teal-300 hover:bg-teal-200 transition shadow-lg shadow-teal-500/30 overflow-hidden"
          >
            <span className="relative z-10">βに参加</span>
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-teal-200 via-white/40 to-teal-200 opacity-0 hover:opacity-60 transition"
            />
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white/80 p-2"
          aria-label="menu"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-white/[0.06] bg-ink-950/95"
          >
            <div className="px-5 py-3 flex flex-col gap-1 text-sm">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "py-2 text-white/70 hover:text-white",
                    pathname === n.href && "text-white"
                  )}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                href="/app/tap"
                onClick={() => setOpen(false)}
                className="mt-2 px-4 py-2 rounded-md text-center text-[13px] font-medium text-ink-950 bg-teal-300"
              >
                βに参加
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
