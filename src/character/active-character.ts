import { useCallback } from "react";
import z from "zod";
import { create } from "zustand";
import { createLocalStore } from "~/store/local-store";
import {
  type Character,
  defaultCharacter,
  loadCharacter,
  saveCharacter,
} from "./character";

//------------------------------------------------------------------------------
// Active Character Id Store
//------------------------------------------------------------------------------

const activeCharacterIdStore = createLocalStore<string | undefined>(
  "character.active.id",
  undefined,
  z.uuid().parse,
);

//------------------------------------------------------------------------------
// Active Character State
//------------------------------------------------------------------------------

export type ActiveCharacterState = {
  data: Character;
  unsavedChanges: boolean;

  setters: { [K in keyof Character]: (value: Character[K]) => void };

  import: (character: Character) => void;
  export: () => Character;

  save: () => Character;
};

//------------------------------------------------------------------------------
// Use Active Character Store
//------------------------------------------------------------------------------

const useActiveCharacterStore = create<ActiveCharacterState>((set, get) => {
  const createSetter = <F extends keyof Character>(field: F) => {
    return (value: Character[F]) => {
      set((state) =>
        state.data[field] === value ?
          state
        : { data: { ...state.data, [field]: value }, unsavedChanges: true },
      );
    };
  };

  const activeCharacterId = activeCharacterIdStore.get();
  const activeCharacter =
    activeCharacterId ?
      (loadCharacter(activeCharacterId) ?? defaultCharacter)
    : defaultCharacter;

  const setters = Object.fromEntries(
    Object.keys(activeCharacter).map((key) => [
      key,
      createSetter(key as keyof Character),
    ]),
  ) as { [K in keyof Character]: (value: Character[K]) => void };

  return {
    data: activeCharacter,
    unsavedChanges: false,

    setters,

    export: () => get().data,
    import: (data) => set({ data }),

    save: () => {
      const character = get().data;
      saveCharacter(character.meta.id, character);
      set({ unsavedChanges: false });
      return character;
    },
  };
});

//------------------------------------------------------------------------------
// Use Active Character Id
//------------------------------------------------------------------------------

export function useActiveCharacterId(): string {
  return useActiveCharacterStore((s) => s.data.meta.id);
}

//------------------------------------------------------------------------------
// Use Switch Active Character
//------------------------------------------------------------------------------

export function useSwitchActiveCharacter(): (id: string) => void {
  const importData = useActiveCharacterStore((s) => s.import);

  return useCallback(
    (id: string) => {
      const character = loadCharacter(id);
      activeCharacterIdStore.set(character.meta.id);
      importData(character);
    },
    [importData],
  );
}

//------------------------------------------------------------------------------
// Use Clear Active Character
//------------------------------------------------------------------------------

export function useClearActiveCharacter(): () => void {
  const importData = useActiveCharacterStore((s) => s.import);

  return useCallback(() => {
    activeCharacterIdStore.set(undefined);
    importData(defaultCharacter);
  }, [importData]);
}

//------------------------------------------------------------------------------
// Use Active Character Has Unsaved Changes
//------------------------------------------------------------------------------

export function useActiveCharacterHasUnsavedChanges(): boolean {
  return useActiveCharacterStore((s) => s.unsavedChanges);
}

//------------------------------------------------------------------------------
// Use Save Active Character
//------------------------------------------------------------------------------

export function useSaveActiveCharacter(): () => Character {
  return useActiveCharacterStore((s) => s.save);
}

//------------------------------------------------------------------------------
// Use Active Character Field
//------------------------------------------------------------------------------

export function useActiveCharacterField<F extends keyof Character>(
  field: F,
): [Character[F], (value: Character[F]) => void] {
  const value = useActiveCharacterStore((s) => s.data[field]);
  const setValue = useActiveCharacterStore((s) => s.setters[field]);
  return [value, setValue];
}

//------------------------------------------------------------------------------
// Use Active Character <Field>
//------------------------------------------------------------------------------

export const useActiveCharacterLevel = () => useActiveCharacterField("level");
export const useActiveCharacterName = () => useActiveCharacterField("name");
export const useActiveCharacterTitle = () => useActiveCharacterField("title");
