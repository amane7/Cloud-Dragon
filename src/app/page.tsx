import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import HeroVisual from "@/components/landing/HeroVisual";
import { Reveal, RevealStagger, RevealItem } from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Counter from "@/components/ui/Counter";
import Marquee from "@/components/ui/Marquee";

export default function HomePage() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-teal pointer-events-none" />
        <div className="orb w-[520px] h-[520px] bg-teal-500/40 -top-32 -left-24" />
        <div className="orb w-[420px] h-[420px] bg-violet-500/30 top-40 right-0" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-10 pt-20 md:pt-28 pb-20">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-[0.22em] text-white/70">
                    TAGR · NFC × ID · v0.1 · β · 2026
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.02] text-balance">
                  かざすだけで、<br />
                  <span className="shimmer-text">人と人がつながる。</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-6 text-lg text-white/65 max-w-xl leading-relaxed">
                  NFC × 人脈ネットワーク。<br />
                  名刺は「交換」で終わる。SNSは「いくつもの顔」を映しきれない。<br />
                  Cloud Dragonは、文脈ごとに自分を伝え、つながりを育てる
                  <span className="text-teal-200">新しいIDのかたち</span>
                  をつくります。
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <MagneticButton
                    href="/app/tap"
                    variant="primary"
                    size="lg"
                    iconLeft={
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M3 11c5 0 9 4 9 9" />
                        <path d="M3 7c8 0 13 5 13 13" />
                        <path d="M3 3c11 0 17 6 17 17" />
                      </svg>
                    }
                    iconRight={<span className="opacity-60">→</span>}
                  >
                    カードをかざす（デモ）
                  </MagneticButton>
                  <MagneticButton
                    href="/business-plan"
                    variant="outline"
                    size="lg"
                  >
                    事業計画を見る
                  </MagneticButton>
                </div>
              </Reveal>

              <Reveal delay={0.32}>
                <div className="mt-10 flex items-center gap-6 text-[11px] font-mono tracking-[0.18em] text-white/40">
                  <span>IDENTITY · LINK</span>
                  <span className="w-px h-3 bg-white/15" />
                  <span>NFC · CLOUD</span>
                  <span className="w-px h-3 bg-white/15" />
                  <span>v0.1 · β</span>
                </div>
              </Reveal>
            </div>

            {/* Right: Hero visual (parallax + animated phone/card/rings) */}
            <div className="lg:col-span-5 relative">
              <HeroVisual />
            </div>
          </div>

          {/* Hero stats — Counter animated */}
          <Reveal delay={0.1} amount={0.1}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                {
                  label: "TAPS / DAY",
                  value: 1284,
                  hint: "βコミュニティ実測",
                  suffix: "",
                },
                {
                  label: "CONNECTIONS",
                  value: 8.6,
                  decimals: 1,
                  hint: "累計つながり数",
                  suffix: "k",
                },
                {
                  label: "EVENTS",
                  value: 62,
                  hint: "登録イベント",
                  suffix: "",
                },
                {
                  label: "TRUST INDEX",
                  value: 82,
                  hint: "平均スコア",
                  suffix: "/100",
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl glass p-4 card-shimmer relative overflow-hidden"
                >
                  <div className="text-[10px] font-mono tracking-[0.2em] text-white/45">
                    {s.label}
                  </div>
                  <div className="mt-2 font-display text-2xl md:text-3xl font-bold text-gradient-teal">
                    <Counter
                      value={s.value}
                      decimals={s.decimals ?? 0}
                      suffix={s.suffix ?? ""}
                    />
                  </div>
                  <div className="mt-1 text-[11px] text-white/45">{s.hint}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Community marquee */}
          <Reveal delay={0.18}>
            <div className="mt-14">
              <div className="text-center text-[10px] font-mono tracking-[0.22em] text-white/40 mb-5">
                TRUSTED BY EARLY COMMUNITIES
              </div>
              <Marquee speed={32}>
                {[
                  "Fight Club",
                  "Cloud Dragon Garage",
                  "TechBridge SG",
                  "梅田 Garage",
                  "九大 HCI Lab",
                  "下北沢 SHELTER",
                  "代々木 Studio",
                  "Indie Devs",
                  "Beatmaker Society",
                ].map((c) => (
                  <span
                    key={c}
                    className="font-display text-lg md:text-xl text-white/35 hover:text-white/85 transition whitespace-nowrap"
                  >
                    {c}
                  </span>
                ))}
              </Marquee>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <Reveal>
            <SectionHeader
              eyebrow="01 · PROBLEM"
              title={
                <>
                  「会った」は記録できても、<br />
                  <span className="text-white/55">「つながり」は残らない。</span>
                </>
              }
              subtitle="名刺アプリは交換で止まる。SNSは“いくつもの顔”を映しきれない。せっかく集まっても、本当に話すべき人にたどり着けない。"
            />
          </Reveal>

          <RevealStagger className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              {
                k: "名刺交換",
                t: "一度きりで終わる",
                d: "渡して、しまって、それきり。その後の関係は誰も追えない。",
              },
              {
                k: "自己紹介",
                t: "いつも同じ一言",
                d: "相手や場面に合わせた見せ方ができず、自分らしさが伝わりきらない。",
              },
              {
                k: "その後",
                t: "誰とつながるべきかが見えない",
                d: "せっかく集まっても、本当に話すべき人にたどり着けないまま終わる。",
              },
            ].map((p, i) => (
              <RevealItem key={i}>
                <div className="lift card-shimmer glass rounded-2xl p-6 relative overflow-hidden h-full">
                  <div className="text-[10px] font-mono tracking-[0.22em] text-teal-200/70">
                    0{i + 1} · {p.k}
                  </div>
                  <div className="mt-4 font-display text-xl font-semibold text-balance">
                    {p.t}
                  </div>
                  <div className="mt-2 text-sm text-white/55 leading-relaxed">
                    {p.d}
                  </div>
                  <div className="mt-6 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                  <div className="mt-3 text-[10px] font-mono text-white/35">
                    CURRENT WORLD
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="relative py-24 border-t border-white/[0.06]">
        <div className="absolute inset-0 bg-radial-teal opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-10">
          <Reveal>
            <SectionHeader
              eyebrow="02 · SOLUTION"
              title={
                <>
                  NFCカードをかざすだけで、<br />
                  <span className="text-gradient-teal">人脈が育っていく。</span>
                </>
              }
              subtitle="連絡先交換も、自己紹介も、その後の関係も。タップ1回で、すべてがクラウドに残り、広がっていく。"
            />
          </Reveal>

          <RevealStagger className="mt-14 grid md:grid-cols-3 gap-5">
            {[
              {
                n: "01",
                t: "かざす",
                d: "会った人とカードをタップ。連絡先交換も自己紹介もこれ1回で。",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <path d="M3 11c5 0 9 4 9 9" />
                    <path d="M3 7c8 0 13 5 13 13" />
                    <path d="M3 3c11 0 17 6 17 17" />
                  </svg>
                ),
              },
              {
                n: "02",
                t: "残る",
                d: "いつ・どこで・誰と会ったかが、クラウドに自動で記録される。",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <path d="M4 7v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H6a2 2 0 00-2 2z" />
                  </svg>
                ),
              },
              {
                n: "03",
                t: "広がる",
                d: "過去のつながりから、次に話すといい人をレコメンド。",
                icon: (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <circle cx="6" cy="6" r="2" />
                    <circle cx="18" cy="6" r="2" />
                    <circle cx="6" cy="18" r="2" />
                    <circle cx="18" cy="18" r="2" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M8 8l2.5 2.5M16 8l-2.5 2.5M8 16l2.5-2.5M16 16l-2.5-2.5" />
                  </svg>
                ),
              },
            ].map((s, i) => (
              <RevealItem key={i}>
                <div className="lift card-shimmer glass rounded-2xl p-6 relative overflow-hidden group h-full">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-mono tracking-[0.22em] text-white/45">
                      STEP {s.n}
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-teal-300/10 border border-teal-300/20 grid place-items-center text-teal-300 group-hover:rotate-6 group-hover:bg-teal-300/20 transition-transform duration-300">
                      {s.icon}
                    </div>
                  </div>
                  <div className="mt-6 font-display text-2xl font-semibold tracking-tight">
                    {s.t}
                  </div>
                  <div className="mt-2 text-sm text-white/60 leading-relaxed">
                    {s.d}
                  </div>
                  <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-teal-400/10 blur-3xl group-hover:bg-teal-400/30 transition" />
                </div>
              </RevealItem>
            ))}
          </RevealStagger>

          <Reveal delay={0.1}>
            <div className="mt-12 text-center">
              <MagneticButton href="/app/tap" variant="primary" size="lg">
                タップ体験をはじめる →
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MULTI-FACE */}
      <section className="relative py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeader
                  eyebrow="03 · IDENTITY"
                  title={
                    <>
                      私たちには、<br />
                      <span className="text-gradient-teal">いくつもの顔</span>がある。
                    </>
                  }
                  subtitle="学生としての私、家族としての私、コミュニティの中の私。Tagrは、相手の文脈に合わせて自己紹介を出し分けます。"
                />
              </Reveal>
              <RevealStagger className="mt-6 space-y-3 text-sm text-white/65">
                {[
                  "目の前の相手に応じて、見せる顔を選べる",
                  "肩書きではなく、文脈で自分を伝える",
                  "AIが相手と自分の関係から、最適な顔を提案",
                ].map((t, i) => (
                  <RevealItem key={i}>
                    <li className="flex items-start gap-3 list-none">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-teal-300 dot-pulse text-teal-300" />
                      <span>{t}</span>
                    </li>
                  </RevealItem>
                ))}
              </RevealStagger>
              <Reveal delay={0.1}>
                <Link
                  href="/identity"
                  className="link-anim mt-7 inline-flex items-center gap-2 text-sm text-teal-200 hover:text-teal-100"
                >
                  マルチコンテキストIDを見る <span className="arrow">→</span>
                </Link>
              </Reveal>
            </div>

            <RevealStagger
              className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-3"
              amount={0.1}
            >
              {[
                {
                  e: "💼",
                  t: "Work",
                  s: "Cloud Dragon / PdM",
                  c: "from-teal-300/30 to-teal-600/10",
                },
                {
                  e: "🎓",
                  t: "Student",
                  s: "HCI Lab・修士2年",
                  c: "from-violet-400/30 to-violet-700/10",
                },
                {
                  e: "🎧",
                  t: "Creator",
                  s: "Beatmaker / Indie Dev",
                  c: "from-rose-400/30 to-rose-600/10",
                },
                {
                  e: "🌿",
                  t: "Family",
                  s: "2児の親 / 世田谷",
                  c: "from-amber-300/30 to-amber-600/10",
                },
                {
                  e: "🐉",
                  t: "Community",
                  s: "Fight Club / Mentor",
                  c: "from-cyan-300/30 to-blue-600/10",
                },
                {
                  e: "+",
                  t: "Custom",
                  s: "あなただけの顔を作る",
                  c: "from-white/10 to-white/0",
                },
              ].map((f, i) => (
                <RevealItem key={i}>
                  <div
                    className={`lift card-shimmer rounded-2xl p-4 border border-white/[0.08] bg-gradient-to-br ${f.c} backdrop-blur-sm relative overflow-hidden h-full`}
                  >
                    <div className="text-2xl">{f.e}</div>
                    <div className="mt-3 font-display font-semibold text-base">
                      {f.t}
                    </div>
                    <div className="mt-0.5 text-[11px] text-white/55">{f.s}</div>
                    <div className="absolute top-3 right-3 text-[9px] font-mono text-white/30">
                      FACE · 0{i + 1}
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="relative py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeader
                  eyebrow="04 · TRUST"
                  title={
                    <>
                      良いところも、<br />
                      弱いところも、<br />
                      <span className="text-gradient-teal">透明に。</span>
                    </>
                  }
                  subtitle="既存のSNSはキラキラした顔しか見せない。本当に一緒に働ける人を見極めるには、ネガティブ情報も含めた360度の評価が必要。"
                />
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-6 px-4 py-3 rounded-lg border border-amber-400/30 bg-amber-400/5 text-[12px] text-amber-200/90 leading-relaxed">
                  ⚠ ネガティブ情報の扱いは慎重に。Tagrでは本人合意・第三者検証・反論権をデフォルトに据えて設計します。
                </div>
              </Reveal>
            </div>

            <Reveal className="lg:col-span-7" delay={0.1}>
              <div className="glass-strong rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-300 to-teal-600 grid place-items-center text-ink-950 font-bold">
                      KS
                    </div>
                    <div>
                      <div className="font-semibold">佐藤 健司</div>
                      <div className="text-[11px] text-white/50 font-mono">
                        @kenji_sato · TRUST 88 / 100
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono tracking-[0.2em] text-white/40">
                      360° REVIEW
                    </div>
                    <div className="text-xs text-teal-200/90 mt-0.5">
                      12 voices
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-teal-300/8 border border-teal-300/20 p-4">
                    <div className="text-[10px] font-mono tracking-[0.2em] text-teal-200/80">
                      ＋ STRENGTHS
                    </div>
                    <ul className="mt-2 text-[13px] space-y-1.5 text-white/85">
                      <li>・プレゼンが圧倒的にうまい</li>
                      <li>・細部の詰めが鬼</li>
                      <li>・巻き込み力</li>
                    </ul>
                  </div>
                  <div className="rounded-xl bg-rose-400/8 border border-rose-400/20 p-4">
                    <div className="text-[10px] font-mono tracking-[0.2em] text-rose-200/80">
                      − WATCH-OUTS
                    </div>
                    <ul className="mt-2 text-[13px] space-y-1.5 text-white/75">
                      <li>・返信が遅い時がある</li>
                      <li>・初対面で固い</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 text-[12px]">
                  {[
                    { l: "信頼", v: 88, c: "bg-teal-300" },
                    { l: "実行力", v: 82, c: "bg-violet-400" },
                    { l: "貢献", v: 91, c: "bg-amber-300" },
                  ].map((m, i) => (
                    <div
                      key={i}
                      className="rounded-lg bg-white/[0.04] p-3"
                    >
                      <div className="flex items-baseline justify-between">
                        <span className="text-white/55">{m.l}</span>
                        <Counter
                          value={m.v}
                          className="font-mono"
                        />
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full ${m.c}`}
                          style={{ width: `${m.v}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="relative py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <Reveal>
            <SectionHeader
              eyebrow="05 · ROADMAP"
              title={<>Tagrの航海図。</>}
              subtitle="まずはコミュニティで使い倒し、その先にIDプラットフォームへ。"
            />
          </Reveal>

          <div className="mt-14 relative">
            <div className="absolute left-3 top-3 bottom-3 w-px bg-gradient-to-b from-teal-400/60 via-white/15 to-transparent" />
            <RevealStagger className="space-y-8">
              {[
                {
                  q: "2026 Q2",
                  t: "β — 人脈ネットワーク MVP",
                  d: "NFCタップ、マルチフェイス、人脈クラウド。10コミュニティ・300枚カードを無償提供。",
                  status: "now",
                },
                {
                  q: "2026 Q3–Q4",
                  t: "v1 — イベント運営機能",
                  d: "イベントごとの記録、参加者マップ、コミュニティオーナー向けダッシュボード。",
                  status: "next",
                },
                {
                  q: "2027 H1+",
                  t: "v2 — IDプラットフォーム構想",
                  d: "信用スコアAPI、第三者連携、企業向けID管理。Cloud DragonをID基盤として拡張。",
                  status: "future",
                },
              ].map((m, i) => (
                <RevealItem key={i}>
                  <div className="pl-12 relative">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-ink-950 border border-teal-400/40 grid place-items-center">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          m.status === "now"
                            ? "bg-teal-300 animate-pulse"
                            : m.status === "next"
                            ? "bg-teal-500"
                            : "bg-white/30"
                        }`}
                      />
                    </div>
                    <div className="font-mono text-[11px] tracking-[0.22em] text-teal-200/80">
                      {m.q}
                    </div>
                    <div className="mt-1 font-display text-xl font-semibold">
                      {m.t}
                    </div>
                    <div className="mt-1.5 text-sm text-white/55 max-w-2xl leading-relaxed">
                      {m.d}
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 border-t border-white/[0.06]">
        <div className="absolute inset-0 bg-radial-teal opacity-50 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-5 lg:px-10 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.22em] text-white/70">
                CALL FOR β TESTERS · 10 COMMUNITIES / 300 CARDS
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-balance">
              β版で使い倒してくれる<br />
              <span className="text-gradient-teal">最初の仲間</span>を、探しています。
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 text-white/65 max-w-2xl mx-auto">
              学生団体・有志コミュニティ・イベント主催者の方へ。300枚のカードを無償提供します。
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton href="/app/tap" variant="primary" size="lg">
                タップ体験をはじめる
              </MagneticButton>
              <MagneticButton href="/business-plan" variant="outline" size="lg">
                事業計画を見る →
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
