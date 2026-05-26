"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

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
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-ink-950/70 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-300 to-teal-600 grid place-items-center text-ink-950 font-black text-sm shadow-lg shadow-teal-500/30">
              T
            </div>
            <div className="absolute inset-0 rounded-lg bg-teal-300/30 blur-md -z-10 group-hover:bg-teal-300/60 transition" />
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
              className={clsx(
                "nav-link transition hover:text-white",
                pathname === n.href && "active text-white"
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/app"
            className="px-3.5 py-1.5 rounded-md text-[13px] text-white/80 hover:text-white border border-white/10 hover:border-white/25 transition"
          >
            ログイン
          </Link>
          <Link
            href="/app/tap"
            className="px-4 py-1.5 rounded-md text-[13px] font-medium text-ink-950 bg-teal-300 hover:bg-teal-200 transition shadow-lg shadow-teal-500/20"
          >
            βに参加
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

      {open && (
        <div className="md:hidden border-t border-white/[0.06] bg-ink-950/95">
          <div className="px-5 py-3 flex flex-col gap-1 text-sm">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={clsx(
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
        </div>
      )}
    </header>
  );
}
