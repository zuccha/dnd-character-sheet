import { type Store, createStore } from "./store";

//------------------------------------------------------------------------------
// Create Memory Store
//------------------------------------------------------------------------------

export function createMemoryStore<T>(defaultValue: T): Store<T> {
  return createStore({
    initCache: () => defaultValue,
    onCacheUpdate: () => {},
  });
}
