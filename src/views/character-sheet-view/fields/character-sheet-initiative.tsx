import { Span } from "@chakra-ui/react";
import { useCallback } from "react";
import { useActiveCharacterInitiative } from "~/character/active-character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import { touchVisibilityStyles } from "~/theme/common-styles";
import EditableNumber from "~/ui/editable-number";
import { toaster } from "~/ui/toaster";
import CharacterSheetInferableNumberButton from "./character-sheet-inferable-number-button";
import Frame, { type FrameProps } from "./frame";

//------------------------------------------------------------------------------
// Character Initiative
//------------------------------------------------------------------------------

export type CharacterSheetInitiativeProps = FrameProps;

export default function CharacterSheetInitiative(
  props: CharacterSheetInitiativeProps,
) {
  const { t } = useI18nLangContext(i18nContext);

  const [initiative, setInitiative] = useActiveCharacterInitiative();

  const error = useCallback((e: string) => toaster.error({ title: t(e) }), [t]);

  return (
    <Frame className="group" flexDirection="row" position="relative" {...props}>
      <Span fontSize="cs.h4">{t("initiative.label")}</Span>

      <EditableNumber
        alwaysShowSign
        disabled={initiative.inferred}
        fontSize="cs.value.md"
        integer
        name="character-initiative"
        onChange={(customValue) =>
          setInitiative((prev) => ({ ...prev, customValue }))
        }
        onError={error}
        placeholder={t("initiative.placeholder")}
        textAlign="right"
        value={initiative.value}
        w="full"
      />

      <CharacterSheetInferableNumberButton
        {...touchVisibilityStyles}
        inferred={initiative.inferred}
        onClick={setInitiative}
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
  "editable_number[character-initiative].error.int": {
    en: "The initiative modifier must be an integer",
    it: "Il modificatore di iniziativa deve essere un numero intero",
  },

  "editable_number[character-initiative].error.nan": {
    en: "The initiative modifier must be a number",
    it: "Il modificatore di iniziativa deve essere un numero",
  },

  "initiative.label": {
    en: "Initiative",
    it: "Iniziativa",
  },

  "initiative.placeholder": {
    en: "+0",
    it: "+0",
  },
};
