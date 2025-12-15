import { HStack, Span, VStack } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import {
  useActiveCharacterAbilityModifier,
  useActiveCharacterAbilitySavingThrow,
  useActiveCharacterAbilityScore,
  useActiveCharacterAbilitySkill,
  useActiveCharacterAbilitySkillKeys,
} from "~/character/active-character";
import type { Character } from "~/character/character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import { touchVisibilityStyles } from "~/theme/common-styles";
import EditableNumber from "~/ui/editable-number";
import { toaster } from "~/ui/toaster";
import Frame from "../frame";
import InferableNumberButton from "../inferable-number-button";
import CharacterSheetAbilityCheck from "./character-sheet-ability-check";

//------------------------------------------------------------------------------
// Character Sheet Ability
//------------------------------------------------------------------------------

export type CharacterSheetAbilityProps = {
  abilityKey: keyof Character["abilities"];
};

export default function CharacterSheetAbility({
  abilityKey,
}: CharacterSheetAbilityProps) {
  const { t } = useI18nLangContext(i18nContext);
  const [score, setScore] = useActiveCharacterAbilityScore(abilityKey);
  const [modifier, setModifier] = useActiveCharacterAbilityModifier(abilityKey);
  const skillKeys = useActiveCharacterAbilitySkillKeys(abilityKey);

  const error = useCallback((e: string) => toaster.error({ title: t(e) }), [t]);

  const skills = useMemo(() => {
    return skillKeys
      .map((skillKey) => ({
        key: skillKey,
        label: t(`skill[${skillKey}].label`),
      }))
      .sort((s1, s2) => {
        if (s1.label < s2.label) return -1;
        if (s1.label > s2.label) return 1;
        return 0;
      });
  }, [skillKeys, t]);

  return (
    <VStack gap={0}>
      <Frame align="flex-start" title={t(`ability[${abilityKey}].label`)}>
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
              name={`character-${abilityKey}-modifier`}
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
              fontSize="cs.value.sm"
              integer
              min={0}
              name={`character-${abilityKey}-score`}
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

      <Frame borderTopWidth={0} py={1} w="full">
        <CharacterSheetAbilitySavingThrow abilityKey={abilityKey} />
      </Frame>

      {skills.length > 0 && (
        <Frame borderTopWidth={0} py={1} w="full">
          {skills.map((skill) => (
            <CharacterSheetAbilitySkill
              abilityKey={abilityKey}
              key={skill.key}
              skillKey={skill.key}
              skillLabel={skill.label}
            />
          ))}
        </Frame>
      )}
    </VStack>
  );
}

//------------------------------------------------------------------------------
// Character Sheet Ability Saving Throw
//------------------------------------------------------------------------------

type CharacterSheetAbilitySavingThrowProps = {
  abilityKey: keyof Character["abilities"];
};

function CharacterSheetAbilitySavingThrow({
  abilityKey,
}: CharacterSheetAbilitySavingThrowProps) {
  const { t } = useI18nLangContext(i18nContext);

  const [savingThrow, setSavingThrow] =
    useActiveCharacterAbilitySavingThrow(abilityKey);

  return (
    <CharacterSheetAbilityCheck
      check={savingThrow}
      label={t("saving_throw.label")}
      name={`${abilityKey}-saving_throw`}
      onChange={setSavingThrow}
      w="full"
    />
  );
}

//------------------------------------------------------------------------------
// Character Sheet Ability Skill Throw
//------------------------------------------------------------------------------

type CharacterSheetAbilitySkillProps = {
  abilityKey: keyof Character["abilities"];
  skillKey: string;
  skillLabel: string;
};

function CharacterSheetAbilitySkill({
  abilityKey,
  skillKey,
  skillLabel,
}: CharacterSheetAbilitySkillProps) {
  const [skill, setSkill] = useActiveCharacterAbilitySkill(
    abilityKey,
    skillKey,
  );

  return (
    <CharacterSheetAbilityCheck
      check={skill}
      label={skillLabel}
      name={`${abilityKey}-${skillKey}`}
      onChange={setSkill}
      w="full"
    />
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "ability[charisma].label": {
    en: "Charisma",
    it: "Carisma",
  },

  "ability[constitution].label": {
    en: "Constitution",
    it: "Costituzione",
  },

  "ability[dexterity].label": {
    en: "Dexterity",
    it: "Destrezza",
  },

  "ability[intelligence].label": {
    en: "Intelligence",
    it: "Intelligenza",
  },

  "ability[strength].label": {
    en: "Strength",
    it: "Forza",
  },

  "ability[wisdom].label": {
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

  "saving_throw.label": {
    en: "Saving Throw",
    it: "Tiro Salvezza",
  },

  "score.label": {
    en: "Score",
    it: "Valore",
  },

  "score.placeholder": {
    en: "10",
    it: "10",
  },

  "skill[acrobatics].label": {
    en: "Acrobatics",
    it: "Acrobazia",
  },

  "skill[animal_handling].label": {
    en: "Animal Handling",
    it: "Add. Animali",
  },

  "skill[arcana].label": {
    en: "Arcana",
    it: "Arcano",
  },

  "skill[athletics].label": {
    en: "Athletics",
    it: "Atletica",
  },

  "skill[deception].label": {
    en: "Deception",
    it: "Inganno",
  },

  "skill[history].label": {
    en: "History",
    it: "Storia",
  },

  "skill[insight].label": {
    en: "Insight",
    it: "Intuizione",
  },

  "skill[intimidation].label": {
    en: "Intimidation",
    it: "Intimidire",
  },

  "skill[investigation].label": {
    en: "Investigation",
    it: "Indagare",
  },

  "skill[medicine].label": {
    en: "Medicine",
    it: "Medicina",
  },

  "skill[nature].label": {
    en: "Nature",
    it: "Natura",
  },

  "skill[perception].label": {
    en: "Perception",
    it: "Percezione",
  },

  "skill[performance].label": {
    en: "Performance",
    it: "Intrattenere",
  },

  "skill[persuasion].label": {
    en: "Persuasion",
    it: "Persuasione",
  },

  "skill[religion].label": {
    en: "Religion",
    it: "Religione",
  },

  "skill[sleight_of_hand].label": {
    en: "Sleight of Hand",
    it: "Rapidità di Mano",
  },

  "skill[stealth].label": {
    en: "Stealth",
    it: "Furtività",
  },

  "skill[survival].label": {
    en: "Survival",
    it: "Sopravvivenza",
  },
};
