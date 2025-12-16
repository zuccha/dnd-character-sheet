import {
  Portal,
  Select as ChakraSelect,
  type SelectRootProps as ChakraSelectRootProps,
  createListCollection,
} from "@chakra-ui/react";
import { useMemo } from "react";

//------------------------------------------------------------------------------
// Select
//------------------------------------------------------------------------------

export type SelectOption<T> = { label: string; value: T };

export type SelectProps<T extends string> = Omit<
  ChakraSelectRootProps,
  "collection" | "defaultValue" | "multiple" | "onValueChange" | "value"
> & {
  categories?: { id: string; items: SelectOption<T>[]; title: string }[];
  options: SelectOption<T>[];
  placeholder?: string;
} & (
    | {
        defaultValue?: T;
        multiple?: false;
        onValueChange?: (value: T) => void;
        value?: T;
      }
    | {
        defaultValue?: T[];
        multiple: true;
        onValueChange?: (value: T[]) => void;
        value?: T[];
      }
  );

export default function Select<T extends string>({
  categories,
  defaultValue,
  multiple,
  onValueChange,
  options,
  placeholder,
  value,
  ...rest
}: SelectProps<T>) {
  const collection = useMemo(() => {
    return createListCollection({ items: options });
  }, [options]);

  return (
    <ChakraSelect.Root
      collection={collection}
      defaultValue={
        defaultValue ?
          multiple ?
            defaultValue
          : [defaultValue]
        : undefined
      }
      multiple={multiple}
      onValueChange={
        onValueChange ?
          (e) =>
            multiple ?
              onValueChange(e.value as T[])
            : onValueChange(e.value[0] as T)
        : undefined
      }
      value={
        value ?
          multiple ?
            value
          : [value]
        : undefined
      }
      {...rest}
    >
      <ChakraSelect.HiddenSelect aria-labelledby="" />
      <ChakraSelect.Control>
        <ChakraSelect.Trigger
          _focusVisible={{ outlineColor: "blue.600", outlineOffset: 0 }}
        >
          <ChakraSelect.ValueText placeholder={placeholder} />
        </ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>

      <Portal>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content>
            {categories ?
              categories.map(({ id, items, title }) => (
                <ChakraSelect.ItemGroup key={id}>
                  <ChakraSelect.ItemGroupLabel>
                    {title}
                  </ChakraSelect.ItemGroupLabel>
                  {items.map((item) => (
                    <ChakraSelect.Item item={item} key={item.value}>
                      {item.label}
                      <ChakraSelect.ItemIndicator />
                    </ChakraSelect.Item>
                  ))}
                </ChakraSelect.ItemGroup>
              ))
            : options.map((option) => (
                <ChakraSelect.Item item={option} key={option.value}>
                  {option.label}
                  <ChakraSelect.ItemIndicator />
                </ChakraSelect.Item>
              ))
            }
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  );
}
