import SectionHeader from "@/components/SectionHeader";
import StatRow from "@/components/StatRow";

export default function BusinessPlanPage() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-teal pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-10 py-20">
          <div className="text-[10px] font-mono tracking-[0.22em] text-white/45">
            BUSINESS PLAN · CLOUD DRAGON · 2026
          </div>
          <h1 className="mt-3 font-display text-4xl md:text-6xl font-bold tracking-tight text-balance leading-[1.05]">
            Tagr / NFC × ID<br />
            <span className="text-gradient-teal">投資家向け事業計画書</span>
          </h1>
          <p className="mt-5 max-w-2xl text-white/65 leading-relaxed">
            「いくつもの顔」を、相手と文脈に合わせて自然に出し分ける。タップとクラウドで人脈が育ち、
            ポジ＋ネガを含む信用スコアで、本当に出会うべき人とつながる社会へ。
          </p>

          <div className="mt-10">
            <StatRow
              stats={[
                { label: "TAM (国内)", value: "1.2", unit: "兆円", hint: "ID / ネットワーキング" },
                { label: "SAM (3年)", value: "320", unit: "億円", hint: "コミュニティ・イベント領域" },
                { label: "SOM (Y3)", value: "32", unit: "億円", hint: "10%獲得想定" },
                { label: "β LAUNCH", value: "2026", unit: "Q2", hint: "10 communities" },
              ]}
            />
          </div>

          {/* Quick nav */}
          <div className="mt-8 flex flex-wrap gap-2 text-[12px]">
            {[
              ["#problem", "課題"],
              ["#solution", "解決策"],
              ["#why-now", "なぜ今"],
              ["#market", "市場"],
              ["#product", "プロダクト"],
              ["#business-model", "ビジネスモデル"],
              ["#go-to-market", "GTM"],
              ["#competition", "競合"],
              ["#roadmap", "ロードマップ"],
              ["#team", "チーム"],
              ["#financial", "財務"],
              ["#ask", "Ask"],
              ["#contact", "Contact"],
            ].map(([h, l]) => (
              <a
                key={h}
                href={h}
                className="px-3 py-1 rounded-full border border-white/10 text-white/65 hover:border-teal-300/40 hover:text-teal-100 hover:bg-teal-300/5"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <Section id="problem" eyebrow="01 · PROBLEM" title="つながりの寿命は短く、本当の信用は残らない">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              t: "名刺アプリは「交換」で終わる",
              d: "Eight, Sansan等は名刺のデジタル化は実現したが、その後の関係を追跡できない。",
            },
            {
              t: "SNSは「いくつもの顔」を映せない",
              d: "1人1アカウント前提。文脈に応じた出し分けができず、本当の自分が伝わらない。",
            },
            {
              t: "信用情報はキラキラだけ",
              d: "ハラスメント気質や遅刻癖など、組織で本当に重要な情報はデジタルに残らない。",
            },
          ].map((p, i) => (
            <Card key={i} title={p.t} body={p.d} idx={i + 1} />
          ))}
        </div>
      </Section>

      {/* SOLUTION */}
      <Section id="solution" eyebrow="02 · SOLUTION" title="Tagr — NFC × Multi-Face × Trust">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "Tap to Connect", d: "NFCで瞬時に交換、自動でクラウド記録。" },
            { t: "Multi-Face Identity", d: "Work/Student/Family… 文脈で見せる顔を切替。" },
            { t: "360° Trust", d: "ポジ＋ネガを本人同意ベースで蓄積。" },
          ].map((p, i) => (
            <Card key={i} title={p.t} body={p.d} idx={i + 1} highlight />
          ))}
        </div>
      </Section>

      {/* WHY NOW */}
      <Section id="why-now" eyebrow="03 · WHY NOW" title="今、立ち上げる理由">
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { t: "NFC普及率の臨界点", d: "iPhone/AndroidともにNFC標準搭載。30円タグで実装コストが消えた。" },
            { t: "AIによる文脈理解", d: "LLMで「相手 × 自分」の最適な顔を提案する技術が成熟。" },
            { t: "ハラスメント・人材ミスマッチ問題", d: "見えなかった情報を可視化する社会的要請が拡大。" },
            { t: "コミュニティ経済の到来", d: "学生団体・有志コミュニティが新たな主役に。" },
          ].map((p, i) => (
            <Card key={i} title={p.t} body={p.d} idx={i + 1} />
          ))}
        </div>
      </Section>

      {/* MARKET */}
      <Section id="market" eyebrow="04 · MARKET" title="市場規模と狙う領域">
        <div className="grid md:grid-cols-3 gap-4">
          <Card idx={1} title="TAM 1.2兆円" body="国内ID・ネットワーキング・HR Tech・名刺/CRM・コミュニティSaaS の総和。" />
          <Card idx={2} title="SAM 320億円" body="学生・コミュニティ・イベント・小規模B2Bが対象。年率15%成長。" />
          <Card idx={3} title="SOM 32億円 (Y3)" body="SAM10%獲得。10万ユーザー × ARPU 3万円換算。" />
        </div>
        <div className="mt-5 rounded-2xl glass p-5 text-[13px] text-white/65 leading-relaxed">
          ホワイトスペース: BigTech (Google/Meta) は名刺・ローカルコミュニティ領域に未参入。
          Eight/Sansan は B2B 大企業向けで、学生・有志コミュニティ・イベント運営は手薄。
          Tagrは <span className="text-teal-200">「コミュニティの中の私」</span> という未開拓ポジションを狙う。
        </div>
      </Section>

      {/* PRODUCT */}
      <Section id="product" eyebrow="05 · PRODUCT" title="3つのコア体験">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "Tap", d: "NFCをかざす → 連絡先・顔・記録が一瞬で完結。" },
            { t: "Save", d: "いつ・どこで・誰と・どの顔で会ったかをクラウドに残す。" },
            { t: "Grow", d: "AIが過去のつながりから「次に話すといい人」を提案。" },
          ].map((p, i) => (
            <Card key={i} title={p.t} body={p.d} idx={i + 1} highlight />
          ))}
        </div>
      </Section>

      {/* BUSINESS MODEL */}
      <Section id="business-model" eyebrow="06 · BUSINESS MODEL" title="3層のマネタイズ">
        <div className="rounded-2xl glass overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-left text-[10px] font-mono tracking-[0.18em] text-white/45 border-b border-white/10">
              <tr>
                <th className="p-4">LAYER</th>
                <th className="p-4">PRODUCT</th>
                <th className="p-4">PRICE</th>
                <th className="p-4">TARGET</th>
              </tr>
            </thead>
            <tbody className="text-white/85">
              {[
                ["L1 · NFC Card", "物理カード販売", "¥1,200 / 枚", "個人 / 学生"],
                ["L2 · Tagr+ Sub", "クラウド人脈SaaS (Pro plan)", "¥980 / 月", "個人プロ・営業"],
                ["L3 · Community", "コミュニティ運営ダッシュボード", "¥9,800 / 月〜", "学生団体 / イベント主催"],
                ["L4 · Trust API", "信用スコア提供API", "従量 + ライセンス", "HR / マッチング企業"],
              ].map((r, i) => (
                <tr key={i} className="border-b border-white/[0.05]">
                  <td className="p-4 font-mono text-teal-200">{r[0]}</td>
                  <td className="p-4">{r[1]}</td>
                  <td className="p-4 font-mono">{r[2]}</td>
                  <td className="p-4 text-white/65">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* GO TO MARKET */}
      <Section id="go-to-market" eyebrow="07 · GTM" title="コミュニティ起点の伸ばし方">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "Phase 1: 学生コミュニティ侵食", d: "10団体 / 300枚カード無償提供で初期PMF検証。Fight Clubなどメンタリング系から開始。" },
            { t: "Phase 2: イベント横展開", d: "コミュニティオーナー向けDashboardでLTV最大化。スポンサー連携。" },
            { t: "Phase 3: B2B / API", d: "信用スコアAPI/SSOで企業へ。HRTech企業とアライアンス。" },
          ].map((p, i) => (
            <Card key={i} title={p.t} body={p.d} idx={i + 1} />
          ))}
        </div>
      </Section>

      {/* COMPETITION */}
      <Section id="competition" eyebrow="08 · COMPETITION" title="ポジショニング">
        <div className="rounded-2xl glass p-6">
          <div className="relative aspect-[16/10] w-full">
            <svg viewBox="0 0 100 64" className="w-full h-full">
              <rect x="0" y="0" width="100" height="64" fill="transparent" />
              {/* axes */}
              <line x1="50" y1="2" x2="50" y2="62" stroke="rgba(255,255,255,0.2)" strokeWidth="0.2" strokeDasharray="0.6 0.6" />
              <line x1="2" y1="32" x2="98" y2="32" stroke="rgba(255,255,255,0.2)" strokeWidth="0.2" strokeDasharray="0.6 0.6" />
              {/* labels */}
              <text x="50" y="2.5" textAnchor="middle" fontSize="2.2" fill="rgba(255,255,255,0.6)">いくつもの顔 (Multi-context)</text>
              <text x="50" y="63" textAnchor="middle" fontSize="2.2" fill="rgba(255,255,255,0.6)">単一プロフィール</text>
              <text x="2" y="33.5" fontSize="2.2" fill="rgba(255,255,255,0.6)">浅いつながり</text>
              <text x="98" y="33.5" fontSize="2.2" fill="rgba(255,255,255,0.6)" textAnchor="end">深い記録・信用</text>

              {/* competitors */}
              {[
                { x: 18, y: 50, l: "Eight / Sansan", c: "rgba(255,255,255,0.35)" },
                { x: 28, y: 42, l: "LinkedIn", c: "rgba(255,255,255,0.35)" },
                { x: 22, y: 18, l: "X / Bluesky", c: "rgba(255,255,255,0.3)" },
                { x: 65, y: 48, l: "Eight (Sansan B2B)", c: "rgba(255,255,255,0.25)" },
                { x: 38, y: 10, l: "Threads / Instagram", c: "rgba(255,255,255,0.3)" },
                { x: 76, y: 16, l: "Tagr", c: "#37e7c0", big: true },
              ].map((d: any, i) => (
                <g key={i}>
                  <circle cx={d.x} cy={d.y} r={d.big ? 2.6 : 1.6} fill={d.c} />
                  {d.big && <circle cx={d.x} cy={d.y} r="4.4" fill="none" stroke="#37e7c0" strokeWidth="0.4" />}
                  <text
                    x={d.x}
                    y={d.y - 3}
                    textAnchor="middle"
                    fontSize="2.2"
                    fill={d.big ? "#7df5dc" : "rgba(255,255,255,0.7)"}
                    fontWeight={d.big ? 700 : 400}
                  >
                    {d.l}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <p className="mt-4 text-[13px] text-white/60">
            Tagrは「深い記録 × いくつもの顔」象限の唯一のプレイヤー。
            BigTechの未参入領域＝コミュニティ × ローカルを狙う。
          </p>
        </div>
      </Section>

      {/* ROADMAP */}
      <Section id="roadmap" eyebrow="09 · ROADMAP" title="3年計画">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { q: "2026", t: "β + v1", d: "10コミュニティ・5,000ユーザー・MRR ¥0.5M" },
            { q: "2027", t: "v2 + API", d: "50,000ユーザー・MRR ¥8M・HRTech提携 3社" },
            { q: "2028", t: "Platform", d: "500,000ユーザー・MRR ¥60M・ID基盤として確立" },
          ].map((m, i) => (
            <div key={i} className="rounded-2xl glass p-5">
              <div className="text-[10px] font-mono tracking-[0.22em] text-teal-200/80">
                Y{i + 1} · {m.q}
              </div>
              <div className="mt-3 font-display text-xl font-semibold">{m.t}</div>
              <div className="mt-2 text-[13px] text-white/65">{m.d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* TEAM */}
      <Section id="team" eyebrow="10 · TEAM" title="チーム — Cloud Dragon">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { n: "Kenji Sato", r: "CEO / PdM", b: "B2B SaaS 5年・新規事業 0→1とブランド体験設計" },
            { n: "Riley Chen", r: "CTO / Engineer", b: "AI・Infra。OSSコントリビューター。オンコール対応の鬼" },
            { n: "Mei Yamashita", r: "Research / HCI", b: "九大HCI Lab・NFC×Identity 専門・修士" },
          ].map((m, i) => (
            <div key={i} className="rounded-2xl glass p-5 text-center">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-300 to-teal-600 grid place-items-center text-ink-950 font-bold text-lg">
                {m.n.split(" ").map((s) => s[0]).join("")}
              </div>
              <div className="mt-3 font-display font-semibold">{m.n}</div>
              <div className="text-[12px] text-teal-200/80 font-mono">{m.r}</div>
              <p className="mt-2 text-[12px] text-white/55">{m.b}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FINANCIAL */}
      <Section id="financial" eyebrow="11 · FINANCIAL" title="財務計画 (3年)">
        <div className="rounded-2xl glass overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-left text-[10px] font-mono tracking-[0.18em] text-white/45 border-b border-white/10">
              <tr>
                <th className="p-4">METRIC</th>
                <th className="p-4 text-right">Y1 (2026)</th>
                <th className="p-4 text-right">Y2 (2027)</th>
                <th className="p-4 text-right">Y3 (2028)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["ユーザー数", "5,000", "50,000", "500,000"],
                ["MRR", "¥0.5M", "¥8M", "¥60M"],
                ["ARR", "¥6M", "¥96M", "¥720M"],
                ["Gross Margin", "62%", "74%", "82%"],
                ["Burn / Month", "¥6M", "¥18M", "¥35M"],
                ["EBITDA", "−¥66M", "−¥120M", "+¥180M"],
              ].map((r, i) => (
                <tr key={i} className="border-b border-white/[0.05]">
                  <td className="p-4 text-white/80">{r[0]}</td>
                  <td className="p-4 text-right font-mono">{r[1]}</td>
                  <td className="p-4 text-right font-mono">{r[2]}</td>
                  <td className="p-4 text-right font-mono text-teal-300">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ASK */}
      <Section id="ask" eyebrow="12 · ASK" title="調達依頼">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="rounded-2xl glass p-6">
            <div className="text-[10px] font-mono tracking-[0.22em] text-teal-200/80">
              SEED ROUND
            </div>
            <div className="mt-3 font-display text-4xl font-bold">¥120M</div>
            <div className="mt-1 text-[13px] text-white/55">18ヶ月のランウェイ確保</div>
            <ul className="mt-5 space-y-2 text-[13px] text-white/70">
              <li>・プロダクト開発 40% (Engineer × 3, Designer × 1)</li>
              <li>・NFCカード製造・配布 25%</li>
              <li>・GTM / コミュニティ運営 20%</li>
              <li>・R&D (AI / Trust algorithm) 10%</li>
              <li>・予備費 5%</li>
            </ul>
          </div>
          <div className="rounded-2xl glass p-6">
            <div className="text-[10px] font-mono tracking-[0.22em] text-teal-200/80">
              MILESTONE (18M)
            </div>
            <div className="mt-3 space-y-3">
              {[
                { l: "β LAUNCH", v: "Done", d: "Q2 2026" },
                { l: "PMF (MAU 5k, NPS > 40)", v: "Q4 2026" },
                { l: "ARR ¥30M", v: "Q2 2027" },
                { l: "Series A 準備", v: "Q3 2027" },
              ].map((m: any, i) => (
                <div key={i} className="flex items-center justify-between text-[13px] border-b border-white/[0.06] pb-2">
                  <div>{m.l}</div>
                  <div className="font-mono text-teal-200">{m.d ?? m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" eyebrow="13 · CONTACT" title="お問い合わせ">
        <div className="rounded-2xl glass p-6 max-w-2xl">
          <div className="text-[13px] text-white/65 leading-relaxed">
            事業計画にご関心をいただき、ありがとうございます。<br />
            投資・パートナーシップ・β参加のご相談は以下までお気軽にご連絡ください。
          </div>
          <div className="mt-5 space-y-2 text-sm">
            <div className="font-mono text-teal-200/90">hello@tagr.cloud</div>
            <div className="font-mono text-white/55">Cloud Dragon, Inc. · Tokyo, JP</div>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/60 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
            CURRENTLY HIRING · ENGINEERS / DESIGNERS
          </div>
        </div>
      </Section>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-white/[0.06] py-16 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function Card({
  idx,
  title,
  body,
  highlight,
}: {
  idx: number;
  title: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 card-hover ${
        highlight
          ? "border border-teal-300/25 bg-teal-300/5"
          : "glass"
      }`}
    >
      <div className="text-[10px] font-mono tracking-[0.22em] text-teal-200/70">
        0{idx}
      </div>
      <div className="mt-3 font-display text-lg font-semibold text-balance">
        {title}
      </div>
      <p className="mt-2 text-[13px] text-white/65 leading-relaxed">{body}</p>
    </div>
  );
}
