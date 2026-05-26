import SectionHeader from "@/components/SectionHeader";
import { people } from "@/data/sample";

export default function TrustPage() {
  const sorted = [...people].sort((a, b) => b.trust - a.trust);

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-20">
      <SectionHeader
        eyebrow="TRUST · 360° SCORE"
        title={
          <>
            キラキラだけじゃない。<br />
            <span className="text-gradient-teal">本当の信用</span>を。
          </>
        }
        subtitle="ポジティブだけのSNSでは、人材ミスマッチが起き続ける。Tagrは、ポジ＋ネガを含む360°評価を、本人同意ベースで残します。"
      />

      <div className="mt-10 grid md:grid-cols-3 gap-4">
        {[
          {
            t: "本人合意",
            d: "ネガティブ情報は本人の合意なしに公開されません。反論コメントも残せます。",
          },
          {
            t: "第三者検証",
            d: "コミュニティに属する複数人の意見をもとに、スコアの信頼性を保ちます。",
          },
          {
            t: "文脈で集計",
            d: "「Work face」「Community face」など、顔ごとに評価を集計します。",
          },
        ].map((c, i) => (
          <div key={i} className="rounded-2xl glass p-5 card-hover">
            <div className="text-[10px] font-mono tracking-[0.22em] text-teal-200/70">
              PRINCIPLE · 0{i + 1}
            </div>
            <div className="mt-3 font-display text-lg font-semibold">{c.t}</div>
            <p className="mt-2 text-[13px] text-white/60 leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <div className="font-display text-xl font-semibold">
              Trust Leaderboard
            </div>
            <div className="text-[12px] text-white/45">
              あなたの人脈の中の、信用スコア上位。
            </div>
          </div>
          <div className="text-[10px] font-mono text-white/40">
            ALL 6 · UPDATED 2026-05-26
          </div>
        </div>

        <div className="rounded-2xl glass overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] font-mono tracking-[0.18em] text-white/40 border-b border-white/10">
                <th className="p-3 w-10">#</th>
                <th className="p-3">PERSON</th>
                <th className="p-3 hidden md:table-cell">CITY</th>
                <th className="p-3 text-right">TRUST</th>
                <th className="p-3 text-right hidden sm:table-cell">RELIABILITY</th>
                <th className="p-3 text-right hidden sm:table-cell">CONTRIB.</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p, i) => (
                <tr
                  key={p.id}
                  className="border-b border-white/[0.05] hover:bg-white/[0.02]"
                >
                  <td className="p-3 text-white/40 font-mono">{i + 1}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-300 to-teal-600 grid place-items-center text-ink-950 font-bold text-xs">
                        {p.initials}
                      </div>
                      <div>
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-[11px] text-white/45 font-mono">
                          {p.handle}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-white/55 hidden md:table-cell">{p.city}</td>
                  <td className="p-3 text-right">
                    <div className="inline-flex items-center gap-2">
                      <span className="font-mono text-teal-300 font-semibold">
                        {p.trust}
                      </span>
                      <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-teal-300"
                          style={{ width: `${p.trust}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-right font-mono text-white/70 hidden sm:table-cell">
                    {p.reliability}
                  </td>
                  <td className="p-3 text-right font-mono text-white/70 hidden sm:table-cell">
                    {p.contribution}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 rounded-2xl glass p-6 border-l-2 border-amber-400/60">
        <div className="text-[10px] font-mono tracking-[0.22em] text-amber-300/80">
          ⚠ ETHICS NOTE
        </div>
        <p className="mt-2 text-[14px] text-white/75 leading-relaxed">
          ネガティブ情報の可視化は、ディストピアにもなり得るテーマです。Cloud Dragonは「本人合意・反論権・コンテキスト限定・削除可能」を原則とし、
          「縁の下の頑張りを正当に評価する」「人材ミスマッチで誰も傷つかない」社会の実現を目指します。
        </p>
      </div>
    </div>
  );
}
