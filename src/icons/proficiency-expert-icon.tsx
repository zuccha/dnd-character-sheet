import { createIcon } from "@chakra-ui/react";

const ProficiencyExpertIcon = createIcon({
  defaultProps: {
    size: "md",
  },
  displayName: "ProficiencyExpertIcon",
  path: (
    <>
      <circle
        cx="12"
        cy="12"
        fill="currentColor"
        r="8.07143"
        stroke="currentColor"
      />
      <circle
        cx="12"
        cy="12"
        fill="none"
        r="11"
        stroke="currentColor"
        strokeWidth="2"
      />
    </>
  ),
});

export default ProficiencyExpertIcon;
