import { isTouch } from "~/utils/window";

//------------------------------------------------------------------------------
// Focus Styles
//------------------------------------------------------------------------------

export const focusStyles = {
  outlineColor: "border.info",
  outlineStyle: "solid",
  outlineWidth: 2,
};

//------------------------------------------------------------------------------
// Focus Invalid Styles
//------------------------------------------------------------------------------

export const focusInvalidStyles = {
  outlineColor: "border.error",
  outlineStyle: "solid",
  outlineWidth: 2,
};

//------------------------------------------------------------------------------
// Hover Styles
//------------------------------------------------------------------------------

export const hoverStyles = {
  _focus: focusStyles,
  outlineColor: "border.info",
  outlineStyle: "solid",
  outlineWidth: 2,
};

//------------------------------------------------------------------------------
// Hover Invalid Styles
//------------------------------------------------------------------------------

export const hoverInvalidStyles = {
  _focus: focusInvalidStyles,
  outlineColor: "border.error",
  outlineStyle: "solid",
  outlineWidth: 2,
};

//------------------------------------------------------------------------------
// Touch Visibility Styles
//------------------------------------------------------------------------------

export const touchVisibilityStyles =
  isTouch() ? undefined : (
    {
      _focus: { opacity: 1 },
      _groupHover: { opacity: 1 },
      _hover: { opacity: 1 },
      opacity: 0,
    }
  );
