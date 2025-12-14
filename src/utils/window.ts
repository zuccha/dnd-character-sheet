//------------------------------------------------------------------------------
// Is Touch
//------------------------------------------------------------------------------

export function isTouch(): boolean {
  return window.matchMedia("(pointer: coarse)").matches;
}
