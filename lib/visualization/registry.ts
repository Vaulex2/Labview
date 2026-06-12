import type { DiagramDefinition } from "@/lib/types";
import { forLoopSumDiagram } from "./examples/forLoopSum";
import { viAnatomyDiagram } from "./examples/viAnatomy";
import { dataflowChainDiagram } from "./examples/dataflowChain";
import { subviCallDiagram } from "./examples/subviCall";
import { highlightExecDiagram } from "./examples/highlightExec";
import { forLoopCountDiagram } from "./examples/forLoopCount";
import { indexArrayDiagram } from "./examples/indexArray";
import { caseDecisionDiagram } from "./examples/caseDecision";
import { errorClusterDiagram } from "./examples/errorCluster";
import { breakpointStepDiagram } from "./examples/breakpointStep";
import { whileLoopDiagram } from "./examples/whileLoop";
import { arrayAutoIndexDiagram } from "./examples/arrayAutoIndex";
import { buildArrayDiagram } from "./examples/buildArray";
import { loopCaseDiagram } from "./examples/loopCase";
import { shiftRegisterCompareDiagram } from "./examples/shiftRegisterCompare";

const registry: Record<string, DiagramDefinition> = {
  viz_for_loop_sum: forLoopSumDiagram,
  viz_vi_anatomy: viAnatomyDiagram,
  viz_dataflow_chain: dataflowChainDiagram,
  viz_subvi_call: subviCallDiagram,
  viz_highlight_exec: highlightExecDiagram,
  viz_for_loop_count: forLoopCountDiagram,
  viz_index_array: indexArrayDiagram,
  viz_case_decision: caseDecisionDiagram,
  viz_error_cluster: errorClusterDiagram,
  viz_breakpoint_step: breakpointStepDiagram,
  viz_while_loop: whileLoopDiagram,
  viz_array_autoindex: arrayAutoIndexDiagram,
  viz_build_array: buildArrayDiagram,
  viz_loop_case: loopCaseDiagram,
  viz_sr_compare: shiftRegisterCompareDiagram,
};

export function getDiagram(id: string): DiagramDefinition | undefined {
  return registry[id];
}

export function listDiagramIds(): string[] {
  return Object.keys(registry);
}
