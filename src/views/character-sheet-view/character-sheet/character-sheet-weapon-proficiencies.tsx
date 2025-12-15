import { HStack, SimpleGrid, Span } from "@chakra-ui/react";
import {
  useActiveCharacterWeaponProficienciesExtra,
  useActiveCharacterWeaponProficiency,
} from "~/character/active-character";
import { type Character } from "~/character/character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import EditableText from "~/ui/editable-text";
import { CharacterSheetProficiencyButton } from "./character-sheet-proficiency-button";
import Frame, { type FrameProps } from "./frame";

//------------------------------------------------------------------------------
// Character Sheet Weapon Proficiencies
//------------------------------------------------------------------------------

export type CharacterSheetWeaponProficienciesProps = FrameProps;

export default function CharacterSheetWeaponProficiencies(
  props: CharacterSheetWeaponProficienciesProps,
) {
  const { t } = useI18nLangContext(i18nContext);

  const [extra, setExtra] = useActiveCharacterWeaponProficienciesExtra();

  return (
    <Frame align="flex-start" title={t("title")} {...props}>
      <SimpleGrid columns={2} gap={1} w="full">
        <CharacterSheetWeaponProficiency type="simple" />
        <CharacterSheetWeaponProficiency type="martial" />
      </SimpleGrid>

      <EditableText
        flex={1}
        fontFamily="Booksanity"
        fontSize="cs.h5"
        multiline
        onChange={setExtra}
        resize="none"
        value={extra}
        w="full"
      />
    </Frame>
  );
}

//------------------------------------------------------------------------------
// Character Sheet Weapon Proficiency
//------------------------------------------------------------------------------

type CharacterSheetWeaponProficiencyProps = {
  type: keyof Character["weapon_proficiencies"];
};

function CharacterSheetWeaponProficiency({
  type,
}: CharacterSheetWeaponProficiencyProps) {
  const { t } = useI18nLangContext(i18nContext);

  const [proficiency, setProficiency] =
    useActiveCharacterWeaponProficiency(type);

  return (
    <HStack gap={1}>
      <CharacterSheetProficiencyButton
        onCycle={setProficiency}
        proficiency={proficiency}
      />

      <Span flex={1} fontFamily="Bookinsanity" fontSize="cs.h5">
        {t(`weapon[${type}].label`)}
      </Span>
    </HStack>
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "weapon[martial].label": {
    en: "Martial",
    it: "Guerra",
  },

  "weapon[simple].label": {
    en: "Simple",
    it: "Semplici",
  },

  "title": {
    en: "Weapons",
    it: "Armi",
  },
};
