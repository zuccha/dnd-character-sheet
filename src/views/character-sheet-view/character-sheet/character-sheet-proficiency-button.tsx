import type { Proficiency } from "~/character/character";
import ProficiencyExpertIcon from "~/icons/proficiency-expert-icon";
import ProficiencyHalfProficientIcon from "~/icons/proficiency-half-proficient-icon";
import ProficiencyNoneIcon from "~/icons/proficiency-none-icon";
import ProficiencyProficientIcon from "~/icons/proficiency-proficient-icon";
import IconButton, { type IconButtonProps } from "~/ui/icon-button";

//------------------------------------------------------------------------------
// Character Sheet Proficiency Button
//------------------------------------------------------------------------------

export type CharacterSheetProficiencyButtonProps = Omit<
  IconButtonProps,
  "Icon" | "onClick"
> & {
  complex?: boolean;
  proficiency: Proficiency;
  onCycle: (proficiency: Proficiency) => void;
};

export function CharacterSheetProficiencyButton({
  complex,
  proficiency,
  onCycle,
  ...rest
}: CharacterSheetProficiencyButtonProps) {
  return (
    <IconButton
      Icon={icons[proficiency]}
      colorPalette="blue"
      m={-1}
      onClick={() =>
        onCycle(
          complex ?
            nextProficienciesComplex[proficiency]
          : nextProficienciesSimple[proficiency],
        )
      }
      size="2xs"
      transform="scale(50%)"
      unstyled
      variant="ghost"
      {...rest}
    />
  );
}

//------------------------------------------------------------------------------
// Icons
//------------------------------------------------------------------------------

const icons = {
  "expert": ProficiencyExpertIcon,
  "half-proficient": ProficiencyHalfProficientIcon,
  "none": ProficiencyNoneIcon,
  "proficient": ProficiencyProficientIcon,
} as const;

//------------------------------------------------------------------------------
// Next Proficiencies
//------------------------------------------------------------------------------

const nextProficienciesComplex = {
  "expert": "none",
  "half-proficient": "proficient",
  "none": "half-proficient",
  "proficient": "expert",
} as const;

const nextProficienciesSimple = {
  "expert": "none",
  "half-proficient": "proficient",
  "none": "proficient",
  "proficient": "none",
} as const;
