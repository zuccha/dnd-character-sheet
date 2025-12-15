import { useCallback } from "react";
import z from "zod";
import { createLocalStore } from "~/store/local-store";
import { createMemoryStore } from "~/store/memory-store";
import type { StorePath, StorePathValue } from "~/store/store";
import { type StateUpdate } from "~/utils/state";
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
  "active_character.id",
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

const activeCharacterStore = createMemoryStore(
  "active_character.data",
  loadActiveCharacter(),
);

//------------------------------------------------------------------------------
// Active Character Unsaved Changes Store
//------------------------------------------------------------------------------

const activeCharacterUnsavedChangesStore = createMemoryStore(
  "active_character.unsaved_changes",
  false,
);

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

export function useActiveCharacterField<P extends StorePath<Character>>(
  ...path: P
): [
  StorePathValue<Character, P>,
  (update: StateUpdate<StorePathValue<Character, P>>) => void,
] {
  const [value, setValue] = activeCharacterStore.usePath(...path);

  return [
    value,
    useCallback(
      (update: StateUpdate<StorePathValue<Character, P>>) => {
        const nextValue = setValue(update);
        if (value !== nextValue) activeCharacterUnsavedChangesStore.set(true);
      },
      [setValue, value],
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
  }, []);
}
