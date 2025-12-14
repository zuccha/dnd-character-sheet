import { useCallback, useLayoutEffect, useState } from "react";
import z from "zod";
import { createLocalStore } from "~/store/local-store";
import { createMemoryStore } from "~/store/memory-store";
import { createObservable } from "~/utils/observable";
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
// Load Active Character
//------------------------------------------------------------------------------

function loadActiveCharacter(): Character {
  const activeCharacterId = activeCharacterIdStore.get();
  return activeCharacterId ?
      loadCharacter(activeCharacterId)
    : defaultCharacter();
}

//------------------------------------------------------------------------------
// Active Character Store
//------------------------------------------------------------------------------

const activeCharacterStore = createMemoryStore(loadActiveCharacter());

const activeCharacterObservable = createObservable<Character>();

//------------------------------------------------------------------------------
// Active Character Unsaved Changes Store
//------------------------------------------------------------------------------

const activeCharacterUnsavedChangesStore = createMemoryStore(false);

//------------------------------------------------------------------------------
// Use Active Character Field
//------------------------------------------------------------------------------

export function useActiveCharacterField<F extends keyof Character>(
  field: F,
): [
  Character[F],
  (
    nextValueOrValueUpdater:
      | Character[F]
      | ((prevValue: Character[F]) => Character[F]),
  ) => void,
] {
  const [value, setValue] = useState(activeCharacterStore.get()[field]);

  useLayoutEffect(() => {
    const set = (character: Character) => setValue(character[field]);
    activeCharacterStore.subscribe(set);
    activeCharacterObservable.subscribe(set);
    return () => {
      activeCharacterStore.unsubscribe(set);
      activeCharacterObservable.unsubscribe(set);
    };
  }, [field]);

  return [
    value,
    useCallback(
      (
        nextValueOrValueUpdater:
          | Character[F]
          | ((prevValue: Character[F]) => Character[F]),
      ) => {
        const nextValue =
          typeof nextValueOrValueUpdater === "function" ?
            nextValueOrValueUpdater(activeCharacterStore.get()[field])
          : nextValueOrValueUpdater;
        setValue(nextValue);
        activeCharacterStore.set((prev) => {
          if (prev[field] === nextValue) return prev;
          activeCharacterUnsavedChangesStore.set(true);
          return { ...prev, [field]: nextValue };
        });
      },
      [field],
    ),
  ];
}

export const useActiveCharacterArmorClass = () =>
  useActiveCharacterField("armorClass");
export const useActiveCharacterArmorClassShieldEquipped = () =>
  useActiveCharacterField("armorClassShieldEquipped");
export const useActiveCharacterDeathSaveThrowFailures = () =>
  useActiveCharacterField("deathSaveThrowFailures");
export const useActiveCharacterDeathSaveThrowSuccesses = () =>
  useActiveCharacterField("deathSaveThrowSuccesses");
export const useActiveCharacterHpDice = () => useActiveCharacterField("hpDice");
export const useActiveCharacterMaxHp = () => useActiveCharacterField("maxHp");
export const useActiveCharacterLevel = () => useActiveCharacterField("level");
export const useActiveCharacterName = () => useActiveCharacterField("name");
export const useActiveCharacterTitle = () => useActiveCharacterField("title");

//------------------------------------------------------------------------------
// Use Active Character Has Unsaved Changes
//------------------------------------------------------------------------------

export function useActiveCharacterHasUnsavedChanges(): boolean {
  return activeCharacterUnsavedChangesStore.useValue();
}

//------------------------------------------------------------------------------
// Use Active Character Id
//------------------------------------------------------------------------------

export function useActiveCharacterId(): string | undefined {
  return activeCharacterIdStore.useValue();
}

//------------------------------------------------------------------------------
// Use Clear Active Character
//------------------------------------------------------------------------------

export function useClearActiveCharacter(): () => void {
  return useCallback(() => {
    const character = defaultCharacter();
    activeCharacterIdStore.set(undefined);
    activeCharacterStore.set(character);
    activeCharacterObservable.notify(character);
  }, []);
}

//------------------------------------------------------------------------------
// Use Save Active Character
//------------------------------------------------------------------------------

export function useSaveActiveCharacter(): () => Character {
  return useCallback(() => {
    const character = activeCharacterStore.get();
    saveCharacter(character.meta.id, character);
    activeCharacterUnsavedChangesStore.set(false);
    return character;
  }, []);
}

//------------------------------------------------------------------------------
// Use Switch Active Character
//------------------------------------------------------------------------------

export function useSwitchActiveCharacter(): (id: string) => void {
  return useCallback((id: string) => {
    const character = loadCharacter(id);
    activeCharacterIdStore.set(character.meta.id);
    activeCharacterStore.set(character);
    activeCharacterObservable.notify(character);
  }, []);
}
