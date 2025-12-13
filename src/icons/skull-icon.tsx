import { createIcon } from "@chakra-ui/react";

const SkullIcon = createIcon({
  defaultProps: {
    size: "md",
  },
  displayName: "Skull",
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

      {/* Skull (solid) */}
      <path
        d="
          M12 5
          c-3.3 0 -6 2.5 -6 5.6
          c0 2.2 1.2 4.1 3 5v2.4
          c0 .6 .4 1 1 1h1v-1h2v1h1
          c.6 0 1-.4 1-1v-2.4
          c1.8-.9 3-2.8 3-5
          c0-3.1-2.7-5.6-6-5.6
          Z

          M9.5 11
          a1.2 1.2 0 1 1 0 2.4
          a1.2 1.2 0 1 1 0 -2.4
          Z

          M14.5 11
          a1.2 1.2 0 1 1 0 2.4
          a1.2 1.2 0 1 1 0 -2.4
          Z
        "
        fill="currentColor"
        fillRule="evenodd"
      />
    </>
  ),
});

export default SkullIcon;
