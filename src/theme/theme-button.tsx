import { MoonIcon, SunIcon } from "lucide-react";
import IconButton, { type IconButtonProps } from "~/ui/icon-button";
import useTheme from "./use-theme";

//------------------------------------------------------------------------------
// Theme Button
//------------------------------------------------------------------------------

export type ThemeButtonProps = Omit<IconButtonProps, "Icon" | "onClick">;

export default function ThemeButton(props: ThemeButtonProps) {
  const [theme, _setColorMode, toggleTheme] = useTheme();

  return (
    <IconButton
      Icon={theme === "dark" ? MoonIcon : SunIcon}
      aria-label="Toggle color mode"
      onClick={toggleTheme}
      {...props}
    />
  );
}
