import { Box } from "@chakra-ui/react";
import { type ReactNode, useCallback } from "react";
import CheckboxEmptyIcon from "~/icons/checkbox-empty-icon";
import CheckboxCrossedIcon from "../icons/checkbox-crossed-icon";
import IconButton, { type IconButtonProps } from "./icon-button";

//------------------------------------------------------------------------------
// Checkbox
//------------------------------------------------------------------------------

export type CheckboxProps = Omit<IconButtonProps, "Icon" | "onClick"> & {
  checked: boolean;
  children?: ReactNode;
  disabled?: boolean;
  onValueChange?: (checked: boolean) => void;
};

export default function Checkbox({
  checked,
  children,
  disabled,
  onValueChange,
  ...rest
}: CheckboxProps) {
  const toggle = useCallback(() => {
    onValueChange?.(!checked);
  }, [checked, onValueChange]);

  return (
    <Box position="relative">
      <IconButton
        Icon={CheckboxEmptyIcon}
        aspectRatio={1}
        borderRadius={2}
        cursor={disabled ? "disabled" : "pointer"}
        disabled={disabled}
        lineHeight={0}
        onClick={toggle}
        unstyled
        {...rest}
      />

      {children && (
        <Box left="0.5px" pointerEvents="none" position="absolute" top="0.5px">
          {children}
        </Box>
      )}

      {checked && (
        <Box left="0" pointerEvents="none" position="absolute" top="0">
          <CheckboxCrossedIcon />
        </Box>
      )}
    </Box>
  );
}
