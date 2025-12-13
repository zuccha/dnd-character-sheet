import { Button, Em, HStack, Input } from "@chakra-ui/react";
import { EllipsisVerticalIcon } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  useActiveCharacterHasUnsavedChanges,
  useActiveCharacterId,
  useSwitchActiveCharacter,
} from "~/character/active-character";
import {
  useExportCharacterToJson,
  useRemoveCharacter,
  useRenameCharacter,
} from "~/character/characters";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import Dialog from "~/ui/dialog";
import IconButton from "~/ui/icon-button";
import Menu from "~/ui/menu";

//------------------------------------------------------------------------------
// Character List Item
//------------------------------------------------------------------------------

export type CharacterListItemProps = {
  displayName: string;
  id: string;
};

export default function CharacterListItem({
  displayName,
  id,
}: CharacterListItemProps) {
  const { t, ti } = useI18nLangContext(i18nContext);

  const renameCharacterInputRef = useRef<HTMLInputElement>(null);

  const exportCharacterToJson = useExportCharacterToJson();
  const removeCharacter = useRemoveCharacter();
  const renameCharacter = useRenameCharacter();

  const activeCharacterId = useActiveCharacterId();
  const switchActiveCharacter = useSwitchActiveCharacter();

  const active = activeCharacterId === id;

  // Unsaved Changes

  const unsavedChanges = useActiveCharacterHasUnsavedChanges();

  // Remove Character Dialog

  const [removeCharacterDialogOpen, setRemoveCharacterDialogOpen] =
    useState(false);

  const confirmRemoveCharacter = useCallback(() => {
    removeCharacter(id);
    setRemoveCharacterDialogOpen(false);
  }, [id, removeCharacter]);

  // Rename Character Dialog

  const [renameCharacterDialogOpen, setRenameCharacterDialogOpen] =
    useState(false);

  const confirmRenameCharacter = useCallback(() => {
    const nextDisplayName = renameCharacterInputRef.current?.value ?? "";
    renameCharacter(id, nextDisplayName.trim());
    setRenameCharacterDialogOpen(false);
  }, [id, renameCharacter]);

  // Action

  const actions = useMemo(
    () => [
      {
        label: t("actions.rename_character"),
        onClick: () => setRenameCharacterDialogOpen(true),
        value: "rename_character",
      },
      {
        label: t("actions.export_character_to_json"),
        onClick: () => exportCharacterToJson(id),
        value: "export_character_to_json",
      },
      {
        destructive: true,
        label: t("actions.remove_character"),
        onClick: () => setRemoveCharacterDialogOpen(true),
        value: "remove_character",
      },
    ],
    [exportCharacterToJson, id, t],
  );

  // Render

  return (
    <HStack
      _hover={{ bgColor: active ? "bg.highlight.hover" : "bg.hover" }}
      align="center"
      bgColor={active ? "bg.highlight" : undefined}
      borderRadius={4}
      className="group"
      gap={0}
      w="full"
    >
      <Button
        cursor="pointer"
        flex={1}
        fontSize="sm"
        onClick={() => {
          if (!unsavedChanges || confirm(t("switch_active_character.warning")))
            switchActiveCharacter(id);
        }}
        onDoubleClick={() => setRenameCharacterDialogOpen(true)}
        overflow="hidden"
        px={2}
        py={1}
        textAlign="left"
        textOverflow="ellipsis"
        unstyled
        variant="ghost"
        whiteSpace="nowrap"
      >
        {displayName || <Em>{t("character.display_name.missing")}</Em>}
      </Button>

      <Menu items={actions}>
        <IconButton
          Icon={EllipsisVerticalIcon}
          _focus={{ color: "revert" }}
          _groupHover={{ color: "revert" }}
          borderRadius={4}
          color="transparent"
          size="xs"
          variant="ghost"
        />
      </Menu>

      <Dialog
        cancelText={t("dialog.rename_character.cancel_text")}
        confirmText={t("dialog.rename_character.confirm_text")}
        onConfirm={confirmRenameCharacter}
        onOpenChange={setRenameCharacterDialogOpen}
        open={renameCharacterDialogOpen}
        title={ti("dialog.rename_character.title", displayName)}
      >
        <Input
          defaultValue={displayName}
          placeholder={t("dialog.rename_character.input.placeholder")}
          ref={renameCharacterInputRef}
        />
      </Dialog>

      <Dialog
        cancelText={t("dialog.remove_character.cancel_text")}
        confirmText={t("dialog.remove_character.confirm_text")}
        destructive
        onConfirm={confirmRemoveCharacter}
        onOpenChange={setRemoveCharacterDialogOpen}
        open={removeCharacterDialogOpen}
        title={ti("dialog.remove_character.title", displayName)}
      >
        {t("dialog.remove_character.description")}
      </Dialog>
    </HStack>
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "actions.export_character_to_json": {
    en: "Export character as JSON",
    it: "Esporta personaggio come JSON",
  },

  "actions.remove_character": {
    en: "Remove character",
    it: "Rimuovi personaggio",
  },

  "actions.rename_character": {
    en: "Rename character",
    it: "Rinomina personaggio",
  },

  "character.display_name.missing": {
    en: "Unnamed",
    it: "Senza nome",
  },

  "dialog.remove_character.cancel_text": {
    en: "Cancel",
    it: "Cancella",
  },

  "dialog.remove_character.confirm_text": {
    en: "Remove",
    it: "Rimuovi",
  },

  "dialog.remove_character.description": {
    en: "The operation cannot be undone.",
    it: "L'operazione non può essere annullata.",
  },

  "dialog.remove_character.title": {
    en: "Remove <1>?",
    it: "Rimuovi <1>?",
  },

  "dialog.rename_character.cancel_text": {
    en: "Cancel",
    it: "Cancella",
  },

  "dialog.rename_character.confirm_text": {
    en: "Save",
    it: "Salva",
  },

  "dialog.rename_character.input.placeholder": {
    en: "Name",
    it: "Nome",
  },

  "dialog.rename_character.title": {
    en: "Rename <1>",
    it: "Rinomina <1>",
  },

  "switch_active_character.warning": {
    en: "You have unsaved changes to this character. If you continue, those changes will be lost.",
    it: "Ci sono modifiche non salvate a questo personaggio. Se continui, le modifiche andranno perse.",
  },
};
