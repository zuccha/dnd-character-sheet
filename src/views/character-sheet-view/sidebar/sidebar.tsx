import {
  HStack,
  Stack,
  type StackProps,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import { PanelLeftIcon } from "lucide-react";
import { useState } from "react";
import { useI18nLang } from "~/i18n/i18n-lang";
import ThemeButton from "~/theme/theme-button";
import IconButton from "~/ui/icon-button";
import Select from "~/ui/select";
import { isTouch } from "~/utils/window";
import CharacterList from "./character-list";
import SaveButton from "./save-button";

//------------------------------------------------------------------------------
// Sidebar
//------------------------------------------------------------------------------

export type SidebarProps = StackProps;

export default function Sidebar(props: SidebarProps) {
  const [lang, setLang] = useI18nLang();

  const [collapsed, setCollapsed] = useState(isTouch);

  if (collapsed) {
    return (
      <Stack {...props}>
        <IconButton
          Icon={PanelLeftIcon}
          m={2}
          onClick={() => setCollapsed(false)}
          position="absolute"
          size="sm"
        />
      </Stack>
    );
  }

  return (
    <VStack
      bgColor="bg.l1"
      borderRightWidth={1}
      h="100vh"
      px={4}
      py={2}
      w="20em"
      {...props}
    >
      <HStack align="center" w="full">
        <HStack flex={1} gap={0}>
          <SaveButton size="sm" variant="ghost" />
          <ThemeButton size="sm" variant="ghost" />
        </HStack>

        <IconButton
          Icon={PanelLeftIcon}
          onClick={() => setCollapsed(true)}
          size="sm"
          variant="ghost"
        />
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
