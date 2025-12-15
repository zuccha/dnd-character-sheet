import { useCallback, useLayoutEffect, useState } from "react";
import type { Callback1 } from "~/utils/callback";
import { createObservable } from "~/utils/observable";
import {
  type StateSetter,
  type StateUpdate,
  isStateUpdater,
} from "~/utils/state";

//------------------------------------------------------------------------------
// Store Path
//------------------------------------------------------------------------------

export type StorePath<T> =
  T extends Record<PropertyKey, unknown> ?
    { [K in keyof T]-?: [K] | [K, ...StorePath<T[K]>] }[keyof T]
  : never;

//------------------------------------------------------------------------------
// Store Path Value
//------------------------------------------------------------------------------

export type StorePathValue<T, P extends readonly unknown[]> =
  P extends readonly [infer K, ...infer R] ?
    K extends keyof T ?
      R extends readonly [] ?
        T[K]
      : StorePathValue<T[K], R>
    : never
  : T;

//------------------------------------------------------------------------------
// Store
//------------------------------------------------------------------------------

export type Store<T> = {
  get: () => T;
  set: StateSetter<T>;

  getPath: <P extends StorePath<T>>(path: P) => StorePathValue<T, P>;
  setPath: <P extends StorePath<T>>(
    path: P,
    value: StorePathValue<T, P>,
  ) => StorePathValue<T, P>;

  use: () => [T, StateSetter<T>];
  useSetValue: () => StateSetter<T>;
  useValue: () => T;

  usePath: <P extends StorePath<T>>(
    ...path: P
  ) => [StorePathValue<T, P>, StateSetter<StorePathValue<T, P>>];
  usePathSetValue: <P extends StorePath<T>>(
    ...path: P
  ) => StateSetter<StorePathValue<T, P>>;
  usePathValue: <P extends StorePath<T>>(...path: P) => StorePathValue<T, P>;

  subscribe: (callback: Callback1<T>) => void;
  unsubscribe: (callback: Callback1<T>) => void;
};

//------------------------------------------------------------------------------
// Get Object Path
//------------------------------------------------------------------------------

export function getObjectPath<T, P extends readonly PropertyKey[]>(
  obj: T,
  path: P,
): StorePathValue<T, P> {
  let current: any = obj; // eslint-disable-line @typescript-eslint/no-explicit-any
  for (const key of path) current = current[key];
  return current;
}

//------------------------------------------------------------------------------
// Set Object Path
//------------------------------------------------------------------------------

export function setObjectPath<T, P extends readonly PropertyKey[]>(
  obj: T,
  path: P,
  value: StorePathValue<T, P>,
): T {
  const [head, ...rest] = path as readonly PropertyKey[];
  if (head === undefined) return obj;

  if (rest.length === 0) {
    return { ...obj, [head]: value } as T;
  }

  const child = (obj as any)[head]; // eslint-disable-line @typescript-eslint/no-explicit-any
  const nextChild = setObjectPath(child, rest, value);
  if (child === nextChild) return obj;

  return { ...obj, [head]: nextChild } as T;
}

//------------------------------------------------------------------------------
// Create Store
//------------------------------------------------------------------------------

export function createStore<T>({
  initCache,
  onCacheUpdate,
}: {
  initCache: () => T;
  onCacheUpdate: (value: T) => void;
}): Store<T> {
  const { notify, subscribe, unsubscribe } = createObservable<T>();

  let cache = initCache();

  function get(): T {
    return cache;
  }

  function set(update: StateUpdate<T>): T {
    cache = isStateUpdater(update) ? update(cache) : update;
    onCacheUpdate(cache);
    notify(cache);
    return cache;
  }

  function getPath<P extends StorePath<T>>(path: P): StorePathValue<T, P> {
    return getObjectPath(cache, path);
  }

  function setPath<P extends StorePath<T>>(
    path: P,
    update: StateUpdate<StorePathValue<T, P>>,
  ): StorePathValue<T, P> {
    const nextPathValue = set((prevValue) => {
      const prevPathValue = getObjectPath(prevValue, path);
      const nextPathValue =
        isStateUpdater(update) ? update(prevPathValue) : update;
      if (Object.is(prevPathValue, nextPathValue)) return prevValue;
      return setObjectPath(prevValue, path, nextPathValue);
    });
    return getObjectPath(nextPathValue, path);
  }

  function useValue(): T {
    const [value, setValue] = useState(get);
    useLayoutEffect(() => subscribe(setValue), []);
    return value;
  }

  function useSetValue(): StateSetter<T> {
    return set;
  }

  function use(): [T, StateSetter<T>] {
    const value = useValue();
    const setValue = useSetValue();
    return [value, setValue];
  }

  function usePathValue<P extends StorePath<T>>(
    ...path: P
  ): StorePathValue<T, P> {
    const [pathValue, setPathValue] = useState(() => getPath(path));

    useLayoutEffect(() => {
      return subscribe((state: T) => setPathValue(getObjectPath(state, path)));
    }, [path]);

    return pathValue;
  }

  function usePathSetValue<P extends StorePath<T>>(
    ...path: P
  ): StateSetter<StorePathValue<T, P>> {
    return useCallback((update) => setPath(path, update), [path]);
  }

  function usePath<P extends StorePath<T>>(
    ...path: P
  ): [StorePathValue<T, P>, StateSetter<StorePathValue<T, P>>] {
    const pathValue = usePathValue(...path);
    const setPathValue = usePathSetValue(...path);
    return [pathValue, setPathValue];
  }

  return {
    get,
    set,

    getPath,
    setPath,

    use,
    useSetValue,
    useValue,

    usePath,
    usePathSetValue,
    usePathValue,

    subscribe,
    unsubscribe,
  };
}
