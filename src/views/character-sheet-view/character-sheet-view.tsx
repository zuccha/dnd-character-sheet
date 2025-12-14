import { Box, HStack } from "@chakra-ui/react";
import PanZoom from "~/ui/pan-zoom";
import CharacterSheet from "./character-sheet";
import Sidebar from "./sidebar/sidebar";

//------------------------------------------------------------------------------
// Character Sheet View
//------------------------------------------------------------------------------

export default function CharacterSheetView() {
  return (
    <HStack gap={0} position="relative">
      <PanZoom
        bgColor="bg.l2"
        h="100vh"
        initialScale={0.75}
        initialX={320}
        w="full"
      >
        <CharacterSheet />
      </PanZoom>

      <Box left={0} position="absolute" top={0}>
        <Sidebar />
      </Box>
    </HStack>
  );
}
