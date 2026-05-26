export interface Stat {
  label: string;
  value: string;
  unit?: string;
  hint?: string;
}

export default function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.07] rounded-2xl overflow-hidden border border-white/[0.07]">
      {stats.map((s, i) => (
        <div key={i} className="bg-ink-900/80 p-5 md:p-6">
          <div className="text-[10px] font-mono tracking-[0.2em] text-white/40">
            {s.label}
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-gradient-teal">
              {s.value}
            </span>
            {s.unit && (
              <span className="text-xs text-white/55 font-mono">{s.unit}</span>
            )}
          </div>
          {s.hint && (
            <div className="mt-1.5 text-[11px] text-white/45">{s.hint}</div>
          )}
        </div>
      ))}
    </div>
  );
}
