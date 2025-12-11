import { useCallback } from "react";
import EditableText, { type EditableTextProps } from "./editable-text";

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
      if (Number.isNaN(nextValue)) return "error.nan";
      if (integer && !Number.isInteger(nextValue)) return "error.integer";
      if (max !== undefined && nextValue > max) return "error.max";
      if (min !== undefined && nextValue < min) return "error.min";
      return onValidate(nextValue);
    },
    [integer, max, min, onValidate],
  );

  return (
    <EditableText
      {...rest}
      onChange={change}
      onValidate={validate}
      placeholder="0"
      value={`${value}`}
    />
  );
}
