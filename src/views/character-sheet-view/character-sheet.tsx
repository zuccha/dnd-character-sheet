import { HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Frame from "~/views/character-sheet-view/frame";
import CharacterSheetAbility from "./fields/character-sheet-ability";
import CharacterSheetArmorClass from "./fields/character-sheet-armor-class";
import CharacterSheetDeathSavingThrows from "./fields/character-sheet-death-saving-throws";
import CharacterSheetExhaustion from "./fields/character-sheet-exhaustion";
import CharacterSheetHp from "./fields/character-sheet-hp";
import CharacterSheetHpDice from "./fields/character-sheet-hp-dice";
import CharacterSheetLevel from "./fields/character-sheet-level";
import CharacterSheetMaxHp from "./fields/character-sheet-max-hp";
import CharacterSheetName from "./fields/character-sheet-name";
import CharacterSheetProficiencyBonus from "./fields/character-sheet-proficiency-bonus";
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
        <CharacterSheetHp flex={1} h="full" />
        <CharacterSheetHpDice h="full" />
        <VStack align="stretch" h="full" justify="stretch">
          <CharacterSheetDeathSavingThrows flex={1} />
          <CharacterSheetExhaustion flex={1} />
        </VStack>
      </HStack>

      <SimpleGrid columns={2} gap={2} w="full">
        <SimpleGrid columns={2} gap={2} justifyContent="stretch" w="full">
          <VStack>
            <CharacterSheetProficiencyBonus />
            <CharacterSheetAbility abilityKey="strength" />
            <CharacterSheetAbility abilityKey="constitution" />
            <CharacterSheetAbility abilityKey="dexterity" />
          </VStack>

          <VStack>
            <CharacterSheetAbility abilityKey="intelligence" />
            <CharacterSheetAbility abilityKey="wisdom" />
            <CharacterSheetAbility abilityKey="charisma" />
          </VStack>
        </SimpleGrid>
      </SimpleGrid>
    </VStack>
  );
}
