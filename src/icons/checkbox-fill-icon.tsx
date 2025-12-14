import { createIcon } from "@chakra-ui/react";

const CheckboxFillIcon = createIcon({
  defaultProps: {
    size: "md",
  },
  displayName: "CheckboxFillIcon",
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

      {/* Fill */}
      <rect
        fill="currentColor"
        height="18.6667"
        rx="1"
        width="18.6667"
        x="2.66669"
        y="2.66667"
      />
    </>
  ),
});

export default CheckboxFillIcon;
