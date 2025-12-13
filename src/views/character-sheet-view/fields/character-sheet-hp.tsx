import { Box, Span } from "@chakra-ui/react";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import Frame, { type FrameProps } from "../frame";

//------------------------------------------------------------------------------
// Character Sheet HP
//------------------------------------------------------------------------------

export type CharacterSheetHpProps = FrameProps;

export default function CharacterSheetHp(props: CharacterSheetHpProps) {
  const { t } = useI18nLangContext(i18nContext);

  return (
    <Frame align="flex-start" flexDirection="row" {...props}>
      <Span flex={3} fontSize="cs.h4">
        {t("hp.label")}
      </Span>

      <Box bgColor="bg.cs.divider" h="full" mx={2} w="1px" />

      <Span flex={2} fontSize="cs.h4">
        {t("hp_temp.label")}
      </Span>
    </Frame>
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "hp.label": {
    en: "Current",
    it: "Attuali",
  },

  "hp_temp.label": {
    en: "Temp",
    it: "Temp",
  },
};
