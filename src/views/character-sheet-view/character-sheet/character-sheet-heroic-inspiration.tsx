import { useActiveCharacterHeroicInspiration } from "~/character/active-character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import Checkbox from "~/ui/checkbox";
import Frame from "./frame";

//------------------------------------------------------------------------------
// Character Sheet Heroic Inspiration
//------------------------------------------------------------------------------

export default function CharacterSheetHeroicInspiration() {
  const { t } = useI18nLangContext(i18nContext);
  const [heroicInspiration, setHeroicInspiration] =
    useActiveCharacterHeroicInspiration();

  return (
    <Frame textAlign="center" title={t("heroic_inspiration.label")}>
      <Checkbox
        checked={heroicInspiration}
        name="character-heroic-inspiration"
        onValueChange={setHeroicInspiration}
        size="sm"
      />
    </Frame>
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "heroic_inspiration.label": {
    en: "Heroic Inspiration",
    it: "Ispirazione Eroica",
  },
};
