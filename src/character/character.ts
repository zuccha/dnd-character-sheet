import z from "zod";

//------------------------------------------------------------------------------
// Character
//------------------------------------------------------------------------------

export const characterSchema = z.object({
  _id: z.uuid().default(() => crypto.randomUUID()),
  _name: z.string().default(""),
  _version: z.number().default(1),

  level: z.number().default(1),
  name: z.string().default(""),
  title: z.string().default(""),
});

export type Character = z.infer<typeof characterSchema>;

export const defaultCharacter = characterSchema.parse({});
