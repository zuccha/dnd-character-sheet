import { HStack, Span, type StackProps } from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import type { CharacterSkill } from "~/character/character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import { touchVisibilityStyles } from "~/theme/common-styles";
import EditableNumber from "~/ui/editable-number";
import { toaster } from "~/ui/toaster";
import InferableNumberButton from "../inferable-number-button";
import SkillProficiencyButton from "../skill-proficiency-button";

//------------------------------------------------------------------------------
// Character Skill
//------------------------------------------------------------------------------

export type CharacterSheetSkillProps = Omit<StackProps, "onChange"> & {
  label: string;
  name: string;
  onChange: (
    updateSkill: (prevSkill: CharacterSkill) => CharacterSkill,
  ) => void;
  skill: CharacterSkill & { value: number };
};

export default function CharacterSheetSkill({
  label,
  name,
  skill,
  onChange,
  ...rest
}: CharacterSheetSkillProps) {
  const i18nContext = useMemo(
    () => ({
      [`editable_number[character-skill-${name}].error.int`]: {
        en: `The ${label.toLocaleLowerCase()} modifier must be an integer`,
        it: `Il modificatore di ${label.toLocaleLowerCase()} deve essere un numero intero`,
      },

      [`editable_number[character-skill-${name}].error.nan`]: {
        en: `The ${label.toLocaleLowerCase()} modifier must be a number`,
        it: `Il modificatore di ${label.toLocaleLowerCase()} deve essere un numero`,
      },

      "skill.placeholder": {
        en: "+0",
        it: "+0",
      },
    }),
    [label, name],
  );

  const { t } = useI18nLangContext(i18nContext);

  const error = useCallback((e: string) => toaster.error({ title: t(e) }), [t]);

  return (
    <HStack className="group" gap={0} position="relative" {...rest}>
      <SkillProficiencyButton
        onCycle={onChange}
        proficiency={skill.proficiency}
      />

      <EditableNumber
        alwaysShowSign
        disabled={skill.inferred}
        fontSize="cs.h5"
        integer
        name={`character-skill-${name}`}
        onChange={(customValue) =>
          onChange((prev) => ({ ...prev, customValue }))
        }
        onError={error}
        placeholder={t("skill.placeholder")}
        textAlign="center"
        value={skill.value}
        w="2.5em"
      />

      <Span flex={1} fontSize="cs.h5">
        {label}
      </Span>

      <InferableNumberButton
        {...touchVisibilityStyles}
        inferred={skill.inferred}
        onClick={onChange}
        position="absolute"
        right={-4}
        transform="scale(60%, 60%) translateX(45%)"
      />
    </HStack>
  );
}
