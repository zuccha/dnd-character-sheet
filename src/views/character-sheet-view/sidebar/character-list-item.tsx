import { Button, Em, HStack, Input } from "@chakra-ui/react";
import { EllipsisVerticalIcon } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import {
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

  const [renameCharacterDialogOpen, setRenameCharacterDialogOpen] =
    useState(false);

  const confirmRenameCharacter = useCallback(() => {
    const nextDisplayName = renameCharacterInputRef.current?.value ?? "";
    renameCharacter(id, nextDisplayName.trim());
    setRenameCharacterDialogOpen(false);
  }, [id, renameCharacter]);

  const actions = useMemo(
    () => [
      {
        label: t("actions.rename_character"),
        onClick: () => setRenameCharacterDialogOpen(true),
        value: "rename_character",
      },
      {
        label: t("actions.export_character_to_json"),
        // TODO: Download file.
        onClick: () => exportCharacterToJson(id),
        value: "export_character_to_json",
      },
      {
        destructive: true,
        label: t("actions.remove_character"),
        // TODO: Ask for confirmation.
        onClick: () => removeCharacter(id),
        value: "remove_character",
      },
    ],
    [exportCharacterToJson, id, removeCharacter, t],
  );

  return (
    <HStack
      _hover={{
        bgColor: activeCharacterId === id ? "blue.300" : "bg.emphasized",
      }}
      align="center"
      bgColor={activeCharacterId === id ? "blue.200" : undefined}
      borderRadius={4}
      className="group"
      gap={0}
      w="full"
    >
      <Button
        cursor="pointer"
        flex={1}
        fontSize="sm"
        onClick={() => switchActiveCharacter(id)}
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
};
