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
} & (
    | {
        allowEmpty?: false;
        onChange: (value: number) => void;
        onValidate?: (value: number) => string | undefined;
        value: number;
      }
    | {
        allowEmpty: true;
        onChange: (value: number | null) => void;
        onValidate?: (value: number | null) => string | undefined;
        value: number | null;
      }
  );

export default function EditableNumber({
  allowEmpty,
  integer,
  max,
  min,
  name,
  onChange,
  onValidate,
  value,
  ...rest
}: EditableNumberProps) {
  const change = useCallback(
    (text: string) => {
      if (!text.trim() && allowEmpty) onChange(null);
      else onChange(Number(text));
    },
    [allowEmpty, onChange],
  );

  const validate = useCallback(
    (text: string): string | undefined => {
      if (text.trim() === "")
        return allowEmpty ? onValidate?.(null) : error(name, "nan");

      const nextValue = Number(text);
      if (Number.isNaN(nextValue)) return error(name, "nan");
      if (integer && !Number.isInteger(nextValue)) return error(name, "int");
      if (max !== undefined && nextValue > max) return error(name, "max");
      if (min !== undefined && nextValue < min) return error(name, "min");
      return onValidate?.(nextValue);
    },
    [allowEmpty, integer, max, min, name, onValidate],
  );

  return (
    <EditableText
      {...rest}
      name={name}
      onChange={change}
      onValidate={validate}
      value={value === null ? "" : `${value}`}
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
