import Link from "next/link";
import { people } from "@/data/sample";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return people.map((p) => ({ id: p.id }));
}

export default function PersonPage({ params }: { params: { id: string } }) {
  const p = people.find((pp) => pp.id === params.id);
  if (!p) notFound();

  return (
    <div className="max-w-5xl mx-auto px-5 lg:px-10 py-10">
      <Link
        href="/app"
        className="text-[12px] text-white/50 hover:text-white inline-flex items-center gap-1"
      >
        ← ダッシュボードに戻る
      </Link>

      <div className="mt-6 rounded-3xl glass overflow-hidden">
        <div className="relative h-32 bg-gradient-to-br from-teal-500/30 via-violet-500/15 to-ink-900 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-40" />
        </div>
        <div className="p-6 -mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end gap-5">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-teal-300 to-teal-600 grid place-items-center text-ink-950 font-black text-3xl shadow-xl ring-4 ring-ink-950">
              {p.initials}
            </div>
            <div className="flex-1">
              <div className="font-display text-2xl md:text-3xl font-bold">
                {p.name}
              </div>
              <div className="text-[13px] text-white/55 font-mono">
                {p.handle} · {p.city}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono tracking-[0.22em] text-white/40">
                TRUST INDEX
              </div>
              <div className="mt-1 font-display text-3xl font-bold text-gradient-teal">
                {p.trust}
              </div>
              <div className="text-[11px] text-white/45">/ 100</div>
            </div>
          </div>

          {/* Met info */}
          <div className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
            <Info l="MET AT" v={p.meta.metAt} />
            <Info l="PLACE" v={p.meta.place} />
            <Info l="VIA" v={p.meta.via} />
          </div>

          {/* Metrics */}
          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <Metric label="信頼" value={p.trust} color="bg-teal-300" />
            <Metric label="実行力" value={p.reliability} color="bg-violet-400" />
            <Metric label="貢献" value={p.contribution} color="bg-amber-300" />
          </div>

          {/* Reviews */}
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-teal-300/8 border border-teal-300/20 p-5">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-mono tracking-[0.22em] text-teal-200/80">
                  ＋ STRENGTHS
                </div>
                <div className="text-[11px] text-white/45">{p.positives.length} voices</div>
              </div>
              <ul className="mt-3 space-y-2.5 text-[13px]">
                {p.positives.map((pp, i) => (
                  <li key={i}>
                    <div className="text-white/90">・{pp.label}</div>
                    <div className="text-[11px] text-white/40 ml-3 font-mono">
                      from {pp.from}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-rose-400/8 border border-rose-400/20 p-5">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-mono tracking-[0.22em] text-rose-200/80">
                  − WATCH-OUTS
                </div>
                <div className="text-[11px] text-white/45">
                  {p.negatives.length} voices
                </div>
              </div>
              {p.negatives.length === 0 ? (
                <div className="mt-6 text-[13px] text-white/55">
                  まだ報告はありません。
                </div>
              ) : (
                <ul className="mt-3 space-y-2.5 text-[13px]">
                  {p.negatives.map((nn, i) => (
                    <li key={i}>
                      <div className="text-white/85">・{nn.label}</div>
                      <div className="text-[11px] text-white/40 ml-3 font-mono">
                        from {nn.from}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 text-[11px] text-amber-200/80 bg-amber-400/5 border border-amber-400/20 rounded-md px-2.5 py-1.5">
                ⚠ ネガ情報は本人の同意・反論権つきで運用されます。
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button className="px-4 py-2 rounded-lg bg-teal-300 text-ink-950 font-semibold text-sm hover:bg-teal-200">
              メッセージを送る
            </button>
            <button className="px-4 py-2 rounded-lg border border-white/15 text-sm hover:bg-white/5">
              ＋ 推薦コメントを書く
            </button>
            <button className="px-4 py-2 rounded-lg border border-rose-400/30 text-sm text-rose-200 hover:bg-rose-400/10">
              ⚑ 注意点をフィードバック
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ l, v }: { l: string; v: string }) {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
      <div className="text-[10px] font-mono tracking-[0.2em] text-white/40">{l}</div>
      <div className="mt-1 text-[13px]">{v}</div>
    </div>
  );
}

function Metric({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="rounded-xl bg-white/[0.04] p-4">
      <div className="flex items-baseline justify-between text-[12px]">
        <span className="text-white/55">{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
