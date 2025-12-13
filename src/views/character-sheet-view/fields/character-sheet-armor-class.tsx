import { Box, Center, Span } from "@chakra-ui/react";
import {
  useActiveCharacterArmorClass,
  useActiveCharacterArmorClassShieldEquipped,
} from "~/character/active-character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import Checkbox from "~/ui/checkbox";
import EditableNumber from "~/ui/editable-number";
import Frame from "../frame";

//------------------------------------------------------------------------------
// Character Sheet ArmorClass
//------------------------------------------------------------------------------

export default function CharacterSheetArmorClass() {
  const { t } = useI18nLangContext(i18nContext);
  const [armorClass, setArmorClass] = useActiveCharacterArmorClass();
  const [armorClassShieldEquipped, setArmorClassShieldEquipped] =
    useActiveCharacterArmorClassShieldEquipped();

  return (
    <Frame maxW="">
      <Span fontSize="cs.h4">{t("title")}</Span>
      <EditableNumber
        fontSize="cs.value.md"
        minH="1em"
        name="character-armor-class"
        onChange={setArmorClass}
        placeholder={t("armor_class.placeholder")}
        textAlign="center"
        value={armorClass}
        w="2em"
      />

      <Box bgColor="bg.cs.divider" h="1px" my={1} w="full" />

      <Span fontSize="cs.h4">{t("shield")}</Span>
      <Center fontSize="cs.value.md" minH="1em">
        <Checkbox
          checked={armorClassShieldEquipped}
          name="character-armor-class-shield-equipped"
          onValueChange={setArmorClassShieldEquipped}
        />
      </Center>
    </Frame>
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "armor_class.placeholder": {
    en: "Species, class, and size...",
    it: "Specie, classe, e taglia...",
  },

  "shield": {
    en: "Shield",
    it: "Scudo",
  },

  "title": {
    en: "AC",
    it: "CA",
  },
};
