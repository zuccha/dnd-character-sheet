import { HStack, VStack } from "@chakra-ui/react";
import ThemeButton from "../../theme/theme-button";

export default function Sidebar() {
  return (
    <VStack
      bgColor="bg.l1"
      borderRightWidth={1}
      h="100vh"
      px={4}
      py={2}
      w="20em"
    >
      <HStack justify="flex-end" w="full">
        <ThemeButton />
      </HStack>
    </VStack>
  );
}
