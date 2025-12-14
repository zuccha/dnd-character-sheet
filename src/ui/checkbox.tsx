import { Box } from "@chakra-ui/react";
import { type ReactNode, useCallback } from "react";
import CheckboxFrameIcon from "~/icons/checkbox-frame-icon";
import CheckboxCrossIcon from "../icons/checkbox-cross-icon";
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
        Icon={CheckboxFrameIcon}
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
        <Box left="0" pointerEvents="none" position="absolute" top="0">
          {children}
        </Box>
      )}

      {checked && (
        <Box left="0" pointerEvents="none" position="absolute" top="0">
          <CheckboxCrossIcon />
        </Box>
      )}
    </Box>
  );
}
