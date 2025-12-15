import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import Frame, { type FrameProps } from "./frame";

//------------------------------------------------------------------------------
// Character Sheet Tool Proficiencies
//------------------------------------------------------------------------------

export type CharacterSheetToolProficienciesProps = FrameProps;

export default function CharacterSheetToolProficiencies(
  props: CharacterSheetToolProficienciesProps,
) {
  const { t } = useI18nLangContext(i18nContext);

  return <Frame align="flex-start" title={t("title")} {...props}></Frame>;
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  title: {
    en: "Tools",
    it: "Strumenti",
  },
};
