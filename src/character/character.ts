import z from "zod";

//------------------------------------------------------------------------------
// Character
//------------------------------------------------------------------------------

export const characterSchema = z.object({
  level: z.number().default(1),
  name: z.string().default(""),
  title: z.string().default(""),
});

export type Character = z.infer<typeof characterSchema>;

export const defaultCharacter = characterSchema.parse({});
