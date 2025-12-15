import { type StackProps, Text, VStack } from "@chakra-ui/react";

//------------------------------------------------------------------------------
// Frame
//------------------------------------------------------------------------------

export type FrameProps = StackProps & {
  title?: string;
};

export default function Frame({ children, title, ...rest }: FrameProps) {
  return (
    <VStack
      bgColor="bg.cs.frame"
      borderColor="border.inverted"
      borderWidth={1}
      gap={1}
      px={3}
      py={2}
      {...rest}
    >
      {title && <Text fontSize="cs.h4">{title}</Text>}
      {children}
    </VStack>
  );
}
