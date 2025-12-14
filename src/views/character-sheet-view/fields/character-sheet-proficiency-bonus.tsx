import { Span } from "@chakra-ui/react";
import { useCallback } from "react";
import { useActiveCharacterProficiencyBonus } from "~/character/active-character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import { touchVisibilityStyles } from "~/theme/common-styles";
import EditableNumber from "~/ui/editable-number";
import { toaster } from "~/ui/toaster";
import Frame from "../frame";
import InferableNumberButton from "../inferable-number-button";

//------------------------------------------------------------------------------
// Character Proficiency Bonus
//------------------------------------------------------------------------------

export default function CharacterSheetProficiencyBonus() {
  const { t } = useI18nLangContext(i18nContext);

  const [proficiencyBonus, setProficiencyBonus] =
    useActiveCharacterProficiencyBonus();

  const error = useCallback((e: string) => toaster.error({ title: t(e) }), [t]);

  return (
    <Frame className="group" flexDirection="row" position="relative">
      <Span fontSize="cs.h4">{t("proficiency_bonus.label")}</Span>

      <EditableNumber
        alwaysShowSign
        disabled={proficiencyBonus.inferred}
        fontSize="cs.value.md"
        integer
        name="character-proficiency-bonus"
        onChange={(customValue) =>
          setProficiencyBonus((prev) => ({ ...prev, customValue }))
        }
        onError={error}
        placeholder={t("proficiency_bonus.placeholder")}
        textAlign="right"
        value={proficiencyBonus.value}
        w="full"
      />

      <InferableNumberButton
        {...touchVisibilityStyles}
        inferred={proficiencyBonus.inferred}
        onClick={setProficiencyBonus}
        position="absolute"
        right={0}
        top={0}
        transform="translate(35%, -35%) scale(80%, 80%)"
        variant="solid"
      />
    </Frame>
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "editable_number[character-proficiency-bonus].error.int": {
    en: "The proficiency bonus must be an integer",
    it: "Il bonus di competenza deve essere un numero intero",
  },

  "editable_number[character-proficiency-bonus].error.nan": {
    en: "The proficiency bonus must be a number",
    it: "Il bonus di competenza deve essere un numero",
  },

  "proficiency_bonus.label": {
    en: "Proficiency Bonus",
    it: "Bonus di Competenza",
  },

  "proficiency_bonus.placeholder": {
    en: "+0",
    it: "+0",
  },
};
