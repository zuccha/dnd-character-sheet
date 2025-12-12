import { VStack } from "@chakra-ui/react";
import Frame from "~/views/character-sheet-view/frame";
import CharacterLevel from "./fields/character-level";
import CharacterName from "./fields/character-name";
import CharacterTitle from "./fields/character-title";

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
          <CharacterName />
          <CharacterTitle />
        </VStack>

        <CharacterLevel />
      </Frame>
    </VStack>
  );
}
