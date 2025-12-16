import { useCallback } from "react";
import z from "zod";
import { createLocalStore } from "~/store/local-store";
import { createMemoryStore } from "~/store/memory-store";
import type { StorePath, StorePathValue } from "~/store/store";
import { type StateUpdate } from "~/utils/state";
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
// Use Active Character Ability Modifier
//------------------------------------------------------------------------------

export function useActiveCharacterAbilityModifier(
  abilityKey: keyof Character["abilities"],
) {
  const [score] = useActiveCharacterAbilityScore(abilityKey);
  const [modifier, setModifier] = useActiveCharacterField(
    "abilities",
    abilityKey,
    "modifier",
  );

  const value =
    modifier.inferred ? Math.floor((score - 10) / 2) : modifier.customValue;

  return [{ ...modifier, value }, setModifier] as const;
}

//------------------------------------------------------------------------------
// Use Active Character Ability Saving Throw
//------------------------------------------------------------------------------

export function useActiveCharacterAbilitySavingThrow(
  abilityKey: keyof Character["abilities"],
) {
  const [proficiencyBonus] = useActiveCharacterProficiencyBonus();
  const [modifier] = useActiveCharacterAbilityModifier(abilityKey);
  const [savingThrow, setSavingThrow] = useActiveCharacterField(
    "abilities",
    abilityKey,
    "saving_throw",
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
// Use Active Character Ability Score
//------------------------------------------------------------------------------

export function useActiveCharacterAbilityScore(
  abilityKey: keyof Character["abilities"],
) {
  return useActiveCharacterField("abilities", abilityKey, "score");
}

//------------------------------------------------------------------------------
// Use Active Character Ability Skill
//------------------------------------------------------------------------------

export function useActiveCharacterAbilitySkill(
  abilityKey: keyof Character["abilities"],
  skillKey: string,
) {
  const [proficiencyBonus] = useActiveCharacterProficiencyBonus();
  const [modifier] = useActiveCharacterAbilityModifier(abilityKey);
  const [skill, setSkill] = useActiveCharacterField(
    "abilities",
    abilityKey,
    "skills",
    skillKey,
  );

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
// Use Active Character Ability Skill Keys
//------------------------------------------------------------------------------

export function useActiveCharacterAbilitySkillKeys(
  abilityKey: keyof Character["abilities"],
) {
  return Object.keys(
    activeCharacterStore.getPath(["abilities", abilityKey, "skills"]),
  );
}

//------------------------------------------------------------------------------
// Use Active Character Armor Class
//------------------------------------------------------------------------------

export const useActiveCharacterArmorClass = () =>
  useActiveCharacterField("armor_class");

//------------------------------------------------------------------------------
// Use Active Character Armor Class Shield Equipped
//------------------------------------------------------------------------------

export const useActiveCharacterArmorClassShieldEquipped = () =>
  useActiveCharacterField("armor_class_shield_equipped");

//------------------------------------------------------------------------------
// Use Active Character Armor Proficiency
//------------------------------------------------------------------------------

export const useActiveCharacterArmorProficiency = (
  type: keyof Character["armor_proficiencies"],
) => useActiveCharacterField("armor_proficiencies", type);

//------------------------------------------------------------------------------
// Use Active Character Death Saves
//------------------------------------------------------------------------------

export const useActiveCharacterDeathSavingThrowsFailures = () =>
  useActiveCharacterField("death_saving_throws", "failures");

export const useActiveCharacterDeathSavingThrowsSuccesses = () =>
  useActiveCharacterField("death_saving_throws", "successes");

//------------------------------------------------------------------------------
// Use Active Character Exhaustion
//------------------------------------------------------------------------------

export const useActiveCharacterExhaustion = () =>
  useActiveCharacterField("exhaustion");

//------------------------------------------------------------------------------
// Use Active Character Has Unsaved Changes
//------------------------------------------------------------------------------

export function useActiveCharacterHasUnsavedChanges(): boolean {
  return activeCharacterUnsavedChangesStore.useValue();
}

//------------------------------------------------------------------------------
// Use Active Character HP
//------------------------------------------------------------------------------

export const useActiveCharacterCurrentHp = () =>
  useActiveCharacterField("hp", "current");

export const useActiveCharacterCurrentHpTemp = () =>
  useActiveCharacterField("hp", "current_temp");

export const useActiveCharacterMaxHp = () =>
  useActiveCharacterField("hp", "max");

export const useActiveCharacterMaxHpTemp = () =>
  useActiveCharacterField("hp", "max_temp");

//------------------------------------------------------------------------------
// Use Active Character HP Dice
//------------------------------------------------------------------------------

export const useActiveCharacterHpDice = () =>
  useActiveCharacterField("hp_dice");

//------------------------------------------------------------------------------
// Use Active Character Id
//------------------------------------------------------------------------------

export function useActiveCharacterId(): string | undefined {
  return activeCharacterIdStore.useValue();
}

//------------------------------------------------------------------------------
// Use Active Character Initiative
//------------------------------------------------------------------------------

export const useActiveCharacterInitiative = () => {
  const [dexterityModifier] = useActiveCharacterAbilityModifier("dexterity");
  const [initiative, setInitiative] = useActiveCharacterField("initiative");

  const value =
    initiative.inferred ? dexterityModifier.value : initiative.customValue;

  return [{ ...initiative, value }, setInitiative] as const;
};

//------------------------------------------------------------------------------
// Use Active Character Level
//------------------------------------------------------------------------------

export const useActiveCharacterLevel = () => useActiveCharacterField("level");

//------------------------------------------------------------------------------
// Use Active Character Name
//------------------------------------------------------------------------------

export const useActiveCharacterName = () => useActiveCharacterField("name");

//------------------------------------------------------------------------------
// Use Active Character Passive Perception
//------------------------------------------------------------------------------

export const useActiveCharacterPassivePerception = () => {
  const [perceptionModifier] = useActiveCharacterAbilitySkill(
    "wisdom",
    "perception",
  );
  const [passivePerception, setPassivePerception] =
    useActiveCharacterField("passive_perception");

  const value =
    passivePerception.inferred ?
      10 + perceptionModifier.value
    : passivePerception.customValue;

  return [{ ...passivePerception, value }, setPassivePerception] as const;
};

//------------------------------------------------------------------------------
// Use Active Character Proficiency Bonus
//------------------------------------------------------------------------------

export const useActiveCharacterProficiencyBonus = () => {
  const [level] = useActiveCharacterLevel();
  const [proficiencyBonus, setProficiencyBonus] =
    useActiveCharacterField("proficiency_bonus");

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

//------------------------------------------------------------------------------
// Use Active Character Speed
//------------------------------------------------------------------------------

export const useActiveCharacterSpeed = (type: keyof Character["speeds"]) =>
  useActiveCharacterField("speeds", type);

//------------------------------------------------------------------------------
// Use Active Character Title
//------------------------------------------------------------------------------

export const useActiveCharacterTitle = () => useActiveCharacterField("title");

//------------------------------------------------------------------------------
// Use Active Character Tool Proficiencies Extra
//------------------------------------------------------------------------------

export const useActiveCharacterToolProficienciesExtra = () =>
  useActiveCharacterField("tool_proficiencies_extra");

//------------------------------------------------------------------------------
// Use Active Character Weapon Proficiencies Extra
//------------------------------------------------------------------------------

export const useActiveCharacterWeaponProficienciesExtra = () =>
  useActiveCharacterField("weapon_proficiencies_extra");

//------------------------------------------------------------------------------
// Use Active Character Weapon Proficiency
//------------------------------------------------------------------------------

export const useActiveCharacterWeaponProficiency = (
  type: keyof Character["weapon_proficiencies"],
) => useActiveCharacterField("weapon_proficiencies", type);

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
