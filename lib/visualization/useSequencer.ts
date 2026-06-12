"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { DiagramDefinition, NodeHighlightState, StepAction } from "@/lib/types";

export type NodeStateMap = Record<string, NodeHighlightState>;
export interface NodeValueMap { [nodeId: string]: string }
export interface ActiveDot {
  wireId: string;
  color: string;
  progress: number;
  startTime: number;
  durationMs: number;
}

interface SequencerState {
  stepIndex: number;
  nodeStates: NodeStateMap;
  nodeValues: NodeValueMap;
  activeDots: ActiveDot[];
  isPlaying: boolean;
  speed: number;
}

function getPolylinePositionAt(
  points: [number, number][],
  progress: number
): [number, number] {
  if (points.length === 0) return [0, 0];
  if (points.length === 1) return points[0];

  let totalLen = 0;
  const segLengths: number[] = [];
  for (let i = 1; i < points.length; i++) {
    const dx = points[i][0] - points[i - 1][0];
    const dy = points[i][1] - points[i - 1][1];
    const len = Math.sqrt(dx * dx + dy * dy);
    segLengths.push(len);
    totalLen += len;
  }
  const target = Math.min(progress, 1) * totalLen;
  let elapsed = 0;
  for (let i = 0; i < segLengths.length; i++) {
    if (elapsed + segLengths[i] >= target) {
      const t = segLengths[i] === 0 ? 0 : (target - elapsed) / segLengths[i];
      return [
        points[i][0] + t * (points[i + 1][0] - points[i][0]),
        points[i][1] + t * (points[i + 1][1] - points[i][1]),
      ];
    }
    elapsed += segLengths[i];
  }
  return points[points.length - 1];
}

export { getPolylinePositionAt };

export function useSequencer(
  definition: DiagramDefinition,
  valueOverrides: Record<string, string> = {}
) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [nodeStates, setNodeStates] = useState<NodeStateMap>({});
  const [nodeValues, setNodeValues] = useState<NodeValueMap>({});
  const [activeDots, setActiveDots] = useState<ActiveDot[]>([]);
  const [speed, setSpeedState] = useState(1);

  const ref = useRef<SequencerState>({
    stepIndex: 0,
    nodeStates: {},
    nodeValues: {},
    activeDots: [],
    isPlaying: false,
    speed: 1,
  });

  // Latest computed value-overrides (from user inputs), kept in a ref so the
  // recursive flush callbacks always read the current values.
  const overridesRef = useRef(valueOverrides);
  useEffect(() => { overridesRef.current = valueOverrides; }, [valueOverrides]);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number>(0);
  // Holds the latest `flush` so the recursive setTimeout callbacks below can
  // call it without referencing the binding before it is declared.
  const flushRef = useRef<(startIdx: number) => void>(() => {});

  // RAF loop for smooth dot movement
  useEffect(() => {
    if (!isPlaying) return;
    const animate = () => {
      const now = performance.now();
      const updated = ref.current.activeDots.map((dot) => ({
        ...dot,
        progress: Math.min(1, (now - dot.startTime) / (dot.durationMs / ref.current.speed)),
      }));
      if (updated.some((d) => d.progress < 1)) {
        ref.current.activeDots = updated;
        setActiveDots([...updated]);
        rafRef.current = requestAnimationFrame(animate);
      } else {
        ref.current.activeDots = updated;
        setActiveDots([...updated]);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, activeDots.length]);

  const flush = useCallback(
    (startIdx: number) => {
      const steps: StepAction[] = definition.steps;
      let idx = startIdx;

      while (idx < steps.length && ref.current.isPlaying) {
        const step = steps[idx];

        if (step.kind === "highlight") {
          ref.current.nodeStates = { ...ref.current.nodeStates, [step.nodeId]: step.state };
          setNodeStates({ ...ref.current.nodeStates });
          idx++;
        } else if (step.kind === "unhighlight") {
          ref.current.nodeStates = { ...ref.current.nodeStates, [step.nodeId]: "idle" };
          setNodeStates({ ...ref.current.nodeStates });
          idx++;
        } else if (step.kind === "set-value") {
          const value = overridesRef.current[step.nodeId] ?? step.value;
          ref.current.nodeValues = { ...ref.current.nodeValues, [step.nodeId]: value };
          setNodeValues({ ...ref.current.nodeValues });
          idx++;
        } else if (step.kind === "reset") {
          ref.current.nodeStates = {};
          ref.current.nodeValues = {};
          ref.current.activeDots = [];
          setNodeStates({});
          setNodeValues({});
          setActiveDots([]);
          idx++;
        } else if (step.kind === "wait") {
          ref.current.stepIndex = idx;
          timerRef.current = setTimeout(
            () => { flushRef.current(idx + 1); },
            step.durationMs / ref.current.speed
          );
          return;
        } else if (step.kind === "dot") {
          const dot: ActiveDot = {
            wireId: step.wireId,
            color: step.color,
            progress: 0,
            startTime: performance.now(),
            durationMs: step.durationMs,
          };
          ref.current.activeDots = [...ref.current.activeDots, dot];
          setActiveDots([...ref.current.activeDots]);
          ref.current.stepIndex = idx;
          timerRef.current = setTimeout(
            () => {
              ref.current.activeDots = ref.current.activeDots.filter((d) => d !== dot);
              flushRef.current(idx + 1);
            },
            step.durationMs / ref.current.speed
          );
          return;
        } else {
          idx++;
        }
      }

      // Reached end
      if (idx >= steps.length) {
        ref.current.isPlaying = false;
        setIsPlaying(false);
        setIsFinished(true);
      }
    },
    [definition.steps]
  );

  useEffect(() => {
    flushRef.current = flush;
  }, [flush]);

  const play = useCallback(() => {
    if (ref.current.isPlaying) return;
    ref.current.isPlaying = true;
    setIsPlaying(true);
    setIsFinished(false);
    flush(ref.current.stepIndex);
  }, [flush]);

  const pause = useCallback(() => {
    ref.current.isPlaying = false;
    setIsPlaying(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    cancelAnimationFrame(rafRef.current);
  }, []);

  const restart = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    cancelAnimationFrame(rafRef.current);
    ref.current.stepIndex = 0;
    ref.current.nodeStates = {};
    ref.current.nodeValues = {};
    ref.current.activeDots = [];
    ref.current.isPlaying = true;
    setIsPlaying(true);
    setIsFinished(false);
    setNodeStates({});
    setNodeValues({});
    setActiveDots([]);
    setTimeout(() => flush(0), 0);
  }, [flush]);

  const setSpeed = useCallback((s: number) => {
    ref.current.speed = s;
    setSpeedState(s);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { isPlaying, isFinished, nodeStates, nodeValues, activeDots, speed, play, pause, restart, setSpeed };
}
