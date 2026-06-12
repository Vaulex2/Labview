import type { DiagramDefinition } from "@/lib/types";

// Error Cluster Propagation — Debugging lesson (advanced)
// A healthy data flow runs through a chain of functions until one (Read) fails.
// The error cluster carries status + code + source downstream; later functions
// detect the incoming error and skip their work, and the Error Handler reports
// the code. Mirrors how LabVIEW threads error clusters between functions.
// Canvas 780 x 260

export const errorClusterDiagram: DiagramDefinition = {
  id: "viz_error_cluster",
  title: {
    en: "Error Cluster Propagation",
    ru: "Распространение кластера ошибок",
    uz: "Error cluster tarqalishi",
  },
  description: {
    en: "An error raised in one function travels through the error cluster — downstream functions skip their work and the handler reports the code and source.",
    ru: "Ошибка, возникшая в одной функции, распространяется через кластер ошибок — последующие функции пропускают работу, а обработчик сообщает код и источник.",
    uz: "Bitta funksiyada yuzaga kelgan xato error cluster orqali tarqaladi — keyingi funksiyalar ishini o'tkazib yuboradi, ishlovchi esa kod va manbani bildiradi.",
  },
  canvasWidth: 780,
  canvasHeight: 260,
  nodes: [
    { id: "src", label: "In", sublabel: { en: "input", ru: "вход", uz: "kirish" }, kind: "control", x: 40, y: 108, width: 92, height: 40 },
    { id: "f1", label: "O", sublabel: { en: "Open File", ru: "Открытие", uz: "Ochish" }, kind: "function", x: 210, y: 102, width: 68, height: 54 },
    { id: "f2", label: "R", sublabel: { en: "Read — error", ru: "Чтение — ошибка", uz: "O'qish — xato" }, kind: "function", x: 360, y: 102, width: 68, height: 54 },
    { id: "f3", label: "P", sublabel: { en: "Process — skipped", ru: "Обработка — пропуск", uz: "Qayta ishlash — o'tkazildi" }, kind: "function", x: 510, y: 102, width: 68, height: 54 },
    { id: "err", label: "Err", sublabel: { en: "Error Handler", ru: "Обработчик ошибок", uz: "Xato ishlovchi" }, kind: "indicator", x: 636, y: 106, width: 110, height: 44 },
  ],
  wires: [
    { id: "w-src-f1", points: [[132, 128], [210, 129]] },
    { id: "w-f1-f2", points: [[278, 129], [360, 129]] },
    { id: "w-f2-f3", points: [[428, 129], [510, 129]] },
    { id: "w-f3-err", points: [[578, 129], [636, 128]] },
  ],
  steps: [
    { kind: "highlight", nodeId: "src", state: "active" },
    { kind: "wait", durationMs: 450 },
    { kind: "dot", wireId: "w-src-f1", color: "#00b4d8", durationMs: 560 },
    { kind: "unhighlight", nodeId: "src" },

    // f1 runs cleanly — no error
    { kind: "highlight", nodeId: "f1", state: "active" },
    { kind: "wait", durationMs: 400 },
    { kind: "set-value", nodeId: "f1", value: "✓" },
    { kind: "dot", wireId: "w-f1-f2", color: "#00b4d8", durationMs: 540 },
    { kind: "unhighlight", nodeId: "f1" },

    // f2 raises an error (red reading state) — status, code, source set
    { kind: "highlight", nodeId: "f2", state: "reading" },
    { kind: "wait", durationMs: 600 },
    { kind: "set-value", nodeId: "f2", value: "✕" },
    { kind: "wait", durationMs: 300 },
    // error cluster propagates (red dot)
    { kind: "dot", wireId: "w-f2-f3", color: "#ef4444", durationMs: 620 },

    // f3 sees the incoming error and skips
    { kind: "highlight", nodeId: "f3", state: "reading" },
    { kind: "set-value", nodeId: "f3", value: "–" },
    { kind: "wait", durationMs: 450 },
    { kind: "dot", wireId: "w-f3-err", color: "#ef4444", durationMs: 600 },
    { kind: "unhighlight", nodeId: "f3" },

    // Handler reports the code
    { kind: "highlight", nodeId: "err", state: "reading" },
    { kind: "set-value", nodeId: "err", value: "1056" },
    { kind: "wait", durationMs: 1500 },
    { kind: "reset" },
  ],
};
