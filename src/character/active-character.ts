import { useCallback, useLayoutEffect, useState } from "react";
import z from "zod";
import { createLocalStore } from "~/store/local-store";
import { createMemoryStore } from "~/store/memory-store";
import { createObservable } from "~/utils/observable";
import { type StateUpdate, isStateUpdater } from "~/utils/state";
import type { KeysOfType } from "~/utils/types";
import {
  type Character,
  type CharacterAbility,
  type CharacterSkill,
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
// Use Active Character Ability Modifier
//------------------------------------------------------------------------------

export function useActiveCharacterAbilityModifier(ability: CharacterAbility) {
  const [score] = useActiveCharacterField(ability);
  const [modifier, setModifier] = useActiveCharacterField(`${ability}Modifier`);

  const value =
    modifier.inferred ? Math.floor((score - 10) / 2) : modifier.customValue;

  return [{ ...modifier, value }, setModifier] as const;
}

//------------------------------------------------------------------------------
// Use Active Character Ability Saving Throw
//------------------------------------------------------------------------------

export function useActiveCharacterAbilitySavingThrow(
  ability: CharacterAbility,
) {
  const [proficiencyBonus] = useActiveCharacterProficiencyBonus();
  const [modifier] = useActiveCharacterAbilityModifier(ability);
  const [savingThrow, setSavingThrow] = useActiveCharacterField(
    `${ability}SavingThrow`,
  );

  const value =
    savingThrow.inferred ?
      {
        expert: modifier.value + 2 * proficiencyBonus.value,
        none: modifier.value,
        proficient: modifier.value + proficiencyBonus.value,
      }[savingThrow.proficiency]
    : savingThrow.customValue;

  return [{ ...savingThrow, value }, setSavingThrow] as const;
}

//------------------------------------------------------------------------------
// Use Active Character Field
//------------------------------------------------------------------------------

export function useActiveCharacterField<F extends keyof Character>(
  field: F,
): [
  Character[F],
  (nextValueOrValueUpdater: StateUpdate<Character[F]>) => void,
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
      (nextValueOrValueUpdater: StateUpdate<Character[F]>) => {
        const nextValue =
          isStateUpdater(nextValueOrValueUpdater) ?
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

//------------------------------------------------------------------------------
// Use Active Character <Field>
//------------------------------------------------------------------------------

export const useActiveCharacterArmorClass = () =>
  useActiveCharacterField("armorClass");

export const useActiveCharacterArmorClassShieldEquipped = () =>
  useActiveCharacterField("armorClassShieldEquipped");

export const useActiveCharacterDeathSaveThrowFailures = () =>
  useActiveCharacterField("deathSaveThrowFailures");

export const useActiveCharacterDeathSaveThrowSuccesses = () =>
  useActiveCharacterField("deathSaveThrowSuccesses");

export const useActiveCharacterExhaustion = () =>
  useActiveCharacterField("exhaustion");

export const useActiveCharacterHp = () => useActiveCharacterField("hp");

export const useActiveCharacterHpTemp = () => useActiveCharacterField("hpTemp");

export const useActiveCharacterHpDice = () => useActiveCharacterField("hpDice");

export const useActiveCharacterMaxHp = () => useActiveCharacterField("maxHp");

export const useActiveCharacterMaxHpTemp = () =>
  useActiveCharacterField("maxHpTemp");

export const useActiveCharacterLevel = () => useActiveCharacterField("level");

export const useActiveCharacterName = () => useActiveCharacterField("name");

export const useActiveCharacterProficiencyBonus = () => {
  const [level] = useActiveCharacterLevel();
  const [proficiencyBonus, setProficiencyBonus] =
    useActiveCharacterField("proficiencyBonus");

  const value =
    proficiencyBonus.inferred ?
      level < 1 ? 0
      : level < 5 ? 2
      : level < 9 ? 3
      : level < 13 ? 4
      : level < 17 ? 5
      : 6
    : proficiencyBonus.customValue;

  return [{ ...proficiencyBonus, value }, setProficiencyBonus] as const;
};

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
// Use Active Character Skill
//------------------------------------------------------------------------------

export function useActiveCharacterSkill(
  ability: CharacterAbility,
  skillKey: KeysOfType<Character, CharacterSkill>,
) {
  const [proficiencyBonus] = useActiveCharacterProficiencyBonus();
  const [modifier] = useActiveCharacterAbilityModifier(ability);
  const [skill, setSkill] = useActiveCharacterField(skillKey);

  const value =
    skill.inferred ?
      {
        expert: modifier.value + 2 * proficiencyBonus.value,
        none: modifier.value,
        proficient: modifier.value + proficiencyBonus.value,
      }[skill.proficiency]
    : skill.customValue;

  return [{ ...skill, value }, setSkill] as const;
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
