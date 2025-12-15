import { Center, Span, type StackProps } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import { type CharacterAbilityCheck } from "~/character/character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import { touchVisibilityStyles } from "~/theme/common-styles";
import EditableNumber from "~/ui/editable-number";
import { toaster } from "~/ui/toaster";
import { type StateUpdate } from "~/utils/state";
import InferableNumberButton from "../inferable-number-button";
import SkillProficiencyButton from "../skill-proficiency-button";

//------------------------------------------------------------------------------
// Character Sheet Ability Check
//------------------------------------------------------------------------------

export type CharacterSheetAbilityCheckProps = Omit<StackProps, "onChange"> & {
  check: CharacterAbilityCheck & { value: number };
  label: string;
  name: string;
  onChange: (update: StateUpdate<CharacterAbilityCheck>) => void;
};

export default function CharacterSheetAbilityCheck({
  check,
  label,
  name,
  onChange,
  ...rest
}: CharacterSheetAbilityCheckProps) {
  const i18nContext = useMemo(() => {
    const lowercaseLabel = label.toLocaleLowerCase();
    return {
      [`editable_number[character-${name}].error.int`]: {
        en: `The ${lowercaseLabel} modifier must be an integer`,
        it: `Il modificatore di ${lowercaseLabel} deve essere un numero intero`,
      },

      [`editable_number[character-${name}].error.nan`]: {
        en: `The ${lowercaseLabel} modifier must be a number`,
        it: `Il modificatore di ${lowercaseLabel} deve essere un numero`,
      },

      "check.placeholder": {
        en: "+0",
        it: "+0",
      },
    };
  }, [label, name]);

  const { t } = useI18nLangContext(i18nContext);

  const error = useCallback((e: string) => toaster.error({ title: t(e) }), [t]);

  return (
    <Center className="group" position="relative" {...rest}>
      <Span gap={0} w="full">
        <SkillProficiencyButton
          onCycle={onChange}
          proficiency={check.proficiency}
        />

        <EditableNumber
          alwaysShowSign
          disabled={check.inferred}
          fontSize="cs.h5"
          integer
          name={`character-${name}`}
          onChange={(customValue) =>
            onChange((prev) => ({ ...prev, customValue }))
          }
          onError={error}
          placeholder={t("check.placeholder")}
          textAlign="center"
          value={check.value}
          w="2.5em"
        />

        <Span flex={1} fontFamily="Bookinsanity" fontSize="cs.h5">
          {label}
        </Span>
      </Span>

      <InferableNumberButton
        {...touchVisibilityStyles}
        inferred={check.inferred}
        onClick={onChange}
        position="absolute"
        right={-3}
        transform="scale(60%, 60%)"
      />
    </Center>
  );
}
