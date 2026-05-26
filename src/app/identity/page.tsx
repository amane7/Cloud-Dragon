"use client";

import { useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import { myFaces, FaceKey } from "@/data/sample";

export default function IdentityPage() {
  const [active, setActive] = useState<FaceKey>("work");
  const face = myFaces.find((f) => f.key === active)!;

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-10 py-20">
      <SectionHeader
        eyebrow="IDENTITY · MULTI-CONTEXT"
        title={
          <>
            私たちには、<br />
            <span className="text-gradient-teal">いくつもの顔</span>がある。
          </>
        }
        subtitle="既存のSNSは1つのプロフィールに私たちを押し込めてきた。Tagrは、相手と場面に合わせて自然に出し分ける、新しいID体験を提案します。"
      />

      <div className="mt-12 grid lg:grid-cols-12 gap-8">
        {/* Face list */}
        <div className="lg:col-span-5 space-y-3">
          {myFaces.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`w-full text-left rounded-2xl border p-4 transition ${
                active === f.key
                  ? "border-teal-300 bg-teal-300/10 glow-teal"
                  : "border-white/[0.08] glass hover:border-white/15"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.accent} grid place-items-center text-xl`}>
                  {f.emoji}
                </div>
                <div className="flex-1">
                  <div className="font-display font-semibold">{f.name}</div>
                  <div className="text-[12px] text-white/55">{f.role}</div>
                </div>
                <div className="text-[10px] font-mono text-white/40">
                  FACE · {f.key.toUpperCase()}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Preview */}
        <div className="lg:col-span-7">
          <div className="sticky top-32">
            <div className="rounded-3xl glass p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-25" />
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-teal-400/15 blur-3xl" />
              <div className="relative">
                <div className="text-[10px] font-mono tracking-[0.22em] text-white/45">
                  PREVIEW · WHAT OTHERS SEE
                </div>
                <div className="mt-5 flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${face.accent} grid place-items-center text-2xl`}>
                    {face.emoji}
                  </div>
                  <div>
                    <div className="font-display text-2xl font-semibold">
                      {face.name}
                    </div>
                    <div className="text-[13px] text-teal-200/85">{face.role}</div>
                  </div>
                </div>
                <p className="mt-5 text-[14px] text-white/75 leading-relaxed">
                  {face.bio}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {face.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/75"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <div className="mt-7 grid grid-cols-3 gap-3 text-[12px]">
                  <div className="rounded-lg bg-white/[0.04] p-3">
                    <div className="text-[10px] font-mono text-white/40">
                      VISIBILITY
                    </div>
                    <div className="mt-1 font-semibold">公開</div>
                  </div>
                  <div className="rounded-lg bg-white/[0.04] p-3">
                    <div className="text-[10px] font-mono text-white/40">
                      CONTACT
                    </div>
                    <div className="mt-1 font-semibold">タップ後に表示</div>
                  </div>
                  <div className="rounded-lg bg-white/[0.04] p-3">
                    <div className="text-[10px] font-mono text-white/40">
                      REVIEWS
                    </div>
                    <div className="mt-1 font-semibold">この顔のみ</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl glass p-5">
              <div className="text-[10px] font-mono tracking-[0.22em] text-white/45">
                CLOUD DRAGON CORE IDEA
              </div>
              <p className="mt-2 text-[13px] text-white/65 leading-relaxed">
                「学生としてのAさん」「家族としてのAさん」「部活の中のAさん」
                — 一人の人間には、いくつもの顔がある。SNSがそれを取りこぼしてきた領域を、
                <span className="text-teal-200">タップと文脈</span>で取り戻します。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
