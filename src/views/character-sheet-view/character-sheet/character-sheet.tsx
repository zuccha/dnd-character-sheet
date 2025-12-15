import { HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Frame from "~/views/character-sheet-view/character-sheet/frame";
import CharacterSheetAbility from "./character-sheet-ability";
import CharacterSheetArmorClass from "./character-sheet-armor-class";
import CharacterSheetArmorProficiencies from "./character-sheet-armor-proficiencies";
import CharacterSheetDeathSavingThrows from "./character-sheet-death-saving-throws";
import CharacterSheetExhaustion from "./character-sheet-exhaustion";
import CharacterSheetHp from "./character-sheet-hp";
import CharacterSheetHpDice from "./character-sheet-hp-dice";
import CharacterSheetInitiative from "./character-sheet-initiative";
import CharacterSheetLevel from "./character-sheet-level";
import CharacterSheetMaxHp from "./character-sheet-max-hp";
import CharacterSheetName from "./character-sheet-name";
import CharacterSheetPassivePerception from "./character-sheet-passive-perception";
import CharacterSheetProficiencyBonus from "./character-sheet-proficiency-bonus";
import CharacterSheetTitle from "./character-sheet-title";

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
        <VStack gap={2}>
          <SimpleGrid columns={2} gap={2} justifyContent="stretch" w="full">
            <VStack align="stretch">
              <VStack flex={1} gap={2}>
                <CharacterSheetProficiencyBonus flex={1} />
                <CharacterSheetInitiative flex={1} />
                <CharacterSheetPassivePerception flex={1} />
              </VStack>
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

          <SimpleGrid columns={2} gap={2} justifyContent="stretch" w="full">
            <CharacterSheetArmorProficiencies />
          </SimpleGrid>
        </VStack>
      </SimpleGrid>
    </VStack>
  );
}
