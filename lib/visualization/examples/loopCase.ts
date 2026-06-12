import type { DiagramDefinition } from "@/lib/types";

// While Loop + Case Structure — Iteration and Branching lesson (advanced)
// A While Loop continuously reads a sensor; each iteration a comparison feeds a
// Case Structure that routes execution down the OK branch while readings are
// normal, then down the Warning branch when a reading exceeds the threshold.
// Shows iteration and branching working together — the core control pattern.
// Canvas 780 x 300

export const loopCaseDiagram: DiagramDefinition = {
  id: "viz_loop_case",
  title: {
    en: "Loop + Case: a monitoring system",
    ru: "Цикл + Case: система мониторинга",
    uz: "Sikl + Case: monitoring tizimi",
  },
  description: {
    en: "A While Loop reads a sensor each iteration and a Case Structure picks the branch — OK while readings are normal, Warning once a reading exceeds 80.",
    ru: "Цикл While читает датчик на каждой итерации, а Case-структура выбирает ветвь — OK при нормальных значениях и Warning, когда значение превышает 80.",
    uz: "While sikli har iteratsiyada sensorni o'qiydi va Case strukturasi tarmoqni tanlaydi — qiymatlar normal bo'lsa OK, qiymat 80 dan oshganda Warning.",
  },
  canvasWidth: 780,
  canvasHeight: 300,
  loopBounds: {
    x: 120, y: 54, width: 430, height: 214,
    label: { en: "While Loop", ru: "Цикл While", uz: "While sikli" },
  },
  nodes: [
    { id: "iter", label: "i", sublabel: { en: "index", ru: "индекс", uz: "indeks" }, kind: "loop-index", x: 150, y: 74, width: 54, height: 32 },
    { id: "read", label: "Rd", sublabel: { en: "sensor", ru: "датчик", uz: "sensor" }, kind: "function", x: 220, y: 156, width: 78, height: 50 },
    { id: "cmp", label: ">80", sublabel: { en: "over limit?", ru: "выше предела?", uz: "chegaradan oshdimi?" }, kind: "function", x: 360, y: 156, width: 68, height: 50 },
    { id: "casy", label: "Case", sublabel: { en: "structure", ru: "структура", uz: "struktura" }, kind: "function", x: 456, y: 150, width: 84, height: 64 },
    { id: "warn", label: "Warn", sublabel: { en: "True branch", ru: "ветвь True", uz: "True tarmoq" }, kind: "indicator", x: 600, y: 120, width: 130, height: 40 },
    { id: "ok", label: "OK", sublabel: { en: "False branch", ru: "ветвь False", uz: "False tarmoq" }, kind: "indicator", x: 600, y: 210, width: 130, height: 40 },
  ],
  wires: [
    { id: "w-read-cmp", points: [[298, 181], [360, 181]] },
    { id: "w-cmp-case", points: [[428, 181], [456, 182]] },
    { id: "w-case-warn", points: [[540, 166], [572, 166], [572, 140], [600, 140]] },
    { id: "w-case-ok", points: [[540, 198], [572, 198], [572, 230], [600, 230]] },
  ],
  steps: [
    // Iteration 0 — 60 → OK
    { kind: "highlight", nodeId: "iter", state: "active" },
    { kind: "set-value", nodeId: "iter", value: "0" },
    { kind: "highlight", nodeId: "read", state: "active" },
    { kind: "set-value", nodeId: "read", value: "60" },
    { kind: "wait", durationMs: 350 },
    { kind: "dot", wireId: "w-read-cmp", color: "#00b4d8", durationMs: 420 },
    { kind: "highlight", nodeId: "cmp", state: "active" },
    { kind: "set-value", nodeId: "cmp", value: "F" },
    { kind: "wait", durationMs: 300 },
    { kind: "highlight", nodeId: "casy", state: "active" },
    { kind: "dot", wireId: "w-case-ok", color: "#22d3ee", durationMs: 480 },
    { kind: "highlight", nodeId: "ok", state: "success" },
    { kind: "set-value", nodeId: "ok", value: "OK" },
    { kind: "wait", durationMs: 450 },
    { kind: "unhighlight", nodeId: "read" },
    { kind: "unhighlight", nodeId: "cmp" },
    { kind: "unhighlight", nodeId: "casy" },
    { kind: "unhighlight", nodeId: "ok" },
    { kind: "unhighlight", nodeId: "iter" },
    { kind: "wait", durationMs: 180 },

    // Iteration 1 — 72 → OK
    { kind: "highlight", nodeId: "iter", state: "active" },
    { kind: "set-value", nodeId: "iter", value: "1" },
    { kind: "highlight", nodeId: "read", state: "active" },
    { kind: "set-value", nodeId: "read", value: "72" },
    { kind: "wait", durationMs: 350 },
    { kind: "dot", wireId: "w-read-cmp", color: "#00b4d8", durationMs: 420 },
    { kind: "highlight", nodeId: "cmp", state: "active" },
    { kind: "set-value", nodeId: "cmp", value: "F" },
    { kind: "wait", durationMs: 300 },
    { kind: "highlight", nodeId: "casy", state: "active" },
    { kind: "dot", wireId: "w-case-ok", color: "#22d3ee", durationMs: 480 },
    { kind: "highlight", nodeId: "ok", state: "success" },
    { kind: "set-value", nodeId: "ok", value: "OK" },
    { kind: "wait", durationMs: 450 },
    { kind: "unhighlight", nodeId: "read" },
    { kind: "unhighlight", nodeId: "cmp" },
    { kind: "unhighlight", nodeId: "casy" },
    { kind: "unhighlight", nodeId: "ok" },
    { kind: "unhighlight", nodeId: "iter" },
    { kind: "wait", durationMs: 180 },

    // Iteration 2 — 88 → Warning
    { kind: "highlight", nodeId: "iter", state: "active" },
    { kind: "set-value", nodeId: "iter", value: "2" },
    { kind: "highlight", nodeId: "read", state: "active" },
    { kind: "set-value", nodeId: "read", value: "88" },
    { kind: "wait", durationMs: 350 },
    { kind: "dot", wireId: "w-read-cmp", color: "#00b4d8", durationMs: 420 },
    { kind: "highlight", nodeId: "cmp", state: "success" },
    { kind: "set-value", nodeId: "cmp", value: "T" },
    { kind: "wait", durationMs: 300 },
    { kind: "highlight", nodeId: "casy", state: "active" },
    { kind: "dot", wireId: "w-case-warn", color: "#ef4444", durationMs: 480 },
    { kind: "highlight", nodeId: "warn", state: "reading" },
    { kind: "set-value", nodeId: "warn", value: "Warning" },
    { kind: "wait", durationMs: 1500 },
    { kind: "reset" },
  ],
};
