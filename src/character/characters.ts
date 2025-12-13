import { useCallback } from "react";
import z from "zod";
import { createLocalStore } from "~/store/local-store";
import { createMemoryStore } from "~/store/memory-store";
import { downloadFile } from "~/utils/download";
import {
  useActiveCharacterId,
  useClearActiveCharacter,
  useSaveActiveCharacter,
  useSwitchActiveCharacter,
} from "./active-character";
import {
  type Character,
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
  return useCallback((filename: string) => {
    const characters = characterMetadataStore
      .get()
      .map(({ id }) => loadCharacter(id));
    const json = JSON.stringify(characters, null, 2);
    downloadFile(json, `${filename}.json`, "json");
  }, []);
}

//------------------------------------------------------------------------------
// Use Export Character To Json
//------------------------------------------------------------------------------

export function useExportCharacterToJson() {
  return useCallback((id: string) => {
    const character = loadCharacter(id);
    const json = JSON.stringify(character, null, 2);
    downloadFile(json, `${character.meta.displayName}.json`, "json");
  }, []);
}

//------------------------------------------------------------------------------
// Use Import Characters From Json
//------------------------------------------------------------------------------

export function useImportCharactersFromJson() {
  const switchActiveCharacter = useSwitchActiveCharacter();

  return useCallback(
    async (files: File[]): Promise<string | void> => {
      if (!files.length) return "import_characters_from_json.error.none";

      const metadata = characterMetadataStore.get();

      const characters: Character[] = [];
      const invalidDataErrors: string[] = [];
      const duplicateErrors: string[] = [];

      let firstCharacter: Character | undefined = undefined;
      const nextIds: string[] = [];
      const nextMetadata: CharacterMetadata[] = [];

      for (const file of files) {
        const text = await file.text();
        const json = JSON.parse(text);

        if (Array.isArray(json)) {
          const result = z.array(characterSchema).safeParse(json);
          if (result.success) characters.push(...result.data);
          else invalidDataErrors.push(file.name);
        } else {
          const result = characterSchema.safeParse(json);
          if (result.success) characters.push(result.data);
          else invalidDataErrors.push(file.name);
        }
      }

      for (const character of characters) {
        if (
          metadata.some(({ id }) => id === character.meta.id) ||
          nextMetadata.some(({ id }) => id === character.meta.id)
        ) {
          duplicateErrors.push(character.meta.id);
          continue;
        }

        nextIds.push(character.meta.id);
        nextMetadata.push(character.meta);
        saveCharacter(character.meta.id, character);
        if (!firstCharacter) firstCharacter = character;
      }

      characterIdsStore.set((prev) => [...prev, ...nextIds]);
      characterMetadataStore.set((prev) => [...prev, ...nextMetadata]);
      if (firstCharacter) switchActiveCharacter(firstCharacter.meta.id);

      if (invalidDataErrors.length && duplicateErrors.length)
        return characters.length > 1 ?
            "import_characters_from_json.error.multiple.invalid_and_duplicate"
          : "import_characters_from_json.error.single.invalid_and_duplicate";
      if (invalidDataErrors.length)
        return characters.length > 1 ?
            "import_characters_from_json.error.multiple.invalid"
          : "import_characters_from_json.error.single.invalid";
      if (duplicateErrors.length)
        return characters.length > 1 ?
            "import_characters_from_json.error.multiple.duplicate"
          : "import_characters_from_json.error.single.duplicate";
    },
    [switchActiveCharacter],
  );
}

//------------------------------------------------------------------------------
// Use Remove All Characters
//------------------------------------------------------------------------------

export function useReorderCharacters() {
  return useCallback(
    (idsOrUpdateIds: string[] | ((ids: string[]) => string[])) => {
      const prevMetadata = characterMetadataStore.get();
      const prevIds = characterIdsStore.get();
      const nextIds =
        typeof idsOrUpdateIds === "function" ?
          idsOrUpdateIds(prevIds)
        : idsOrUpdateIds;

      if (prevIds.length !== nextIds.length) return;
      if (prevIds.some((id) => !nextIds.includes(id))) return;

      const nextMetadata = nextIds
        .map((id) => prevMetadata.find((meta) => meta.id === id))
        .filter((meta) => meta !== undefined);

      characterMetadataStore.set(nextMetadata);
      characterIdsStore.set(nextIds);
    },
    [],
  );
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
  const switchActiveCharacter = useSwitchActiveCharacter();

  return useCallback(
    (defaultDisplayName = "") => {
      const exists = activeId && characterExists(activeId);
      let character = saveActiveCharacter();
      if (!exists) {
        const displayName = character.name.trim() || defaultDisplayName;
        character = { ...character, meta: { ...character.meta, displayName } };
        characterIdsStore.set((prev) => [...prev, character.meta.id]);
        characterMetadataStore.set((prev) => [...prev, character.meta]);
        saveCharacter(character.meta.id, character);
        switchActiveCharacter(character.meta.id);
      }
    },
    [activeId, saveActiveCharacter, switchActiveCharacter],
  );
}
