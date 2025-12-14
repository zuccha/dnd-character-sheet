import { HStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { useActiveCharacterExhaustion } from "~/character/active-character";
import type { Character } from "~/character/character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import D1Icon from "~/icons/d1-icon";
import D2Icon from "~/icons/d2-icon";
import D3Icon from "~/icons/d3-icon";
import D4Icon from "~/icons/d4-icon";
import D5Icon from "~/icons/d5-icon";
import SkullIcon from "~/icons/skull-icon";
import Checkbox from "~/ui/checkbox";
import Frame, { type FrameProps } from "../frame";

//------------------------------------------------------------------------------
// Character Sheet Exhaustion
//------------------------------------------------------------------------------

export type CharacterSheetExhaustionProps = FrameProps;

export default function CharacterSheetExhaustion(
  props: CharacterSheetExhaustionProps,
) {
  const { t } = useI18nLangContext(i18nContext);

  return (
    <Frame align="flex-start" title={t("exhaustion.label")} {...props}>
      <HStack gap={1}>
        <ExhaustCheckbox index={0} />
        <ExhaustCheckbox index={1} />
        <ExhaustCheckbox index={2} />
        <ExhaustCheckbox index={3} />
        <ExhaustCheckbox index={4} />
        <ExhaustCheckbox index={5} />
      </HStack>
    </Frame>
  );
}

//------------------------------------------------------------------------------
// Exhaust Checkbox
//------------------------------------------------------------------------------

type ExhaustCheckboxProps = {
  color?: string;
  index: 0 | 1 | 2 | 3 | 4 | 5;
};

function ExhaustCheckbox({ color, index }: ExhaustCheckboxProps) {
  const [exhaustion, setExhaustion] = useActiveCharacterExhaustion();

  const exhaust = useCallback(
    (checked: boolean) =>
      setExhaustion((prevExhaustion) => {
        const nextExhaustion: Character["exhaustion"] = [...prevExhaustion];
        nextExhaustion[index] = checked;
        return nextExhaustion;
      }),
    [index, setExhaustion],
  );

  const DieIcon = dieIcons[index];
  const opacity = opacities[index];

  return (
    <Checkbox checked={exhaustion[index]} onValueChange={exhaust} size="sm">
      <DieIcon
        color={color}
        h="cs.checkbox"
        opacity={opacity}
        w="cs.checkbox"
      />
    </Checkbox>
  );
}

//------------------------------------------------------------------------------
// Die Icons
//------------------------------------------------------------------------------

const dieIcons = [D1Icon, D2Icon, D3Icon, D4Icon, D5Icon, SkullIcon] as const;

//------------------------------------------------------------------------------
// Opacities
//------------------------------------------------------------------------------

const opacities = [0.4, 0.4, 0.4, 0.4, 0.4, 0.2] as const;

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "exhaustion.label": {
    en: "Exhaustion",
    it: "Indebolimento",
  },
};
