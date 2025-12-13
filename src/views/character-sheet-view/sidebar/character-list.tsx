import { Em, HStack, Heading, VStack, useFileUpload } from "@chakra-ui/react";
import { EllipsisVerticalIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useActiveCharacterHasUnsavedChanges } from "~/character/active-character";
import {
  useCharacterMetadata,
  useCreateCharacter,
  useExportAllCharactersToJson,
  useImportCharactersFromJson,
  useRemoveAllCharacters,
} from "~/character/characters";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import Dialog from "~/ui/dialog";
import Dropzone from "~/ui/dropzone";
import IconButton from "~/ui/icon-button";
import Menu from "~/ui/menu";
import { toaster } from "~/ui/toaster";
import CharacterListItem from "./character-list-item";

//------------------------------------------------------------------------------
// Character List
//------------------------------------------------------------------------------

export default function CharacterList() {
  const { t } = useI18nLangContext(i18nContext);

  const metadata = useCharacterMetadata();
  const createCharacter = useCreateCharacter();
  const exportAllCharactersToJson = useExportAllCharactersToJson();
  const importCharactersFromJson = useImportCharactersFromJson();
  const removeAllCharacters = useRemoveAllCharacters();

  const unsavedChanges = useActiveCharacterHasUnsavedChanges();

  const importCharactersFileUpload = useFileUpload({
    accept: ".json",
    maxFiles: 10,
  });

  const [
    importCharactersFromJsonDialogOpen,
    setImportCharactersFromJsonDialogOpen,
  ] = useState(false);

  const confirmImportCharactersFromJson = useCallback(async () => {
    const files = importCharactersFileUpload.acceptedFiles;
    const error = await importCharactersFromJson(files);
    if (error) toaster.error({ title: t(`actions.${error}`) });
    setImportCharactersFromJsonDialogOpen(false);
  }, [importCharactersFileUpload.acceptedFiles, importCharactersFromJson, t]);

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
        onClick: () =>
          exportAllCharactersToJson(
            t("actions.export_all_characters_to_json.filename"),
          ),
        value: "export_all_characters_to_json",
      },
      {
        label: t("actions.import_characters_from_json"),
        onClick: () => {
          importCharactersFileUpload.clearFiles();
          setImportCharactersFromJsonDialogOpen(true);
        },
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
      importCharactersFileUpload,
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

      <VStack align="flex-start" gap={0} w="full">
        {metadata.length ?
          metadata.map((meta) => <CharacterListItem key={meta.id} {...meta} />)
        : <Em fontSize="sm">{t("characters.empty")}</Em>}
      </VStack>

      <Dialog
        cancelText={t("dialog.import_characters_from_json.cancel_text")}
        confirmText={t("dialog.import_characters_from_json.confirm_text")}
        onConfirm={confirmImportCharactersFromJson}
        onOpenChange={setImportCharactersFromJsonDialogOpen}
        open={importCharactersFromJsonDialogOpen}
        title={t("dialog.import_characters_from_json.title")}
      >
        <Dropzone
          description={t(
            "dialog.import_characters_from_json.dropzone.description",
          )}
          limits={t("dialog.import_characters_from_json.dropzone.limits")}
          value={importCharactersFileUpload}
        />
      </Dialog>

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

  "actions.export_all_characters_to_json.filename": {
    en: "Characters",
    it: "Personaggi",
  },

  "actions.import_characters_from_json": {
    en: "Import characters from JSON",
    it: "Importa personaggi da JSON",
  },

  "actions.import_characters_from_json.error.multiple.duplicate": {
    en: "Some characters are already present.",
    it: "Alcuni personaggi sono già presenti.",
  },

  "actions.import_characters_from_json.error.multiple.invalid": {
    en: "Some files are invalid.",
    it: "Alcuni file non sono validi.",
  },

  "actions.import_characters_from_json.error.multiple.invalid_and_duplicate": {
    en: "Some files are invalid and some characters are already present.",
    it: "Alcuni file non sono validi e alcuni personaggi sono già presenti.",
  },

  "actions.import_characters_from_json.error.single.duplicate": {
    en: "The character is already present.",
    it: "Il personaggio è già presente.",
  },

  "actions.import_characters_from_json.error.single.invalid": {
    en: "The file is not valid.",
    it: "Il file non è valido.",
  },

  "actions.import_characters_from_json.error.single.invalid_and_duplicate": {
    en: "The file is not valid and the character is already present.",
    it: "Il file non è valido e il personaggio è già presente.",
  },

  "actions.remove_all_characters": {
    en: "Remove all characters",
    it: "Rimuovi tutti i personaggi",
  },

  "character.display_name.default": {
    en: "New character",
    it: "Nuovo personaggio",
  },

  "characters.empty": {
    en: "None",
    it: "Nessuno",
  },

  "dialog.import_characters_from_json.cancel_text": {
    en: "Cancel",
    it: "Cancella",
  },

  "dialog.import_characters_from_json.confirm_text": {
    en: "Import",
    it: "Importa",
  },

  "dialog.import_characters_from_json.dropzone.description": {
    en: "Drag and drop files here",
    it: "Trascina i file qui",
  },

  "dialog.import_characters_from_json.dropzone.limits": {
    en: ".json",
    it: ".json",
  },

  "dialog.import_characters_from_json.title": {
    en: "Import characters",
    it: "Importa personaggi",
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
