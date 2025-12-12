import { useActiveCharacterName } from "~/character/active-character-store";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import EditableText from "~/ui/editable-text";

//------------------------------------------------------------------------------
// Character Sheet Name
//------------------------------------------------------------------------------

export default function CharacterSheetName() {
  const { t } = useI18nLangContext(i18nContext);
  const [name, setName] = useActiveCharacterName();

  return (
    <EditableText
      fontSize="cs.h1"
      name="character-name"
      onChange={setName}
      placeholder={t("name.placeholder")}
      value={name}
      w="full"
    />
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "name.placeholder": {
    en: "Name...",
    it: "Nome...",
  },
};
