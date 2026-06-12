import type { DiagramDefinition } from "@/lib/types";
import { fmtNum } from "../format";

// Multi-function expression r = √(a·b − c) — Introduction lesson
// Chains Multiply → Subtract → Square root; converging inputs teach Data Flow:
// a block fires only once ALL its inputs have arrived.
// Values: a=4, b=9, c=11  →  4·9=36, 36−11=25, √25 = 5
// Canvas 780 x 280

export const viAnatomyDiagram: DiagramDefinition = {
  id: "viz_vi_anatomy",
  title: {
    en: "Building an expression: r = √(a·b − c)",
    ru: "Сборка выражения: r = √(a·b − c)",
    uz: "Ifoda qurish: r = √(a·b − c)",
  },
  description: {
    en: "Three controls feed a chain of Multiply, Subtract and Square-root functions. Each block fires only when all of its inputs have arrived.",
    ru: "Три входа подаются на цепочку функций умножения, вычитания и квадратного корня. Каждый блок срабатывает только когда все его входы готовы.",
    uz: "Uchta kirish koʻpaytirish, ayirish va kvadrat ildiz funksiyalari zanjiriga uzatiladi. Har bir blok faqat barcha kirishlari kelganda ishlaydi.",
  },
  canvasWidth: 780,
  canvasHeight: 280,
  inputs: [
    { nodeId: "a-ctrl", label: "A", default: 4, min: 0, max: 99 },
    { nodeId: "b-ctrl", label: "B", default: 9, min: 0, max: 99 },
    { nodeId: "c-ctrl", label: "C", default: 11, min: 0, max: 9999 },
  ],
  compute: (v) => {
    const a = v["a-ctrl"], b = v["b-ctrl"], c = v["c-ctrl"];
    const mult = a * b;
    const sub = mult - c;
    const root = Math.sqrt(sub);
    return {
      "a-ctrl": fmtNum(a), "b-ctrl": fmtNum(b), "c-ctrl": fmtNum(c),
      mult: fmtNum(mult), sub: fmtNum(sub), sqrt: fmtNum(root), result: fmtNum(root),
    };
  },
  nodes: [
    { id: "a-ctrl", label: "A",  sublabel: { en: "control",     ru: "вход",      uz: "kirish" },        kind: "control",   x: 24,  y: 44,  width: 72,  height: 34 },
    { id: "b-ctrl", label: "B",  sublabel: { en: "control",     ru: "вход",      uz: "kirish" },        kind: "control",   x: 24,  y: 104, width: 72,  height: 34 },
    { id: "c-ctrl", label: "C",  sublabel: { en: "control",     ru: "вход",      uz: "kirish" },        kind: "control",   x: 24,  y: 196, width: 72,  height: 34 },
    { id: "mult",   label: "×",  sublabel: { en: "Multiply",    ru: "Умножение", uz: "Koʻpaytirish" },  kind: "function",  x: 176, y: 62,  width: 56,  height: 52 },
    { id: "sub",    label: "−",  sublabel: { en: "Subtract",    ru: "Вычитание", uz: "Ayirish" },       kind: "function",  x: 336, y: 118, width: 56,  height: 52 },
    { id: "sqrt",   label: "√",  sublabel: { en: "Square root", ru: "Корень",    uz: "Kvadrat ildiz" }, kind: "function",  x: 496, y: 118, width: 56,  height: 52 },
    { id: "result", label: "r",  sublabel: { en: "indicator",   ru: "индикатор", uz: "indikator" },     kind: "indicator", x: 650, y: 124, width: 104, height: 40 },
  ],
  wires: [
    { id: "w-a-mult",      points: [[96, 61], [140, 61], [140, 80], [176, 80]] },
    { id: "w-b-mult",      points: [[96, 121], [140, 121], [140, 98], [176, 98]] },
    { id: "w-mult-sub",    points: [[232, 88], [288, 88], [288, 136], [336, 136]] },
    { id: "w-c-sub",       points: [[96, 213], [288, 213], [288, 156], [336, 156]] },
    { id: "w-sub-sqrt",    points: [[392, 144], [496, 144]] },
    { id: "w-sqrt-result", points: [[552, 144], [650, 144]] },
  ],
  steps: [
    // A and B arrive
    { kind: "highlight", nodeId: "a-ctrl", state: "active" },
    { kind: "set-value", nodeId: "a-ctrl", value: "4" },
    { kind: "wait", durationMs: 350 },
    { kind: "dot", wireId: "w-a-mult", color: "#00b4d8", durationMs: 520 },
    { kind: "unhighlight", nodeId: "a-ctrl" },
    { kind: "highlight", nodeId: "b-ctrl", state: "active" },
    { kind: "set-value", nodeId: "b-ctrl", value: "9" },
    { kind: "wait", durationMs: 350 },
    { kind: "dot", wireId: "w-b-mult", color: "#00b4d8", durationMs: 520 },
    { kind: "unhighlight", nodeId: "b-ctrl" },

    // Multiply fires → 36
    { kind: "highlight", nodeId: "mult", state: "active" },
    { kind: "wait", durationMs: 400 },
    { kind: "set-value", nodeId: "mult", value: "36" },
    { kind: "wait", durationMs: 200 },
    { kind: "dot", wireId: "w-mult-sub", color: "#22d3ee", durationMs: 560 },
    { kind: "unhighlight", nodeId: "mult" },

    // C arrives, Subtract fires → 25
    { kind: "highlight", nodeId: "c-ctrl", state: "active" },
    { kind: "set-value", nodeId: "c-ctrl", value: "11" },
    { kind: "wait", durationMs: 300 },
    { kind: "dot", wireId: "w-c-sub", color: "#ef4444", durationMs: 600 },
    { kind: "unhighlight", nodeId: "c-ctrl" },
    { kind: "highlight", nodeId: "sub", state: "active" },
    { kind: "wait", durationMs: 400 },
    { kind: "set-value", nodeId: "sub", value: "25" },
    { kind: "wait", durationMs: 200 },
    { kind: "dot", wireId: "w-sub-sqrt", color: "#22d3ee", durationMs: 520 },
    { kind: "unhighlight", nodeId: "sub" },

    // Square root fires → 5
    { kind: "highlight", nodeId: "sqrt", state: "active" },
    { kind: "wait", durationMs: 400 },
    { kind: "set-value", nodeId: "sqrt", value: "5" },
    { kind: "wait", durationMs: 200 },
    { kind: "dot", wireId: "w-sqrt-result", color: "#22d3ee", durationMs: 560 },
    { kind: "unhighlight", nodeId: "sqrt" },

    // Result
    { kind: "highlight", nodeId: "result", state: "success" },
    { kind: "set-value", nodeId: "result", value: "5" },
    { kind: "wait", durationMs: 1300 },
    { kind: "reset" },
  ],
};
