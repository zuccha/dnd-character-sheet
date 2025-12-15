import { LinkIcon, UnlinkIcon } from "lucide-react";
import type { InferableNumber } from "~/character/character";
import IconButton, { type IconButtonProps } from "~/ui/icon-button";

//------------------------------------------------------------------------------
// Character Sheet Inferable Number Button
//------------------------------------------------------------------------------

export type CharacterSheetInferableNumberButtonProps<
  IN extends InferableNumber,
> = Omit<IconButtonProps, "Icon" | "onClick"> & {
  inferred: boolean;
  onClick: (update: (prev: IN) => IN) => void;
};

export default function CharacterSheetInferableNumberButton<
  IN extends InferableNumber,
>({
  inferred,
  onClick,
  ...rest
}: CharacterSheetInferableNumberButtonProps<IN>) {
  return (
    <IconButton
      Icon={inferred ? LinkIcon : UnlinkIcon}
      colorPalette="blue"
      onClick={() => onClick((prev) => ({ ...prev, inferred: !prev.inferred }))}
      size="2xs"
      {...rest}
    />
  );
}
