import { Text, VStack } from "@chakra-ui/react";
import Frame from "~/ui/frame";

export default function CharacterSheet() {
  return (
    <VStack
      bgColor="bg.muted"
      fontFamily="Mr Eaves Alt"
      height="29.7cm"
      lineHeight={0.9}
      p="1cm"
      width="21cm"
    >
      <Frame flexDirection="row" justify="space-between" w="full">
        <VStack align="flex-start" gap={1}>
          <Text fontSize="cs.h1">Doranakan Ashendel</Text>
          <Text fontSize="cs.h2">Ranger Mezzelfo, Taglia Media</Text>
        </VStack>

        <VStack
          aspectRatio={1}
          bgColor="bg.inverted"
          color="fg.inverted"
          gap={0}
          h="full"
          justify="center"
        >
          <Text fontSize="cs.h4">LVL</Text>
          <Text fontSize="cs.value.md">3</Text>
        </VStack>
      </Frame>
    </VStack>
  );
}
