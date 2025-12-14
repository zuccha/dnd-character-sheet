import { HStack, Span, VStack } from "@chakra-ui/react";
import { useCallback } from "react";
import {
  useActiveCharacterAbilityModifier,
  useActiveCharacterField,
} from "~/character/active-character";
import type { CharacterAbility } from "~/character/character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import EditableNumber from "~/ui/editable-number";
import { toaster } from "~/ui/toaster";
import { touchVisibilityStyles } from "../../../theme/common-styles";
import Frame from "../frame";
import InferableNumberButton from "../inferable-number-button";

//------------------------------------------------------------------------------
// Character Sheet Ability
//------------------------------------------------------------------------------

export type CharacterSheetAbilityProps = {
  ability: CharacterAbility;
};

export default function CharacterSheetAbility({
  ability,
}: CharacterSheetAbilityProps) {
  const { t } = useI18nLangContext(i18nContext);
  const [score, setScore] = useActiveCharacterField(ability);
  const [modifier, setModifier] = useActiveCharacterAbilityModifier(ability);

  const error = useCallback((e: string) => toaster.error({ title: t(e) }), [t]);

  return (
    <VStack gap={0}>
      <Frame align="flex-start" title={t(`ability[${ability}].label`)}>
        <HStack gap={0}>
          <Frame align="center" className="group" flex={1} position="relative">
            <Span fontSize="cs.h4" textAlign="center">
              {t("modifier.label")}
            </Span>

            <EditableNumber
              alwaysShowSign
              disabled={modifier.inferred}
              fontSize="cs.value.md"
              integer
              name={`character-${ability}-modifier`}
              onChange={(customValue) =>
                setModifier((prev) => ({ ...prev, customValue }))
              }
              onError={error}
              placeholder={t("modifier.placeholder")}
              textAlign="center"
              value={modifier.value}
              w="full"
            />

            <InferableNumberButton
              {...touchVisibilityStyles}
              inferred={modifier.inferred}
              onClick={setModifier}
              position="absolute"
              right={0}
              top={0}
              transform="translate(35%, -35%) scale(80%, 80%)"
              variant="solid"
            />
          </Frame>

          <Frame align="center" borderLeftWidth={0} flex={1} textAlign="center">
            <Span fontSize="cs.h5" textAlign="center">
              {t("score.label")}
            </Span>

            <EditableNumber
              alwaysShowSign
              fontSize="cs.value.sm"
              integer
              min={0}
              name={`character-${ability}-score`}
              onChange={(value) => setScore(value)}
              onError={error}
              placeholder={t("score.placeholder")}
              textAlign="center"
              value={score}
              w="full"
            />
          </Frame>
        </HStack>
      </Frame>
    </VStack>
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "ability[cha].label": {
    en: "Charisma",
    it: "Carisma",
  },

  "ability[con].label": {
    en: "Constitution",
    it: "Costituzione",
  },

  "ability[dex].label": {
    en: "Dexterity",
    it: "Destrezza",
  },

  "ability[int].label": {
    en: "Intelligence",
    it: "Intelligenza",
  },

  "ability[str].label": {
    en: "Strength",
    it: "Forza",
  },

  "ability[wis].label": {
    en: "Wisdom",
    it: "Saggezza",
  },

  "modifier.label": {
    en: "Mod",
    it: "Mod",
  },

  "editable_number[character-cha-modifier].error.int": {
    en: "The charisma modifier must be an integer",
    it: "Il modificatore di carisma deve essere un numero intero",
  },

  "editable_number[character-cha-modifier].error.nan": {
    en: "The charisma modifier must be a number",
    it: "Il modificatore di carisma deve essere un numero",
  },

  "editable_number[character-cha-score].error.int": {
    en: "The charisma score must be an integer",
    it: "Il punteggio di carisma deve essere un numero intero",
  },

  "editable_number[character-cha-score].error.min": {
    en: "The charisma score cannot be less than 0",
    it: "Il punteggio di carisma non può essere inferiore a 0",
  },

  "editable_number[character-cha-score].error.nan": {
    en: "The charisma score must be a number",
    it: "Il punteggio di carisma deve essere un numero",
  },

  "editable_number[character-con-modifier].error.int": {
    en: "The constitution modifier must be an integer",
    it: "Il modificatore di costituzione deve essere un numero intero",
  },

  "editable_number[character-con-modifier].error.nan": {
    en: "The constitution modifier must be a number",
    it: "Il modificatore di costituzione deve essere un numero",
  },

  "editable_number[character-con-score].error.int": {
    en: "The constitution score must be an integer",
    it: "Il punteggio di costituzione deve essere un numero intero",
  },

  "editable_number[character-con-score].error.min": {
    en: "The constitution score cannot be less than 0",
    it: "Il punteggio di costituzione non può essere inferiore a 0",
  },

  "editable_number[character-con-score].error.nan": {
    en: "The constitution score must be a number",
    it: "Il punteggio di costituzione deve essere un numero",
  },

  "editable_number[character-dex-modifier].error.int": {
    en: "The dexterity modifier must be an integer",
    it: "Il modificatore di destrezza deve essere un numero intero",
  },

  "editable_number[character-dex-modifier].error.nan": {
    en: "The dexterity modifier must be a number",
    it: "Il modificatore di destrezza deve essere un numero",
  },

  "editable_number[character-dex-score].error.int": {
    en: "The dexterity score must be an integer",
    it: "Il punteggio di destrezza deve essere un numero intero",
  },

  "editable_number[character-dex-score].error.min": {
    en: "The dexterity score cannot be less than 0",
    it: "Il punteggio di destrezza non può essere inferiore a 0",
  },

  "editable_number[character-dex-score].error.nan": {
    en: "The dexterity score must be a number",
    it: "Il punteggio di destrezza deve essere un numero",
  },

  "editable_number[character-int-modifier].error.int": {
    en: "The intelligence modifier must be an integer",
    it: "Il modificatore di intelligenza deve essere un numero intero",
  },

  "editable_number[character-int-modifier].error.nan": {
    en: "The intelligence modifier must be a number",
    it: "Il modificatore di intelligenza deve essere un numero",
  },

  "editable_number[character-int-score].error.int": {
    en: "The intelligence score must be an integer",
    it: "Il punteggio di intelligenza deve essere un numero intero",
  },

  "editable_number[character-int-score].error.min": {
    en: "The intelligence score cannot be less than 0",
    it: "Il punteggio di intelligenza non può essere inferiore a 0",
  },

  "editable_number[character-int-score].error.nan": {
    en: "The intelligence score must be a number",
    it: "Il punteggio di intelligenza deve essere un numero",
  },

  "editable_number[character-str-modifier].error.int": {
    en: "The strength modifier must be an integer",
    it: "Il modificatore di forza deve essere un numero intero",
  },

  "editable_number[character-str-modifier].error.nan": {
    en: "The strength modifier must be a number",
    it: "Il modificatore di forza deve essere un numero",
  },

  "editable_number[character-str-score].error.int": {
    en: "The strength score must be an integer",
    it: "Il punteggio di forza deve essere un numero intero",
  },

  "editable_number[character-str-score].error.min": {
    en: "The strength score cannot be less than 0",
    it: "Il punteggio di forza non può essere inferiore a 0",
  },

  "editable_number[character-str-score].error.nan": {
    en: "The strength score must be a number",
    it: "Il punteggio di forza deve essere un numero",
  },

  "editable_number[character-wis-modifier].error.int": {
    en: "The wisdom modifier must be an integer",
    it: "Il modificatore di saggezza deve essere un numero intero",
  },

  "editable_number[character-wis-modifier].error.nan": {
    en: "The wisdom modifier must be a number",
    it: "Il modificatore di saggezza deve essere un numero",
  },

  "editable_number[character-wis-score].error.int": {
    en: "The wisdom score must be an integer",
    it: "Il punteggio di saggezza deve essere un numero intero",
  },

  "editable_number[character-wis-score].error.min": {
    en: "The wisdom score cannot be less than 0",
    it: "Il punteggio di saggezza non può essere inferiore a 0",
  },

  "editable_number[character-wis-score].error.nan": {
    en: "The wisdom score must be a number",
    it: "Il punteggio di saggezza deve essere un numero",
  },

  "modifier.placeholder": {
    en: "+0",
    it: "+0",
  },

  "score.label": {
    en: "Score",
    it: "Valore",
  },

  "score.placeholder": {
    en: "10",
    it: "10",
  },
};
