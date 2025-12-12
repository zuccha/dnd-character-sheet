import { HStack, Text, VStack, createListCollection } from "@chakra-ui/react";
import ThemeButton from "~/theme/theme-button";
import Select from "~/ui/select";
import { useI18nLang } from "../../../i18n/i18n-lang";

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
      <HStack align="center" justify="space-between" w="full">
        <Text>D&D 5e 2024</Text>
        <ThemeButton />
      </HStack>

      <Select onValueChange={setLang} options={langOptions} value={lang} />
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
