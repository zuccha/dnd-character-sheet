import {
  Input,
  type InputProps,
  Textarea,
  type TextareaProps,
} from "@chakra-ui/react";
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

type OmittedProps = "multiline" | "onBlur" | "onChange" | "onError" | "value";

export type EditableTextProps = (
  | (Omit<TextareaProps, OmittedProps> & { multiline: true })
  | (Omit<InputProps, OmittedProps> & { multiline?: false })
) & {
  onChange: (value: string) => void;
  onError?: (error: string, value: string) => void;
  onValidate?: (value: string) => string | undefined;
  value: string;
};

export default function EditableText({
  disabled,
  onChange,
  onError = console.error,
  onValidate = () => undefined,
  readOnly,
  value,
  ...rest
}: EditableTextProps) {
  const [tempValue, setTempValue] = useState(value);
  useLayoutEffect(() => setTempValue(value), [value]);

  const blur = useCallback(() => {
    const error = onValidate(tempValue);

    if (error) {
      setTempValue(value);
      onError(error, value);
    } else {
      onChange(tempValue);
    }
  }, [onChange, onError, onValidate, tempValue, value]);

  const change = useCallback(
    (e: { target: { value: string } }) => setTempValue(e.target.value),
    [],
  );

  const invalid = !!onValidate(tempValue);
  const _focus = invalid ? focusInvalidStyles : focusStyles;
  const _hover = invalid ? hoverInvalidStyles : hoverStyles;

  const preProps = {
    _focus: disabled || readOnly ? undefined : _focus,
    _hover: disabled || readOnly ? undefined : _hover,
    bgColor: "transparent",
    disabled: disabled,
    readOnly: readOnly,
    spellCheck: false,
    unstyled: true,
  };

  const postProps = {
    multiline: undefined,
    onBlur: blur,
    onChange: change,
    value: tempValue,
  };

  return rest.multiline ?
      <Textarea {...preProps} {...rest} {...postProps} />
    : <Input {...preProps} {...rest} {...postProps} />;
}
