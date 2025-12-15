import z from "zod";
import { generateUUID } from "~/utils/uuid";

//------------------------------------------------------------------------------
// Inferable Number
//------------------------------------------------------------------------------

export const inferableNumberSchema = z.object({
  customValue: z.number().default(0),
  inferred: z.boolean().default(true),
});

export type InferableNumber = z.infer<typeof inferableNumberSchema>;

const defaultInferableNumber = inferableNumberSchema.parse({});

//------------------------------------------------------------------------------
// Proficiency
//------------------------------------------------------------------------------

export const proficiencySchema = z.enum(["none", "proficient", "expert"]);

export type Proficiency = z.infer<typeof proficiencySchema>;

//------------------------------------------------------------------------------
// Character Metadata
//------------------------------------------------------------------------------

export const characterMetadataSchema = z.object({
  display_name: z.string().default(""),
  id: z.uuid().default(generateUUID),
  version: z.number().default(1),
});

export type CharacterMetadata = z.infer<typeof characterMetadataSchema>;

export const defaultCharacterMetadata = characterMetadataSchema.parse({});

//------------------------------------------------------------------------------
// Character Ability Check
//------------------------------------------------------------------------------

export const characterAbilityCheckSchema = inferableNumberSchema.extend({
  proficiency: proficiencySchema.default("none"),
});

export type CharacterAbilityCheck = z.infer<typeof characterAbilityCheckSchema>;

export const defaultCharacterAbilityCheck = characterAbilityCheckSchema.parse(
  {},
);

//------------------------------------------------------------------------------
// Character Ability
//------------------------------------------------------------------------------

export const characterAbilitySchema = z.object({
  modifier: inferableNumberSchema.default(defaultInferableNumber),
  saving_throw: characterAbilityCheckSchema.default(
    defaultCharacterAbilityCheck,
  ),
  score: z.number().default(10),
  skills: z.record(z.string(), characterAbilityCheckSchema),
});

export type CharacterAbility = z.infer<typeof characterAbilitySchema>;

export const createCharacterAbility = (
  skills: Record<string, CharacterAbilityCheck>,
) => characterAbilitySchema.parse({ skills });

//------------------------------------------------------------------------------
// Character Abilities
//------------------------------------------------------------------------------

const charisma = createCharacterAbility({
  deception: defaultCharacterAbilityCheck,
  intimidation: defaultCharacterAbilityCheck,
  performance: defaultCharacterAbilityCheck,
  persuasion: defaultCharacterAbilityCheck,
});

const constitution = createCharacterAbility({});

const dexterity = createCharacterAbility({
  acrobatics: defaultCharacterAbilityCheck,
  sleight_of_hand: defaultCharacterAbilityCheck,
  stealth: defaultCharacterAbilityCheck,
});

const intelligence = createCharacterAbility({
  arcana: defaultCharacterAbilityCheck,
  history: defaultCharacterAbilityCheck,
  investigation: defaultCharacterAbilityCheck,
  nature: defaultCharacterAbilityCheck,
  religion: defaultCharacterAbilityCheck,
});

const strength = createCharacterAbility({
  athletics: defaultCharacterAbilityCheck,
});

const wisdom = createCharacterAbility({
  animal_handling: defaultCharacterAbilityCheck,
  insight: defaultCharacterAbilityCheck,
  medicine: defaultCharacterAbilityCheck,
  perception: defaultCharacterAbilityCheck,
  survival: defaultCharacterAbilityCheck,
});

//------------------------------------------------------------------------------
// Character Death Saving Throws Trio
//------------------------------------------------------------------------------

export const deathSavingThrowsTrioSchema = z.tuple([
  z.boolean(),
  z.boolean(),
  z.boolean(),
]);

export type DeathSavingThrowsTrio = z.infer<typeof deathSavingThrowsTrioSchema>;

export const defaultDeathSavingThrowsTrio: DeathSavingThrowsTrio = [
  false,
  false,
  false,
];

//------------------------------------------------------------------------------
// Character Death Saving Throws
//------------------------------------------------------------------------------

export const deathSavingThrowsSchema = z.object({
  failures: deathSavingThrowsTrioSchema,
  successes: deathSavingThrowsTrioSchema,
});

export type DeathSavingThrows = z.infer<typeof deathSavingThrowsSchema>;

export const defaultDeathSavingThrows = {
  failures: defaultDeathSavingThrowsTrio,
  successes: defaultDeathSavingThrowsTrio,
};

//------------------------------------------------------------------------------
// Character
//------------------------------------------------------------------------------

export const characterSchema = z.object({
  meta: characterMetadataSchema.default(defaultCharacterMetadata),

  abilities: z
    .object({
      charisma: characterAbilitySchema.default(charisma),
      constitution: characterAbilitySchema.default(constitution),
      dexterity: characterAbilitySchema.default(dexterity),
      intelligence: characterAbilitySchema.default(intelligence),
      strength: characterAbilitySchema.default(strength),
      wisdom: characterAbilitySchema.default(wisdom),
    })
    .default({
      charisma,
      constitution,
      dexterity,
      intelligence,
      strength,
      wisdom,
    }),

  armor_class: z.number().default(10),
  armor_class_shield_equipped: z.boolean().default(false),

  armor_proficiencies: z
    .object({
      heavy: proficiencySchema.default("none"),
      light: proficiencySchema.default("none"),
      medium: proficiencySchema.default("none"),
      shields: proficiencySchema.default("none"),
    })
    .default({ heavy: "none", light: "none", medium: "none", shields: "none" }),

  death_saving_throws: deathSavingThrowsSchema.default(
    defaultDeathSavingThrows,
  ),

  exhaustion: z
    .tuple([
      z.boolean(),
      z.boolean(),
      z.boolean(),
      z.boolean(),
      z.boolean(),
      z.boolean(),
    ])
    .default([false, false, false, false, false, false]),

  hp: z
    .object({
      current: z.number().nullable().default(null),
      current_temp: z.number().nullable().default(null),
      max: z.number().default(10),
      max_temp: z.number().nullable().default(null),
    })
    .default({
      current: null,
      current_temp: null,
      max: 10,
      max_temp: null,
    }),

  hp_dice: z
    .object({
      d6: z.array(z.boolean()).default([]),
      d8: z.array(z.boolean()).default([false]),
      d10: z.array(z.boolean()).default([]),
      d12: z.array(z.boolean()).default([]),
    })
    .default({ d6: [], d8: [false], d10: [], d12: [] }),

  initiative: inferableNumberSchema.default(defaultInferableNumber),

  level: z.number().default(1),

  name: z.string().default(""),

  passive_perception: inferableNumberSchema.default(defaultInferableNumber),

  proficiency_bonus: inferableNumberSchema.default(defaultInferableNumber),

  title: z.string().default(""),
});

export type Character = z.infer<typeof characterSchema>;

export const defaultCharacter = () => characterSchema.parse({});

//------------------------------------------------------------------------------
// Character Storage Id
//------------------------------------------------------------------------------

const storageId = (id: string) => `character[${id}]`;

//------------------------------------------------------------------------------
// Character Exists
//------------------------------------------------------------------------------

export function characterExists(id: string): boolean {
  return !!localStorage.getItem(storageId(id));
}

//------------------------------------------------------------------------------
// Load Character
//------------------------------------------------------------------------------

export function loadCharacter(id: string): Character {
  try {
    const value = localStorage.getItem(storageId(id));
    if (value === null) return defaultCharacter();
    return characterSchema.parse(JSON.parse(value));
  } catch {
    localStorage.removeItem(id);
    return defaultCharacter();
  }
}

//------------------------------------------------------------------------------
// Save Character
//------------------------------------------------------------------------------

export function saveCharacter(
  id: string,
  valueOrAction: Character | ((value: Character) => void),
): void {
  const value =
    typeof valueOrAction === "function" ?
      valueOrAction(loadCharacter(id))
    : valueOrAction;
  localStorage.setItem(storageId(id), JSON.stringify(value));
}

//------------------------------------------------------------------------------
// Clear Character
//------------------------------------------------------------------------------

export function clearCharacter(id: string): void {
  localStorage.removeItem(storageId(id));
}
