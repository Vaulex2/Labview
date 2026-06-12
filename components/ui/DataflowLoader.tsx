/**
 * Animated LabVIEW-style dataflow motif: three wired nodes with a packet of data
 * travelling along the wire. Reuses the project's `circuit-line` dashed-wire
 * animation and `animate-glow-pulse` node glow so it reads as part of the brand.
 *
 * Decorative only (aria-hidden). Pass `animated={false}` to render a still frame
 * for reduced-motion contexts.
 */
export function DataflowLoader({
  animated = true,
  className = "",
}: {
  animated?: boolean;
  className?: string;
}) {
  // Node centers along a single horizontal wire.
  const nodes = [
    { cx: 9, cy: 20 },
    { cx: 41, cy: 20 },
    { cx: 73, cy: 20 },
  ];

  return (
    <svg
      aria-hidden
      viewBox="0 0 82 40"
      className={className}
      width="56"
      height="28"
      fill="none"
    >
      {/* Wire path between the nodes */}
      <polyline
        points="9,20 41,20 73,20"
        stroke="#22d3ee"
        strokeWidth="1.4"
        strokeLinecap="round"
        className={animated ? "circuit-line" : undefined}
        strokeDasharray={animated ? undefined : "20 8"}
        opacity="0.55"
      />

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.cx}
            cy={n.cy}
            r="6"
            fill="rgba(0,180,216,0.12)"
            stroke="#22d3ee"
            strokeWidth="1.4"
            className={animated && i === 1 ? "animate-glow-pulse" : undefined}
          />
          <circle cx={n.cx} cy={n.cy} r="1.8" fill="#22d3ee" />
        </g>
      ))}

      {/* Travelling data packet */}
      {animated && (
        <circle r="2.6" fill="#22d3ee">
          <animateMotion
            path="M9,20 L41,20 L73,20"
            dur="1.8s"
            repeatCount="indefinite"
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="linear"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.15;0.85;1"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </circle>
      )}
    </svg>
  );
}
