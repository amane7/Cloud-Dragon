import clsx from "clsx";

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={clsx(
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-300" />
          <span className="text-[10px] font-mono tracking-[0.22em] text-white/70">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold tracking-tight text-balance leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-white/60 text-balance leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
