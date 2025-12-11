import { HStack } from "@chakra-ui/react";
import CharacterSheet from "./character-sheet";

export default function CharacterSheetView() {
  return (
    <HStack justify="center" w="full">
      <CharacterSheet />
    </HStack>
  );
}
