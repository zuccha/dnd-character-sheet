//------------------------------------------------------------------------------
// Fill or Shrink
//------------------------------------------------------------------------------

export function fillOrShrink<T>(
  items: T[],
  nextSize: number,
  fillValue: T,
): T[] {
  return items.length < nextSize ?
      [...items, ...Array(nextSize - items.length).fill(fillValue)]
    : items.slice(0, nextSize);
}

//------------------------------------------------------------------------------
// Range
//------------------------------------------------------------------------------

export function range(size: number): number[] {
  return [...Array(size).keys()];
}
