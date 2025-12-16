import { HStack, Stack, type StackProps, VStack } from "@chakra-ui/react";
import { PanelLeftIcon } from "lucide-react";
import { useMemo } from "react";
import { i18nLangs, useI18nLang } from "~/i18n/i18n-lang";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import { i18nUnitSystems, useI18nUnitSystem } from "~/i18n/i18n-unit-system";
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
  const { t } = useI18nLangContext(i18nContext);

  const [lang, setLang] = useI18nLang();
  const [unitSystem, setUnitSystem] = useI18nUnitSystem();

  const langOptions = useMemo(
    () =>
      i18nLangs.map((lang) => ({
        label: t(`lang[${lang}]`),
        value: lang,
      })),
    [t],
  );

  const unitSystemOptions = useMemo(
    () =>
      i18nUnitSystems.map((unitSystem) => ({
        label: t(`unit_system[${unitSystem}]`),
        value: unitSystem,
      })),
    [t],
  );

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

      <HStack w="full">
        <Select onValueChange={setLang} options={langOptions} value={lang} />
        <Select
          onValueChange={setUnitSystem}
          options={unitSystemOptions}
          value={unitSystem}
        />
      </HStack>

      <CharacterList />
    </VStack>
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "lang[en]": {
    en: "EN",
    it: "EN",
  },

  "lang[it]": {
    en: "IT",
    it: "IT",
  },

  "unit_system[imperial]": {
    en: "Imperial",
    it: "Imperiale",
  },

  "unit_system[metric]": {
    en: "Metric",
    it: "Metrico",
  },
};
