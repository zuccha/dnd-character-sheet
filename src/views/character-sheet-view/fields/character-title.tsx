import { useState } from "react";
import EditableText from "~/ui/editable-text";
import { useI18nLangContext } from "../../../i18n/i18n-lang-context";

export default function CharacterTitle() {
  const { t } = useI18nLangContext(i18nContext);
  const [title, setTitle] = useState(t("title.default"));

  return (
    <EditableText
      fontSize="cs.h2"
      name="character-title"
      onChange={setTitle}
      placeholder="Species, class, and size..."
      value={title}
      w="full"
    />
  );
}

const i18nContext = {
  "title.default": {
    en: "Elf Ranger, Medium Size",
    it: "Ranger Elfo, Taglia Media",
  },

  "title.placeholder": {
    en: "Species, class, and size...",
    it: "Specie, classe, e taglia...",
  },
};
