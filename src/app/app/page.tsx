import Link from "next/link";
import { events, people, recommendations, myFaces } from "@/data/sample";
import NfcCard from "@/components/NfcCard";

export default function AppHome() {
  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] font-mono tracking-[0.22em] text-white/40">
            DASHBOARD · v0.1
          </div>
          <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
            おかえりなさい、Kenji。
          </h1>
          <p className="mt-1 text-white/55 text-sm">
            今日のつながりと、次に話すといい人をまとめました。
          </p>
        </div>
        <Link
          href="/app/tap"
          className="self-start md:self-end px-4 py-2.5 rounded-lg bg-teal-300 text-ink-950 font-semibold text-sm hover:bg-teal-200 transition shadow-lg shadow-teal-500/20"
        >
          + 新しくタップする
        </Link>
      </div>

      {/* Top stat tiles */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { l: "今日のタップ", v: "7", h: "+2 vs 昨日" },
          { l: "つながり累計", v: "182", h: "5 都市にまたがる" },
          { l: "Trust Index", v: "84", h: "/ 100" },
          { l: "次のイベント", v: "3", h: "今週末まで" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl glass p-4">
            <div className="text-[10px] font-mono tracking-[0.2em] text-white/40">
              {s.l}
            </div>
            <div className="mt-2 font-display text-2xl font-bold text-gradient-teal">
              {s.v}
            </div>
            <div className="mt-1 text-[11px] text-white/45">{s.h}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid lg:grid-cols-12 gap-6">
        {/* Left: today's connections feed */}
        <div className="lg:col-span-7 space-y-6">
          <Section title="最近のタップ" sub="クラウドに自動記録されたつながり">
            <div className="space-y-3">
              {people.slice(0, 4).map((p) => (
                <Link
                  href={`/app/people/${p.id}`}
                  key={p.id}
                  className="card-hover flex items-center gap-4 p-4 rounded-2xl glass"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-300 to-teal-600 grid place-items-center text-ink-950 font-bold text-sm">
                    {p.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-[12px] text-white/50 truncate">
                      {p.tags.join(" · ")}
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-white/45 font-mono whitespace-nowrap hidden md:block">
                    <div>{p.meta.metAt.split(" ")[0]}</div>
                    <div>{p.meta.place}</div>
                  </div>
                  <div className="ml-2 text-teal-300">›</div>
                </Link>
              ))}
            </div>
          </Section>

          <Section title="イベント記録">
            <div className="rounded-2xl glass overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[10px] font-mono tracking-[0.18em] text-white/40 border-b border-white/10">
                    <th className="p-3">DATE</th>
                    <th className="p-3">EVENT</th>
                    <th className="p-3">CITY</th>
                    <th className="p-3 text-right">PEOPLE</th>
                    <th className="p-3 text-right">TAPS</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((e) => (
                    <tr
                      key={e.id}
                      className="border-b border-white/[0.05] hover:bg-white/[0.02]"
                    >
                      <td className="p-3 font-mono text-[12px] text-white/65">
                        {e.date}
                      </td>
                      <td className="p-3">{e.title}</td>
                      <td className="p-3 text-white/55">{e.city}</td>
                      <td className="p-3 text-right">{e.participants}</td>
                      <td className="p-3 text-right text-teal-300 font-mono">
                        {e.taps}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>

        {/* Right: my card + recommendations */}
        <div className="lg:col-span-5 space-y-6">
          <Section title="あなたのTagrカード">
            <div className="flex justify-center py-4">
              <NfcCard />
            </div>
            <div className="text-center text-[11px] font-mono text-white/40 tracking-[0.18em]">
              IDENTITY · {myFaces[0].name.toUpperCase()}
            </div>
            <div className="mt-3 flex justify-center gap-2">
              {myFaces.map((f) => (
                <button
                  key={f.key}
                  className="w-8 h-8 rounded-full border border-white/10 grid place-items-center hover:border-teal-300 hover:bg-teal-300/10 transition text-base"
                  title={f.name}
                >
                  {f.emoji}
                </button>
              ))}
            </div>
          </Section>

          <Section title="次に話すといい人">
            <div className="space-y-3">
              {recommendations.map((r) => {
                const p = people.find((pp) => pp.id === r.personId)!;
                return (
                  <Link
                    href={`/app/people/${p.id}`}
                    key={r.personId}
                    className="card-hover block p-4 rounded-2xl glass"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-400 to-violet-700 grid place-items-center text-ink-950 font-bold text-sm">
                        {p.initials}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-[12px] text-white/55">
                          {r.reason}
                        </div>
                        <div className="mt-1 text-[11px] text-white/40 font-mono">
                          via {r.via}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-white/40">MATCH</div>
                        <div className="text-base font-bold text-teal-300">
                          {(r.score * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  sub,
  children,
}: {
  title: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-end justify-between mb-3">
        <div>
          <div className="font-display text-lg font-semibold">{title}</div>
          {sub && <div className="text-[12px] text-white/45">{sub}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}
