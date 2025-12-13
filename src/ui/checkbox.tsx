import { SquareIcon, SquareXIcon } from "lucide-react";
import { useCallback } from "react";
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
      Icon={checked ? SquareXIcon : SquareIcon}
      borderRadius={2}
      cursor={disabled ? "disabled" : "pointer"}
      disabled={disabled}
      onClick={toggle}
      unstyled
      {...rest}
    />
  );
}
