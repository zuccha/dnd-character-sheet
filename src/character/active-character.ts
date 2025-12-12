import { create } from "zustand";
import { type Character, defaultCharacter, saveCharacter } from "./character";

//------------------------------------------------------------------------------
// Active Character State
//------------------------------------------------------------------------------

export type ActiveCharacterState = {
  data: Character;
  unsavedChanges: boolean;

  setters: { [K in keyof Character]: (value: Character[K]) => void };

  importCharacter: (character: Character) => void;
  exportCharacter: () => Character;

  save: () => Character;
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

      save: () => {
        const character = get().data;
        saveCharacter(character.meta.id, character);
        set((state) => ({ ...state, unsavedChanges: false }));
        return character;
      },
    };
  },
);

//------------------------------------------------------------------------------
// Use Active Character Id
//------------------------------------------------------------------------------

export function useActiveCharacterId(): string {
  return useActiveCharacterStore((s) => s.data.meta.id);
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
