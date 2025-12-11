import { Input, type InputProps } from "@chakra-ui/react";
import { useState } from "react";
import {
  focusInvalidStyles,
  focusStyles,
  hoverInvalidStyles,
  hoverStyles,
} from "../theme/common-styles";

export type EditableTextProps = Omit<
  InputProps,
  "onBlur" | "onChange" | "value"
> & {
  onChange: (text: string) => void;
  onValidate?: (text: string) => string | undefined;
  text: string;
};

export default function EditableText({
  onChange,
  onValidate = () => undefined,
  text,
  ...rest
}: EditableTextProps) {
  const [tempText, setTempText] = useState(text);

  const blur: React.FocusEventHandler<HTMLDivElement> = () => {
    const error = onValidate(tempText);

    if (error) {
      setTempText(text);
      console.error(error); // TODO: Show toast.
    } else {
      onChange(tempText);
    }
  };

  const change: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTempText(e.target.value);
  };

  const invalid = !!onValidate(tempText);
  const _focus = invalid ? focusInvalidStyles : focusStyles;
  const _hover = invalid ? hoverInvalidStyles : hoverStyles;

  return (
    <Input
      _focus={_focus}
      _hover={_hover}
      bgColor="transparent"
      spellCheck={false}
      unstyled
      {...rest}
      onBlur={blur}
      onChange={change}
      value={tempText}
    />
  );
}
