import { createIcon } from "@chakra-ui/react";

const CheckboxFrameIcon = createIcon({
  defaultProps: {
    size: "md",
  },
  displayName: "CheckboxFrameIcon",
  path: (
    // Frame
    <rect
      fill="none"
      height="23"
      rx="1.5"
      stroke="currentColor"
      width="23"
      x="0.5"
      y="0.5"
    />
  ),
});

export default CheckboxFrameIcon;
