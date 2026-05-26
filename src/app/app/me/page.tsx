import Link from "next/link";
import { myFaces } from "@/data/sample";
import NfcCard from "@/components/NfcCard";

export default function MePage() {
  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10">
      <div className="text-[10px] font-mono tracking-[0.22em] text-white/40">
        ME · IDENTITIES
      </div>
      <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
        あなたの<span className="text-gradient-teal">いくつもの顔</span>
      </h1>
      <p className="mt-1 text-white/55 text-sm max-w-xl">
        相手の文脈に合わせて、見せる自分を切り替えましょう。AIが提案、最後はあなたが決める。
      </p>

      <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5">
          <div className="sticky top-32 flex justify-center">
            <NfcCard />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          {myFaces.map((f) => (
            <div
              key={f.key}
              className="rounded-2xl glass p-5 card-hover"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.accent} grid place-items-center text-2xl shrink-0`}>
                  {f.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <div className="font-display text-xl font-semibold">{f.name}</div>
                    <div className="text-[11px] font-mono text-white/45">FACE · {f.key.toUpperCase()}</div>
                  </div>
                  <div className="text-[12px] text-teal-200/80">{f.role}</div>
                  <p className="mt-2 text-[13px] text-white/65">{f.bio}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {f.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="text-[12px] px-3 py-1.5 rounded-md border border-white/10 hover:bg-white/5 hover:border-white/20">
                  編集
                </button>
              </div>
            </div>
          ))}
          <button className="w-full rounded-2xl border border-dashed border-white/15 p-5 text-sm text-white/60 hover:text-white hover:border-teal-300/40 transition">
            ＋ 新しい顔を追加
          </button>
        </div>
      </div>
    </div>
  );
}
