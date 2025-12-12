import {
  CloseButton,
  Dialog as ChakraDialog,
  type DialogRootProps as ChakraDialogRootProps,
  Portal,
} from "@chakra-ui/react";
import Button from "./button";

//------------------------------------------------------------------------------
// Dialog
//------------------------------------------------------------------------------

export type DialogProps = Omit<ChakraDialogRootProps, "onOpenChange"> & {
  cancelText: string;
  confirmText: string;
  destructive?: boolean;
  onConfirm: () => void;
  onOpenChange: (open: boolean) => void;
  title: string;
};

export default function Dialog({
  cancelText,
  children,
  confirmText,
  destructive,
  onConfirm,
  onOpenChange,
  open,
  title,
}: DialogProps) {
  return (
    <ChakraDialog.Root
      lazyMount
      onOpenChange={(e) => onOpenChange(e.open)}
      open={open}
    >
      <Portal>
        <ChakraDialog.Backdrop />
        <ChakraDialog.Positioner>
          <ChakraDialog.Content>
            <ChakraDialog.Header>
              <ChakraDialog.Title>{title}</ChakraDialog.Title>
            </ChakraDialog.Header>

            <ChakraDialog.Body>{children}</ChakraDialog.Body>

            <ChakraDialog.Footer>
              <ChakraDialog.ActionTrigger asChild>
                <Button onClick={() => onOpenChange(false)} variant="outline">
                  {cancelText}
                </Button>
              </ChakraDialog.ActionTrigger>

              <Button
                colorPalette={destructive ? "red" : undefined}
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
            </ChakraDialog.Footer>

            <ChakraDialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </ChakraDialog.CloseTrigger>
          </ChakraDialog.Content>
        </ChakraDialog.Positioner>
      </Portal>
    </ChakraDialog.Root>
  );
}
