import { Button, HStack } from "@chakra-ui/react";
import { EllipsisVerticalIcon } from "lucide-react";
import { useMemo } from "react";
import {
  useActiveCharacterId,
  useSwitchActiveCharacter,
} from "~/character/active-character";
import {
  useExportCharacterToJson,
  useRemoveCharacter,
} from "~/character/characters";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
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
  const { t } = useI18nLangContext(i18nContext);

  const exportCharacterToJson = useExportCharacterToJson();
  const removeCharacter = useRemoveCharacter();

  const activeCharacterId = useActiveCharacterId();
  const switchActiveCharacter = useSwitchActiveCharacter();

  const actions = useMemo(
    () => [
      {
        label: t("actions.rename_character"),
        // TODO: Download file.
        onClick: () => console.log("renameCharacter", id),
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
        overflow="hidden"
        px={2}
        py={1}
        textAlign="left"
        textOverflow="ellipsis"
        unstyled
        variant="ghost"
        whiteSpace="nowrap"
      >
        {displayName}
      </Button>

      <Menu items={actions}>
        <IconButton
          Icon={EllipsisVerticalIcon}
          _groupHover={{ visibility: "visible" }}
          borderRadius={4}
          size="xs"
          variant="ghost"
          visibility="hidden"
        />
      </Menu>
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
};
