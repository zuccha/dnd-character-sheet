import { Box, type IconProps, SimpleGrid } from "@chakra-ui/react";
import { useActiveCharacterHpDice } from "~/character/active-character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import CheckboxEmptyIcon from "~/icons/checkbox-empty-icon";
import D10Icon from "~/icons/d10-icon";
import D12Icon from "~/icons/d12-icon";
import D6Icon from "~/icons/d6-icon";
import D8Icon from "~/icons/d8-icon";
import { range } from "~/utils/array";
import Frame, { type FrameProps } from "../frame";

//------------------------------------------------------------------------------
// Character Sheet Hp Dice
//------------------------------------------------------------------------------

export type CharacterSheetHpDiceProps = FrameProps;

export default function CharacterSheetHpDice(props: CharacterSheetHpDiceProps) {
  const { t } = useI18nLangContext(i18nContext);

  const [hpDice] = useActiveCharacterHpDice();

  return (
    <Frame align="flex-start" title={t("hp_dice.label")} {...props}>
      <SimpleGrid columns={5} gap={1}>
        {range(hpDice.d6).map((i) => (
          <Die Icon={D6Icon} key={i} />
        ))}
        {range(hpDice.d8).map((i) => (
          <Die Icon={D8Icon} key={i} />
        ))}
        {range(hpDice.d10).map((i) => (
          <Die Icon={D10Icon} key={i} />
        ))}
        {range(hpDice.d12).map((i) => (
          <Die Icon={D12Icon} key={i} />
        ))}
      </SimpleGrid>
    </Frame>
  );
}

//------------------------------------------------------------------------------
// Die
//------------------------------------------------------------------------------

type DieProps = {
  Icon: React.FC<IconProps>;
};

function Die({ Icon }: DieProps) {
  return (
    <Box position="relative">
      <Icon
        h="cs.checkbox"
        left={0}
        opacity={0.4}
        position="absolute"
        w="cs.checkbox"
      />
      <CheckboxEmptyIcon h="cs.checkbox" w="cs.checkbox" />
    </Box>
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "hp_dice.label": {
    en: "Hit Dice",
    it: "Dadi Vita",
  },
};
