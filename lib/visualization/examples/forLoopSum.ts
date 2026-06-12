import type { DiagramDefinition } from "@/lib/types";

// For Loop Sum 1..N — Flagship visualization example
// Canvas 760 x 300; for loop rect at x=148,y=40 w=370 h=220
// Animates: highlight N → per-iteration: highlight i, red dot SR←→ADD, ADD glows, blue dot ADD→SR→ → result glows

export const forLoopSumDiagram: DiagramDefinition = {
  id: "viz_for_loop_sum",
  title: {
    en: "For Loop: Sum of 1 to N",
    ru: "Цикл For: сумма от 1 до N",
    uz: "For sikli: 1 dan N gacha yigʻindi",
  },
  description: {
    en: "Watch how data flows through the Shift Register on each iteration as the For Loop accumulates a running sum.",
    ru: "Посмотрите, как данные проходят через сдвиговый регистр на каждой итерации, пока цикл For накапливает текущую сумму.",
    uz: "For sikli joriy yigʻindini toʻplar ekan, har bir iteratsiyada maʼlumotlar surilish registri orqali qanday oqishini kuzating.",
  },
  canvasWidth: 760,
  canvasHeight: 300,
  loopBounds: {
    x: 148,
    y: 40,
    width: 370,
    height: 220,
    label: { en: "For Loop (0 to N−1)", ru: "Цикл For (0 … N−1)", uz: "For sikli (0 … N−1)" },
  },
  nodes: [
    // Input control
    { id: "n-ctrl",   label: "N",   sublabel: { en: "control",         ru: "вход",            uz: "kirish" },          kind: "control",        x: 22,  y: 104, width: 82, height: 38 },
    // Iteration index inside loop
    { id: "i-node",   label: "i",   sublabel: { en: "iteration index", ru: "индекс итерации", uz: "iteratsiya indeksi" }, kind: "loop-index",  x: 175, y: 78,  width: 52, height: 30 },
    // Shift register left terminal (reads previous sum)
    { id: "sr-left",  label: "SR",  sublabel: { en: "← prev sum",      ru: "← пред. сумма",   uz: "← oldingi yigʻindi" }, kind: "shift-register", x: 150, y: 174, width: 44, height: 32 },
    // Add function
    { id: "add",      label: "+",   sublabel: { en: "Add",             ru: "Сложение",        uz: "Qoʻshish" },        kind: "function",       x: 346, y: 114, width: 56, height: 52 },
    // Shift register right terminal (stores new sum)
    { id: "sr-right", label: "SR",  sublabel: { en: "→ next sum",      ru: "→ след. сумма",   uz: "→ keyingi yigʻindi" }, kind: "shift-register", x: 478, y: 174, width: 44, height: 32 },
    // Output indicator
    { id: "result",   label: "Sum", sublabel: { en: "indicator",       ru: "индикатор",       uz: "indikator" },       kind: "indicator",      x: 634, y: 104, width: 90, height: 38 },
  ],
  wires: [
    // N control → loop (enters top of loop via N terminal at x=215,y=40)
    {
      id: "w-n-loop",
      points: [[104, 123], [148, 123]],
    },
    // i → Add top input (i output at right edge of i-node: (227,93) → routed to add top (374,114))
    {
      id: "w-i-add",
      points: [[227, 93], [300, 93], [300, 126], [346, 126]],
    },
    // SR Left → Add bottom input (sr-left right edge: (194,190) → add bottom (346,150))
    {
      id: "w-sr-add",
      points: [[194, 190], [268, 190], [268, 152], [346, 152]],
    },
    // Add output → SR Right input (add right (402,140) → sr-right left (478,190))
    {
      id: "w-add-sr",
      points: [[402, 140], [438, 140], [438, 190], [478, 190]],
    },
    // SR Right output (exits loop right wall) → Result input
    {
      id: "w-sr-result",
      points: [[522, 190], [578, 190], [578, 123], [634, 123]],
    },
  ],
  steps: [
    // ── Phase 0: Highlight N input ──────────────────────────────────────
    { kind: "highlight", nodeId: "n-ctrl", state: "active" },
    { kind: "wait", durationMs: 500 },
    { kind: "unhighlight", nodeId: "n-ctrl" },
    { kind: "wait", durationMs: 200 },

    // ── Iteration 0 (i = 0) ─────────────────────────────────────────────
    { kind: "highlight", nodeId: "i-node", state: "active" },
    { kind: "wait", durationMs: 200 },
    // Red dot: SR Left → Add (reading previous sum = 0)
    { kind: "dot", wireId: "w-sr-add", color: "#ef4444", durationMs: 600 },
    { kind: "highlight", nodeId: "add", state: "active" },
    { kind: "wait", durationMs: 350 },
    { kind: "set-value", nodeId: "add", value: "0" },
    // Blue dot: Add → SR Right (storing new sum = 0)
    { kind: "dot", wireId: "w-add-sr", color: "#3b82f6", durationMs: 550 },
    { kind: "unhighlight", nodeId: "add" },
    { kind: "unhighlight", nodeId: "i-node" },
    { kind: "wait", durationMs: 250 },

    // ── Iteration 1 (i = 1) ─────────────────────────────────────────────
    { kind: "highlight", nodeId: "i-node", state: "active" },
    { kind: "wait", durationMs: 200 },
    { kind: "dot", wireId: "w-i-add", color: "#00b4d8", durationMs: 450 },
    { kind: "dot", wireId: "w-sr-add", color: "#ef4444", durationMs: 600 },
    { kind: "highlight", nodeId: "add", state: "active" },
    { kind: "wait", durationMs: 350 },
    { kind: "set-value", nodeId: "add", value: "1" },
    { kind: "dot", wireId: "w-add-sr", color: "#3b82f6", durationMs: 550 },
    { kind: "unhighlight", nodeId: "add" },
    { kind: "unhighlight", nodeId: "i-node" },
    { kind: "wait", durationMs: 250 },

    // ── Iteration 2 (i = 2) ─────────────────────────────────────────────
    { kind: "highlight", nodeId: "i-node", state: "active" },
    { kind: "wait", durationMs: 200 },
    { kind: "dot", wireId: "w-i-add", color: "#00b4d8", durationMs: 450 },
    { kind: "dot", wireId: "w-sr-add", color: "#ef4444", durationMs: 600 },
    { kind: "highlight", nodeId: "add", state: "active" },
    { kind: "wait", durationMs: 350 },
    { kind: "set-value", nodeId: "add", value: "3" },
    { kind: "dot", wireId: "w-add-sr", color: "#3b82f6", durationMs: 550 },
    { kind: "unhighlight", nodeId: "add" },
    { kind: "unhighlight", nodeId: "i-node" },
    { kind: "wait", durationMs: 250 },

    // ── Iteration 3 (i = 3) ─────────────────────────────────────────────
    { kind: "highlight", nodeId: "i-node", state: "active" },
    { kind: "wait", durationMs: 200 },
    { kind: "dot", wireId: "w-i-add", color: "#00b4d8", durationMs: 450 },
    { kind: "dot", wireId: "w-sr-add", color: "#ef4444", durationMs: 600 },
    { kind: "highlight", nodeId: "add", state: "active" },
    { kind: "wait", durationMs: 350 },
    { kind: "set-value", nodeId: "add", value: "6" },
    { kind: "dot", wireId: "w-add-sr", color: "#3b82f6", durationMs: 550 },
    { kind: "unhighlight", nodeId: "add" },
    { kind: "unhighlight", nodeId: "i-node" },
    { kind: "wait", durationMs: 300 },

    // ── Final: result flows out ──────────────────────────────────────────
    { kind: "dot", wireId: "w-sr-result", color: "#22d3ee", durationMs: 700 },
    { kind: "highlight", nodeId: "result", state: "success" },
    { kind: "set-value", nodeId: "result", value: "6" },
    { kind: "wait", durationMs: 1200 },
    { kind: "reset" },
  ],
};
