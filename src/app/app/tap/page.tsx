"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { people, myFaces, FaceKey } from "@/data/sample";
import { cn } from "@/lib/cn";

type Stage = "ready" | "scanning" | "matched";

export default function TapPage() {
  const [stage, setStage] = useState<Stage>("ready");
  const [matchedId, setMatchedId] = useState<string>("p_001");
  const [face, setFace] = useState<FaceKey>("work");
  const [sessionTaps, setSessionTaps] = useState(0);

  const matched = people.find((p) => p.id === matchedId)!;
  const myFace = myFaces.find((f) => f.key === face)!;

  function handleTap() {
    setStage("scanning");
    // Haptic feedback
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        (navigator as any).vibrate?.(20);
      } catch {}
    }
    const loadingId = toast.loading("NFCタグを読み取り中…", {
      description: "カードをかざしてください",
    });

    setTimeout(() => {
      const next = people[Math.floor(Math.random() * people.length)];
      setMatchedId(next.id);
      setStage("matched");
      setSessionTaps((n) => n + 1);
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        try {
          (navigator as any).vibrate?.([10, 40, 12]);
        } catch {}
      }
      toast.success(`${next.name} さんとつながりました`, {
        id: loadingId,
        description: `${myFace.emoji} ${myFace.name} としてシェア`,
      });
    }, 1500);
  }

  function reset() {
    setStage("ready");
  }

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10 relative">
      {/* Session badge */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 right-5 lg:right-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[11px] font-mono"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-teal-300 dot-pulse text-teal-300" />
        SESSION TAPS · {sessionTaps}
      </motion.div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-[10px] font-mono tracking-[0.22em] text-white/40">
            TAP TO CONNECT
          </div>
          <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
            カードをかざしてみましょう
          </h1>
          <p className="mt-1 text-white/55 text-sm">
            これはデモシミュレーションです。実機ではNFCタグをスマホにかざします。
          </p>
        </div>
        <div className="hidden md:block text-right">
          <div className="text-[10px] font-mono tracking-[0.22em] text-white/40">
            CURRENT FACE
          </div>
          <div className="mt-1 text-sm">
            {myFace.emoji} {myFace.name}
          </div>
        </div>
      </div>

      {/* Face switcher with layoutId active bar */}
      <div className="mt-8 flex flex-wrap gap-2">
        {myFaces.map((f) => (
          <button
            key={f.key}
            onClick={() => setFace(f.key)}
            className={cn(
              "relative px-3.5 py-1.5 rounded-full text-[12px] border transition focus-ring",
              face === f.key
                ? "border-teal-300 text-teal-100"
                : "border-white/10 text-white/65 hover:text-white hover:border-white/25"
            )}
          >
            {face === f.key && (
              <motion.span
                layoutId="face-active"
                className="absolute inset-0 rounded-full bg-teal-300/15"
                transition={{ type: "spring", stiffness: 360, damping: 28 }}
              />
            )}
            <span className="relative">
              {f.emoji} {f.name}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
        {/* Tap zone */}
        <div className="lg:col-span-6">
          <div
            className={cn(
              "relative rounded-3xl glass aspect-square max-w-[480px] mx-auto overflow-hidden grid place-items-center",
              stage === "matched" && "tap-flash"
            )}
          >
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute inset-0 bg-radial-teal opacity-60" />

            {/* Rings */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative w-[320px] h-[320px]">
                <div className="absolute inset-0 rounded-full border border-teal-400/30" />
                <div className="absolute inset-6 rounded-full border border-teal-400/20" />
                <div className="absolute inset-12 rounded-full border border-teal-400/10" />
                {stage === "scanning" && (
                  <>
                    {[0, 0.4, 0.8].map((d, i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border-2 border-teal-400/60"
                        initial={{ scale: 0.7, opacity: 0.9 }}
                        animate={{ scale: 1.9, opacity: 0 }}
                        transition={{
                          duration: 1.6,
                          delay: d,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {stage === "ready" && (
                <motion.button
                  key="ready"
                  onClick={handleTap}
                  aria-label="tap"
                  className="relative z-10 group focus-ring rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                >
                  {/* Pulse aura */}
                  <motion.span
                    className="absolute inset-0 rounded-full bg-teal-300/30 blur-2xl"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  />
                  <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-teal-300 to-teal-600 grid place-items-center text-ink-950 shadow-2xl shadow-teal-500/40">
                    <motion.svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      animate={{ rotate: [0, -8, 8, 0] }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <path d="M3 11c5 0 9 4 9 9" />
                      <path d="M3 7c8 0 13 5 13 13" />
                      <path d="M3 3c11 0 17 6 17 17" />
                    </motion.svg>
                  </div>
                  <div className="mt-4 text-center text-[11px] font-mono tracking-[0.22em] text-white/70">
                    TAP HERE
                  </div>
                </motion.button>
              )}

              {stage === "scanning" && (
                <motion.div
                  key="scanning"
                  className="relative z-10 text-center"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                >
                  <div className="w-20 h-20 rounded-full border-4 border-teal-300/30 border-t-teal-300 animate-spin mx-auto" />
                  <div className="mt-5 text-[11px] font-mono tracking-[0.22em] text-teal-200">
                    SCANNING NFC...
                  </div>
                </motion.div>
              )}

              {stage === "matched" && (
                <motion.div
                  key="matched"
                  className="relative z-10 text-center px-6"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                >
                  {/* Particle burst */}
                  <div className="absolute inset-0 grid place-items-center pointer-events-none">
                    {Array.from({ length: 18 }).map((_, i) => {
                      const angle = (i / 18) * Math.PI * 2;
                      const r = 120;
                      return (
                        <span
                          key={i}
                          className="burst-particle"
                          style={
                            {
                              "--bx": `${Math.cos(angle) * r}px`,
                              "--by": `${Math.sin(angle) * r}px`,
                              animationDelay: `${i * 0.015}s`,
                            } as React.CSSProperties
                          }
                        />
                      );
                    })}
                  </div>

                  <div className="text-[10px] font-mono tracking-[0.22em] text-teal-200/80">
                    CONNECTED
                  </div>
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                      stiffness: 220,
                      damping: 16,
                    }}
                    className="mt-2 w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-teal-300 to-teal-600 grid place-items-center text-ink-950 font-black text-2xl shadow-xl shadow-teal-500/30"
                  >
                    {matched.initials}
                  </motion.div>
                  <div className="mt-4 font-display text-2xl font-semibold">
                    {matched.name}
                  </div>
                  <div className="text-[12px] text-white/55 font-mono">
                    {matched.handle}
                  </div>
                  <div className="mt-2 text-[12px] text-teal-200/90">
                    {matched.tags.join(" · ")}
                  </div>
                  <div className="mt-5 flex justify-center gap-2">
                    <Link
                      href={`/app/people/${matched.id}`}
                      className="px-3.5 py-1.5 rounded-md bg-teal-300 text-ink-950 text-[12px] font-semibold hover:bg-teal-200 transition"
                    >
                      プロフィールを見る
                    </Link>
                    <button
                      onClick={reset}
                      className="px-3.5 py-1.5 rounded-md border border-white/15 text-[12px] hover:bg-white/5 transition"
                    >
                      もう一度タップ
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Side panel */}
        <div className="lg:col-span-6 space-y-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={face}
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl glass p-5"
            >
              <div className="text-[10px] font-mono tracking-[0.22em] text-white/45">
                SHARING AS
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${myFace.accent} grid place-items-center text-xl`}
                >
                  {myFace.emoji}
                </div>
                <div>
                  <div className="font-semibold">{myFace.name}</div>
                  <div className="text-[12px] text-white/55">{myFace.role}</div>
                </div>
              </div>
              <p className="mt-3 text-[13px] text-white/65 leading-relaxed">
                {myFace.bio}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {myFace.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/65"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="rounded-2xl glass p-5">
            <div className="text-[10px] font-mono tracking-[0.22em] text-white/45">
              SESSION
            </div>
            <ol className="mt-3 space-y-3 text-sm">
              {[
                {
                  l: "顔を選ぶ",
                  d: "相手の文脈に合わせて、見せる自分を選択。",
                  done: true,
                },
                {
                  l: "カードをかざす",
                  d: "NFCカードをスマホにタップ。",
                  done: stage !== "ready",
                  active: stage === "scanning",
                },
                {
                  l: "クラウドに記録",
                  d: "いつ・どこで・誰と・どの顔で会ったかを保存。",
                  done: stage === "matched",
                },
                {
                  l: "関係を広げる",
                  d: "次に話すといい人をAIがレコメンド。",
                  done: false,
                },
              ].map((s, i) => (
                <li key={i} className="flex gap-3">
                  <motion.div
                    layout
                    className={cn(
                      "mt-0.5 w-5 h-5 rounded-full grid place-items-center text-[10px] font-bold",
                      s.done
                        ? "bg-teal-300 text-ink-950"
                        : s.active
                        ? "bg-teal-300/20 border border-teal-300 text-teal-200 animate-pulse"
                        : "bg-white/5 border border-white/15 text-white/40"
                    )}
                  >
                    {s.done ? "✓" : i + 1}
                  </motion.div>
                  <div>
                    <div className="font-semibold text-[13px]">{s.l}</div>
                    <div className="text-[12px] text-white/50">{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl glass p-5">
            <div className="text-[10px] font-mono tracking-[0.22em] text-white/45">
              PRIVACY
            </div>
            <p className="mt-2 text-[12px] text-white/60 leading-relaxed">
              選んだ「顔」の情報だけが相手に渡ります。第三者にネガティブ情報を渡す場合は、本人の合意フローが必須です。
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-teal-200/80 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
              E2E ENCRYPTED · CONSENT FIRST
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
