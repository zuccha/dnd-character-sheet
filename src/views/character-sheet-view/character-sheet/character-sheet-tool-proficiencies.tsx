import { useActiveCharacterToolProficienciesExtra } from "~/character/active-character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import EditableText from "~/ui/editable-text";
import Frame, { type FrameProps } from "./frame";

//------------------------------------------------------------------------------
// Character Sheet Tool Proficiencies
//------------------------------------------------------------------------------

export type CharacterSheetToolProficienciesProps = FrameProps;

export default function CharacterSheetToolProficiencies(
  props: CharacterSheetToolProficienciesProps,
) {
  const { t } = useI18nLangContext(i18nContext);

  const [extra, setExtra] = useActiveCharacterToolProficienciesExtra();

  return (
    <Frame align="flex-start" title={t("title")} {...props}>
      <EditableText
        flex={1}
        fontFamily="Booksanity"
        fontSize="cs.h5"
        multiline
        onChange={setExtra}
        resize="none"
        value={extra}
        w="full"
      />
    </Frame>
  );
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
