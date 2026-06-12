import type { DiagramDefinition } from "@/lib/types";

// For Loop iteration counter — Iterative Processes (Loops) lesson
// The iteration terminal "i" counts 0 → 3 inside the loop boundary, then the loop
// finishes and reports the completed count. A simple view of how a For Loop repeats.
// Canvas 760 x 260

export const forLoopCountDiagram: DiagramDefinition = {
  id: "viz_for_loop_count",
  title: {
    en: "For Loop: counting iterations",
    ru: "Цикл For: подсчёт итераций",
    uz: "For sikli: iteratsiyalarni sanash",
  },
  description: {
    en: "The iteration terminal i advances 0, 1, 2, 3 as the For Loop repeats, then the loop completes and reports the count.",
    ru: "Терминал итераций i проходит 0, 1, 2, 3 по мере повторения цикла For, затем цикл завершается и сообщает число итераций.",
    uz: "Iteratsiya terminali i For sikli takrorlanishi bilan 0, 1, 2, 3 qiymatlarini oladi, so'ng sikl tugaydi va sanoqni bildiradi.",
  },
  canvasWidth: 760,
  canvasHeight: 260,
  loopBounds: {
    x: 200, y: 60, width: 300, height: 150,
    label: { en: "For Loop (N = 4)", ru: "Цикл For (N = 4)", uz: "For sikli (N = 4)" },
  },
  nodes: [
    { id: "n-ctrl", label: "N",    sublabel: { en: "iterations", ru: "итерации",  uz: "iteratsiyalar" }, kind: "control",    x: 40,  y: 116, width: 84,  height: 38 },
    { id: "i-node", label: "i",    sublabel: { en: "index",      ru: "индекс",    uz: "indeks" },        kind: "loop-index", x: 308, y: 112, width: 84,  height: 46 },
    { id: "done",   label: "Done", sublabel: { en: "complete",   ru: "готово",    uz: "tugadi" },        kind: "indicator",  x: 580, y: 116, width: 120, height: 38 },
  ],
  wires: [
    { id: "w-n-loop", points: [[124, 135], [200, 135]] },
    { id: "w-i-done", points: [[392, 135], [500, 135], [500, 135], [580, 135]] },
  ],
  steps: [
    { kind: "highlight", nodeId: "n-ctrl", state: "active" },
    { kind: "set-value", nodeId: "n-ctrl", value: "4" },
    { kind: "wait", durationMs: 450 },
    { kind: "dot", wireId: "w-n-loop", color: "#00b4d8", durationMs: 500 },
    { kind: "unhighlight", nodeId: "n-ctrl" },

    // Iteration 0
    { kind: "highlight", nodeId: "i-node", state: "active" },
    { kind: "set-value", nodeId: "i-node", value: "0" },
    { kind: "wait", durationMs: 450 },
    { kind: "highlight", nodeId: "i-node", state: "idle" },
    { kind: "wait", durationMs: 150 },
    // Iteration 1
    { kind: "highlight", nodeId: "i-node", state: "active" },
    { kind: "set-value", nodeId: "i-node", value: "1" },
    { kind: "wait", durationMs: 450 },
    { kind: "highlight", nodeId: "i-node", state: "idle" },
    { kind: "wait", durationMs: 150 },
    // Iteration 2
    { kind: "highlight", nodeId: "i-node", state: "active" },
    { kind: "set-value", nodeId: "i-node", value: "2" },
    { kind: "wait", durationMs: 450 },
    { kind: "highlight", nodeId: "i-node", state: "idle" },
    { kind: "wait", durationMs: 150 },
    // Iteration 3
    { kind: "highlight", nodeId: "i-node", state: "active" },
    { kind: "set-value", nodeId: "i-node", value: "3" },
    { kind: "wait", durationMs: 450 },

    // Loop finishes
    { kind: "dot", wireId: "w-i-done", color: "#22d3ee", durationMs: 600 },
    { kind: "unhighlight", nodeId: "i-node" },
    { kind: "highlight", nodeId: "done", state: "success" },
    { kind: "set-value", nodeId: "done", value: "4" },
    { kind: "wait", durationMs: 1300 },
    { kind: "reset" },
  ],
};
