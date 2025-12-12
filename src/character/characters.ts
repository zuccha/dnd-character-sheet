import { useCallback } from "react";
import z from "zod";
import { createLocalStore } from "~/store/local-store";
import { createMemoryStore } from "~/store/memory-store";
import {
  useActiveCharacterId,
  useClearActiveCharacter,
  useSaveActiveCharacter,
  useSwitchActiveCharacter,
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
// Use Character Metatata
//------------------------------------------------------------------------------

export function useCharacterMetadata(): CharacterMetadata[] {
  return characterMetadataStore.useValue();
}

//------------------------------------------------------------------------------
// Use Create Character
//------------------------------------------------------------------------------

export function useCreateCharacter() {
  const switchActiveCharacter = useSwitchActiveCharacter();

  return useCallback(
    (displayName: string) => {
      const character = characterSchema.parse({ meta: { displayName } });
      characterIdsStore.set((prev) => [...prev, character.meta.id]);
      characterMetadataStore.set((prev) => [...prev, character.meta]);
      saveCharacter(character.meta.id, character);
      switchActiveCharacter(character.meta.id);
    },
    [switchActiveCharacter],
  );
}

//------------------------------------------------------------------------------
// Use Export All Characters To Json
//------------------------------------------------------------------------------

export function useExportAllCharactersToJson() {
  return useCallback(() => {
    console.log("exportAllCharactersToJson"); // TODO
  }, []);
}

//------------------------------------------------------------------------------
// Use Export Character To Json
//------------------------------------------------------------------------------

export function useExportCharacterToJson() {
  return useCallback((id: string) => {
    console.log("exportCharacterToJson", id); // TODO
  }, []);
}

//------------------------------------------------------------------------------
// Use Import Character From Json
//------------------------------------------------------------------------------

export function useImportCharacterFromJson() {
  return useCallback((json: string) => {
    console.log("importCharacterFromJson", json); // TODO
  }, []);
}

//------------------------------------------------------------------------------
// Use Import Characters From Json
//------------------------------------------------------------------------------

export function useImportCharactersFromJson() {
  return useCallback((json: string) => {
    console.log("importCharactersFromJson", json); // TODO
  }, []);
}

//------------------------------------------------------------------------------
// Use Remove All Characters
//------------------------------------------------------------------------------

export function useRemoveAllCharacters() {
  const clearActiveCharacter = useClearActiveCharacter();

  return useCallback(() => {
    characterIdsStore.get().forEach(clearCharacter);
    characterIdsStore.set([]);
    characterMetadataStore.set([]);
    clearActiveCharacter();
  }, [clearActiveCharacter]);
}

//------------------------------------------------------------------------------
// Use Remove Character
//------------------------------------------------------------------------------

export function useRemoveCharacter() {
  const clearActiveCharacter = useClearActiveCharacter();

  return useCallback(
    (id: string) => {
      clearCharacter(id);
      characterIdsStore.set((ids) => ids.filter((other) => other !== id));
      characterMetadataStore.set((ids) => ids.filter((meta) => meta.id !== id));
      clearActiveCharacter();
    },
    [clearActiveCharacter],
  );
}

//------------------------------------------------------------------------------
// Use Rename Character
//------------------------------------------------------------------------------

export function useRenameCharacter() {
  return useCallback((id: string, displayName: string) => {
    characterMetadataStore.set((prev) =>
      prev.map((meta) => (meta.id === id ? { ...meta, displayName } : meta)),
    );
    saveCharacter(id, (prev) => ({
      ...prev,
      meta: { ...prev.meta, displayName },
    }));
  }, []);
}

//------------------------------------------------------------------------------
// Use Create And Save Active Character
//------------------------------------------------------------------------------

export function useCreateAndSaveActiveCharacter() {
  const activeId = useActiveCharacterId();
  const saveActiveCharacter = useSaveActiveCharacter();
  return useCallback(
    (defaultDisplayName = "") => {
      const exists = characterExists(activeId);
      let character = saveActiveCharacter();
      if (!exists) {
        const displayName = character.name.trim() || defaultDisplayName;
        character = { ...character, meta: { ...character.meta, displayName } };
        characterIdsStore.set((prev) => [...prev, character.meta.id]);
        characterMetadataStore.set((prev) => [...prev, character.meta]);
        saveCharacter(character.meta.id, character);
      }
    },
    [activeId, saveActiveCharacter],
  );
}
