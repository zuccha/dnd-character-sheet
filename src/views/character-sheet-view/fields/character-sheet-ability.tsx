import { HStack, Span, VStack } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import {
  useActiveCharacterAbilityModifier,
  useActiveCharacterAbilitySavingThrow,
  useActiveCharacterField,
  useActiveCharacterSkill,
} from "~/character/active-character";
import type {
  Character,
  CharacterAbility,
  CharacterSkill,
} from "~/character/character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import { touchVisibilityStyles } from "~/theme/common-styles";
import EditableNumber from "~/ui/editable-number";
import { toaster } from "~/ui/toaster";
import type { KeysOfType } from "~/utils/types";
import Frame from "../frame";
import InferableNumberButton from "../inferable-number-button";
import CharacterSheetSkill from "./character-sheet-skill";

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

  const skills = useMemo(() => {
    return skillsByAbility[ability]
      .map((skill) => ({
        ...skill,
        label: t(`skill[${skill.name}].label`),
      }))
      .sort((skill1, skill2) => {
        if (skill1.label < skill2.label) return -1;
        if (skill1.label > skill2.label) return 1;
        return 0;
      });
  }, [ability, t]);

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

      <Frame borderTopWidth={0} py={1} w="full">
        <CharacterSheetAbilitySavingThrow ability={ability} />
      </Frame>

      {skills.length > 0 && (
        <Frame borderTopWidth={0} py={1} w="full">
          {skills.map((skill) => (
            <CharacterSheetAbilitySkill
              ability={ability}
              key={skill.id}
              {...skill}
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
  ability: CharacterAbility;
};

function CharacterSheetAbilitySavingThrow({
  ability,
}: CharacterSheetAbilitySavingThrowProps) {
  const { t } = useI18nLangContext(i18nContext);

  const [savingThrow, setSavingThrow] =
    useActiveCharacterAbilitySavingThrow(ability);

  return (
    <CharacterSheetSkill
      label={t("saving_throw.label")}
      name={`${ability}-saving-throw`}
      onChange={setSavingThrow}
      skill={savingThrow}
      w="full"
    />
  );
}

//------------------------------------------------------------------------------
// Character Sheet Ability Skill
//------------------------------------------------------------------------------

type CharacterSheetAbilitySkillProps = {
  ability: CharacterAbility;
  id: KeysOfType<Character, CharacterSkill>;
  label: string;
  name: string;
};

function CharacterSheetAbilitySkill({
  ability,
  id,
  label,
  name,
}: CharacterSheetAbilitySkillProps) {
  const [skill, setSkill] = useActiveCharacterSkill(ability, id);

  return (
    <CharacterSheetSkill
      label={label}
      name={`${ability}-${name}`}
      onChange={setSkill}
      skill={skill}
      w="full"
    />
  );
}

//------------------------------------------------------------------------------
// Skills
//------------------------------------------------------------------------------

const skillsByAbility = {
  cha: [
    { id: "deception", name: "deception" },
    { id: "intimidation", name: "intimidation" },
    { id: "performance", name: "performance" },
    { id: "persuasion", name: "persuasion" },
  ],
  con: [],
  dex: [
    { id: "acrobatics", name: "acrobatics" },
    { id: "sleightOfHand", name: "sleight-of-hand" },
    { id: "stealth", name: "stealth" },
  ],
  int: [
    { id: "arcana", name: "arcana" },
    { id: "history", name: "history" },
    { id: "investigation", name: "investigation" },
    { id: "nature", name: "nature" },
    { id: "religion", name: "religion" },
  ],
  str: [{ id: "athletics", name: "athletics" }],
  wis: [
    { id: "animalHandling", name: "animal-handling" },
    { id: "insight", name: "insight" },
    { id: "medicine", name: "medicine" },
    { id: "perception", name: "perception" },
    { id: "survival", name: "survival" },
  ],
} as const;

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

  "skill[animal-handling].label": {
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

  "skill[sleight-of-hand].label": {
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
