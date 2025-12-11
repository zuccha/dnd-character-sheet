import { HStack } from "@chakra-ui/react";
import PanZoom from "~/ui/pan-zoom";
import CharacterSheet from "./character-sheet";
import Sidebar from "./sidebar";

export default function CharacterSheetView() {
  return (
    <HStack gap={0}>
      <Sidebar />

      <PanZoom bgColor="bg.l2" h="100vh" w="full">
        <CharacterSheet />
      </PanZoom>
    </HStack>
  );
}
