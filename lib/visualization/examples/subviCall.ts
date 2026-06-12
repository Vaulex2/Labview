import type { DiagramDefinition } from "@/lib/types";
import { fmtNum } from "../format";

// Branching computation out = √(a² − b²) — Virtual Instrument Creation Technology lesson
// Two inputs are squared in PARALLEL, their results subtracted, then a square root taken.
// Demonstrates branching Data Flow + modular blocks (each x² is a reusable subVI-style function).
// Values: a=5, b=3  →  5²=25, 3²=9, 25−9=16, √16 = 4
// Canvas 780 x 300

export const subviCallDiagram: DiagramDefinition = {
  id: "viz_subvi_call",
  title: {
    en: "Branching dataflow: out = √(a² − b²)",
    ru: "Ветвящийся поток: out = √(a² − b²)",
    uz: "Tarmoqlanuvchi oqim: out = √(a² − b²)",
  },
  description: {
    en: "Two inputs are squared in parallel by reusable function blocks, subtracted, then passed through a square root. Independent branches run concurrently under Data Flow.",
    ru: "Два входа возводятся в квадрат параллельно переиспользуемыми блоками, вычитаются, затем проходят через квадратный корень. Независимые ветви выполняются одновременно по модели Data Flow.",
    uz: "Ikki kirish qayta ishlatiladigan bloklar tomonidan parallel ravishda kvadratga koʻtariladi, ayiriladi, soʻng kvadrat ildizdan oʻtkaziladi. Mustaqil tarmoqlar Data Flow boʻyicha bir vaqtda ishlaydi.",
  },
  canvasWidth: 780,
  canvasHeight: 300,
  inputs: [
    { nodeId: "a-in", label: "a", default: 5, min: 0, max: 99 },
    { nodeId: "b-in", label: "b", default: 3, min: 0, max: 99 },
  ],
  compute: (v) => {
    const a = v["a-in"], b = v["b-in"];
    const sqA = a * a;
    const sqB = b * b;
    const sub = sqA - sqB;
    const root = Math.sqrt(sub);
    return {
      "a-in": fmtNum(a), "b-in": fmtNum(b),
      sqA: fmtNum(sqA), sqB: fmtNum(sqB), sub: fmtNum(sub), sqrt: fmtNum(root), out: fmtNum(root),
    };
  },
  nodes: [
    { id: "a-in", label: "a",   sublabel: { en: "input",       ru: "вход",      uz: "kirish" },        kind: "control",   x: 24,  y: 50,  width: 72,  height: 34 },
    { id: "b-in", label: "b",   sublabel: { en: "input",       ru: "вход",      uz: "kirish" },        kind: "control",   x: 24,  y: 210, width: 72,  height: 34 },
    { id: "sqA",  label: "x²",  sublabel: { en: "Square",      ru: "Квадрат",   uz: "Kvadrat" },       kind: "function",  x: 190, y: 46,  width: 56,  height: 50 },
    { id: "sqB",  label: "x²",  sublabel: { en: "Square",      ru: "Квадрат",   uz: "Kvadrat" },       kind: "function",  x: 190, y: 200, width: 56,  height: 50 },
    { id: "sub",  label: "−",   sublabel: { en: "Subtract",    ru: "Вычитание", uz: "Ayirish" },       kind: "function",  x: 370, y: 120, width: 58,  height: 56 },
    { id: "sqrt", label: "√",   sublabel: { en: "Square root", ru: "Корень",    uz: "Kvadrat ildiz" }, kind: "function",  x: 520, y: 120, width: 58,  height: 56 },
    { id: "out",  label: "out", sublabel: { en: "indicator",   ru: "индикатор", uz: "indikator" },     kind: "indicator", x: 660, y: 128, width: 96,  height: 40 },
  ],
  wires: [
    { id: "w-a-sqA",   points: [[96, 67], [143, 67], [143, 71], [190, 71]] },
    { id: "w-b-sqB",   points: [[96, 227], [143, 227], [143, 225], [190, 225]] },
    { id: "w-sqA-sub", points: [[246, 71], [310, 71], [310, 140], [370, 140]] },
    { id: "w-sqB-sub", points: [[246, 225], [310, 225], [310, 160], [370, 160]] },
    { id: "w-sub-sqrt", points: [[428, 148], [520, 148]] },
    { id: "w-sqrt-out", points: [[578, 148], [660, 148]] },
  ],
  steps: [
    // Both inputs arrive
    { kind: "highlight", nodeId: "a-in", state: "active" },
    { kind: "set-value", nodeId: "a-in", value: "5" },
    { kind: "highlight", nodeId: "b-in", state: "active" },
    { kind: "set-value", nodeId: "b-in", value: "3" },
    { kind: "wait", durationMs: 450 },

    // Parallel branches → square each
    { kind: "dot", wireId: "w-a-sqA", color: "#00b4d8", durationMs: 520 },
    { kind: "dot", wireId: "w-b-sqB", color: "#00b4d8", durationMs: 520 },
    { kind: "unhighlight", nodeId: "a-in" },
    { kind: "unhighlight", nodeId: "b-in" },
    { kind: "highlight", nodeId: "sqA", state: "active" },
    { kind: "highlight", nodeId: "sqB", state: "active" },
    { kind: "wait", durationMs: 420 },
    { kind: "set-value", nodeId: "sqA", value: "25" },
    { kind: "set-value", nodeId: "sqB", value: "9" },
    { kind: "wait", durationMs: 250 },

    // Both feed Subtract
    { kind: "dot", wireId: "w-sqA-sub", color: "#22d3ee", durationMs: 560 },
    { kind: "dot", wireId: "w-sqB-sub", color: "#ef4444", durationMs: 560 },
    { kind: "unhighlight", nodeId: "sqA" },
    { kind: "unhighlight", nodeId: "sqB" },
    { kind: "highlight", nodeId: "sub", state: "active" },
    { kind: "wait", durationMs: 420 },
    { kind: "set-value", nodeId: "sub", value: "16" },
    { kind: "wait", durationMs: 200 },
    { kind: "dot", wireId: "w-sub-sqrt", color: "#22d3ee", durationMs: 480 },
    { kind: "unhighlight", nodeId: "sub" },

    // Square root → 4
    { kind: "highlight", nodeId: "sqrt", state: "active" },
    { kind: "wait", durationMs: 420 },
    { kind: "set-value", nodeId: "sqrt", value: "4" },
    { kind: "wait", durationMs: 200 },
    { kind: "dot", wireId: "w-sqrt-out", color: "#22d3ee", durationMs: 520 },
    { kind: "unhighlight", nodeId: "sqrt" },

    // Output
    { kind: "highlight", nodeId: "out", state: "success" },
    { kind: "set-value", nodeId: "out", value: "4" },
    { kind: "wait", durationMs: 1300 },
    { kind: "reset" },
  ],
};
