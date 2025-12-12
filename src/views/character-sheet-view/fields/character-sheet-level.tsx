import { Text, VStack } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import { focusStyles } from "~/theme/common-styles";
import EditableNumber from "~/ui/editable-number";
import { toaster } from "~/ui/toaster";

//------------------------------------------------------------------------------
// Character Sheet Level
//------------------------------------------------------------------------------

export default function CharacterSheetLevel() {
  const { t } = useI18nLangContext(i18nContext);
  const [level, setLevel] = useState(1);

  const error = useCallback((e: string) => toaster.error({ title: t(e) }), [t]);

  return (
    <VStack
      _focus={focusStyles}
      aspectRatio={1}
      bgColor="bg.inverted"
      className="group"
      color="fg.inverted"
      gap={0}
      h="full"
      justify="center"
      position="relative"
    >
      <Text fontSize="cs.h4">{t("level.label")}</Text>

      <EditableNumber
        fontSize="cs.value.md"
        integer
        max={20}
        min={0}
        name="character-level"
        onChange={setLevel}
        onError={error}
        textAlign="center"
        value={level}
        w="2em"
      />
    </VStack>
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "editable_number[character-level].error.int": {
    en: "The level must be an integer",
    it: "Il livello deve essere un numero intero",
  },

  "editable_number[character-level].error.max": {
    en: "The level cannot be greater than 20",
    it: "Il livello non può essere superiore a 20",
  },

  "editable_number[character-level].error.min": {
    en: "The level cannot be lower than 0",
    it: "Il livello non può essere inferiore a 0",
  },

  "editable_number[character-level].error.nan": {
    en: "The level must be a number",
    it: "Il livello deve essere un numero",
  },

  "level.label": {
    en: "LVL",
    it: "LVL",
  },
};
