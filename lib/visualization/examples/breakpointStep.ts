import type { DiagramDefinition } from "@/lib/types";

// Breakpoints & Single-Stepping — Debugging lesson (advanced)
// Execution flows through a small pipeline. A breakpoint pauses the VI at the
// multiply node (blue "writing" state = paused); then single-stepping advances
// one operation at a time while a probe reveals the running value at each stage.
// Canvas 780 x 250

export const breakpointStepDiagram: DiagramDefinition = {
  id: "viz_breakpoint_step",
  title: {
    en: "Breakpoints & Single-Stepping",
    ru: "Точки останова и пошаговое выполнение",
    uz: "Breakpointlar va qadamli bajarilish",
  },
  description: {
    en: "A breakpoint pauses the VI mid-execution; single-stepping then advances one node at a time while a probe shows the running value.",
    ru: "Точка останова приостанавливает VI во время выполнения; пошаговый режим продвигается по одному узлу, а пробник показывает текущее значение.",
    uz: "Breakpoint VIni bajarilish o'rtasida to'xtatadi; qadamli rejim har safar bitta tugunni oldinga suradi, probe esa joriy qiymatni ko'rsatadi.",
  },
  canvasWidth: 780,
  canvasHeight: 250,
  nodes: [
    { id: "a", label: "In", sublabel: { en: "control", ru: "вход", uz: "kirish" }, kind: "control", x: 36, y: 104, width: 84, height: 40 },
    { id: "op1", label: "+", sublabel: { en: "+ 3", ru: "+ 3", uz: "+ 3" }, kind: "function", x: 190, y: 98, width: 60, height: 54 },
    { id: "op2", label: "×", sublabel: { en: "breakpoint", ru: "точка останова", uz: "breakpoint" }, kind: "function", x: 340, y: 98, width: 60, height: 54 },
    { id: "op3", label: "√", sublabel: { en: "square root", ru: "корень", uz: "kvadrat ildiz" }, kind: "function", x: 490, y: 98, width: 60, height: 54 },
    { id: "out", label: "Out", sublabel: { en: "indicator", ru: "индикатор", uz: "indikator" }, kind: "indicator", x: 620, y: 104, width: 120, height: 42 },
  ],
  wires: [
    { id: "w-a-op1", points: [[120, 124], [190, 125]] },
    { id: "w-op1-op2", points: [[250, 125], [340, 125]] },
    { id: "w-op2-op3", points: [[400, 125], [490, 125]] },
    { id: "w-op3-out", points: [[550, 125], [620, 125]] },
  ],
  steps: [
    { kind: "highlight", nodeId: "a", state: "active" },
    { kind: "set-value", nodeId: "a", value: "5" },
    { kind: "wait", durationMs: 450 },
    // Step 1 — add
    { kind: "dot", wireId: "w-a-op1", color: "#22d3ee", durationMs: 520 },
    { kind: "unhighlight", nodeId: "a" },
    { kind: "highlight", nodeId: "op1", state: "active" },
    { kind: "set-value", nodeId: "op1", value: "8" },
    { kind: "wait", durationMs: 550 },
    { kind: "dot", wireId: "w-op1-op2", color: "#22d3ee", durationMs: 520 },
    { kind: "unhighlight", nodeId: "op1" },

    // Breakpoint hit — execution pauses (blue writing state)
    { kind: "highlight", nodeId: "op2", state: "writing" },
    { kind: "wait", durationMs: 1100 },
    // Resume / step over
    { kind: "highlight", nodeId: "op2", state: "active" },
    { kind: "set-value", nodeId: "op2", value: "16" },
    { kind: "wait", durationMs: 550 },
    { kind: "dot", wireId: "w-op2-op3", color: "#22d3ee", durationMs: 520 },
    { kind: "unhighlight", nodeId: "op2" },

    // Step 3 — sqrt
    { kind: "highlight", nodeId: "op3", state: "active" },
    { kind: "set-value", nodeId: "op3", value: "4" },
    { kind: "wait", durationMs: 550 },
    { kind: "dot", wireId: "w-op3-out", color: "#22d3ee", durationMs: 520 },
    { kind: "unhighlight", nodeId: "op3" },

    { kind: "highlight", nodeId: "out", state: "success" },
    { kind: "set-value", nodeId: "out", value: "4" },
    { kind: "wait", durationMs: 1400 },
    { kind: "reset" },
  ],
};
