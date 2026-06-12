/** Format a computed number for display on a diagram node.
 *  Rounds to 3 decimals, strips trailing zeros, and shows "NaN" for
 *  non-finite results (e.g. square root of a negative number). */
export function fmtNum(n: number): string {
  if (!Number.isFinite(n)) return "NaN";
  const rounded = Math.round(n * 1000) / 1000;
  return Number.isInteger(rounded) ? String(rounded) : String(parseFloat(rounded.toFixed(3)));
}
