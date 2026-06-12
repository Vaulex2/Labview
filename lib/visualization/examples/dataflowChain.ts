import type { DiagramDefinition } from "@/lib/types";
import { fmtNum } from "../format";

// Multi-function pipeline y = √(x² − k) · 2 — Working in the LabVIEW Environment lesson
// Chains Square → Subtract → Square root → Multiply, demonstrating sequential Data Flow:
// each wired block runs the moment its input arrives.
// Values: x=5, k=9  →  5²=25, 25−9=16, √16=4, 4·2 = 8
// Canvas 820 x 240

export const dataflowChainDiagram: DiagramDefinition = {
  id: "viz_dataflow_chain",
  title: {
    en: "Function pipeline: y = √(x² − k) · 2",
    ru: "Конвейер функций: y = √(x² − k) · 2",
    uz: "Funksiyalar quvuri: y = √(x² − k) · 2",
  },
  description: {
    en: "Data flows through Square, Subtract, Square-root and Multiply blocks in series. Each block executes as soon as its wire delivers a value.",
    ru: "Данные проходят через блоки возведения в квадрат, вычитания, квадратного корня и умножения. Каждый блок выполняется, как только провод доставит значение.",
    uz: "Maʼlumot ketma-ket kvadrat, ayirish, kvadrat ildiz va koʻpaytirish bloklari orqali oqadi. Har bir blok sim qiymatni yetkazishi bilan ishlaydi.",
  },
  canvasWidth: 820,
  canvasHeight: 240,
  inputs: [
    { nodeId: "x-ctrl", label: "x", default: 5, min: 0, max: 99 },
    { nodeId: "k-ctrl", label: "k", default: 9, min: 0, max: 9999 },
  ],
  compute: (v) => {
    const x = v["x-ctrl"], k = v["k-ctrl"];
    const sq = x * x;
    const sub = sq - k;
    const root = Math.sqrt(sub);
    const mult = root * 2;
    return {
      "x-ctrl": fmtNum(x), "k-ctrl": fmtNum(k),
      sq: fmtNum(sq), sub: fmtNum(sub), sqrt: fmtNum(root), mult: fmtNum(mult), "y-ind": fmtNum(mult),
    };
  },
  nodes: [
    { id: "x-ctrl", label: "x",  sublabel: { en: "control",     ru: "вход",      uz: "kirish" },        kind: "control",   x: 22,  y: 58,  width: 70,  height: 34 },
    { id: "sq",     label: "x²", sublabel: { en: "Square",      ru: "Квадрат",   uz: "Kvadrat" },       kind: "function",  x: 160, y: 50,  width: 58,  height: 52 },
    { id: "k-ctrl", label: "k",  sublabel: { en: "control",     ru: "вход",      uz: "kirish" },        kind: "control",   x: 22,  y: 170, width: 70,  height: 34 },
    { id: "sub",    label: "−",  sublabel: { en: "Subtract",    ru: "Вычитание", uz: "Ayirish" },       kind: "function",  x: 320, y: 92,  width: 56,  height: 52 },
    { id: "sqrt",   label: "√",  sublabel: { en: "Square root", ru: "Корень",    uz: "Kvadrat ildiz" }, kind: "function",  x: 470, y: 92,  width: 56,  height: 52 },
    { id: "mult",   label: "×2", sublabel: { en: "Multiply",    ru: "Умножение", uz: "Koʻpaytirish" },  kind: "function",  x: 600, y: 92,  width: 56,  height: 52 },
    { id: "y-ind",  label: "y",  sublabel: { en: "indicator",   ru: "индикатор", uz: "indikator" },     kind: "indicator", x: 720, y: 98,  width: 92,  height: 40 },
  ],
  wires: [
    { id: "w-x-sq",     points: [[92, 75], [126, 75], [126, 76], [160, 76]] },
    { id: "w-sq-sub",   points: [[218, 76], [280, 76], [280, 110], [320, 110]] },
    { id: "w-k-sub",    points: [[92, 187], [280, 187], [280, 130], [320, 130]] },
    { id: "w-sub-sqrt", points: [[376, 118], [470, 118]] },
    { id: "w-sqrt-mult", points: [[526, 118], [600, 118]] },
    { id: "w-mult-y",   points: [[656, 118], [720, 118]] },
  ],
  steps: [
    // x arrives → Square
    { kind: "highlight", nodeId: "x-ctrl", state: "active" },
    { kind: "set-value", nodeId: "x-ctrl", value: "5" },
    { kind: "wait", durationMs: 400 },
    { kind: "dot", wireId: "w-x-sq", color: "#00b4d8", durationMs: 460 },
    { kind: "unhighlight", nodeId: "x-ctrl" },
    { kind: "highlight", nodeId: "sq", state: "active" },
    { kind: "wait", durationMs: 380 },
    { kind: "set-value", nodeId: "sq", value: "25" },
    { kind: "wait", durationMs: 200 },
    { kind: "dot", wireId: "w-sq-sub", color: "#22d3ee", durationMs: 520 },
    { kind: "unhighlight", nodeId: "sq" },

    // k arrives → Subtract
    { kind: "highlight", nodeId: "k-ctrl", state: "active" },
    { kind: "set-value", nodeId: "k-ctrl", value: "9" },
    { kind: "wait", durationMs: 300 },
    { kind: "dot", wireId: "w-k-sub", color: "#ef4444", durationMs: 560 },
    { kind: "unhighlight", nodeId: "k-ctrl" },
    { kind: "highlight", nodeId: "sub", state: "active" },
    { kind: "wait", durationMs: 380 },
    { kind: "set-value", nodeId: "sub", value: "16" },
    { kind: "wait", durationMs: 200 },
    { kind: "dot", wireId: "w-sub-sqrt", color: "#22d3ee", durationMs: 480 },
    { kind: "unhighlight", nodeId: "sub" },

    // Square root → 4
    { kind: "highlight", nodeId: "sqrt", state: "active" },
    { kind: "wait", durationMs: 380 },
    { kind: "set-value", nodeId: "sqrt", value: "4" },
    { kind: "wait", durationMs: 200 },
    { kind: "dot", wireId: "w-sqrt-mult", color: "#22d3ee", durationMs: 440 },
    { kind: "unhighlight", nodeId: "sqrt" },

    // Multiply → 8
    { kind: "highlight", nodeId: "mult", state: "active" },
    { kind: "wait", durationMs: 380 },
    { kind: "set-value", nodeId: "mult", value: "8" },
    { kind: "wait", durationMs: 200 },
    { kind: "dot", wireId: "w-mult-y", color: "#22d3ee", durationMs: 440 },
    { kind: "unhighlight", nodeId: "mult" },

    // Indicator
    { kind: "highlight", nodeId: "y-ind", state: "success" },
    { kind: "set-value", nodeId: "y-ind", value: "8" },
    { kind: "wait", durationMs: 1300 },
    { kind: "reset" },
  ],
};
