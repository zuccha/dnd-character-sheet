import { createIcon } from "@chakra-ui/react";

const HeartIcon = createIcon({
  defaultProps: {
    size: "md",
  },
  displayName: "Heart",
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

      {/* Heart */}
      <g transform="translate(12 12) scale(0.85) translate(-12 -12)">
        <path
          d="M19.5 13.572l-7.5 7.428l-7.5 -7.428
             m0 0a5 5 0 1 1 7.5 -6.566
             a5 5 0 1 1 7.5 6.572"
          fill="currentColor"
        />
      </g>
    </>
  ),
});

export default HeartIcon;
