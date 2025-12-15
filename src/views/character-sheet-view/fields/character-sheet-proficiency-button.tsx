import type { Proficiency } from "~/character/character";
import ProficiencyExpertIcon from "~/icons/proficiency-expert-icon";
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
  allowExpertise?: boolean;
  proficiency: Proficiency;
  onCycle: (proficiency: Proficiency) => void;
};

export function CharacterSheetProficiencyButton({
  allowExpertise,
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
          allowExpertise ?
            nextProficienciesWithExpertise[proficiency]
          : nextProficienciesWithoutExpertise[proficiency],
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
  expert: ProficiencyExpertIcon,
  none: ProficiencyNoneIcon,
  proficient: ProficiencyProficientIcon,
} as const;

//------------------------------------------------------------------------------
// Next Proficiencies
//------------------------------------------------------------------------------

const nextProficienciesWithExpertise = {
  expert: "none",
  none: "proficient",
  proficient: "expert",
} as const;

const nextProficienciesWithoutExpertise = {
  expert: "none",
  none: "proficient",
  proficient: "none",
} as const;
