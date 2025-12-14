//------------------------------------------------------------------------------
// Format Number
//------------------------------------------------------------------------------

export function formatNumber(n: number, alwaysShowSign = false): string {
  return alwaysShowSign && n >= 0 ? `+${n}` : `${n}`;
}
