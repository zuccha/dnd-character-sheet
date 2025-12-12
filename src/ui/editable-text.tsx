import { Input, type InputProps } from "@chakra-ui/react";
import { useCallback, useLayoutEffect, useState } from "react";
import {
  focusInvalidStyles,
  focusStyles,
  hoverInvalidStyles,
  hoverStyles,
} from "../theme/common-styles";

//------------------------------------------------------------------------------
// Editable Text
//------------------------------------------------------------------------------

export type EditableTextProps = Omit<
  InputProps,
  "onBlur" | "onChange" | "onError" | "value"
> & {
  onChange: (value: string) => void;
  onError?: (error: string, value: string) => void;
  onValidate?: (value: string) => string | undefined;
  value: string;
};

export default function EditableText({
  onChange,
  onError = console.error,
  onValidate = () => undefined,
  value,
  ...rest
}: EditableTextProps) {
  const [tempValue, setTempValue] = useState(value);
  useLayoutEffect(() => setTempValue(value), [value]);

  const blur: React.FocusEventHandler<HTMLDivElement> = useCallback(() => {
    const error = onValidate(tempValue);

    if (error) {
      setTempValue(value);
      onError(error, value);
    } else {
      onChange(tempValue);
    }
  }, [onChange, onError, onValidate, tempValue, value]);

  const change: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setTempValue(e.target.value),
    [],
  );

  const invalid = !!onValidate(tempValue);
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
      value={tempValue}
    />
  );
}
