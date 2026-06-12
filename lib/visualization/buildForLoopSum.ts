import type { DiagramDefinition, StepAction } from "@/lib/types";
import { forLoopSumDiagram } from "./examples/forLoopSum";

export const MIN_N = 1;
export const MAX_N = 8;

/**
 * Build a For-Loop-Sum diagram for an arbitrary iteration count N.
 *
 * The nodes, wires and layout are identical to the hand-authored
 * {@link forLoopSumDiagram}; only the animation `steps` (and the values shown on
 * the Add / Sum nodes) are regenerated. Each iteration `i` (0 … N−1) adds `i` to
 * a running sum, mirroring the original example exactly (N=4 → 0,1,3,6 → 6).
 */
export function buildForLoopSumDiagram(n: number): DiagramDefinition {
  const count = Math.max(MIN_N, Math.min(MAX_N, Math.round(n)));
  const steps: StepAction[] = [];

  // Phase 0 — highlight the N input.
  steps.push({ kind: "highlight", nodeId: "n-ctrl", state: "active" });
  steps.push({ kind: "wait", durationMs: 500 });
  steps.push({ kind: "unhighlight", nodeId: "n-ctrl" });
  steps.push({ kind: "wait", durationMs: 200 });

  // Per-iteration accumulation through the shift register.
  let sum = 0;
  for (let i = 0; i < count; i++) {
    steps.push({ kind: "highlight", nodeId: "i-node", state: "active" });
    steps.push({ kind: "wait", durationMs: 200 });
    if (i > 0) {
      // The iteration index value flows into Add.
      steps.push({ kind: "dot", wireId: "w-i-add", color: "#00b4d8", durationMs: 450 });
    }
    // Red dot: read the previous sum from the shift register.
    steps.push({ kind: "dot", wireId: "w-sr-add", color: "#ef4444", durationMs: 600 });
    steps.push({ kind: "highlight", nodeId: "add", state: "active" });
    steps.push({ kind: "wait", durationMs: 350 });
    sum += i;
    steps.push({ kind: "set-value", nodeId: "add", value: String(sum) });
    // Blue dot: store the new running sum back into the shift register.
    steps.push({ kind: "dot", wireId: "w-add-sr", color: "#3b82f6", durationMs: 550 });
    steps.push({ kind: "unhighlight", nodeId: "add" });
    steps.push({ kind: "unhighlight", nodeId: "i-node" });
    steps.push({ kind: "wait", durationMs: 250 });
  }

  // Final — the accumulated sum flows out to the indicator.
  steps.push({ kind: "dot", wireId: "w-sr-result", color: "#22d3ee", durationMs: 700 });
  steps.push({ kind: "highlight", nodeId: "result", state: "success" });
  steps.push({ kind: "set-value", nodeId: "result", value: String(sum) });
  steps.push({ kind: "wait", durationMs: 1200 });
  steps.push({ kind: "reset" });

  return { ...forLoopSumDiagram, steps };
}
