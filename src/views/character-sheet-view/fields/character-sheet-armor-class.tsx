import { Box, Center, Span } from "@chakra-ui/react";
import { useCallback } from "react";
import {
  useActiveCharacterArmorClass,
  useActiveCharacterArmorClassShieldEquipped,
} from "~/character/active-character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import Checkbox from "~/ui/checkbox";
import EditableNumber from "~/ui/editable-number";
import { toaster } from "~/ui/toaster";
import Frame from "../frame";

//------------------------------------------------------------------------------
// Character Sheet Armor Class
//------------------------------------------------------------------------------

export default function CharacterSheetArmorClass() {
  const { t } = useI18nLangContext(i18nContext);
  const [armorClass, setArmorClass] = useActiveCharacterArmorClass();
  const [armorClassShieldEquipped, setArmorClassShieldEquipped] =
    useActiveCharacterArmorClassShieldEquipped();

  const error = useCallback((e: string) => toaster.error({ title: t(e) }), [t]);

  return (
    <Frame w="5.5em">
      <Span fontSize="cs.h4">{t("armor_class.label")}</Span>
      <EditableNumber
        fontSize="cs.value.md"
        integer
        minH="1em"
        name="character-armor-class"
        onChange={setArmorClass}
        onError={error}
        placeholder={t("armor_class.placeholder")}
        textAlign="center"
        value={armorClass}
        w="2em"
      />

      <Box bgColor="bg.cs.divider" h="1px" my={1} w="full" />

      <Span fontSize="cs.h4">{t("armor_class_shield_equipped.label")}</Span>
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
  "armor_class.label": {
    en: "AC",
    it: "CA",
  },

  "armor_class.placeholder": {
    en: "10",
    it: "10",
  },

  "armor_class_shield_equipped.label": {
    en: "Shield",
    it: "Scudo",
  },

  "editable_number[character-armor-class].error.int": {
    en: "The armor class must be an integer",
    it: "La classe armatura deve essere un numero intero",
  },

  "editable_number[character-armor-class].error.nan": {
    en: "The armor class must be a number",
    it: "La classe armatura deve essere un numero",
  },
};
