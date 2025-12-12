import { create } from "zustand";
import { type Character, defaultCharacter } from "./character";

//------------------------------------------------------------------------------
// Active Character State
//------------------------------------------------------------------------------

export type ActiveCharacterState = {
  data: Character;
  unsavedChanges: boolean;

  setters: { [K in keyof Character]: (value: Character[K]) => void };

  importCharacter: (next: Character) => void;
  exportCharacter: () => Character;
};

//------------------------------------------------------------------------------
// Use Active Character Store
//------------------------------------------------------------------------------

export const useActiveCharacterStore = create<ActiveCharacterState>(
  (set, get) => {
    const createSetter = <F extends keyof Character>(field: F) => {
      return (value: Character[F]) => {
        set((state) =>
          state.data[field] === value ?
            state
          : { data: { ...state.data, [field]: value }, unsavedChanges: true },
        );
      };
    };

    const setters = Object.fromEntries(
      Object.keys(defaultCharacter).map((key) => [
        key,
        createSetter(key as keyof Character),
      ]),
    ) as { [K in keyof Character]: (value: Character[K]) => void };

    return {
      data: defaultCharacter,
      unsavedChanges: false,

      setters,

      exportCharacter: () => get().data,
      importCharacter: (next) => set({ data: next }),
    };
  },
);

//------------------------------------------------------------------------------
// Use Active Character Has Unsaved Changes
//------------------------------------------------------------------------------

export function useActiveCharacterHasUnsavedChanges(): boolean {
  return useActiveCharacterStore((s) => s.unsavedChanges);
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
