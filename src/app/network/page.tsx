"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import NetworkGraph from "@/components/network/NetworkGraph";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { people, recommendations } from "@/data/sample";
import { cn } from "@/lib/cn";

const CONTEXTS = ["All", "Work", "Student", "Creator", "Family", "Community"];

export default function NetworkPage() {
  const [ctx, setCtx] = useState("All");

  const cities = useMemo(
    () => Array.from(new Set(people.map((p) => p.city))),
    []
  );
  const avgTrust = useMemo(
    () => people.reduce((a, b) => a + b.trust, 0) / people.length,
    []
  );

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-20">
      <Reveal>
        <SectionHeader
          eyebrow="NETWORK"
          title={
            <>
              あなたを起点とする<br />
              <span className="text-gradient-teal">人脈ネットワーク。</span>
            </>
          }
          subtitle="タップで生まれたつながりを、関係の濃さと文脈で可視化します。次に話すといい人もここから見つかる。"
        />
      </Reveal>

      <div className="mt-12 grid lg:grid-cols-12 gap-6">
        {/* Graph */}
        <Reveal className="lg:col-span-7" delay={0.1}>
          <NetworkGraph filter={ctx} />
        </Reveal>

        {/* Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <Reveal delay={0.05}>
            <div className="rounded-2xl glass p-5">
              <div className="text-[10px] font-mono tracking-[0.22em] text-white/45">
                NETWORK STATS
              </div>
              <div className="mt-3 grid grid-cols-3 gap-3">
                <Stat label="人数" value={people.length} />
                <Stat
                  label="平均信用"
                  value={avgTrust}
                  decimals={1}
                />
                <Stat label="都市" value={cities.length} />
              </div>
              <div className="mt-3 text-[11px] text-white/45">
                {cities.join(" · ")}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl glass p-5">
              <div className="text-[10px] font-mono tracking-[0.22em] text-white/45">
                NEXT CONNECTIONS
              </div>
              <div className="mt-1 font-display text-lg font-semibold">
                AIがレコメンド
              </div>
              <RevealStagger className="mt-4 space-y-3">
                {recommendations.map((r) => {
                  const p = people.find((pp) => pp.id === r.personId)!;
                  return (
                    <RevealItem key={r.personId}>
                      <Link
                        href={`/app/people/${p.id}`}
                        className="block rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition p-3 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-400 to-violet-700 grid place-items-center text-ink-950 font-bold text-xs">
                            {p.initials}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm">
                              {p.name}
                            </div>
                            <div className="text-[11px] text-white/55">
                              {r.reason}
                            </div>
                          </div>
                          <div className="text-[12px] text-teal-300 font-mono">
                            {(r.score * 100).toFixed(0)}%
                          </div>
                        </div>
                      </Link>
                    </RevealItem>
                  );
                })}
              </RevealStagger>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-2xl glass p-5">
              <div className="text-[10px] font-mono tracking-[0.22em] text-white/45">
                CONTEXTS
              </div>
              <div className="mt-1 font-display text-lg font-semibold">
                文脈フィルタ
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-[12px]">
                {CONTEXTS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setCtx(t)}
                    className={cn(
                      "relative px-3 py-1 rounded-full border transition focus-ring",
                      ctx === t
                        ? "border-teal-300 text-teal-100"
                        : "border-white/10 text-white/65 hover:border-teal-300/40 hover:text-teal-100 hover:bg-teal-300/5"
                    )}
                  >
                    {ctx === t && (
                      <span className="absolute inset-0 rounded-full bg-teal-300/15" />
                    )}
                    <span className="relative">{t}</span>
                  </button>
                ))}
              </div>
              <p className="mt-4 text-[12px] text-white/50 leading-relaxed">
                「Work」だけ／「Community」だけといった切り口でネットワークを絞り込めます。
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  decimals = 0,
}: {
  label: string;
  value: number;
  decimals?: number;
}) {
  return (
    <div className="rounded-lg bg-white/[0.04] p-3 text-center">
      <div className="text-[10px] font-mono text-white/40 tracking-[0.18em]">
        {label}
      </div>
      <Counter
        value={value}
        decimals={decimals}
        className="mt-1 block font-display text-xl font-bold text-gradient-teal"
      />
    </div>
  );
}
