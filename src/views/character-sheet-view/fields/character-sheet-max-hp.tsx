import { Box, Center, Span } from "@chakra-ui/react";
import { useCallback } from "react";
import { useActiveCharacterMaxHp } from "~/character/active-character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import EditableNumber from "~/ui/editable-number";
import { toaster } from "~/ui/toaster";
import Frame from "../frame";

//------------------------------------------------------------------------------
// Character Sheet MaxHp
//------------------------------------------------------------------------------

export default function CharacterSheetMaxHp() {
  const { t } = useI18nLangContext(i18nContext);
  const [maxHp, setMaxHp] = useActiveCharacterMaxHp();

  const error = useCallback((e: string) => toaster.error({ title: t(e) }), [t]);

  return (
    <Frame maxW="">
      <Span fontSize="cs.h4">{t("max_hp.label")}</Span>
      <EditableNumber
        fontSize="cs.value.md"
        integer
        minH="1em"
        name="character-max-hp"
        onChange={setMaxHp}
        onError={error}
        placeholder={t("max_hp.placeholder")}
        textAlign="center"
        value={maxHp}
        w="2em"
      />

      <Box bgColor="bg.cs.divider" h="1px" my={1} w="full" />

      <Span fontSize="cs.h4">{t("max_hp_temp.label")}</Span>
      <Center fontSize="cs.value.md" minH="1em" />
    </Frame>
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "editable_number[character-max-hp].error.int": {
    en: "The maximum health points must be an integer",
    it: "I punti ferita massimi devono essere un numero intero",
  },

  "editable_number[character-max-hp].error.nan": {
    en: "The maximum health points must be a number",
    it: "I punti ferita massimi devono essere un numero",
  },

  "max_hp.label": {
    en: "Max HP",
    it: "PF Max",
  },

  "max_hp.placeholder": {
    en: "10",
    it: "10",
  },

  "max_hp_temp.label": {
    en: "Temp",
    it: "Temp",
  },
};
