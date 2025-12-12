import {
  Menu as ChakraMenu,
  type MenuRootProps as ChakraMenuProps,
  Portal,
} from "@chakra-ui/react";

//------------------------------------------------------------------------------
// Menu
//------------------------------------------------------------------------------

export type MenuProps = ChakraMenuProps & {
  items: {
    destructive?: boolean;
    label: string;
    onClick: () => void;
    value: string;
  }[];
};

export default function Menu({ children, items, ...rest }: MenuProps) {
  return (
    <ChakraMenu.Root {...rest}>
      <ChakraMenu.Trigger asChild>{children}</ChakraMenu.Trigger>
      <Portal>
        <ChakraMenu.Positioner>
          <ChakraMenu.Content>
            {items.map(({ destructive, label, onClick, value }) => (
              <ChakraMenu.Item
                color={destructive ? "fg.error" : undefined}
                key={value}
                onClick={onClick}
                value={value}
              >
                {label}
              </ChakraMenu.Item>
            ))}
          </ChakraMenu.Content>
        </ChakraMenu.Positioner>
      </Portal>
    </ChakraMenu.Root>
  );
}
