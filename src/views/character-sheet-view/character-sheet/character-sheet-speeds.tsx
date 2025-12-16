import { SimpleGrid, Span } from "@chakra-ui/react";
import { useActiveCharacterSpeed } from "~/character/active-character";
import type { Character } from "~/character/character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import { useI18nUnitSystemContext } from "~/i18n/i18n-unit-system-context";
import EditableNumber from "~/ui/editable-number";
import Frame from "./frame";

//------------------------------------------------------------------------------
// Character Sheet Speeds
//------------------------------------------------------------------------------

export default function CharacterSheetSpeeds() {
  return (
    <SimpleGrid columns={4} gap={2}>
      <CharacterSheetSpeed type="walking" />
      <CharacterSheetSpeed type="fly" />
      <CharacterSheetSpeed type="swim" />
      <CharacterSheetSpeed type="climb" />
    </SimpleGrid>
  );
}

//------------------------------------------------------------------------------
// Character Sheet Speed
//------------------------------------------------------------------------------

type CharacterSheetSpeedProps = {
  type: keyof Character["speeds"];
};

function CharacterSheetSpeed({ type }: CharacterSheetSpeedProps) {
  const { t } = useI18nLangContext(i18nContext);
  const { squaresToUnits } = useI18nUnitSystemContext();
  const [speed, setSpeed] = useActiveCharacterSpeed(type);

  return (
    <Frame title={t(`speed[${type}].label`)}>
      <EditableNumber
        fontSize="cs.value.md"
        integer
        min={0}
        name={`character-speed-${type}`}
        onChange={setSpeed}
        textAlign="center"
        value={speed}
        w="full"
      />

      <Span fontSize="cs.h5">{squaresToUnits(speed, true)}</Span>
    </Frame>
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "editable_number[character-speed-climb].error.int": {
    en: "The climbing speed must be an integer",
    it: "La velocità di scalata deve essere un numero intero",
  },

  "editable_number[character-speed-climb].error.min": {
    en: "The climbing speed cannot be less than 0",
    it: "La velocità di scalata non può essere inferiore a 0",
  },

  "editable_number[character-speed-climb].error.nan": {
    en: "The climbing speed must be a number",
    it: "La velocità di scalata deve essere un numero",
  },

  "editable_number[character-speed-fly].error.int": {
    en: "The flying speed must be an integer",
    it: "La velocità di volo deve essere un numero intero",
  },

  "editable_number[character-speed-fly].error.min": {
    en: "The flying speed cannot be less than 0",
    it: "La velocità di volo non può essere inferiore a 0",
  },

  "editable_number[character-speed-fly].error.nan": {
    en: "The flying speed must be a number",
    it: "La velocità di volo deve essere un numero",
  },

  "editable_number[character-speed-swim].error.int": {
    en: "The swimming speed must be an integer",
    it: "La velocità di nuoto deve essere un numero intero",
  },

  "editable_number[character-speed-swim].error.min": {
    en: "The swimming speed cannot be less than 0",
    it: "La velocità di nuoto non può essere inferiore a 0",
  },

  "editable_number[character-speed-swim].error.nan": {
    en: "The swimming speed must be a number",
    it: "La velocità di nuoto deve essere un numero",
  },

  "editable_number[character-speed-walking].error.int": {
    en: "The walking speed must be an integer",
    it: "La velocità di cammino deve essere un numero intero",
  },

  "editable_number[character-speed-walking].error.min": {
    en: "The walking speed cannot be less than 0",
    it: "La velocità di cammino non può essere inferiore a 0",
  },

  "editable_number[character-speed-walking].error.nan": {
    en: "The walking speed must be a number",
    it: "La velocità di cammino deve essere un numero",
  },

  "speed.placeholder": {
    en: "0",
    it: "0",
  },

  "speed[climb].label": {
    en: "Climb",
    it: "Scalata",
  },

  "speed[fly].label": {
    en: "Fly",
    it: "Volo",
  },

  "speed[swim].label": {
    en: "Swim",
    it: "Nuoto",
  },

  "speed[walking].label": {
    en: "Walking",
    it: "Cammino",
  },
};
