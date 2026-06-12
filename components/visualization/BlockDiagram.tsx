"use client";

import { useMemo } from "react";
import type { DiagramDefinition, DiagramNode, Locale, NodeHighlightState } from "@/lib/types";
import type { NodeStateMap, NodeValueMap, ActiveDot } from "@/lib/visualization/useSequencer";
import { getPolylinePositionAt } from "@/lib/visualization/useSequencer";
import { localize } from "@/lib/i18n/localize";

// Node colors by kind
const nodeBase: Record<string, { bg: string; border: string; text: string }> = {
  control:        { bg: "#162d5a", border: "#00b4d8", text: "#22d3ee" },
  indicator:      { bg: "#0d1b35", border: "#22d3ee", text: "#ffffff" },
  function:       { bg: "#1e3f7a", border: "#8fa5bf", text: "#ffffff" },
  "loop-index":   { bg: "#0d2040", border: "#5a7298", text: "#dbe7f5" },
  "shift-register": { bg: "#0d2040", border: "#8fa5bf", text: "#dbe7f5" },
  constant:       { bg: "#162d5a", border: "#5a7298", text: "#c8dff0" },
};

// Highlight overlay by state
const highlightOverlay: Partial<Record<NodeHighlightState, { bg: string; border: string; glow: string }>> = {
  active:  { bg: "rgba(0,180,216,0.15)", border: "#22d3ee", glow: "0 0 14px 4px rgba(0,180,216,0.55), 0 0 6px 2px rgba(0,180,216,0.30)" },
  success: { bg: "rgba(16,185,129,0.15)", border: "#10b981", glow: "0 0 16px 5px rgba(16,185,129,0.60), 0 0 8px 2px rgba(16,185,129,0.35)" },
  reading: { bg: "rgba(239,68,68,0.12)",  border: "#ef4444", glow: "0 0 12px 3px rgba(239,68,68,0.45)" },
  writing: { bg: "rgba(59,130,246,0.12)", border: "#3b82f6", glow: "0 0 12px 3px rgba(59,130,246,0.45)" },
};

interface BlockDiagramProps {
  definition: DiagramDefinition;
  nodeStates: NodeStateMap;
  nodeValues: NodeValueMap;
  activeDots: ActiveDot[];
  locale: Locale;
}

function DiagramNodeEl({
  node,
  state,
  value,
  locale,
}: {
  node: DiagramNode;
  state: NodeHighlightState;
  value?: string;
  locale: Locale;
}) {
  const base = nodeBase[node.kind] ?? nodeBase.function;
  const hl = state !== "idle" ? highlightOverlay[state] : undefined;

  const isFunction = node.kind === "function";
  const radius = isFunction ? 8 : 6;

  return (
    <g>
      {/* Glow filter blur rect */}
      {hl && (
        <rect
          x={node.x - 4}
          y={node.y - 4}
          width={node.width + 8}
          height={node.height + 8}
          rx={radius + 2}
          fill={hl.bg}
          style={{ filter: `drop-shadow(${hl.glow.split(",")[0].replace("box-shadow:", "")})` }}
        />
      )}
      {/* Main rect */}
      <rect
        x={node.x}
        y={node.y}
        width={node.width}
        height={node.height}
        rx={radius}
        fill={hl ? hl.bg : base.bg}
        stroke={hl ? hl.border : base.border}
        strokeWidth={hl ? 2 : 1.5}
        style={hl ? { filter: `drop-shadow(0 0 8px ${hl.border}88)` } : undefined}
      />
      {/* Label */}
      <text
        x={node.x + node.width / 2}
        y={node.y + node.height / 2 - (node.sublabel ? 4 : 1)}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={hl ? (hl.border) : base.text}
        fontSize={isFunction ? 20 : 11}
        fontWeight={isFunction ? "700" : "600"}
        fontFamily="Outfit, system-ui, sans-serif"
        style={hl ? { filter: `drop-shadow(0 0 4px ${hl.border})` } : undefined}
      >
        {value ?? node.label}
      </text>
      {/* Sublabel */}
      {node.sublabel && (
        <text
          x={node.x + node.width / 2}
          y={node.y + node.height / 2 + 8}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#aebfd6"
          fontSize={8.5}
          fontWeight="500"
          fontFamily="Inter, system-ui, sans-serif"
        >
          {localize(node.sublabel, locale)}
        </text>
      )}
    </g>
  );
}

export function BlockDiagram({ definition, nodeStates, nodeValues, activeDots, locale }: BlockDiagramProps) {
  const wireMap = useMemo(
    () => Object.fromEntries(definition.wires.map((w) => [w.id, w])),
    [definition.wires]
  );

  const pointsStr = (pts: [number, number][]) => pts.map((p) => p.join(",")).join(" ");

  return (
    <svg
      viewBox={`0 0 ${definition.canvasWidth} ${definition.canvasHeight}`}
      width="100%"
      height="100%"
      className="select-none"
      style={{ maxHeight: "320px" }}
    >
      {/* Dark background */}
      <rect width={definition.canvasWidth} height={definition.canvasHeight} fill="#0a1628" rx="12" />

      {/* Subtle grid */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        </pattern>
        <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width={definition.canvasWidth} height={definition.canvasHeight} fill="url(#grid)" rx="12" />

      {/* For Loop boundary */}
      {definition.loopBounds && (() => {
        const lb = definition.loopBounds;
        return (
          <g>
            <rect
              x={lb.x} y={lb.y}
              width={lb.width} height={lb.height}
              rx="8"
              fill="rgba(22,45,90,0.40)"
              stroke="rgba(0,180,216,0.35)"
              strokeWidth="1.5"
              strokeDasharray="10 5"
            />
            <text
              x={lb.x + 10}
              y={lb.y - 6}
              fill="rgba(0,180,216,0.70)"
              fontSize="10"
              fontFamily="Outfit, system-ui, sans-serif"
              fontWeight="600"
            >
              {localize(lb.label, locale)}
            </text>
          </g>
        );
      })()}

      {/* Wires */}
      {definition.wires.map((wire) => (
        <polyline
          key={wire.id}
          points={pointsStr(wire.points)}
          fill="none"
          stroke="rgba(139,165,191,0.40)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {/* Nodes */}
      {definition.nodes.map((node) => (
        <DiagramNodeEl
          key={node.id}
          node={node}
          state={nodeStates[node.id] ?? "idle"}
          value={nodeValues[node.id]}
          locale={locale}
        />
      ))}

      {/* Animated dots */}
      {activeDots.map((dot, i) => {
        const wire = wireMap[dot.wireId];
        if (!wire) return null;
        const [cx, cy] = getPolylinePositionAt(wire.points, dot.progress);
        return (
          <g key={`${dot.wireId}-${i}`}>
            {/* Glow halo */}
            <circle cx={cx} cy={cy} r="8" fill={dot.color} opacity="0.20" />
            <circle cx={cx} cy={cy} r="5" fill={dot.color} opacity="0.40" />
            {/* Core dot */}
            <circle cx={cx} cy={cy} r="4" fill={dot.color} opacity="0.95"
              style={{ filter: `drop-shadow(0 0 5px ${dot.color})` }}
            />
          </g>
        );
      })}
    </svg>
  );
}
