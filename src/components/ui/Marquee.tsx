"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props {
  children: ReactNode;
  speed?: number; // seconds for one loop
  pauseOnHover?: boolean;
  className?: string;
  fade?: boolean;
}

export default function Marquee({
  children,
  speed = 36,
  pauseOnHover = true,
  className,
  fade = true,
}: Props) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={
        fade
          ? {
              maskImage:
                "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            }
          : undefined
      }
    >
      <div
        className={cn(
          "flex gap-12 w-max",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marqueeScroll ${speed}s linear infinite`,
        }}
      >
        <div className="flex gap-12 shrink-0">{children}</div>
        <div className="flex gap-12 shrink-0" aria-hidden>
          {children}
        </div>
      </div>
      <style>{`@keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
