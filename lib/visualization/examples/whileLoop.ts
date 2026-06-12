import type { DiagramDefinition } from "@/lib/types";

// While Loop: stop on condition — Iterative Processes (Loops) lesson (advanced)
// Each iteration reads a sensor value and compares it to a limit. The comparison
// drives the conditional terminal: while the value stays below the limit the loop
// keeps running; once it reaches the limit the conditional terminal stops the loop.
// Canvas 780 x 300

export const whileLoopDiagram: DiagramDefinition = {
  id: "viz_while_loop",
  title: {
    en: "While Loop: stop on a condition",
    ru: "Цикл While: остановка по условию",
    uz: "While sikli: shart bo'yicha to'xtash",
  },
  description: {
    en: "Each iteration reads a value and compares it to a limit; the conditional terminal keeps the loop running until the stop condition becomes true.",
    ru: "Каждая итерация читает значение и сравнивает его с пределом; условный терминал поддерживает работу цикла, пока условие остановки не станет истинным.",
    uz: "Har iteratsiya qiymatni o'qiydi va uni chegara bilan solishtiradi; shartli terminal to'xtash sharti rost bo'lguncha siklni ishlatib turadi.",
  },
  canvasWidth: 780,
  canvasHeight: 300,
  loopBounds: {
    x: 140, y: 56, width: 490, height: 208,
    label: { en: "While Loop (stop when x ≥ limit)", ru: "Цикл While (стоп при x ≥ предела)", uz: "While sikli (x ≥ chegara bo'lsa stop)" },
  },
  nodes: [
    { id: "limit", label: "L", sublabel: { en: "limit", ru: "предел", uz: "chegara" }, kind: "control", x: 36, y: 150, width: 84, height: 38 },
    { id: "iter", label: "i", sublabel: { en: "index", ru: "индекс", uz: "indeks" }, kind: "loop-index", x: 172, y: 76, width: 56, height: 32 },
    { id: "read", label: "Rd", sublabel: { en: "sensor", ru: "датчик", uz: "sensor" }, kind: "function", x: 250, y: 150, width: 84, height: 52 },
    { id: "cmp", label: "≥", sublabel: { en: "x ≥ L ?", ru: "x ≥ L ?", uz: "x ≥ L ?" }, kind: "function", x: 418, y: 150, width: 64, height: 52 },
    { id: "cond", label: "STOP", sublabel: { en: "conditional", ru: "условный", uz: "shartli" }, kind: "indicator", x: 520, y: 156, width: 86, height: 40 },
    { id: "done", label: "Done", sublabel: { en: "loop ended", ru: "цикл завершён", uz: "sikl tugadi" }, kind: "indicator", x: 664, y: 150, width: 96, height: 40 },
  ],
  wires: [
    { id: "w-limit-cmp", points: [[120, 169], [380, 169], [380, 189], [418, 189]] },
    { id: "w-read-cmp", points: [[334, 176], [386, 176], [386, 163], [418, 163]] },
    { id: "w-cmp-cond", points: [[482, 176], [520, 176]] },
    { id: "w-cond-done", points: [[606, 176], [635, 176], [635, 170], [664, 170]] },
  ],
  steps: [
    { kind: "highlight", nodeId: "limit", state: "active" },
    { kind: "set-value", nodeId: "limit", value: "80" },
    { kind: "wait", durationMs: 450 },
    { kind: "dot", wireId: "w-limit-cmp", color: "#00b4d8", durationMs: 560 },
    { kind: "unhighlight", nodeId: "limit" },

    // Iteration 0 — 40 < 80 → keep running
    { kind: "highlight", nodeId: "iter", state: "active" },
    { kind: "set-value", nodeId: "iter", value: "0" },
    { kind: "highlight", nodeId: "read", state: "active" },
    { kind: "set-value", nodeId: "read", value: "40" },
    { kind: "wait", durationMs: 350 },
    { kind: "dot", wireId: "w-read-cmp", color: "#00b4d8", durationMs: 440 },
    { kind: "highlight", nodeId: "cmp", state: "active" },
    { kind: "set-value", nodeId: "cmp", value: "F" },
    { kind: "wait", durationMs: 350 },
    { kind: "unhighlight", nodeId: "read" },
    { kind: "unhighlight", nodeId: "cmp" },
    { kind: "unhighlight", nodeId: "iter" },
    { kind: "wait", durationMs: 200 },

    // Iteration 1 — 65 < 80 → keep running
    { kind: "highlight", nodeId: "iter", state: "active" },
    { kind: "set-value", nodeId: "iter", value: "1" },
    { kind: "highlight", nodeId: "read", state: "active" },
    { kind: "set-value", nodeId: "read", value: "65" },
    { kind: "wait", durationMs: 350 },
    { kind: "dot", wireId: "w-read-cmp", color: "#00b4d8", durationMs: 440 },
    { kind: "highlight", nodeId: "cmp", state: "active" },
    { kind: "set-value", nodeId: "cmp", value: "F" },
    { kind: "wait", durationMs: 350 },
    { kind: "unhighlight", nodeId: "read" },
    { kind: "unhighlight", nodeId: "cmp" },
    { kind: "unhighlight", nodeId: "iter" },
    { kind: "wait", durationMs: 200 },

    // Iteration 2 — 90 ≥ 80 → stop condition true
    { kind: "highlight", nodeId: "iter", state: "active" },
    { kind: "set-value", nodeId: "iter", value: "2" },
    { kind: "highlight", nodeId: "read", state: "active" },
    { kind: "set-value", nodeId: "read", value: "90" },
    { kind: "wait", durationMs: 350 },
    { kind: "dot", wireId: "w-read-cmp", color: "#00b4d8", durationMs: 440 },
    { kind: "highlight", nodeId: "cmp", state: "success" },
    { kind: "set-value", nodeId: "cmp", value: "T" },
    { kind: "wait", durationMs: 300 },
    { kind: "dot", wireId: "w-cmp-cond", color: "#ef4444", durationMs: 460 },
    { kind: "highlight", nodeId: "cond", state: "reading" },
    { kind: "wait", durationMs: 350 },
    { kind: "dot", wireId: "w-cond-done", color: "#22d3ee", durationMs: 520 },
    { kind: "highlight", nodeId: "done", state: "success" },
    { kind: "set-value", nodeId: "done", value: "✓" },
    { kind: "wait", durationMs: 1500 },
    { kind: "reset" },
  ],
};
