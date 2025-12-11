import { HStack, VStack, createListCollection } from "@chakra-ui/react";
import ThemeButton from "~/theme/theme-button";
import Select from "~/ui/select";
import { useI18nLang } from "../../i18n/i18n-lang";

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
      <HStack justify="flex-end" w="full">
        <ThemeButton />
      </HStack>

      <Select onValueChange={setLang} options={langOptions} value={lang} />
    </VStack>
  );
}

const langOptions = createListCollection({
  items: [
    { label: "EN", value: "en" },
    { label: "IT", value: "it" },
  ] as [{ label: string; value: "en" }, { label: string; value: "it" }],
});
