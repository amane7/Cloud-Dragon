"use client";

import { animate, useInView, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  format?: (n: number) => string;
}

export default function Counter({
  value,
  decimals = 0,
  duration = 1.4,
  prefix = "",
  suffix = "",
  className,
  format,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const mv = useMotionValue(0);
  const [text, setText] = useState<string>(
    format ? format(0) : `${prefix}0${suffix}`
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (latest) => {
        if (format) {
          setText(format(latest));
        } else {
          setText(
            `${prefix}${latest.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })}${suffix}`
          );
        }
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, duration, prefix, suffix, format, mv]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
