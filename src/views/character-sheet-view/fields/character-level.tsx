import { Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { focusStyles } from "~/theme/common-styles";
import EditableNumber from "../../../ui/editable-number";

export default function CharacterLevel() {
  const [level, setLevel] = useState(1);

  return (
    <VStack
      _focus={focusStyles}
      aspectRatio={1}
      bgColor="bg.inverted"
      className="group"
      color="fg.inverted"
      gap={0}
      h="full"
      justify="center"
      position="relative"
    >
      <Text fontSize="cs.h4">LVL</Text>

      <EditableNumber
        fontSize="cs.value.md"
        integer
        max={20}
        min={0}
        onChange={setLevel}
        textAlign="center"
        value={level}
        w="2em"
      />
    </VStack>
  );
}
