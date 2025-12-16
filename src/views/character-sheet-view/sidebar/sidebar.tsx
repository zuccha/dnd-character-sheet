import { HStack, Stack, type StackProps, VStack } from "@chakra-ui/react";
import { PanelLeftIcon } from "lucide-react";
import { i18nLangs, useI18nLang } from "~/i18n/i18n-lang";
import ThemeButton from "~/theme/theme-button";
import IconButton from "~/ui/icon-button";
import Select from "~/ui/select";
import CharacterList from "./character-list";
import SaveButton from "./save-button";

//------------------------------------------------------------------------------
// Sidebar
//------------------------------------------------------------------------------

export type SidebarProps = StackProps & {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
};

export default function Sidebar({
  collapsed,
  onCollapsedChange,
  ...rest
}: SidebarProps) {
  const [lang, setLang] = useI18nLang();

  if (collapsed) {
    return (
      <Stack {...rest}>
        <IconButton
          Icon={PanelLeftIcon}
          m={2}
          onClick={() => onCollapsedChange(false)}
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
      {...rest}
    >
      <HStack align="center" w="full">
        <HStack flex={1} gap={0}>
          <SaveButton size="sm" variant="ghost" />
          <ThemeButton size="sm" variant="ghost" />
        </HStack>

        <IconButton
          Icon={PanelLeftIcon}
          onClick={() => onCollapsedChange(true)}
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

const langOptions = i18nLangs.map((lang) => ({
  label: lang.toUpperCase(),
  value: lang,
}));
