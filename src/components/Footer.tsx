import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] mt-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-300 to-teal-600 grid place-items-center text-ink-950 font-black text-sm">
                T
              </div>
              <div>
                <div className="font-display font-bold tracking-tight">
                  Tagr<span className="text-teal-300">.</span>
                </div>
                <div className="text-[10px] text-white/40 font-mono tracking-[0.2em]">
                  CLOUD · DRAGON / NFC × ID
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm text-white/55 max-w-md leading-relaxed">
              かざすだけで、人と人がつながる。<br />
              いくつもの顔をもつ私たちのための、<br />
              新しいIDのかたち。
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/60 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
              β · v0.1 · 2026
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-mono tracking-[0.2em] text-white/40 mb-4">
              PRODUCT
            </h4>
            <ul className="space-y-2.5 text-sm text-white/65">
              <li><Link href="/app" className="hover:text-white">App</Link></li>
              <li><Link href="/app/tap" className="hover:text-white">Tap to Connect</Link></li>
              <li><Link href="/network" className="hover:text-white">人脈ネットワーク</Link></li>
              <li><Link href="/identity" className="hover:text-white">マルチコンテキストID</Link></li>
              <li><Link href="/trust" className="hover:text-white">信用スコア</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-mono tracking-[0.2em] text-white/40 mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-sm text-white/65">
              <li><Link href="/business-plan" className="hover:text-white">事業計画</Link></li>
              <li><Link href="/business-plan#team" className="hover:text-white">Team</Link></li>
              <li><Link href="/business-plan#contact" className="hover:text-white">Contact</Link></li>
              <li><a href="mailto:hello@tagr.cloud" className="hover:text-white">hello@tagr.cloud</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-white/40 font-mono">
          <div>© 2026 Cloud Dragon. All rights reserved.</div>
          <div className="flex gap-5">
            <span>TAGR / NFC × ID</span>
            <span>PITCH · V0.1 · 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
