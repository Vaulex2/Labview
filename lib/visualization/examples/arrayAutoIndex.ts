import type { DiagramDefinition } from "@/lib/types";

// Auto-Indexing in a For Loop — Arrays lesson (advanced)
// An array wired to a For Loop is auto-indexed: one element enters the loop per
// iteration, gets processed (× 2), and the result is auto-indexed back out into a
// new array. Shows how loops and arrays combine without manual indexing.
// Canvas 780 x 300

export const arrayAutoIndexDiagram: DiagramDefinition = {
  id: "viz_array_autoindex",
  title: {
    en: "Auto-Indexing: process an array in a loop",
    ru: "Авто-индексация: обработка массива в цикле",
    uz: "Avto-indekslash: massivni siklda qayta ishlash",
  },
  description: {
    en: "An array wired to a For Loop is auto-indexed — one element per iteration is processed and indexed back out into a new array.",
    ru: "Массив, подключённый к циклу For, авто-индексируется — за итерацию обрабатывается один элемент и индексируется обратно в новый массив.",
    uz: "For siklga ulangan massiv avto-indekslanadi — har iteratsiyada bitta element qayta ishlanadi va yangi massivga qaytariladi.",
  },
  canvasWidth: 780,
  canvasHeight: 300,
  loopBounds: {
    x: 180, y: 52, width: 360, height: 214,
    label: { en: "For Loop (auto-index)", ru: "Цикл For (авто-индекс)", uz: "For sikli (avto-indeks)" },
  },
  nodes: [
    { id: "arr", label: "Array", sublabel: { en: "[2, 4, 6, 8]", ru: "[2, 4, 6, 8]", uz: "[2, 4, 6, 8]" }, kind: "constant", x: 36, y: 76, width: 132, height: 54 },
    { id: "elem", label: "a[i]", sublabel: { en: "element", ru: "элемент", uz: "element" }, kind: "loop-index", x: 230, y: 156, width: 70, height: 40 },
    { id: "mul", label: "×2", sublabel: { en: "process", ru: "обработка", uz: "qayta ishlash" }, kind: "function", x: 382, y: 150, width: 62, height: 52 },
    { id: "outarr", label: "Out", sublabel: { en: "new array", ru: "новый массив", uz: "yangi massiv" }, kind: "indicator", x: 600, y: 104, width: 146, height: 54 },
  ],
  wires: [
    { id: "w-arr-elem", points: [[168, 103], [205, 103], [205, 176], [230, 176]] },
    { id: "w-elem-mul", points: [[300, 176], [382, 176]] },
    { id: "w-mul-out", points: [[444, 176], [560, 176], [560, 131], [600, 131]] },
  ],
  steps: [
    { kind: "highlight", nodeId: "arr", state: "active" },
    { kind: "wait", durationMs: 450 },

    // Iteration 0 — element 2 → 4
    { kind: "dot", wireId: "w-arr-elem", color: "#00b4d8", durationMs: 520 },
    { kind: "highlight", nodeId: "elem", state: "active" },
    { kind: "set-value", nodeId: "elem", value: "2" },
    { kind: "highlight", nodeId: "mul", state: "active" },
    { kind: "wait", durationMs: 300 },
    { kind: "set-value", nodeId: "mul", value: "4" },
    { kind: "dot", wireId: "w-mul-out", color: "#3b82f6", durationMs: 480 },
    { kind: "unhighlight", nodeId: "elem" },
    { kind: "unhighlight", nodeId: "mul" },
    { kind: "wait", durationMs: 160 },

    // Iteration 1 — element 4 → 8
    { kind: "dot", wireId: "w-arr-elem", color: "#00b4d8", durationMs: 520 },
    { kind: "highlight", nodeId: "elem", state: "active" },
    { kind: "set-value", nodeId: "elem", value: "4" },
    { kind: "highlight", nodeId: "mul", state: "active" },
    { kind: "wait", durationMs: 300 },
    { kind: "set-value", nodeId: "mul", value: "8" },
    { kind: "dot", wireId: "w-mul-out", color: "#3b82f6", durationMs: 480 },
    { kind: "unhighlight", nodeId: "elem" },
    { kind: "unhighlight", nodeId: "mul" },
    { kind: "wait", durationMs: 160 },

    // Iteration 2 — element 6 → 12
    { kind: "dot", wireId: "w-arr-elem", color: "#00b4d8", durationMs: 520 },
    { kind: "highlight", nodeId: "elem", state: "active" },
    { kind: "set-value", nodeId: "elem", value: "6" },
    { kind: "highlight", nodeId: "mul", state: "active" },
    { kind: "wait", durationMs: 300 },
    { kind: "set-value", nodeId: "mul", value: "12" },
    { kind: "dot", wireId: "w-mul-out", color: "#3b82f6", durationMs: 480 },
    { kind: "unhighlight", nodeId: "elem" },
    { kind: "unhighlight", nodeId: "mul" },
    { kind: "wait", durationMs: 160 },

    // Iteration 3 — element 8 → 16
    { kind: "dot", wireId: "w-arr-elem", color: "#00b4d8", durationMs: 520 },
    { kind: "highlight", nodeId: "elem", state: "active" },
    { kind: "set-value", nodeId: "elem", value: "8" },
    { kind: "highlight", nodeId: "mul", state: "active" },
    { kind: "wait", durationMs: 300 },
    { kind: "set-value", nodeId: "mul", value: "16" },
    { kind: "dot", wireId: "w-mul-out", color: "#3b82f6", durationMs: 480 },
    { kind: "unhighlight", nodeId: "elem" },
    { kind: "unhighlight", nodeId: "mul" },
    { kind: "wait", durationMs: 250 },

    // Final assembled array
    { kind: "highlight", nodeId: "outarr", state: "success" },
    { kind: "set-value", nodeId: "outarr", value: "[4, 8, 12, 16]" },
    { kind: "wait", durationMs: 1500 },
    { kind: "reset" },
  ],
};
