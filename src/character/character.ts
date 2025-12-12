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

  level: z.number().default(1),
  name: z.string().default(""),
  title: z.string().default(""),
});

export type Character = z.infer<typeof characterSchema>;

export const defaultCharacter = characterSchema.parse({});
