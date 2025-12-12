import {
  IconButton as ChakraIconButton,
  type IconButtonProps as ChakraIconButtonProps,
} from "@chakra-ui/react";
import type { LucideIcon } from "lucide-react";

//------------------------------------------------------------------------------
// Icon Button
//------------------------------------------------------------------------------

export type IconButtonProps = Omit<ChakraIconButtonProps, "children"> & {
  Icon: LucideIcon;
};

export default function IconButton({ Icon, _focus, ...rest }: IconButtonProps) {
  return (
    <ChakraIconButton
      _focus={{
        outlineColor: "blue.600",
        outlineOffset: 0,
        ..._focus,
      }}
      rounded="full"
      {...rest}
    >
      <Icon />
    </ChakraIconButton>
  );
}
