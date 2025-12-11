import { VStack } from "@chakra-ui/react";
import ThemeButton from "../../theme/theme-button";

export default function Sidebar() {
  return (
    <VStack bgColor="bg.l1" borderRightWidth={1} h="100vh" w="20em">
      <ThemeButton />
    </VStack>
  );
}
