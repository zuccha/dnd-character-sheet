import { HStack, VStack } from "@chakra-ui/react";
import Frame from "~/views/character-sheet-view/frame";
import CharacterSheetArmorClass from "./fields/character-sheet-armor-class";
import CharacterSheetLevel from "./fields/character-sheet-level";
import CharacterSheetMaxHp from "./fields/character-sheet-max-hp";
import CharacterSheetName from "./fields/character-sheet-name";
import CharacterSheetTitle from "./fields/character-sheet-title";

//------------------------------------------------------------------------------
// Character Sheet
//------------------------------------------------------------------------------

export default function CharacterSheet() {
  return (
    <VStack
      bgColor="bg.cs.page"
      cursor="default"
      fontFamily="Mr Eaves Alt"
      height="29.7cm"
      lineHeight={0.9}
      p="1cm"
      width="21cm"
    >
      <Frame flexDirection="row" gap={4} justify="space-between" w="full">
        <VStack align="flex-start" flex={1} gap={1}>
          <CharacterSheetName />
          <CharacterSheetTitle />
        </VStack>

        <CharacterSheetLevel />
      </Frame>

      <HStack w="full">
        <CharacterSheetArmorClass />
        <CharacterSheetMaxHp />
      </HStack>
    </VStack>
  );
}
