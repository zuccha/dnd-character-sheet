import { createIcon } from "@chakra-ui/react";

const CheckboxCrossIcon = createIcon({
  defaultProps: {
    size: "md",
  },
  displayName: "CheckboxCrossIcon",
  path: (
    <>
      {/* Frame */}
      {/* <rect
        fill="none"
        height="23"
        rx="1.5"
        stroke="currentColor"
        width="23"
        x="0.5"
        y="0.5"
      /> */}

      {/* X */}
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

export default CheckboxCrossIcon;
