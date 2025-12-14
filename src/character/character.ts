import z from "zod";

//------------------------------------------------------------------------------
// Character Metadata
//------------------------------------------------------------------------------

export const characterMetadataSchema = z.object({
  displayName: z.string().default(""),
  id: z.uuid().default(() => crypto.randomUUID()),
  version: z.number().default(1),
});

export type CharacterMetadata = z.infer<typeof characterMetadataSchema>;

export const defaultCharacterMetadata = characterMetadataSchema.parse({});

//------------------------------------------------------------------------------
// Character
//------------------------------------------------------------------------------

export const characterSchema = z.object({
  meta: characterMetadataSchema.default(defaultCharacterMetadata),

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
  hpDice: z
    .object({
      d6: z.number().default(0),
      d8: z.number().default(1),
      d10: z.number().default(0),
      d12: z.number().default(0),
    })
    .default({ d6: 0, d8: 1, d10: 0, d12: 0 }),
  level: z.number().default(1),
  maxHp: z.number().default(10),
  name: z.string().default(""),
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
