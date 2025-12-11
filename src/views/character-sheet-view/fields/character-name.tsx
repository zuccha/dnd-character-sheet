import { useState } from "react";
import EditableText from "~/ui/editable-text";
import { useI18nLangContext } from "../../../i18n/i18n-lang-context";

export default function CharacterName() {
  const { t } = useI18nLangContext(i18nContext);
  const [name, setName] = useState(t("name.default"));

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

const i18nContext = {
  "name.default": {
    en: "Gilear Faeth",
    it: "Gilear Faeth",
  },

  "name.placeholder": {
    en: "Name...",
    it: "Nome...",
  },
};
