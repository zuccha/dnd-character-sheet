import { Box, HStack } from "@chakra-ui/react";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import CheckboxEmptyIcon from "~/icons/checkbox-empty-icon";
import CheckboxHeartIcon from "~/icons/heart-icon";
import CheckboxSkullIcon from "~/icons/skull-icon";
import Frame from "../frame";

//------------------------------------------------------------------------------
// Character Sheet Death Saving Throws
//------------------------------------------------------------------------------

export default function CharacterSheetDeathSavingThrows() {
  const { t } = useI18nLangContext(i18nContext);

  return (
    <Frame align="flex-start" title={t("death_saving_throws.label")}>
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
      <CheckboxSkullIcon left={0} opacity={0.2} position="absolute" size="sm" />
      <CheckboxEmptyIcon size="sm" />
    </Box>
  );
}

//------------------------------------------------------------------------------
// Success Icon
//------------------------------------------------------------------------------

function SuccessIcon() {
  return (
    <Box position="relative">
      <CheckboxHeartIcon
        color="fg.error"
        left={0}
        opacity={0.2}
        position="absolute"
        size="sm"
      />
      <CheckboxEmptyIcon size="sm" />
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
