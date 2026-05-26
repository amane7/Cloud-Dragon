import Link from "next/link";
import { events, people } from "@/data/sample";

export default function FeedPage() {
  // Build a fake activity feed
  const activities = [
    {
      t: "2 分前",
      type: "tap",
      head: "佐藤 健司 さんとタップしました",
      sub: "Cloud Dragon Garage · Work face で共有",
      who: "p_001",
    },
    {
      t: "今日 14:02",
      type: "recommend",
      head: "Riley Chen さんと話すことをおすすめ",
      sub: "Infra × AI で関心が重なる",
      who: "p_003",
    },
    {
      t: "昨日 22:11",
      type: "tap",
      head: "中村 凛 さんとタップしました",
      sub: "下北沢 SHELTER · Creator face で共有",
      who: "p_002",
    },
    {
      t: "昨日",
      type: "review",
      head: "高田 美玲 さんに推薦コメントが届きました",
      sub: "「場を作る天才」by @kenji_sato",
      who: "p_004",
    },
    {
      t: "3 日前",
      type: "event",
      head: "TechBridge SG Mixer で 32 件のタップ",
      sub: "Singapore · 64 名参加",
      who: "p_003",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-5 lg:px-10 py-10">
      <div className="text-[10px] font-mono tracking-[0.22em] text-white/40">FEED</div>
      <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
        あなたのつながりの記録。
      </h1>
      <p className="mt-1 text-white/55 text-sm">
        タップ、推薦、レコメンド — Tagrクラウドが自動で残します。
      </p>

      <div className="mt-10 relative">
        <div className="absolute left-3 top-3 bottom-3 w-px bg-white/10" />
        <div className="space-y-5">
          {activities.map((a, i) => {
            const p = people.find((pp) => pp.id === a.who);
            return (
              <div key={i} className="pl-10 relative">
                <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full grid place-items-center bg-ink-950 border ${
                  a.type === "tap"
                    ? "border-teal-300"
                    : a.type === "recommend"
                    ? "border-violet-400"
                    : a.type === "review"
                    ? "border-amber-300"
                    : "border-white/30"
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    a.type === "tap"
                      ? "bg-teal-300"
                      : a.type === "recommend"
                      ? "bg-violet-400"
                      : a.type === "review"
                      ? "bg-amber-300"
                      : "bg-white/40"
                  }`} />
                </div>
                <div className="rounded-2xl glass p-4 card-hover">
                  <div className="flex items-start gap-3">
                    {p && (
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-300 to-teal-600 grid place-items-center text-ink-950 font-bold text-sm shrink-0">
                        {p.initials}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">{a.head}</div>
                      <div className="text-[12px] text-white/55">{a.sub}</div>
                    </div>
                    <div className="text-[11px] font-mono text-white/40 whitespace-nowrap">
                      {a.t}
                    </div>
                  </div>
                  {p && (
                    <div className="mt-3">
                      <Link
                        href={`/app/people/${p.id}`}
                        className="text-[12px] text-teal-200 hover:text-teal-100"
                      >
                        プロフィールを見る →
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
