import type { DiagramDefinition } from "@/lib/types";

// Shift Register + Branching: detect a change — Iteration and Branching lesson (advanced)
// A shift register remembers the previous reading. Each iteration the loop computes
// the change |x − prev|, a comparison checks it against a threshold, and a branch
// raises an Alarm when the jump is too large. The current reading is then stored in
// the shift register for the next iteration. Combines state + decision logic.
// Canvas 780 x 300

export const shiftRegisterCompareDiagram: DiagramDefinition = {
  id: "viz_sr_compare",
  title: {
    en: "Shift Register + branch: detect a spike",
    ru: "Сдвиговый регистр + ветвление: обнаружение скачка",
    uz: "Shift register + tarmoq: sakrashni aniqlash",
  },
  description: {
    en: "A shift register remembers the previous reading; each iteration the change is compared to a threshold and the branch raises an alarm on a large jump.",
    ru: "Сдвиговый регистр хранит предыдущее значение; на каждой итерации изменение сравнивается с порогом, и ветвь поднимает тревогу при большом скачке.",
    uz: "Shift register oldingi qiymatni saqlaydi; har iteratsiyada o'zgarish chegara bilan solishtiriladi va katta sakrashda tarmoq signal beradi.",
  },
  canvasWidth: 780,
  canvasHeight: 300,
  loopBounds: {
    x: 150, y: 54, width: 430, height: 214,
    label: { en: "While Loop (compare to previous)", ru: "Цикл While (сравнение с предыдущим)", uz: "While sikli (oldingi bilan solishtirish)" },
  },
  nodes: [
    { id: "cur", label: "x", sublabel: { en: "reading", ru: "значение", uz: "qiymat" }, kind: "control", x: 36, y: 150, width: 84, height: 38 },
    { id: "srL", label: "SR", sublabel: { en: "← prev", ru: "← пред.", uz: "← oldingi" }, kind: "shift-register", x: 176, y: 176, width: 46, height: 34 },
    { id: "diff", label: "Δ", sublabel: { en: "|x − prev|", ru: "|x − пред.|", uz: "|x − oldingi|" }, kind: "function", x: 300, y: 150, width: 62, height: 54 },
    { id: "cmp", label: ">5", sublabel: { en: "jump?", ru: "скачок?", uz: "sakrash?" }, kind: "function", x: 430, y: 150, width: 58, height: 54 },
    { id: "srR", label: "SR", sublabel: { en: "→ store", ru: "→ сохр.", uz: "→ saqlash" }, kind: "shift-register", x: 508, y: 176, width: 46, height: 34 },
    { id: "alarm", label: "Alarm", sublabel: { en: "branch out", ru: "ветвь", uz: "tarmoq" }, kind: "indicator", x: 636, y: 150, width: 110, height: 42 },
  ],
  wires: [
    { id: "w-cur-diff", points: [[120, 169], [270, 169], [270, 164], [300, 164]] },
    { id: "w-sr-diff", points: [[222, 193], [300, 190]] },
    { id: "w-diff-cmp", points: [[362, 177], [430, 177]] },
    { id: "w-cmp-alarm", points: [[488, 177], [600, 177], [600, 171], [636, 171]] },
    { id: "w-cur-store", points: [[150, 169], [150, 256], [531, 256], [531, 210]] },
  ],
  steps: [
    // Seed: previous reading = 20
    { kind: "highlight", nodeId: "srL", state: "active" },
    { kind: "set-value", nodeId: "srL", value: "20" },
    { kind: "wait", durationMs: 400 },
    { kind: "unhighlight", nodeId: "srL" },

    // Iteration 0 — x = 20, Δ = 0 → no alarm
    { kind: "highlight", nodeId: "cur", state: "active" },
    { kind: "set-value", nodeId: "cur", value: "20" },
    { kind: "dot", wireId: "w-cur-diff", color: "#00b4d8", durationMs: 460 },
    { kind: "dot", wireId: "w-sr-diff", color: "#ef4444", durationMs: 460 },
    { kind: "highlight", nodeId: "diff", state: "active" },
    { kind: "set-value", nodeId: "diff", value: "0" },
    { kind: "wait", durationMs: 300 },
    { kind: "dot", wireId: "w-diff-cmp", color: "#22d3ee", durationMs: 420 },
    { kind: "highlight", nodeId: "cmp", state: "active" },
    { kind: "set-value", nodeId: "cmp", value: "F" },
    { kind: "wait", durationMs: 250 },
    { kind: "dot", wireId: "w-cur-store", color: "#3b82f6", durationMs: 560 },
    { kind: "set-value", nodeId: "srR", value: "20" },
    { kind: "unhighlight", nodeId: "cur" },
    { kind: "unhighlight", nodeId: "diff" },
    { kind: "unhighlight", nodeId: "cmp" },
    { kind: "wait", durationMs: 220 },

    // Iteration 1 — x = 22, prev = 20, Δ = 2 → no alarm
    { kind: "set-value", nodeId: "srL", value: "20" },
    { kind: "highlight", nodeId: "cur", state: "active" },
    { kind: "set-value", nodeId: "cur", value: "22" },
    { kind: "dot", wireId: "w-cur-diff", color: "#00b4d8", durationMs: 460 },
    { kind: "dot", wireId: "w-sr-diff", color: "#ef4444", durationMs: 460 },
    { kind: "highlight", nodeId: "diff", state: "active" },
    { kind: "set-value", nodeId: "diff", value: "2" },
    { kind: "wait", durationMs: 300 },
    { kind: "dot", wireId: "w-diff-cmp", color: "#22d3ee", durationMs: 420 },
    { kind: "highlight", nodeId: "cmp", state: "active" },
    { kind: "set-value", nodeId: "cmp", value: "F" },
    { kind: "wait", durationMs: 250 },
    { kind: "dot", wireId: "w-cur-store", color: "#3b82f6", durationMs: 560 },
    { kind: "set-value", nodeId: "srR", value: "22" },
    { kind: "unhighlight", nodeId: "cur" },
    { kind: "unhighlight", nodeId: "diff" },
    { kind: "unhighlight", nodeId: "cmp" },
    { kind: "wait", durationMs: 220 },

    // Iteration 2 — x = 40, prev = 22, Δ = 18 → ALARM
    { kind: "set-value", nodeId: "srL", value: "22" },
    { kind: "highlight", nodeId: "cur", state: "active" },
    { kind: "set-value", nodeId: "cur", value: "40" },
    { kind: "dot", wireId: "w-cur-diff", color: "#00b4d8", durationMs: 460 },
    { kind: "dot", wireId: "w-sr-diff", color: "#ef4444", durationMs: 460 },
    { kind: "highlight", nodeId: "diff", state: "active" },
    { kind: "set-value", nodeId: "diff", value: "18" },
    { kind: "wait", durationMs: 300 },
    { kind: "dot", wireId: "w-diff-cmp", color: "#22d3ee", durationMs: 420 },
    { kind: "highlight", nodeId: "cmp", state: "success" },
    { kind: "set-value", nodeId: "cmp", value: "T" },
    { kind: "wait", durationMs: 300 },
    { kind: "dot", wireId: "w-cmp-alarm", color: "#ef4444", durationMs: 520 },
    { kind: "highlight", nodeId: "alarm", state: "reading" },
    { kind: "set-value", nodeId: "alarm", value: "ALARM" },
    { kind: "wait", durationMs: 1500 },
    { kind: "reset" },
  ],
};
