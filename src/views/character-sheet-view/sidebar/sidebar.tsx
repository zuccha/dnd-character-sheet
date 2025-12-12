import { HStack, Text, VStack, createListCollection } from "@chakra-ui/react";
import { useI18nLang } from "~/i18n/i18n-lang";
import ThemeButton from "~/theme/theme-button";
import Select from "~/ui/select";
import CharacterList from "./character-list";
import SaveButton from "./save-button";

//------------------------------------------------------------------------------
// Sidebar
//------------------------------------------------------------------------------

export default function Sidebar() {
  const [lang, setLang] = useI18nLang();

  return (
    <VStack
      bgColor="bg.l1"
      borderRightWidth={1}
      h="100vh"
      px={4}
      py={2}
      w="20em"
    >
      <HStack align="center" w="full">
        <Text flex={1}>D&D 5e 2024</Text>

        <HStack gap={0}>
          <SaveButton size="sm" variant="ghost" />
          <ThemeButton size="sm" variant="ghost" />
        </HStack>
      </HStack>

      <Select onValueChange={setLang} options={langOptions} value={lang} />

      <CharacterList />
    </VStack>
  );
}

//------------------------------------------------------------------------------
// Lang Options
//------------------------------------------------------------------------------

const langOptions = createListCollection({
  items: [
    { label: "EN", value: "en" },
    { label: "IT", value: "it" },
  ] as [{ label: string; value: "en" }, { label: string; value: "it" }],
});
