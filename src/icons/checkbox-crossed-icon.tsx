import { createIcon } from "@chakra-ui/react";

const CheckboxCrossedIcon = createIcon({
  defaultProps: {
    size: "md",
  },
  displayName: "CheckboxCrossedIcon",
  path: (
    <>
      <rect
        fill="none"
        height="23"
        rx="1.5"
        stroke="currentColor"
        width="23"
        x="0.5"
        y="0.5"
      />
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </>
  ),
});

export default CheckboxCrossedIcon;
