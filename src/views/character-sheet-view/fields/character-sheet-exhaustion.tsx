import { Box, HStack } from "@chakra-ui/react";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import CheckboxEmptyIcon from "~/icons/checkbox-empty-icon";
import CheckboxSkullIcon from "~/icons/skull-icon";
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
        <CheckboxEmptyIcon size="sm" />
        <CheckboxEmptyIcon size="sm" />
        <CheckboxEmptyIcon size="sm" />
        <CheckboxEmptyIcon size="sm" />
        <CheckboxEmptyIcon size="sm" />
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
      <CheckboxSkullIcon left={0} opacity={0.2} position="absolute" size="sm" />
      <CheckboxEmptyIcon size="sm" />
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
