import { Span } from "@chakra-ui/react";
import { useCallback } from "react";
import { useActiveCharacterPassivePerception } from "~/character/active-character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import { touchVisibilityStyles } from "~/theme/common-styles";
import EditableNumber from "~/ui/editable-number";
import { toaster } from "~/ui/toaster";
import Frame, { type FrameProps } from "../frame";
import InferableNumberButton from "../inferable-number-button";

//------------------------------------------------------------------------------
// Character Passive Perception
//------------------------------------------------------------------------------

export type CharacterSheetPassivePerceptionProps = FrameProps;

export default function CharacterSheetPassivePerception(
  props: CharacterSheetPassivePerceptionProps,
) {
  const { t } = useI18nLangContext(i18nContext);

  const [passivePerception, setPassivePerception] =
    useActiveCharacterPassivePerception();

  const error = useCallback((e: string) => toaster.error({ title: t(e) }), [t]);

  return (
    <Frame className="group" flexDirection="row" position="relative" {...props}>
      <Span fontSize="cs.h4">{t("passive_perception.label")}</Span>

      <EditableNumber
        disabled={passivePerception.inferred}
        fontSize="cs.value.md"
        integer
        name="character-passive-perception"
        onChange={(customValue) =>
          setPassivePerception((prev) => ({ ...prev, customValue }))
        }
        onError={error}
        placeholder={t("passive_perception.placeholder")}
        textAlign="right"
        value={passivePerception.value}
        w="full"
      />

      <InferableNumberButton
        {...touchVisibilityStyles}
        inferred={passivePerception.inferred}
        onClick={setPassivePerception}
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
  "editable_number[character-passive_perception].error.int": {
    en: "The passive perception must be an integer",
    it: "La percezione passiva deve essere un numero intero",
  },

  "editable_number[character-passive_perception].error.nan": {
    en: "The passive perception must be a number",
    it: "La percezione passiva deve essere un numero",
  },

  "passive_perception.label": {
    en: "Passive Perception",
    it: "Percezione Passiva",
  },

  "passive_perception.placeholder": {
    en: "10",
    it: "10",
  },
};
