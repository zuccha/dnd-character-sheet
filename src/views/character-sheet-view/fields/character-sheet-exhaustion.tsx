import { Box, HStack } from "@chakra-ui/react";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import CheckboxEmptyIcon from "~/icons/checkbox-empty-icon";
import SkullIcon from "~/icons/skull-icon";
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
        <CheckboxEmptyIcon h="cs.checkbox" w="cs.checkbox" />
        <CheckboxEmptyIcon h="cs.checkbox" w="cs.checkbox" />
        <CheckboxEmptyIcon h="cs.checkbox" w="cs.checkbox" />
        <CheckboxEmptyIcon h="cs.checkbox" w="cs.checkbox" />
        <CheckboxEmptyIcon h="cs.checkbox" w="cs.checkbox" />
        <DeathIcon />
      </HStack>
    </Frame>
  );
}

//------------------------------------------------------------------------------
// Death Icon
//------------------------------------------------------------------------------

function DeathIcon() {
  return (
    <Box position="relative">
      <SkullIcon
        h="cs.checkbox"
        left={0}
        opacity={0.2}
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
  "exhaustion.label": {
    en: "Exhaustion",
    it: "Indebolimento",
  },
};
