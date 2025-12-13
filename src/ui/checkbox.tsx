import { useCallback } from "react";
import CheckboxEmptyIcon from "~/icons/checkbox-empty-icon";
import CheckboxFilledIcon from "~/icons/checkbox-filled-icon";
import IconButton, { type IconButtonProps } from "./icon-button";

//------------------------------------------------------------------------------
// Checkbox
//------------------------------------------------------------------------------

export type CheckboxProps = Omit<IconButtonProps, "Icon" | "onClick"> & {
  checked: boolean;
  disabled?: boolean;
  onValueChange?: (checked: boolean) => void;
};

export default function Checkbox({
  checked,
  disabled,
  onValueChange,
  ...rest
}: CheckboxProps) {
  const toggle = useCallback(() => {
    onValueChange?.(!checked);
  }, [checked, onValueChange]);

  return (
    <IconButton
      Icon={checked ? CheckboxFilledIcon : CheckboxEmptyIcon}
      aspectRatio={1}
      borderRadius={2}
      cursor={disabled ? "disabled" : "pointer"}
      disabled={disabled}
      lineHeight={0}
      onClick={toggle}
      unstyled
      {...rest}
    />
  );
}
