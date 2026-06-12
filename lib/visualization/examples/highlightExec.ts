import type { DiagramDefinition } from "@/lib/types";

// Highlight Execution & Probe — Debugging lesson
// Data flows slowly through a process block; the block is "probed" (red reading state)
// to inspect its value before passing the result on. Mirrors how Highlight Execution
// and the Probe Tool let you watch data move through the Block Diagram.
// Canvas 760 x 240

export const highlightExecDiagram: DiagramDefinition = {
  id: "viz_highlight_exec",
  title: {
    en: "Highlight Execution & Probe",
    ru: "Highlight Execution и Probe",
    uz: "Highlight Execution va Probe",
  },
  description: {
    en: "Watch data move slowly along the wire, pause to probe the value mid-stream, then pass the result to the output.",
    ru: "Посмотрите, как данные медленно движутся по проводу, остановитесь, чтобы «прозондировать» значение, затем передайте результат на выход.",
    uz: "Ma'lumotning sim bo'ylab sekin harakatini kuzating, oqim o'rtasida qiymatni probe bilan tekshiring, so'ng natijani chiqishga uzating.",
  },
  canvasWidth: 760,
  canvasHeight: 240,
  nodes: [
    { id: "in",   label: "In",  sublabel: { en: "control",   ru: "вход",      uz: "kirish" },    kind: "control",   x: 44,  y: 100, width: 96,  height: 40 },
    { id: "proc", label: "ƒ",   sublabel: { en: "process",   ru: "процесс",   uz: "jarayon" },   kind: "function",  x: 320, y: 92,  width: 72,  height: 56 },
    { id: "out",  label: "Out", sublabel: { en: "indicator", ru: "индикатор", uz: "indikator" }, kind: "indicator", x: 560, y: 100, width: 116, height: 40 },
  ],
  wires: [
    { id: "w-in-proc",  points: [[140, 120], [320, 120]] },
    { id: "w-proc-out", points: [[392, 120], [560, 120]] },
  ],
  steps: [
    { kind: "highlight", nodeId: "in", state: "active" },
    { kind: "set-value", nodeId: "in", value: "12" },
    { kind: "wait", durationMs: 500 },
    // Slow dot — Highlight Execution
    { kind: "dot", wireId: "w-in-proc", color: "#22d3ee", durationMs: 950 },
    { kind: "unhighlight", nodeId: "in" },
    // Probe reads the value (red reading state)
    { kind: "highlight", nodeId: "proc", state: "reading" },
    { kind: "wait", durationMs: 500 },
    { kind: "set-value", nodeId: "proc", value: "12" },
    { kind: "wait", durationMs: 400 },
    { kind: "highlight", nodeId: "proc", state: "active" },
    { kind: "wait", durationMs: 250 },
    { kind: "dot", wireId: "w-proc-out", color: "#22d3ee", durationMs: 950 },
    { kind: "unhighlight", nodeId: "proc" },
    { kind: "highlight", nodeId: "out", state: "success" },
    { kind: "set-value", nodeId: "out", value: "12" },
    { kind: "wait", durationMs: 1300 },
    { kind: "reset" },
  ],
};
