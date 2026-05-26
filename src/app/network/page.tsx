import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { people, recommendations } from "@/data/sample";

export default function NetworkPage() {
  const center = { x: 50, y: 50 };
  const nodes = people.map((p, i) => {
    const angle = (i / people.length) * Math.PI * 2 - Math.PI / 2;
    const radius = 30;
    return {
      ...p,
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius,
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-20">
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

      <div className="mt-12 grid lg:grid-cols-12 gap-6">
        {/* Graph */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl glass p-4 aspect-square">
            <div className="absolute inset-0 bg-grid opacity-30 rounded-3xl" />
            <div className="absolute inset-0 bg-radial-teal opacity-60 rounded-3xl" />

            <svg viewBox="0 0 100 100" className="relative w-full h-full">
              {/* Edges */}
              {nodes.map((n, i) => (
                <line
                  key={`l-${i}`}
                  x1={center.x}
                  y1={center.y}
                  x2={n.x}
                  y2={n.y}
                  stroke="rgba(55,231,192,0.3)"
                  strokeWidth="0.3"
                  strokeDasharray="1 1"
                />
              ))}

              {/* Cross-edges (between some people) */}
              {[
                [0, 2],
                [1, 3],
                [2, 4],
                [3, 5],
                [0, 4],
              ].map((pair, i) => (
                <line
                  key={`c-${i}`}
                  x1={nodes[pair[0]].x}
                  y1={nodes[pair[0]].y}
                  x2={nodes[pair[1]].x}
                  y2={nodes[pair[1]].y}
                  stroke="rgba(157,123,255,0.18)"
                  strokeWidth="0.18"
                />
              ))}

              {/* Center self */}
              <circle cx={center.x} cy={center.y} r="6.5" fill="#0bb38f" opacity="0.18" />
              <circle cx={center.x} cy={center.y} r="3.6" fill="#37e7c0" />
              <text
                x={center.x}
                y={center.y + 1.2}
                textAnchor="middle"
                fontSize="2.5"
                fill="#050608"
                fontWeight="700"
              >
                YOU
              </text>

              {/* People nodes */}
              {nodes.map((n, i) => (
                <g key={n.id}>
                  <circle cx={n.x} cy={n.y} r="4.6" fill="#10131a" stroke="rgba(255,255,255,0.35)" strokeWidth="0.3" />
                  <text
                    x={n.x}
                    y={n.y + 0.9}
                    textAnchor="middle"
                    fontSize="2.4"
                    fill="#fff"
                    fontWeight="700"
                  >
                    {n.initials}
                  </text>
                  <text
                    x={n.x}
                    y={n.y + 8}
                    textAnchor="middle"
                    fontSize="2.2"
                    fill="rgba(255,255,255,0.55)"
                  >
                    {n.name}
                  </text>
                </g>
              ))}
            </svg>

            <div className="absolute top-4 left-4 flex gap-3 text-[10px] font-mono text-white/45">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-300" />
                直接タップ
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                共通の知人経由
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl glass p-5">
            <div className="text-[10px] font-mono tracking-[0.22em] text-white/45">
              NEXT CONNECTIONS
            </div>
            <div className="mt-1 font-display text-lg font-semibold">
              AIがレコメンド
            </div>
            <div className="mt-4 space-y-3">
              {recommendations.map((r) => {
                const p = people.find((pp) => pp.id === r.personId)!;
                return (
                  <Link
                    href={`/app/people/${p.id}`}
                    key={r.personId}
                    className="block rounded-xl bg-white/[0.04] hover:bg-white/[0.07] transition p-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-400 to-violet-700 grid place-items-center text-ink-950 font-bold text-xs">
                        {p.initials}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{p.name}</div>
                        <div className="text-[11px] text-white/55">
                          {r.reason}
                        </div>
                      </div>
                      <div className="text-[12px] text-teal-300 font-mono">
                        {(r.score * 100).toFixed(0)}%
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl glass p-5">
            <div className="text-[10px] font-mono tracking-[0.22em] text-white/45">
              CONTEXTS
            </div>
            <div className="mt-1 font-display text-lg font-semibold">
              文脈フィルタ
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-[12px]">
              {["Work", "Student", "Creator", "Family", "Community"].map((t) => (
                <button
                  key={t}
                  className="px-3 py-1 rounded-full border border-white/10 text-white/65 hover:border-teal-300 hover:text-teal-100 hover:bg-teal-300/10"
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="mt-4 text-[12px] text-white/50 leading-relaxed">
              「Work」だけ／「Community」だけといった切り口でネットワークを絞り込めます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
