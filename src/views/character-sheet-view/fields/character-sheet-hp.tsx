import { Box, Span } from "@chakra-ui/react";
import { useCallback } from "react";
import {
  useActiveCharacterCurrentHp,
  useActiveCharacterCurrentHpTemp,
} from "~/character/active-character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import EditableNumber from "~/ui/editable-number";
import { toaster } from "~/ui/toaster";
import Frame, { type FrameProps } from "../frame";

//------------------------------------------------------------------------------
// Character Sheet HP
//------------------------------------------------------------------------------

export type CharacterSheetHpProps = FrameProps;

export default function CharacterSheetHp(props: CharacterSheetHpProps) {
  const { t } = useI18nLangContext(i18nContext);

  const [hp, setHp] = useActiveCharacterCurrentHp();
  const [hpTemp, setHpTemp] = useActiveCharacterCurrentHpTemp();

  const error = useCallback((e: string) => toaster.error({ title: t(e) }), [t]);

  return (
    <Frame align="flex-start" {...props}>
      <Span fontSize="cs.h4">{t("hp.label")}</Span>
      <EditableNumber
        allowEmpty
        fontSize="cs.value.md"
        integer
        min={0}
        minH="1em"
        name="character-hp"
        onChange={setHp}
        onError={error}
        placeholder={t("hp.placeholder")}
        value={hp}
        w="full"
      />

      <Box bgColor="bg.cs.divider" h="1px" my={1} w="full" />

      <Span fontSize="cs.h4">{t("hp_temp.label")}</Span>
      <EditableNumber
        allowEmpty
        fontSize="cs.value.md"
        integer
        min={0}
        minH="1em"
        name="character-hp-temp"
        onChange={setHpTemp}
        onError={error}
        placeholder={t("hp_temp.placeholder")}
        value={hpTemp}
        w="full"
      />
    </Frame>
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "editable_number[character-hp].error.int": {
    en: "The hit points must be an integer",
    it: "I punti ferita devono essere un numero intero",
  },

  "editable_number[character-hp].error.min": {
    en: "The hit points cannot be less than 0",
    it: "I punti ferita non possono essere inferiori a 0",
  },

  "editable_number[character-hp].error.nan": {
    en: "The hit points must be a number",
    it: "I punti ferita devono essere un numero",
  },

  "editable_number[character-hp-temp].error.int": {
    en: "The temporary hit points must be an integer",
    it: "I punti ferita temporanei devono essere un numero intero",
  },

  "editable_number[character-hp-temp].error.min": {
    en: "The temporary hit points cannot be less than 0",
    it: "I punti ferita temporanei non possono essere inferiori a 0",
  },

  "editable_number[character-hp-temp].error.nan": {
    en: "The temporary hit points must be a number",
    it: "I punti ferita temporanei devono essere un numero",
  },

  "hp.label": {
    en: "Current HP",
    it: "PF Attuali",
  },

  "hp.placeholder": {
    en: "",
    it: "",
  },

  "hp_temp.label": {
    en: "Temp",
    it: "Temp",
  },

  "hp_temp.placeholder": {
    en: "",
    it: "",
  },
};
