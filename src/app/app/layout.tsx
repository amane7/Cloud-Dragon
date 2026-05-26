import Link from "next/link";

const SUB = [
  { href: "/app", label: "Home" },
  { href: "/app/tap", label: "Tap" },
  { href: "/app/feed", label: "Feed" },
  { href: "/app/me", label: "Me" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="border-b border-white/[0.06] bg-ink-950/60 sticky top-16 z-30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 h-12 flex items-center gap-1 overflow-x-auto">
          <div className="text-[10px] font-mono tracking-[0.22em] text-white/40 mr-4 whitespace-nowrap">
            TAGR · APP
          </div>
          {SUB.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="px-3 py-1.5 text-[13px] text-white/65 hover:text-white rounded-md hover:bg-white/5 whitespace-nowrap"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
