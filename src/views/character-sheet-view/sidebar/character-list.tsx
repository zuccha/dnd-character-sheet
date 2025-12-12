import { HStack, Heading, VStack } from "@chakra-ui/react";
import { EllipsisVerticalIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useActiveCharacterHasUnsavedChanges } from "~/character/active-character";
import {
  useCharacterMetadata,
  useCreateCharacter,
  useExportAllCharactersToJson,
  useImportCharacterFromJson,
  useImportCharactersFromJson,
  useRemoveAllCharacters,
} from "~/character/characters";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import Dialog from "~/ui/dialog";
import IconButton from "~/ui/icon-button";
import Menu from "~/ui/menu";
import CharacterListItem from "./character-list-item";

//------------------------------------------------------------------------------
// Character List
//------------------------------------------------------------------------------

export default function CharacterList() {
  const { t } = useI18nLangContext(i18nContext);

  const metadata = useCharacterMetadata();
  const createCharacter = useCreateCharacter();
  const exportAllCharactersToJson = useExportAllCharactersToJson();
  const importCharacterFromJson = useImportCharacterFromJson();
  const importCharactersFromJson = useImportCharactersFromJson();
  const removeAllCharacters = useRemoveAllCharacters();

  const unsavedChanges = useActiveCharacterHasUnsavedChanges();

  const [removeAllCharactersDialogOpen, setRemoveAllCharactersDialogOpen] =
    useState(false);

  const confirmRemoveAllCharacters = useCallback(() => {
    removeAllCharacters();
    setRemoveAllCharactersDialogOpen(false);
  }, [removeAllCharacters]);

  const actions = useMemo(
    () => [
      {
        label: t("actions.create_character"),
        onClick: () => {
          if (!unsavedChanges || confirm(t("actions.create_character.warning")))
            createCharacter(t("character.display_name.default"));
        },
        value: "create_character",
      },
      {
        label: t("actions.export_all_characters_to_json"),
        // TODO: Download file.
        onClick: exportAllCharactersToJson,
        value: "export_all_characters_to_json",
      },
      {
        label: t("actions.import_character_from_json"),
        // TODO: Open file browser.
        onClick: () => importCharacterFromJson("TODO"),
        value: "import_character_from_json",
      },
      {
        label: t("actions.import_characters_from_json"),
        // TODO: Open file browser.
        onClick: () => importCharactersFromJson("TODO"),
        value: "import_characters_from_json",
      },
      {
        destructive: true,
        label: t("actions.remove_all_characters"),
        onClick: () => setRemoveAllCharactersDialogOpen(true),
        value: "remove_all_characters",
      },
    ],
    [
      createCharacter,
      exportAllCharactersToJson,
      importCharacterFromJson,
      importCharactersFromJson,
      t,
      unsavedChanges,
    ],
  );

  return (
    <VStack align="flex-start" gap={1} mt={2} w="full">
      <HStack justify="space-between" w="full">
        <Heading size="md">{t("title")}</Heading>

        <Menu items={actions}>
          <IconButton Icon={EllipsisVerticalIcon} size="xs" variant="ghost" />
        </Menu>
      </HStack>

      <VStack gap={0} w="full">
        {metadata.map((meta) => (
          <CharacterListItem key={meta.id} {...meta} />
        ))}
      </VStack>

      <Dialog
        cancelText={t("dialog.remove_all_characters.cancel_text")}
        confirmText={t("dialog.remove_all_characters.confirm_text")}
        destructive
        onConfirm={confirmRemoveAllCharacters}
        onOpenChange={setRemoveAllCharactersDialogOpen}
        open={removeAllCharactersDialogOpen}
        title={t("dialog.remove_all_characters.title")}
      >
        {t("dialog.remove_all_characters.description")}
      </Dialog>
    </VStack>
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "actions.create_character": {
    en: "Create character",
    it: "Crea personaggio",
  },

  "actions.create_character.warning": {
    en: "You have unsaved changes to this character. If you continue, those changes will be lost.",
    it: "Ci sono modifiche non salvate a questo personaggio. Se continui, le modifiche andranno perse.",
  },

  "actions.export_all_characters_to_json": {
    en: "Export all characters as JSON",
    it: "Esporta tutti i personaggi come JSON",
  },

  "actions.import_character_from_json": {
    en: "Import character from JSON",
    it: "Importa personaggio da JSON",
  },

  "actions.import_characters_from_json": {
    en: "Import characters from JSON",
    it: "Importa personaggi da JSON",
  },

  "actions.remove_all_characters": {
    en: "Remove all characters",
    it: "Rimuovi tutti i personaggi",
  },

  "character.display_name.default": {
    en: "New character",
    it: "Nuovo personaggio",
  },

  "dialog.remove_all_characters.cancel_text": {
    en: "Cancel",
    it: "Cancella",
  },

  "dialog.remove_all_characters.confirm_text": {
    en: "Remove",
    it: "Rimuovi",
  },

  "dialog.remove_all_characters.description": {
    en: "The operation cannot be undone.",
    it: "L'operazione non può essere annullata.",
  },

  "dialog.remove_all_characters.title": {
    en: "Remove all characters?",
    it: "Rimuovi tutti i personaggi?",
  },

  "title": {
    en: "Characters",
    it: "Personaggi",
  },
};
