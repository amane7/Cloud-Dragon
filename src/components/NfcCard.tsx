"use client";

import clsx from "clsx";

interface Props {
  name?: string;
  handle?: string;
  role?: string;
  initials?: string;
  variant?: "default" | "compact";
  className?: string;
}

export default function NfcCard({
  name = "Kenji Sato",
  handle = "@kenji_sato",
  role = "Cloud Dragon / PdM",
  initials = "KS",
  variant = "default",
  className,
}: Props) {
  return (
    <div
      className={clsx(
        "relative rounded-2xl overflow-hidden",
        "bg-gradient-to-br from-ink-700 via-ink-800 to-ink-950",
        "border border-white/[0.08] glow-teal",
        variant === "compact" ? "p-4 w-[260px]" : "p-6 w-[320px]",
        className
      )}
    >
      {/* Holographic shine */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-teal-400/30 blur-3xl" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-violet-500/20 blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-300 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.22em] text-white/55">
              TAGR · NFC
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-[0.18em] text-white/40">
            ID · LINK
          </span>
        </div>

        {/* Body */}
        <div className="mt-6 flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-300 to-teal-600 grid place-items-center text-ink-950 font-black text-lg shadow-md shadow-teal-500/30">
            {initials}
          </div>
          <div className="flex-1">
            <div className="font-display text-lg font-semibold tracking-tight">
              {name}
            </div>
            <div className="text-[12px] text-white/55 font-mono">{handle}</div>
            <div className="mt-1 text-[12px] text-teal-200/90">{role}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <div className="font-mono text-[10px] text-white/40 tracking-[0.18em]">
            TAP TO CONNECT
          </div>
          {/* NFC icon */}
          <div className="relative w-8 h-8">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              className="text-teal-300"
            >
              <path d="M3 11c5 0 9 4 9 9" />
              <path d="M3 7c8 0 13 5 13 13" />
              <path d="M3 3c11 0 17 6 17 17" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
