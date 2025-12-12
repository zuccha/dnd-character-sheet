import { useActiveCharacterTitle } from "~/character/active-character-store";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import EditableText from "~/ui/editable-text";

//------------------------------------------------------------------------------
// Character Sheet Title
//------------------------------------------------------------------------------

export default function CharacterSheetTitle() {
  const { t } = useI18nLangContext(i18nContext);
  const [title, setTitle] = useActiveCharacterTitle();

  return (
    <EditableText
      fontSize="cs.h2"
      name="character-title"
      onChange={setTitle}
      placeholder={t("title.placeholder")}
      value={title}
      w="full"
    />
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "title.placeholder": {
    en: "Species, class, and size...",
    it: "Specie, classe, e taglia...",
  },
};
