import { useCallback } from "react";
import z from "zod";
import { createLocalStore } from "~/store/local-store";
import { createMemoryStore } from "~/store/memory-store";
import {
  useActiveCharacterId,
  useSaveActiveCharacter,
} from "./active-character";
import {
  type CharacterMetadata,
  characterExists,
  characterSchema,
  clearCharacter,
  loadCharacter,
  saveCharacter,
} from "./character";

//------------------------------------------------------------------------------
// Character Ids Store
//------------------------------------------------------------------------------

const characterIdsStore = createLocalStore(
  "character.ids",
  [],
  z.array(z.uuid()).parse,
);

//------------------------------------------------------------------------------
// Character Metadata Store
//------------------------------------------------------------------------------

const characterMetadataStore = createMemoryStore<CharacterMetadata[]>(
  characterIdsStore.get().map((id) => loadCharacter(id).meta),
);

//------------------------------------------------------------------------------
// Use Characters
//------------------------------------------------------------------------------

export function useCharacters(): [
  CharacterMetadata[],
  {
    createCharacter: (displayName: string) => void;
    exportAllCharactersToJson: () => void;
    exportCharacterToJson: (id: string) => void;
    importCharacterFromJson: (json: string) => void;
    importCharactersFromJson: (json: string) => void;
    removeAllCharacters: () => void;
    removeCharacter: (id: string) => void;
    renameCharacter: (id: string, displayName: string) => void;
    saveActiveCharacter: (defaultDisplayName?: string) => void;
  },
] {
  const [metadata] = characterMetadataStore.use();
  const activeId = useActiveCharacterId();
  const save = useSaveActiveCharacter();

  const createCharacter = useCallback((displayName: string) => {
    const character = characterSchema.parse({ meta: { displayName } });
    characterIdsStore.set((prev) => [...prev, character.meta.id]);
    characterMetadataStore.set((prev) => [...prev, character.meta]);
    saveCharacter(character.meta.id, character);
    // TODO: Set as active character.
  }, []);

  const exportAllCharactersToJson = useCallback(() => {
    console.log("exportAllCharactersToJson"); // TODO
  }, []);

  const exportCharacterToJson = useCallback((id: string) => {
    console.log("exportCharacterToJson", id); // TODO
  }, []);

  const importCharacterFromJson = useCallback((json: string) => {
    console.log("importCharacterFromJson", json); // TODO
  }, []);

  const importCharactersFromJson = useCallback((json: string) => {
    console.log("importCharactersFromJson", json); // TODO
  }, []);

  const removeAllCharacters = useCallback(() => {
    characterIdsStore.get().forEach(clearCharacter);
    characterIdsStore.set([]);
    characterMetadataStore.set([]);
    // TODO: Handle empty active character.
  }, []);

  const removeCharacter = useCallback((id: string) => {
    clearCharacter(id);
    characterIdsStore.set((prev) => prev.filter((other) => other !== id));
    characterMetadataStore.set((prev) => prev.filter((meta) => meta.id !== id));
    // TODO: Change active character if the removed one was active.
  }, []);

  const renameCharacter = useCallback((id: string, displayName: string) => {
    characterMetadataStore.set((prev) =>
      prev.map((meta) => (meta.id === id ? { ...meta, displayName } : meta)),
    );
    saveCharacter(id, (prev) => ({
      ...prev,
      meta: { ...prev.meta, displayName },
    }));
  }, []);

  const saveActiveCharacter = useCallback(
    (defaultDisplayName = "") => {
      const exists = characterExists(activeId);
      let character = save();
      if (!exists) {
        const displayName = character.name.trim() || defaultDisplayName;
        character = { ...character, meta: { ...character.meta, displayName } };
        characterIdsStore.set((prev) => [...prev, character.meta.id]);
        characterMetadataStore.set((prev) => [...prev, character.meta]);
        saveCharacter(character.meta.id, character);
      }
    },
    [activeId, save],
  );

  return [
    metadata,
    {
      createCharacter,
      exportAllCharactersToJson,
      exportCharacterToJson,
      importCharacterFromJson,
      importCharactersFromJson,
      removeAllCharacters,
      removeCharacter,
      renameCharacter,
      saveActiveCharacter,
    },
  ];
}
