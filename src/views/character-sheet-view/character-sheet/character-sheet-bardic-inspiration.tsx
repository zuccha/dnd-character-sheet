import { HStack } from "@chakra-ui/react";
import { useActiveCharacterBardicInspiration } from "~/character/active-character";
import type { Character } from "~/character/character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import D10Icon from "~/icons/d10-icon";
import D12Icon from "~/icons/d12-icon";
import D6Icon from "~/icons/d6-icon";
import D8Icon from "~/icons/d8-icon";
import { touchVisibilityStyles } from "~/theme/common-styles";
import Checkbox from "~/ui/checkbox";
import CharacterSheetInferableNumberButton from "./character-sheet-inferable-number-button";
import Frame from "./frame";

//------------------------------------------------------------------------------
// Character Sheet Bardic Inspiration
//------------------------------------------------------------------------------

export default function CharacterSheetBardicInspiration() {
  const { t } = useI18nLangContext(i18nContext);
  const [bardicInspiration, setBardicInspiration] =
    useActiveCharacterBardicInspiration();

  const toggleDie = (die: keyof Character["bardic_inspiration"]["dice"]) => {
    return (checked: boolean) =>
      setBardicInspiration((prev) => ({
        ...prev,
        dice:
          prev.max_one_at_a_time ?
            { d6: false, d8: false, d10: false, d12: false, [die]: checked }
          : { ...prev.dice, [die]: checked },
      }));
  };

  return (
    <Frame
      position="relative"
      textAlign="center"
      title={t("bardic_inspiration.label")}
    >
      <HStack gap={1}>
        <Checkbox
          checked={bardicInspiration.dice.d6}
          name="character-bardic-inspiration-d6"
          onValueChange={toggleDie("d6")}
          size="sm"
        >
          <D6Icon opacity={0.4} />
        </Checkbox>
        <Checkbox
          checked={bardicInspiration.dice.d8}
          name="character-bardic-inspiration-d8"
          onValueChange={toggleDie("d8")}
          size="sm"
        >
          <D8Icon opacity={0.4} />
        </Checkbox>
        <Checkbox
          checked={bardicInspiration.dice.d10}
          name="character-bardic-inspiration-d10"
          onValueChange={toggleDie("d10")}
          size="sm"
        >
          <D10Icon opacity={0.4} />
        </Checkbox>
        <Checkbox
          checked={bardicInspiration.dice.d12}
          name="character-bardic-inspiration-d12"
          onValueChange={toggleDie("d12")}
          size="sm"
        >
          <D12Icon opacity={0.4} />
        </Checkbox>
      </HStack>

      <CharacterSheetInferableNumberButton
        {...touchVisibilityStyles}
        inferred={bardicInspiration.max_one_at_a_time}
        onClick={() =>
          setBardicInspiration((prev) => ({
            ...prev,
            max_one_at_a_time: !prev.max_one_at_a_time,
          }))
        }
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
  "bardic_inspiration.label": {
    en: "Bardic Inspiration",
    it: "Ispirazione Eroica",
  },
};
