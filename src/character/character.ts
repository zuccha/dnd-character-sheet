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
// Character Metadata
//------------------------------------------------------------------------------

export const characterMetadataSchema = z.object({
  displayName: z.string().default(""),
  id: z.uuid().default(generateUUID),
  version: z.number().default(1),
});

export type CharacterMetadata = z.infer<typeof characterMetadataSchema>;

export const defaultCharacterMetadata = characterMetadataSchema.parse({});

//------------------------------------------------------------------------------
// Character Ability
//------------------------------------------------------------------------------

export type CharacterAbility = "cha" | "con" | "dex" | "int" | "str" | "wis";

//------------------------------------------------------------------------------
// Character
//------------------------------------------------------------------------------

export const characterSchema = z.object({
  meta: characterMetadataSchema.default(defaultCharacterMetadata),

  cha: z.number().default(10),
  chaModifier: inferableNumberSchema.default(defaultInferableNumber),
  con: z.number().default(10),
  conModifier: inferableNumberSchema.default(defaultInferableNumber),
  dex: z.number().default(10),
  dexModifier: inferableNumberSchema.default(defaultInferableNumber),
  int: z.number().default(10),
  intModifier: inferableNumberSchema.default(defaultInferableNumber),
  str: z.number().default(10),
  strModifier: inferableNumberSchema.default(defaultInferableNumber),
  wis: z.number().default(10),
  wisModifier: inferableNumberSchema.default(defaultInferableNumber),

  armorClass: z.number().default(10),
  armorClassShieldEquipped: z.boolean().default(false),
  deathSaveThrowFailures: z
    .tuple([z.boolean(), z.boolean(), z.boolean()])
    .default([false, false, false]),
  deathSaveThrowSuccesses: z
    .tuple([z.boolean(), z.boolean(), z.boolean()])
    .default([false, false, false]),
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
  hp: z.number().nullable().default(null),
  hpDice: z
    .object({
      d6: z.array(z.boolean()).default([]),
      d8: z.array(z.boolean()).default([false]),
      d10: z.array(z.boolean()).default([]),
      d12: z.array(z.boolean()).default([]),
    })
    .default({ d6: [], d8: [false], d10: [], d12: [] }),
  hpTemp: z.number().nullable().default(null),
  level: z.number().default(1),
  maxHp: z.number().default(10),
  maxHpTemp: z.number().nullable().default(null),
  name: z.string().default(""),
  proficiencyBonus: inferableNumberSchema.default(defaultInferableNumber),
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
