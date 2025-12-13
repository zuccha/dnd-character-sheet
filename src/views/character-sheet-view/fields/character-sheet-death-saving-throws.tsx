import { Box, HStack } from "@chakra-ui/react";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import CheckboxEmptyIcon from "~/icons/checkbox-empty-icon";
import HeartIcon from "~/icons/heart-icon";
import SkullIcon from "~/icons/skull-icon";
import Frame, { type FrameProps } from "../frame";

//------------------------------------------------------------------------------
// Character Sheet Death Saving Throws
//------------------------------------------------------------------------------

export type CharacterSheetDeathSavingThrowsProps = FrameProps;

export default function CharacterSheetDeathSavingThrows(
  props: CharacterSheetDeathSavingThrowsProps,
) {
  const { t } = useI18nLangContext(i18nContext);

  return (
    <Frame align="flex-start" title={t("death_saving_throws.label")} {...props}>
      <HStack gap={1}>
        <SuccessIcon />
        <SuccessIcon />
        <SuccessIcon />
        <FailureIcon />
        <FailureIcon />
        <FailureIcon />
      </HStack>
    </Frame>
  );
}

//------------------------------------------------------------------------------
// Failure Icon
//------------------------------------------------------------------------------

function FailureIcon() {
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
// Success Icon
//------------------------------------------------------------------------------

function SuccessIcon() {
  return (
    <Box position="relative">
      <HeartIcon
        color="fg.error"
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
  "death_saving_throws.label": {
    en: "Death Saves",
    it: "Tiri Morte",
  },
};
