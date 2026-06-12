import type { DiagramDefinition } from "@/lib/types";

// Index Array — Arrays lesson
// An array [10,20,30,40] and an index (2) feed the Index Array function,
// which extracts the element at that position (30) to the indicator.
// Canvas 760 x 280

export const indexArrayDiagram: DiagramDefinition = {
  id: "viz_index_array",
  title: {
    en: "Index Array: read one element",
    ru: "Index Array: чтение одного элемента",
    uz: "Index Array: bitta elementni o'qish",
  },
  description: {
    en: "An array and an index value feed the Index Array function, which extracts the element at that position.",
    ru: "Массив и значение индекса подаются на функцию Index Array, которая извлекает элемент в этой позиции.",
    uz: "Massiv va indeks qiymati Index Array funksiyasiga uzatiladi, u o'sha pozitsiyadagi elementni ajratib oladi.",
  },
  canvasWidth: 760,
  canvasHeight: 280,
  nodes: [
    { id: "arr", label: "Array", sublabel: { en: "[10, 20, 30, 40]", ru: "[10, 20, 30, 40]", uz: "[10, 20, 30, 40]" }, kind: "constant",  x: 36,  y: 70,  width: 140, height: 56 },
    { id: "idx", label: "2",     sublabel: { en: "index",            ru: "индекс",            uz: "indeks" },            kind: "control",   x: 56,  y: 184, width: 100, height: 38 },
    { id: "ixf", label: "[ ]",   sublabel: { en: "Index Array",      ru: "Index Array",       uz: "Index Array" },       kind: "function",  x: 330, y: 96,  width: 92,  height: 68 },
    { id: "out", label: "Out",   sublabel: { en: "element at 2",     ru: "элемент по 2",      uz: "2-pozitsiya elementi" }, kind: "indicator", x: 560, y: 110, width: 120, height: 42 },
  ],
  wires: [
    { id: "w-arr-ix", points: [[176, 98], [260, 98], [260, 118], [330, 118]] },
    { id: "w-idx-ix", points: [[156, 203], [260, 203], [260, 142], [330, 142]] },
    { id: "w-ix-out", points: [[422, 130], [560, 131]] },
  ],
  steps: [
    { kind: "highlight", nodeId: "arr", state: "active" },
    { kind: "wait", durationMs: 450 },
    { kind: "highlight", nodeId: "idx", state: "active" },
    { kind: "set-value", nodeId: "idx", value: "2" },
    { kind: "wait", durationMs: 400 },
    { kind: "dot", wireId: "w-arr-ix", color: "#00b4d8", durationMs: 600 },
    { kind: "dot", wireId: "w-idx-ix", color: "#00b4d8", durationMs: 600 },
    { kind: "unhighlight", nodeId: "arr" },
    { kind: "unhighlight", nodeId: "idx" },
    { kind: "highlight", nodeId: "ixf", state: "active" },
    { kind: "wait", durationMs: 500 },
    { kind: "dot", wireId: "w-ix-out", color: "#22d3ee", durationMs: 560 },
    { kind: "unhighlight", nodeId: "ixf" },
    { kind: "highlight", nodeId: "out", state: "success" },
    { kind: "set-value", nodeId: "out", value: "30" },
    { kind: "wait", durationMs: 1300 },
    { kind: "reset" },
  ],
};
