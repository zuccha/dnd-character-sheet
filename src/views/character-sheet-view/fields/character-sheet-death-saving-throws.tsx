import { HStack } from "@chakra-ui/react";
import {
  useActiveCharacterDeathSavingThrowsFailures,
  useActiveCharacterDeathSavingThrowsSuccesses,
} from "~/character/active-character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import HeartIcon from "~/icons/heart-icon";
import SkullIcon from "~/icons/skull-icon";
import Checkbox from "~/ui/checkbox";
import Frame, { type FrameProps } from "../frame";

//------------------------------------------------------------------------------
// Character Sheet Death Saving Throws
//------------------------------------------------------------------------------

export type CharacterSheetDeathSavingThrowsProps = FrameProps;

export default function CharacterSheetDeathSavingThrows(
  props: CharacterSheetDeathSavingThrowsProps,
) {
  const { t } = useI18nLangContext(i18nContext);

  const [failures, setFailures] = useActiveCharacterDeathSavingThrowsFailures();
  const [successes, setSuccesses] =
    useActiveCharacterDeathSavingThrowsSuccesses();

  const failure = (index: 0 | 1 | 2) => (checked: boolean) =>
    setFailures((prevFailures) => {
      const nextFailures: [boolean, boolean, boolean] = [...prevFailures];
      nextFailures[index] = checked;
      return nextFailures;
    });

  const success = (index: 0 | 1 | 2) => (checked: boolean) =>
    setSuccesses((prevSuccesses) => {
      const nextSuccesses: [boolean, boolean, boolean] = [...prevSuccesses];
      nextSuccesses[index] = checked;
      return nextSuccesses;
    });

  return (
    <Frame align="flex-start" title={t("death_saving_throws.label")} {...props}>
      <HStack gap={1}>
        <SuccessCheckbox checked={successes[0]} onValueChange={success(0)} />
        <SuccessCheckbox checked={successes[1]} onValueChange={success(1)} />
        <SuccessCheckbox checked={successes[2]} onValueChange={success(2)} />
        <FailureCheckbox checked={failures[0]} onValueChange={failure(0)} />
        <FailureCheckbox checked={failures[1]} onValueChange={failure(1)} />
        <FailureCheckbox checked={failures[2]} onValueChange={failure(2)} />
      </HStack>
    </Frame>
  );
}

//------------------------------------------------------------------------------
// Failure Checkbox
//------------------------------------------------------------------------------

type FailureCheckboxProps = {
  checked: boolean;
  onValueChange: (checked: boolean) => void;
};

function FailureCheckbox({ checked, onValueChange }: FailureCheckboxProps) {
  return (
    <Checkbox checked={checked} onValueChange={onValueChange} size="sm">
      <SkullIcon opacity={0.2} />
    </Checkbox>
  );
}

//------------------------------------------------------------------------------
// Success Checkbox
//------------------------------------------------------------------------------

type SuccessCheckboxProps = {
  checked: boolean;
  onValueChange: (checked: boolean) => void;
};

function SuccessCheckbox({ checked, onValueChange }: SuccessCheckboxProps) {
  return (
    <Checkbox checked={checked} onValueChange={onValueChange} size="sm">
      <HeartIcon color="fg.error" opacity={0.2} />
    </Checkbox>
  );
}

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "death_saving_throws.label": {
    en: "Death Saves",
    it: "Tiri Morte",
  },
};
