import { HStack, Heading, VStack } from "@chakra-ui/react";
import { EllipsisVerticalIcon } from "lucide-react";
import { useMemo } from "react";
import { useCharacters } from "~/character/characters";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import Button from "~/ui/button";
import IconButton from "~/ui/icon-button";
import Menu from "~/ui/menu";

//------------------------------------------------------------------------------
// Character List
//------------------------------------------------------------------------------

export default function CharacterList() {
  const { t } = useI18nLangContext(i18nContext);

  const [
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
  ] = useCharacters();

  const actions = useMemo(
    () => [
      {
        label: t("actions.create_character"),
        // TODO: Verify that there are no unsaved changes.
        onClick: () => createCharacter(t("character.display_name.default")),
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
        // TODO: Ask for confirmation.
        onClick: removeAllCharacters,
        value: "remove_all_characters",
      },
    ],
    [
      createCharacter,
      exportAllCharactersToJson,
      importCharacterFromJson,
      importCharactersFromJson,
      removeAllCharacters,
      t,
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
        {metadata.map(({ displayName, id }) => (
          <HStack
            _hover={{ bgColor: "bg.emphasized" }}
            align="center"
            borderRadius={4}
            className="group"
            gap={0}
            key={id}
            w="full"
          >
            <Button
              cursor="pointer"
              flex={1}
              fontSize="sm"
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

            <Menu
              items={[
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
              ]}
            >
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
        ))}
      </VStack>
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

  "actions.export_all_characters_to_json": {
    en: "Export all characters as JSON",
    it: "Esporta tutti i personaggi come JSON",
  },

  "actions.export_character_to_json": {
    en: "Export character as JSON",
    it: "Esporta personaggio come JSON",
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

  "actions.remove_character": {
    en: "Remove character",
    it: "Rimuovi personaggio",
  },

  "character.display_name.default": {
    en: "Character",
    it: "Personaggio",
  },

  "title": {
    en: "Characters",
    it: "Personaggi",
  },
};
