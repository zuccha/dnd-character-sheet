import { LinkIcon, UnlinkIcon } from "lucide-react";
import type { InferableNumber } from "~/character/character";
import IconButton, { type IconButtonProps } from "~/ui/icon-button";

//------------------------------------------------------------------------------
// Inferable Number Button
//------------------------------------------------------------------------------

export type InferButtonProps = Omit<IconButtonProps, "Icon" | "onClick"> & {
  inferred: boolean;
  onClick: (update: (prev: InferableNumber) => InferableNumber) => void;
};

export default function InferableNumberButton({
  inferred,
  onClick,
  ...rest
}: InferButtonProps) {
  return (
    <IconButton
      Icon={inferred ? LinkIcon : UnlinkIcon}
      colorPalette="blue"
      onClick={() => onClick((prev) => ({ ...prev, inferred: !prev.inferred }))}
      size="2xs"
      variant="ghost"
      {...rest}
    />
  );
}
