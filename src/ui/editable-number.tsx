import { useCallback } from "react";
import EditableText, { type EditableTextProps } from "./editable-text";

//------------------------------------------------------------------------------
// Editable Number
//------------------------------------------------------------------------------

export type EditableNumberProps = Omit<
  EditableTextProps,
  "onChange" | "onValidate" | "value"
> & {
  integer?: boolean;
  max?: number;
  min?: number;
  onChange: (value: number) => void;
  onValidate?: (value: number) => string | undefined;
  value: number;
};

export default function EditableNumber({
  integer,
  max,
  min,
  name,
  onChange,
  onValidate = () => undefined,
  value,
  ...rest
}: EditableNumberProps) {
  const change = useCallback(
    (text: string) => {
      onChange(Number(text));
    },
    [onChange],
  );

  const validate = useCallback(
    (text: string): string | undefined => {
      const nextValue = Number(text);
      if (Number.isNaN(nextValue)) return error(name, "nan");
      if (integer && !Number.isInteger(nextValue)) return error(name, "int");
      if (max !== undefined && nextValue > max) return error(name, "max");
      if (min !== undefined && nextValue < min) return error(name, "min");
      return onValidate(nextValue);
    },
    [integer, max, min, name, onValidate],
  );

  return (
    <EditableText
      {...rest}
      name={name}
      onChange={change}
      onValidate={validate}
      placeholder="0"
      value={`${value}`}
    />
  );
}

//------------------------------------------------------------------------------
// Error
//------------------------------------------------------------------------------

const error = (name: string | undefined, code: string): string =>
  name ?
    `editable_number[${name}].error.${code}`
  : `editable_number.error.${code}`;
