import { SaveIcon } from "lucide-react";
import IconButton, { type IconButtonProps } from "~/ui/icon-button";
import { useActiveCharacterHasUnsavedChanges } from "../../../character/active-character";

//------------------------------------------------------------------------------
// Save Button
//------------------------------------------------------------------------------

export type SaveButtonProps = Omit<IconButtonProps, "Icon" | "onClick">;

export default function SaveButton(props: SaveButtonProps) {
  const unsavedChanges = useActiveCharacterHasUnsavedChanges();

  return (
    <IconButton
      Icon={SaveIcon}
      disabled={!unsavedChanges}
      onClick={() => {}}
      {...props}
    />
  );
}
