import { SimpleGrid } from "@chakra-ui/react";
import { useActiveCharacterHpDice } from "~/character/active-character";
import type { Character } from "~/character/character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import D10Icon from "~/icons/d10-icon";
import D12Icon from "~/icons/d12-icon";
import D6Icon from "~/icons/d6-icon";
import D8Icon from "~/icons/d8-icon";
import Checkbox from "~/ui/checkbox";
import Frame, { type FrameProps } from "../frame";

//------------------------------------------------------------------------------
// Character Sheet Hp Dice
//------------------------------------------------------------------------------

export type CharacterSheetHpDiceProps = FrameProps;

export default function CharacterSheetHpDice(props: CharacterSheetHpDiceProps) {
  const { t } = useI18nLangContext(i18nContext);

  return (
    <Frame align="flex-start" title={t("hp_dice.label")} {...props}>
      <SimpleGrid columns={5} gap={1}>
        <Dice die="d6" />
        <Dice die="d8" />
        <Dice die="d10" />
        <Dice die="d12" />
      </SimpleGrid>
    </Frame>
  );
}

//------------------------------------------------------------------------------
// Dice
//------------------------------------------------------------------------------

type DiceProps = {
  die: keyof Character["hpDice"];
};

function Dice({ die }: DiceProps) {
  const [hpDice, setHpDice] = useActiveCharacterHpDice();

  const Icon = dieIcons[die];

  return hpDice[die].map((checked, index) => (
    <Checkbox
      checked={checked}
      key={`${die}-${index}`}
      onValueChange={(nextChecked) =>
        setHpDice((prevHpDice) => {
          const nextDieChecked = [...prevHpDice[die]];
          nextDieChecked[index] = nextChecked;
          return { ...prevHpDice, [die]: nextDieChecked };
        })
      }
      size="sm"
    >
      <Icon h="cs.checkbox" opacity={0.4} w="cs.checkbox" />
    </Checkbox>
  ));
}

//------------------------------------------------------------------------------
// Die Icons
//------------------------------------------------------------------------------

const dieIcons = {
  d6: D6Icon,
  d8: D8Icon,
  d10: D10Icon,
  d12: D12Icon,
} as const;

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "hp_dice.label": {
    en: "Hit Dice",
    it: "Dadi Vita",
  },
};
