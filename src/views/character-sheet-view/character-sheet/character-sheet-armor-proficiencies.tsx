import { HStack, SimpleGrid, Span } from "@chakra-ui/react";
import { useActiveCharacterArmorProficiency } from "~/character/active-character";
import { type Character } from "~/character/character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import { CharacterSheetProficiencyButton } from "./character-sheet-proficiency-button";
import Frame, { type FrameProps } from "./frame";

//------------------------------------------------------------------------------
// Character Sheet Armor Proficiencies
//------------------------------------------------------------------------------

export type CharacterSheetArmorProficienciesProps = FrameProps;

export default function CharacterSheetArmorProficiencies(
  props: CharacterSheetArmorProficienciesProps,
) {
  const { t } = useI18nLangContext(i18nContext);

  return (
    <Frame align="flex-start" title={t("title")} {...props}>
      <SimpleGrid columns={4} gap={1} w="full">
        <CharacterSheetArmorProficiency type="light" />
        <CharacterSheetArmorProficiency type="medium" />
        <CharacterSheetArmorProficiency type="heavy" />
        <CharacterSheetArmorProficiency type="shields" />
      </SimpleGrid>
    </Frame>
  );
}

//------------------------------------------------------------------------------
// Character Sheet Armor Proficiency
//------------------------------------------------------------------------------

type CharacterSheetArmorProficiencyProps = {
  type: keyof Character["armor_proficiencies"];
};

function CharacterSheetArmorProficiency({
  type,
}: CharacterSheetArmorProficiencyProps) {
  const { t } = useI18nLangContext(i18nContext);

  const [proficiency, setProficiency] =
    useActiveCharacterArmorProficiency(type);

  return (
    <HStack gap={1}>
      <CharacterSheetProficiencyButton
        onCycle={setProficiency}
        proficiency={proficiency}
      />

      <Span flex={1} fontFamily="Bookinsanity" fontSize="cs.h5">
        {t(`armor[${type}].label`)}
      </Span>
    </HStack>
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "armor[heavy].label": {
    en: "Heavy",
    it: "Pesanti",
  },

  "armor[light].label": {
    en: "Light",
    it: "Leggere",
  },

  "armor[medium].label": {
    en: "Medium",
    it: "Medie",
  },

  "armor[shields].label": {
    en: "Shields",
    it: "Scudi",
  },

  "title": {
    en: "Armor Training",
    it: "Competenza nelle Armature",
  },
};
