import { Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { hoverStyles } from "~/theme/common-styles";

export default function CharacterLevel() {
  const [level] = useState(1);

  return (
    <VStack
      _hover={hoverStyles}
      aspectRatio={1}
      bgColor="bg.inverted"
      color="fg.inverted"
      cursor="pointer"
      gap={0}
      h="full"
      justify="center"
    >
      <Text fontSize="cs.h4">LVL</Text>
      <Text fontSize="cs.value.md">{level}</Text>
    </VStack>
  );
}
