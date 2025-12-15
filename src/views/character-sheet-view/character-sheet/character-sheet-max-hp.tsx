import { Box, Span } from "@chakra-ui/react";
import { useCallback } from "react";
import {
  useActiveCharacterMaxHp,
  useActiveCharacterMaxHpTemp,
} from "~/character/active-character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import EditableNumber from "~/ui/editable-number";
import { toaster } from "~/ui/toaster";
import Frame from "./frame";

//------------------------------------------------------------------------------
// Character Sheet Max Hp
//------------------------------------------------------------------------------

export default function CharacterSheetMaxHp() {
  const { t } = useI18nLangContext(i18nContext);
  const [maxHp, setMaxHp] = useActiveCharacterMaxHp();
  const [maxHpTemp, setMaxHpTemp] = useActiveCharacterMaxHpTemp();

  const error = useCallback((e: string) => toaster.error({ title: t(e) }), [t]);

  return (
    <Frame w="5.5em">
      <Span fontSize="cs.h4">{t("max_hp.label")}</Span>
      <EditableNumber
        fontSize="cs.value.md"
        integer
        min={0}
        minH="1em"
        name="character-max-hp"
        onChange={setMaxHp}
        onError={error}
        placeholder={t("max_hp.placeholder")}
        textAlign="center"
        value={maxHp}
        w="full"
      />

      <Box bgColor="bg.cs.divider" h="1px" my={1} w="full" />

      <Span fontSize="cs.h4">{t("max_hp_temp.label")}</Span>
      <EditableNumber
        allowEmpty
        fontSize="cs.value.md"
        integer
        min={0}
        minH="1em"
        name="character-max-hp-temp"
        onChange={setMaxHpTemp}
        onError={error}
        placeholder={t("max_hp_temp.placeholder")}
        textAlign="center"
        value={maxHpTemp}
        w="full"
      />
    </Frame>
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "editable_number[character-max-hp].error.int": {
    en: "The maximum hit points must be an integer",
    it: "I punti ferita massimi devono essere un numero intero",
  },

  "editable_number[character-max-hp].error.min": {
    en: "The maximum hit points cannot be less than 0",
    it: "I punti ferita massimi non possono essere inferiori a 0",
  },

  "editable_number[character-max-hp].error.nan": {
    en: "The maximum hit points must be a number",
    it: "I punti ferita massimi devono essere un numero",
  },

  "editable_number[character-max-hp-temp].error.int": {
    en: "The maximum temporary hit points must be an integer",
    it: "I punti ferita massimi temporanei devono essere un numero intero",
  },

  "editable_number[character-max-hp-temp].error.min": {
    en: "The maximum temporary hit points cannot be less than 0",
    it: "I punti ferita massimi temporanei non possono essere inferiori a 0",
  },

  "editable_number[character-max-hp-temp].error.nan": {
    en: "The maximum temporary hit points must be a number",
    it: "I punti ferita massimi temporanei devono essere un numero",
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

  "max_hp_temp.placeholder": {
    en: "",
    it: "",
  },
};
