import { SaveIcon } from "lucide-react";
import { useCallback, useLayoutEffect } from "react";
import { useActiveCharacterHasUnsavedChanges } from "~/character/active-character";
import { useCreateAndSaveActiveCharacter } from "~/character/characters";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import IconButton, { type IconButtonProps } from "~/ui/icon-button";

//------------------------------------------------------------------------------
// Save Button
//------------------------------------------------------------------------------

export type SaveButtonProps = Omit<IconButtonProps, "Icon" | "onClick">;

export default function SaveButton(props: SaveButtonProps) {
  const { t } = useI18nLangContext(i18nContext);

  const unsavedChanges = useActiveCharacterHasUnsavedChanges();
  const createAndSaveActiveCharacter = useCreateAndSaveActiveCharacter();

  const save = useCallback(() => {
    createAndSaveActiveCharacter(t("character.display_name.default"));
  }, [createAndSaveActiveCharacter, t]);

  useLayoutEffect(() => {
    const saveOnPressCtrlS = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        save();
      }
    };

    window.addEventListener("keydown", saveOnPressCtrlS);
    return () => window.removeEventListener("keydown", saveOnPressCtrlS);
  }, [save]);

  return (
    <IconButton
      Icon={SaveIcon}
      disabled={!unsavedChanges}
      onClick={save}
      {...props}
    />
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "character.display_name.default": {
    en: "New character",
    it: "Nuovo personaggio",
  },
};
