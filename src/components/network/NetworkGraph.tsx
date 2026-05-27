"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { people, Person } from "@/data/sample";

// Cross-relationships between people
const EDGES: [number, number][] = [
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [0, 4],
  [1, 5],
];

interface Node extends Person {
  x: number;
  y: number;
}

interface Props {
  filter?: string; // face filter, "All" or a face
}

const VIEW = 100; // SVG viewBox unit
const CENTER = { x: 50, y: 50 };

function initialLayout(list: Person[]): Node[] {
  const radius = 32;
  return list.map((p, i) => {
    const angle = (i / list.length) * Math.PI * 2 - Math.PI / 2;
    return {
      ...p,
      x: CENTER.x + Math.cos(angle) * radius,
      y: CENTER.y + Math.sin(angle) * radius,
    };
  });
}

export default function NetworkGraph({ filter = "All" }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 600, h: 600 });
  const [nodes, setNodes] = useState<Node[]>(() => initialLayout(people));
  const [dragId, setDragId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  // Resize observer
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      setSize({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Filter dim factor
  const visible: (Node & { dim?: boolean })[] = useMemo(() => {
    if (filter === "All") return nodes.map((n) => ({ ...n, dim: false }));
    return nodes.map((n) => ({
      ...n,
      dim: n.defaultFace.toLowerCase() !== filter.toLowerCase(),
    }));
  }, [nodes, filter]);

  const selectedNode = nodes.find((n) => n.id === selected) ?? null;

  // Drag logic: convert mouse to SVG coords
  function svgPoint(clientX: number, clientY: number) {
    const el = svgRef.current;
    if (!el) return { x: 50, y: 50 };
    const r = el.getBoundingClientRect();
    const x = ((clientX - r.left) / r.width) * VIEW;
    const y = ((clientY - r.top) / r.height) * VIEW;
    return { x, y };
  }

  function onPointerDown(id: string, e: React.PointerEvent<SVGGElement>) {
    e.preventDefault();
    setDragId(id);
    setSelected(id);
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent<SVGGElement>) {
    if (!dragId) return;
    const { x, y } = svgPoint(e.clientX, e.clientY);
    setNodes((prev) =>
      prev.map((n) =>
        n.id === dragId
          ? {
              ...n,
              x: Math.max(8, Math.min(VIEW - 8, x)),
              y: Math.max(8, Math.min(VIEW - 8, y)),
            }
          : n
      )
    );
  }
  function onPointerUp() {
    setDragId(null);
  }

  return (
    <div className="relative rounded-3xl glass p-4 aspect-square overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 rounded-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-radial-teal opacity-60 rounded-3xl pointer-events-none" />

      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="relative w-full h-full touch-none"
      >
        <defs>
          <linearGradient id="edgeTeal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7df5dc" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#37e7c0" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="centerGrad">
            <stop offset="0%" stopColor="#7df5dc" />
            <stop offset="100%" stopColor="#0bb38f" />
          </radialGradient>
        </defs>

        {/* Outer rotating dashed ring */}
        <motion.circle
          cx={CENTER.x}
          cy={CENTER.y}
          r="42"
          fill="none"
          stroke="rgba(55,231,192,0.15)"
          strokeWidth="0.2"
          strokeDasharray="1 1.5"
          style={{ transformOrigin: "50% 50%" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />

        {/* Direct edges */}
        {visible.map((n, i) => (
          <motion.line
            key={`d-${i}`}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={n.x}
            y2={n.y}
            stroke="url(#edgeTeal)"
            strokeWidth="0.35"
            strokeDasharray="1 1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: n.dim ? 0.18 : 0.7 }}
            transition={{ duration: 0.9, delay: 0.1 * i }}
          />
        ))}

        {/* Cross edges */}
        {EDGES.map((pair, i) => (
          <motion.line
            key={`c-${i}`}
            x1={visible[pair[0]]?.x}
            y1={visible[pair[0]]?.y}
            x2={visible[pair[1]]?.x}
            y2={visible[pair[1]]?.y}
            stroke="rgba(157,123,255,0.4)"
            strokeWidth="0.22"
            initial={{ opacity: 0 }}
            animate={{
              opacity:
                visible[pair[0]]?.dim || visible[pair[1]]?.dim ? 0.08 : 0.5,
            }}
            transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
          />
        ))}

        {/* Center YOU */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 220 }}
          style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
        >
          <motion.circle
            cx={CENTER.x}
            cy={CENTER.y}
            r="7.5"
            fill="#0bb38f"
            opacity="0.18"
            animate={{ scale: [1, 1.35, 1], opacity: [0.18, 0.06, 0.18] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
          />
          <circle cx={CENTER.x} cy={CENTER.y} r="3.8" fill="url(#centerGrad)" />
          <text
            x={CENTER.x}
            y={CENTER.y + 1.2}
            textAnchor="middle"
            fontSize="2.4"
            fill="#050608"
            fontWeight="700"
          >
            YOU
          </text>
        </motion.g>

        {/* People nodes */}
        {visible.map((n, i) => {
          const isSel = selected === n.id;
          return (
            <motion.g
              key={n.id}
              onPointerDown={(e) => onPointerDown(n.id, e)}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              style={{ cursor: "grab" }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: n.dim ? 0.28 : 1,
              }}
              transition={{
                delay: 0.2 + i * 0.06,
                type: "spring",
                stiffness: 220,
                damping: 22,
              }}
            >
              {isSel && (
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r="7.5"
                  fill="none"
                  stroke="#37e7c0"
                  strokeWidth="0.35"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                />
              )}
              <circle
                cx={n.x}
                cy={n.y}
                r="4.8"
                fill="#10131a"
                stroke={isSel ? "#37e7c0" : "rgba(255,255,255,0.35)"}
                strokeWidth="0.4"
              />
              <text
                x={n.x}
                y={n.y + 0.9}
                textAnchor="middle"
                fontSize="2.4"
                fill="#fff"
                fontWeight="700"
                style={{ pointerEvents: "none" }}
              >
                {n.initials}
              </text>
              <text
                x={n.x}
                y={n.y + 8.2}
                textAnchor="middle"
                fontSize="2.2"
                fill="rgba(255,255,255,0.6)"
                style={{ pointerEvents: "none" }}
              >
                {n.name}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute top-4 left-4 flex gap-3 text-[10px] font-mono text-white/55">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-300" />
          直接タップ
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
          共通の知人経由
        </div>
      </div>

      {/* Hint */}
      <div className="absolute top-4 right-4 text-[10px] font-mono text-white/40">
        ✱ ノードをドラッグして整理 · クリックで詳細
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-xs rounded-2xl glass-strong p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-300 to-teal-600 grid place-items-center text-ink-950 font-bold text-sm">
                {selectedNode.initials}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{selectedNode.name}</div>
                <div className="text-[11px] text-white/55 font-mono">
                  {selectedNode.handle} · {selectedNode.city}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-white/40 hover:text-white text-sm"
                aria-label="close"
              >
                ×
              </button>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
              <Metric label="信頼" v={selectedNode.trust} color="bg-teal-300" />
              <Metric
                label="実行"
                v={selectedNode.reliability}
                color="bg-violet-400"
              />
              <Metric
                label="貢献"
                v={selectedNode.contribution}
                color="bg-amber-300"
              />
            </div>
            <Link
              href={`/app/people/${selectedNode.id}`}
              className="mt-3 inline-flex items-center gap-1 text-[12px] text-teal-200 hover:text-teal-100 link-anim"
            >
              プロフィールを開く <span className="arrow">→</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Metric({
  label,
  v,
  color,
}: {
  label: string;
  v: number;
  color: string;
}) {
  return (
    <div className="rounded-lg bg-white/[0.04] p-2">
      <div className="flex items-baseline justify-between">
        <span className="text-white/55">{label}</span>
        <span className="font-mono">{v}</span>
      </div>
      <div className="mt-1.5 h-1 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${v}%` }}
          transition={{ duration: 0.7 }}
        />
      </div>
    </div>
  );
}
