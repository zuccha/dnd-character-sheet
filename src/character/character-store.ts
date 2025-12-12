import { create } from "zustand";
import { type Character, defaultCharacter } from "./character";

//------------------------------------------------------------------------------
// Character State
//------------------------------------------------------------------------------

export type CharacterState = {
  data: Character;

  setters: { [K in keyof Character]: (value: Character[K]) => void };

  importCharacter: (next: Character) => void;
  exportCharacter: () => Character;
};

//------------------------------------------------------------------------------
// Use Character Store
//------------------------------------------------------------------------------

export const useCharacterStore = create<CharacterState>((set, get) => {
  const createSetter = <F extends keyof Character>(field: F) => {
    return (value: Character[F]) =>
      set((s) =>
        s.data[field] === value ? s : { data: { ...s.data, [field]: value } },
      );
  };

  const setters = Object.fromEntries(
    Object.keys(defaultCharacter).map((key) => [
      key,
      createSetter(key as keyof Character),
    ]),
  ) as { [K in keyof Character]: (value: Character[K]) => void };

  return {
    data: defaultCharacter,

    setters,

    exportCharacter: () => get().data,
    importCharacter: (next) => set({ data: next }),
  };
});

//------------------------------------------------------------------------------
// Use Character Field
//------------------------------------------------------------------------------

export function useCharacterField<F extends keyof Character>(
  field: F,
): [Character[F], (value: Character[F]) => void] {
  const value = useCharacterStore((s) => s.data[field]);
  const setValue = useCharacterStore((s) => s.setters[field]);
  return [value, setValue];
}

//------------------------------------------------------------------------------
// Use Character <Field>
//------------------------------------------------------------------------------

export const useCharacterLevel = () => useCharacterField("level");
export const useCharacterName = () => useCharacterField("name");
export const useCharacterTitle = () => useCharacterField("title");
