"use client";

import { useState } from "react";
import Link from "next/link";
import NfcCard from "@/components/NfcCard";
import { people, myFaces, FaceKey } from "@/data/sample";

type Stage = "ready" | "scanning" | "matched";

export default function TapPage() {
  const [stage, setStage] = useState<Stage>("ready");
  const [matchedId, setMatchedId] = useState<string>("p_001");
  const [face, setFace] = useState<FaceKey>("work");

  const matched = people.find((p) => p.id === matchedId)!;
  const myFace = myFaces.find((f) => f.key === face)!;

  function handleTap() {
    setStage("scanning");
    setTimeout(() => {
      const next = people[Math.floor(Math.random() * people.length)];
      setMatchedId(next.id);
      setStage("matched");
    }, 1600);
  }

  function reset() {
    setStage("ready");
  }

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10">
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

      {/* Face switcher */}
      <div className="mt-8 flex flex-wrap gap-2">
        {myFaces.map((f) => (
          <button
            key={f.key}
            onClick={() => setFace(f.key)}
            className={`px-3.5 py-1.5 rounded-full text-[12px] border transition ${
              face === f.key
                ? "border-teal-300 bg-teal-300/15 text-teal-100"
                : "border-white/10 text-white/65 hover:text-white hover:border-white/25"
            }`}
          >
            {f.emoji} {f.name}
          </button>
        ))}
      </div>

      <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
        {/* Tap zone */}
        <div className="lg:col-span-6">
          <div
            className={`relative rounded-3xl glass aspect-square max-w-[480px] mx-auto overflow-hidden grid place-items-center ${
              stage === "matched" ? "tap-flash" : ""
            }`}
          >
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute inset-0 bg-radial-teal opacity-60" />

            {/* Rings */}
            <div
              className={`absolute inset-0 grid place-items-center ${
                stage === "scanning" ? "" : "opacity-60"
              }`}
            >
              <div className="relative w-[300px] h-[300px]">
                <div className="absolute inset-0 rounded-full border border-teal-400/30" />
                <div className="absolute inset-6 rounded-full border border-teal-400/20" />
                <div className="absolute inset-12 rounded-full border border-teal-400/10" />
                {stage === "scanning" && (
                  <>
                    <div className="absolute inset-0 rounded-full border-2 border-teal-400/60 animate-pulse-ring" />
                    <div
                      className="absolute inset-0 rounded-full border-2 border-teal-400/60 animate-pulse-ring"
                      style={{ animationDelay: "0.6s" }}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Center */}
            {stage === "ready" && (
              <button
                onClick={handleTap}
                className="relative z-10 group"
                aria-label="tap"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-300 to-teal-600 grid place-items-center text-ink-950 shadow-2xl shadow-teal-500/40 group-hover:scale-105 transition">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 11c5 0 9 4 9 9" />
                    <path d="M3 7c8 0 13 5 13 13" />
                    <path d="M3 3c11 0 17 6 17 17" />
                  </svg>
                </div>
                <div className="mt-4 text-center text-[11px] font-mono tracking-[0.22em] text-white/65">
                  TAP HERE
                </div>
              </button>
            )}

            {stage === "scanning" && (
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 rounded-full border-4 border-teal-300/30 border-t-teal-300 animate-spin mx-auto" />
                <div className="mt-5 text-[11px] font-mono tracking-[0.22em] text-teal-200">
                  SCANNING NFC...
                </div>
              </div>
            )}

            {stage === "matched" && (
              <div className="relative z-10 text-center px-6">
                <div className="text-[10px] font-mono tracking-[0.22em] text-teal-200/80">
                  CONNECTED
                </div>
                <div className="mt-2 w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-teal-300 to-teal-600 grid place-items-center text-ink-950 font-black text-2xl">
                  {matched.initials}
                </div>
                <div className="mt-4 font-display text-2xl font-semibold">
                  {matched.name}
                </div>
                <div className="text-[12px] text-white/55 font-mono">{matched.handle}</div>
                <div className="mt-2 text-[12px] text-teal-200/90">
                  {matched.tags.join(" · ")}
                </div>
                <div className="mt-5 flex justify-center gap-2">
                  <Link
                    href={`/app/people/${matched.id}`}
                    className="px-3.5 py-1.5 rounded-md bg-teal-300 text-ink-950 text-[12px] font-semibold hover:bg-teal-200"
                  >
                    プロフィールを見る
                  </Link>
                  <button
                    onClick={reset}
                    className="px-3.5 py-1.5 rounded-md border border-white/15 text-[12px] hover:bg-white/5"
                  >
                    もう一度タップ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Side panel */}
        <div className="lg:col-span-6 space-y-5">
          <div className="rounded-2xl glass p-5">
            <div className="text-[10px] font-mono tracking-[0.22em] text-white/45">
              SHARING AS
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${myFace.accent} grid place-items-center text-xl`}>
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
          </div>

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
                  <div
                    className={`mt-0.5 w-5 h-5 rounded-full grid place-items-center text-[10px] font-bold ${
                      s.done
                        ? "bg-teal-300 text-ink-950"
                        : s.active
                        ? "bg-teal-300/20 border border-teal-300 text-teal-200 animate-pulse"
                        : "bg-white/5 border border-white/15 text-white/40"
                    }`}
                  >
                    {s.done ? "✓" : i + 1}
                  </div>
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
