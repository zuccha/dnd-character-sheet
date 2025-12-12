import { useCallback } from "react";
import { createMemoryStore } from "~/store/memory-store";
import type { CharacterMetadata } from "./character";

//------------------------------------------------------------------------------
// Character Metadata Store
//------------------------------------------------------------------------------

// TODO: Load from local storage.
const characterMetadataStore = createMemoryStore<CharacterMetadata[]>([
  { displayName: "Doranakan", id: crypto.randomUUID(), version: 1 },
  { displayName: "Faith", id: crypto.randomUUID(), version: 1 },
  { displayName: "Jorvahn", id: crypto.randomUUID(), version: 1 },
  { displayName: "Lyrha", id: crypto.randomUUID(), version: 1 },
  { displayName: "Taren", id: crypto.randomUUID(), version: 1 },
]);

//------------------------------------------------------------------------------
// Use Character Metadata
//------------------------------------------------------------------------------

export function useCharacterMetadata(): [
  CharacterMetadata[],
  {
    createCharacter: (displayName: string) => void;
    exportAllCharactersToJson: () => void;
    exportCharacterToJson: (id: string) => void;
    importCharacterFromJson: (json: string) => void;
    importCharactersFromJson: (json: string) => void;
    removeAllCharacters: () => void;
    removeCharacter: (id: string) => void;
  },
] {
  const [metadata] = characterMetadataStore.use();

  const createCharacter = useCallback((displayName: string) => {
    console.log("createCharacter", displayName); // TODO
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
    console.log("removeAllCharacters"); // TODO
  }, []);

  const removeCharacter = useCallback((id: string) => {
    console.log("removeCharacter", id); // TODO
  }, []);

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
    },
  ];
}
