import { Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { hoverStyles } from "~/theme/common-styles";
import EditableText from "~/ui/editable-text";
import Frame from "~/ui/frame";

export default function CharacterSheet() {
  const [name, setName] = useState("Doranakan Ashendel");
  const [title, setTitle] = useState("Ranger Mezzelfo, Taglia Media");
  const [level] = useState("1");

  return (
    <VStack
      bgColor="bg.muted"
      cursor="default"
      fontFamily="Mr Eaves Alt"
      height="29.7cm"
      lineHeight={0.9}
      p="1cm"
      width="21cm"
    >
      <Frame flexDirection="row" gap={4} justify="space-between" w="full">
        <VStack align="flex-start" flex={1} gap={1}>
          <EditableText
            fontSize="cs.h1"
            name="character-name"
            onChange={setName}
            placeholder="Name..."
            text={name}
            w="full"
          />
          <EditableText
            fontSize="cs.h2"
            name="character-title"
            onChange={setTitle}
            placeholder="Species, class, and size..."
            text={title}
            w="full"
          />
        </VStack>

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
      </Frame>
    </VStack>
  );
}
