import type { DiagramDefinition } from "@/lib/types";

// Build Array & Array Size — Arrays lesson (advanced)
// Two arrays are combined by the Build Array function into a single array, and
// Array Size reports how many elements the result holds. Demonstrates two of the
// core array operations working together.
// Canvas 780 x 280

export const buildArrayDiagram: DiagramDefinition = {
  id: "viz_build_array",
  title: {
    en: "Build Array & Array Size",
    ru: "Build Array и Array Size",
    uz: "Build Array va Array Size",
  },
  description: {
    en: "Two arrays are merged by Build Array into one, and Array Size reports the element count of the result.",
    ru: "Два массива объединяются функцией Build Array в один, а Array Size сообщает число элементов результата.",
    uz: "Ikki massiv Build Array funksiyasi bilan bittaga birlashtiriladi, Array Size esa natijaning element sonini bildiradi.",
  },
  canvasWidth: 780,
  canvasHeight: 280,
  nodes: [
    { id: "arrA", label: "A", sublabel: { en: "[1, 2]", ru: "[1, 2]", uz: "[1, 2]" }, kind: "constant", x: 40, y: 70, width: 120, height: 50 },
    { id: "arrB", label: "B", sublabel: { en: "[3, 4]", ru: "[3, 4]", uz: "[3, 4]" }, kind: "constant", x: 40, y: 170, width: 120, height: 50 },
    { id: "build", label: "⊕", sublabel: { en: "Build Array", ru: "Build Array", uz: "Build Array" }, kind: "function", x: 320, y: 104, width: 92, height: 70 },
    { id: "outarr", label: "Out", sublabel: { en: "combined", ru: "объединённый", uz: "birlashgan" }, kind: "indicator", x: 560, y: 92, width: 160, height: 46 },
    { id: "size", label: "N", sublabel: { en: "Array Size", ru: "Array Size", uz: "Array Size" }, kind: "indicator", x: 560, y: 176, width: 120, height: 42 },
  ],
  wires: [
    { id: "w-a-build", points: [[160, 95], [250, 95], [250, 121], [320, 121]] },
    { id: "w-b-build", points: [[160, 195], [250, 195], [250, 157], [320, 157]] },
    { id: "w-build-out", points: [[412, 128], [486, 128], [486, 115], [560, 115]] },
    { id: "w-build-size", points: [[412, 150], [486, 150], [486, 197], [560, 197]] },
  ],
  steps: [
    { kind: "highlight", nodeId: "arrA", state: "active" },
    { kind: "wait", durationMs: 350 },
    { kind: "highlight", nodeId: "arrB", state: "active" },
    { kind: "wait", durationMs: 400 },
    { kind: "dot", wireId: "w-a-build", color: "#00b4d8", durationMs: 560 },
    { kind: "dot", wireId: "w-b-build", color: "#00b4d8", durationMs: 560 },
    { kind: "unhighlight", nodeId: "arrA" },
    { kind: "unhighlight", nodeId: "arrB" },
    { kind: "highlight", nodeId: "build", state: "active" },
    { kind: "wait", durationMs: 550 },

    { kind: "dot", wireId: "w-build-out", color: "#22d3ee", durationMs: 520 },
    { kind: "highlight", nodeId: "outarr", state: "success" },
    { kind: "set-value", nodeId: "outarr", value: "[1, 2, 3, 4]" },
    { kind: "wait", durationMs: 350 },
    { kind: "dot", wireId: "w-build-size", color: "#22d3ee", durationMs: 520 },
    { kind: "unhighlight", nodeId: "build" },
    { kind: "highlight", nodeId: "size", state: "success" },
    { kind: "set-value", nodeId: "size", value: "4" },
    { kind: "wait", durationMs: 1500 },
    { kind: "reset" },
  ],
};
