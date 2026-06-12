import type { DiagramDefinition } from "@/lib/types";

// Case Structure decision — Iteration and Branching lesson
// A temperature is compared against 80; the Case Structure routes execution
// down the True branch (Warning) while the False branch (OK) stays idle.
// Canvas 780 x 280

export const caseDecisionDiagram: DiagramDefinition = {
  id: "viz_case_decision",
  title: {
    en: "Case Structure: branching on a condition",
    ru: "Case-структура: ветвление по условию",
    uz: "Case strukturasi: shart bo'yicha tarmoqlanish",
  },
  description: {
    en: "A temperature is compared to 80. The Case Structure evaluates the result and runs the matching branch — here the True path triggers a warning.",
    ru: "Температура сравнивается с 80. Case-структура оценивает результат и выполняет соответствующую ветвь — здесь путь True вызывает предупреждение.",
    uz: "Harorat 80 bilan taqqoslanadi. Case strukturasi natijani baholaydi va mos tarmoqni bajaradi — bu yerda True yo'li ogohlantirishni ishga tushiradi.",
  },
  canvasWidth: 780,
  canvasHeight: 280,
  nodes: [
    { id: "temp", label: "T",    sublabel: { en: "temperature", ru: "температура", uz: "harorat" },  kind: "control",   x: 36,  y: 110, width: 84,  height: 42 },
    { id: "cmp",  label: ">80",  sublabel: { en: "greater?",    ru: "больше?",     uz: "katta?" },   kind: "function",  x: 250, y: 104, width: 78,  height: 54 },
    { id: "casy", label: "Case", sublabel: { en: "structure",   ru: "структура",   uz: "struktura" }, kind: "function", x: 430, y: 96,  width: 96,  height: 70 },
    { id: "warn", label: "Warn", sublabel: { en: "True branch", ru: "ветвь True",  uz: "True tarmoq" }, kind: "indicator", x: 620, y: 64,  width: 130, height: 42 },
    { id: "ok",   label: "OK",   sublabel: { en: "False branch", ru: "ветвь False", uz: "False tarmoq" }, kind: "indicator", x: 620, y: 168, width: 130, height: 42 },
  ],
  wires: [
    { id: "w-temp-cmp",  points: [[120, 131], [250, 131]] },
    { id: "w-cmp-case",  points: [[328, 131], [430, 131]] },
    { id: "w-case-warn", points: [[526, 116], [573, 116], [573, 85], [620, 85]] },
    { id: "w-case-ok",   points: [[526, 146], [573, 146], [573, 189], [620, 189]] },
  ],
  steps: [
    { kind: "highlight", nodeId: "temp", state: "active" },
    { kind: "set-value", nodeId: "temp", value: "85" },
    { kind: "wait", durationMs: 500 },
    { kind: "dot", wireId: "w-temp-cmp", color: "#00b4d8", durationMs: 540 },
    { kind: "unhighlight", nodeId: "temp" },

    // Compare evaluates to True
    { kind: "highlight", nodeId: "cmp", state: "active" },
    { kind: "wait", durationMs: 450 },
    { kind: "set-value", nodeId: "cmp", value: "T" },
    { kind: "wait", durationMs: 250 },
    { kind: "dot", wireId: "w-cmp-case", color: "#22d3ee", durationMs: 480 },
    { kind: "unhighlight", nodeId: "cmp" },

    // Case structure routes to the True branch
    { kind: "highlight", nodeId: "casy", state: "active" },
    { kind: "wait", durationMs: 500 },
    { kind: "dot", wireId: "w-case-warn", color: "#ef4444", durationMs: 560 },
    { kind: "unhighlight", nodeId: "casy" },
    { kind: "highlight", nodeId: "warn", state: "reading" },
    { kind: "set-value", nodeId: "warn", value: "Warning" },
    { kind: "wait", durationMs: 1400 },
    { kind: "reset" },
  ],
};
