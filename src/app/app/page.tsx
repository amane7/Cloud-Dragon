import Link from "next/link";
import { events, people, recommendations, myFaces } from "@/data/sample";
import NfcCard from "@/components/NfcCard";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import InsightCard from "@/components/dashboard/InsightCard";
import ActivityChart from "@/components/dashboard/ActivityChart";
import Tilt3D from "@/components/ui/Tilt3D";
import MagneticButton from "@/components/ui/MagneticButton";

export default function AppHome() {
  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-10">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono tracking-[0.22em] text-white/40">
              DASHBOARD · v0.1
            </div>
            <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
              おかえりなさい、<span className="text-gradient-teal">Kenji</span>。
            </h1>
            <p className="mt-1 text-white/55 text-sm">
              今日のつながりと、次に話すといい人をまとめました。
            </p>
          </div>
          <MagneticButton href="/app/tap" variant="primary" size="md">
            + 新しくタップする
          </MagneticButton>
        </div>
      </Reveal>

      {/* Insight cards */}
      <RevealStagger className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3" amount={0.1}>
        <RevealItem>
          <InsightCard
            label="今日のタップ"
            value={7}
            delta={{ value: 2, positive: true }}
            hint="+2 vs 昨日"
          />
        </RevealItem>
        <RevealItem>
          <InsightCard
            label="つながり累計"
            value={182}
            hint="5 都市にまたがる"
          />
        </RevealItem>
        <RevealItem>
          <InsightCard
            label="Trust Index"
            value={84}
            suffix=" /100"
            hint="平均より +12"
            delta={{ value: 3, positive: true, suffix: "pt" }}
          />
        </RevealItem>
        <RevealItem>
          <InsightCard label="次のイベント" value={3} hint="今週末まで" />
        </RevealItem>
      </RevealStagger>

      <div className="mt-10 grid lg:grid-cols-12 gap-6">
        {/* Left: today's connections feed */}
        <div className="lg:col-span-7 space-y-6">
          <Reveal>
            <ActivityChart />
          </Reveal>

          <Reveal delay={0.05}>
            <Section
              title="最近のタップ"
              sub="クラウドに自動記録されたつながり"
            >
              <RevealStagger className="space-y-3" amount={0.1}>
                {people.slice(0, 4).map((p) => (
                  <RevealItem key={p.id}>
                    <Link
                      href={`/app/people/${p.id}`}
                      className="lift card-shimmer flex items-center gap-4 p-4 rounded-2xl glass group"
                    >
                      <div className="relative">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-300 to-teal-600 grid place-items-center text-ink-950 font-bold text-sm">
                          {p.initials}
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-teal-300 border-2 border-ink-950" />
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
                      <div className="ml-2 text-teal-300 group-hover:translate-x-1 transition-transform">
                        ›
                      </div>
                    </Link>
                  </RevealItem>
                ))}
              </RevealStagger>
            </Section>
          </Reveal>

          <Reveal>
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
                        className="border-b border-white/[0.05] hover:bg-white/[0.03] transition"
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
          </Reveal>
        </div>

        {/* Right: my card + recommendations */}
        <div className="lg:col-span-5 space-y-6">
          <Reveal delay={0.05}>
            <Section title="あなたのTagrカード">
              <div className="flex justify-center py-4">
                <Tilt3D max={12} glare>
                  <NfcCard />
                </Tilt3D>
              </div>
              <div className="text-center text-[11px] font-mono text-white/40 tracking-[0.18em]">
                IDENTITY · {myFaces[0].name.toUpperCase()}
              </div>
              <div className="mt-3 flex justify-center gap-2">
                {myFaces.map((f) => (
                  <button
                    key={f.key}
                    className="w-9 h-9 rounded-full border border-white/10 grid place-items-center hover:border-teal-300 hover:bg-teal-300/10 hover:scale-110 transition text-base"
                    title={f.name}
                  >
                    {f.emoji}
                  </button>
                ))}
              </div>
            </Section>
          </Reveal>

          <Reveal>
            <Section title="次に話すといい人">
              <RevealStagger className="space-y-3">
                {recommendations.map((r) => {
                  const p = people.find((pp) => pp.id === r.personId)!;
                  return (
                    <RevealItem key={r.personId}>
                      <Link
                        href={`/app/people/${p.id}`}
                        className="lift card-shimmer block p-4 rounded-2xl glass relative overflow-hidden"
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
                            <div className="text-[10px] font-mono text-white/40">
                              MATCH
                            </div>
                            <div className="text-base font-bold text-teal-300">
                              {(r.score * 100).toFixed(0)}%
                            </div>
                          </div>
                        </div>
                        {/* Animated progress bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
                          <div
                            className="h-full bg-gradient-to-r from-teal-300 via-accent-violet to-teal-300"
                            style={{ width: `${r.score * 100}%` }}
                          />
                        </div>
                      </Link>
                    </RevealItem>
                  );
                })}
              </RevealStagger>
            </Section>
          </Reveal>
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
