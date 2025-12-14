import type { CharacterSkill } from "~/character/character";
import ProficiencyExpertIcon from "~/icons/proficiency-expert-icon";
import ProficiencyNoneIcon from "~/icons/proficiency-none-icon";
import ProficiencyProficientIcon from "~/icons/proficiency-proficient-icon";
import IconButton, { type IconButtonProps } from "~/ui/icon-button";

//------------------------------------------------------------------------------
// Skill Proficiency Button
//------------------------------------------------------------------------------

export type SkillProficiencyButtonProps = Omit<
  IconButtonProps,
  "Icon" | "onClick"
> & {
  proficiency: CharacterSkill["proficiency"];
  onCycle: (updateSkill: (prevSkill: CharacterSkill) => CharacterSkill) => void;
};

export default function SkillProficiencyButton({
  proficiency,
  onCycle,
  ...rest
}: SkillProficiencyButtonProps) {
  return (
    <IconButton
      Icon={icons[proficiency]}
      colorPalette="blue"
      m={-1}
      onClick={() =>
        onCycle((prev) => ({
          ...prev,
          proficiency: nextProficiencies[prev.proficiency],
        }))
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

const nextProficiencies = {
  expert: "none",
  none: "proficient",
  proficient: "expert",
} as const;
