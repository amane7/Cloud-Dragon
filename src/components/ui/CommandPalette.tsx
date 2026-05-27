"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { people } from "@/data/sample";

const NAV = [
  { href: "/", label: "Home", hint: "ランディングページ" },
  { href: "/app", label: "ダッシュボード", hint: "ホーム" },
  { href: "/app/tap", label: "Tap to Connect", hint: "NFCカードをかざす" },
  { href: "/app/feed", label: "フィード", hint: "今日のつながり" },
  { href: "/app/me", label: "Me / Faces", hint: "顔の管理" },
  { href: "/network", label: "人脈ネットワーク", hint: "Graph view" },
  { href: "/identity", label: "いくつもの顔", hint: "Multi-Context ID" },
  { href: "/trust", label: "信用スコア", hint: "360° Trust" },
  { href: "/business-plan", label: "事業計画", hint: "Investor Deck" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isK = e.key.toLowerCase() === "k";
      const isSlash = e.key === "/";
      const target = e.target as HTMLElement;
      const inField =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (isSlash && !inField) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      {/* Launcher (bottom right) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="fixed bottom-5 right-5 z-[55] group inline-flex items-center gap-2 px-3.5 py-2 rounded-full glass-strong text-[12px] text-white/75 hover:text-white transition focus-ring"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-teal-300 dot-pulse text-teal-300" />
        <span>検索 / コマンド</span>
        <kbd className="ml-1 hidden md:inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-white/65">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-start pt-[10vh] md:pt-[18vh] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.96, y: -10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: -8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="relative w-full max-w-xl mx-auto glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-black/60"
            >
              <Command label="Command palette" className="bg-transparent">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-teal-300"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-5-5" />
                  </svg>
                  <Command.Input
                    placeholder="ページや人を検索…"
                    className="flex-1 bg-transparent outline-none text-sm placeholder-white/35"
                  />
                  <kbd className="text-[10px] font-mono text-white/40 px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                    ESC
                  </kbd>
                </div>
                <Command.List className="max-h-[60vh] overflow-y-auto p-1">
                  <Command.Empty className="px-4 py-6 text-center text-[13px] text-white/50">
                    一致するページはありません。
                  </Command.Empty>

                  <Command.Group heading="Navigate">
                    {NAV.map((n) => (
                      <Command.Item
                        key={n.href}
                        value={`${n.label} ${n.hint}`}
                        onSelect={() => go(n.href)}
                        className="px-3 py-2 rounded-lg text-sm flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="font-medium">{n.label}</div>
                          <div className="text-[11px] text-white/45">{n.hint}</div>
                        </div>
                        <span className="text-[10px] font-mono text-white/35">
                          {n.href}
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group heading="People">
                    {people.map((p) => (
                      <Command.Item
                        key={p.id}
                        value={`${p.name} ${p.handle} ${p.tags.join(" ")}`}
                        onSelect={() => go(`/app/people/${p.id}`)}
                        className="px-3 py-2 rounded-lg text-sm flex items-center gap-3"
                      >
                        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-teal-300 to-teal-600 grid place-items-center text-ink-950 text-[11px] font-bold">
                          {p.initials}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{p.name}</div>
                          <div className="text-[11px] text-white/45 font-mono">
                            {p.handle} · {p.city}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-teal-200/80">
                          TRUST {p.trust}
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>

                <div className="px-4 py-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/40">
                  <div className="flex items-center gap-3">
                    <span>↑↓ 移動</span>
                    <span>↵ 開く</span>
                  </div>
                  <span>CLOUD DRAGON · v0.1</span>
                </div>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
