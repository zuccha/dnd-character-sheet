import { Box, Field, SimpleGrid } from "@chakra-ui/react";
import { EditIcon } from "lucide-react";
import { useCallback, useLayoutEffect, useState } from "react";
import { useActiveCharacterHpDice } from "~/character/active-character";
import type { Character } from "~/character/character";
import { useI18nLangContext } from "~/i18n/i18n-lang-context";
import D10Icon from "~/icons/d10-icon";
import D12Icon from "~/icons/d12-icon";
import D6Icon from "~/icons/d6-icon";
import D8Icon from "~/icons/d8-icon";
import Checkbox from "~/ui/checkbox";
import Dialog from "~/ui/dialog";
import IconButton from "~/ui/icon-button";
import NumberInput from "~/ui/number-input";
import { fillOrShrink } from "~/utils/array";
import Frame, { type FrameProps } from "../frame";

//------------------------------------------------------------------------------
// Character Sheet Hp Dice
//------------------------------------------------------------------------------

export type CharacterSheetHpDiceProps = FrameProps;

export default function CharacterSheetHpDice(props: CharacterSheetHpDiceProps) {
  const { t } = useI18nLangContext(i18nContext);

  const [updateHpDiceDialogOpen, setUpdateHpDiceDialogOpen] = useState(false);

  return (
    <Frame
      align="flex-start"
      className="group"
      position="relative"
      title={t("hp_dice.label")}
      {...props}
    >
      <IconButton
        Icon={EditIcon}
        _groupHover={{ visibility: "visible" }}
        colorPalette="blue"
        onClick={() => setUpdateHpDiceDialogOpen(true)}
        position="absolute"
        right={1}
        size="2xs"
        top={1}
        variant="ghost"
        visibility="hidden"
      />

      <SimpleGrid columns={5} gap={1}>
        <Dice die="d6" />
        <Dice die="d8" />
        <Dice die="d10" />
        <Dice die="d12" />
      </SimpleGrid>

      <UpdateHpDiceDialog
        onOpenChange={setUpdateHpDiceDialogOpen}
        open={updateHpDiceDialogOpen}
      />
    </Frame>
  );
}

//------------------------------------------------------------------------------
// Update HP Dice Dialog
//------------------------------------------------------------------------------

type UpdateHpDiceDialogProps = {
  onOpenChange: (open: boolean) => void;
  open: boolean;
};

function UpdateHpDiceDialog({ onOpenChange, open }: UpdateHpDiceDialogProps) {
  const { t } = useI18nLangContext(i18nContext);

  const [hpDice, setHpDice] = useActiveCharacterHpDice();

  const [d6, setD6] = useState(hpDice.d6.length);
  const [d8, setD8] = useState(hpDice.d8.length);
  const [d10, setD10] = useState(hpDice.d10.length);
  const [d12, setD12] = useState(hpDice.d12.length);

  useLayoutEffect(() => {
    if (open) {
      setD6(hpDice.d6.length);
      setD8(hpDice.d8.length);
      setD10(hpDice.d10.length);
      setD12(hpDice.d12.length);
    }
  }, [
    hpDice.d10.length,
    hpDice.d12.length,
    hpDice.d6.length,
    hpDice.d8.length,
    open,
  ]);

  const invalid = d6 + d8 + d10 + d12 > 20;

  const updateHpDice = useCallback(() => {
    if (invalid) return;

    setHpDice((prevHpDice) => {
      const nextD6 = fillOrShrink(prevHpDice.d6, d6, false);
      const nextD8 = fillOrShrink(prevHpDice.d8, d8, false);
      const nextD10 = fillOrShrink(prevHpDice.d10, d10, false);
      const nextD12 = fillOrShrink(prevHpDice.d12, d12, false);
      return { d6: nextD6, d8: nextD8, d10: nextD10, d12: nextD12 };
    });
    onOpenChange(false);
  }, [d10, d12, d6, d8, invalid, onOpenChange, setHpDice]);

  return (
    <Dialog
      cancelText={t("dialog.update_hp_dice.cancel_text")}
      confirmText={t("dialog.update_hp_dice.confirm_text")}
      disabled={invalid}
      onConfirm={updateHpDice}
      onOpenChange={onOpenChange}
      open={open}
      title={t("dialog.update_hp_dice.title")}
    >
      <SimpleGrid columns={4} gap={4}>
        <Field.Root>
          <Field.Label>d6</Field.Label>
          <NumberInput max={20} min={0} onValueChange={setD6} value={d6} />
        </Field.Root>

        <Field.Root>
          <Field.Label>d8</Field.Label>
          <NumberInput max={20} min={0} onValueChange={setD8} value={d8} />
        </Field.Root>

        <Field.Root>
          <Field.Label>d10</Field.Label>
          <NumberInput max={20} min={0} onValueChange={setD10} value={d10} />
        </Field.Root>

        <Field.Root>
          <Field.Label>d12</Field.Label>
          <NumberInput max={20} min={0} onValueChange={setD12} value={d12} />
        </Field.Root>
      </SimpleGrid>

      {invalid && (
        <Box color="fg.error" fontSize="sm" mt={2}>
          {t("dialog.update_hp_dice.error.too_many")}
        </Box>
      )}
    </Dialog>
  );
}

//------------------------------------------------------------------------------
// Dice
//------------------------------------------------------------------------------

type DiceProps = {
  die: keyof Character["hpDice"];
};

function Dice({ die }: DiceProps) {
  const [hpDice, setHpDice] = useActiveCharacterHpDice();

  const Icon = dieIcons[die];

  return hpDice[die].map((checked, index) => (
    <Checkbox
      checked={checked}
      key={`${die}-${index}`}
      onValueChange={(nextChecked) =>
        setHpDice((prevHpDice) => {
          const nextDieChecked = [...prevHpDice[die]];
          nextDieChecked[index] = nextChecked;
          return { ...prevHpDice, [die]: nextDieChecked };
        })
      }
      size="sm"
    >
      <Icon h="cs.checkbox" opacity={0.4} w="cs.checkbox" />
    </Checkbox>
  ));
}

//------------------------------------------------------------------------------
// Die Icons
//------------------------------------------------------------------------------

const dieIcons = {
  d6: D6Icon,
  d8: D8Icon,
  d10: D10Icon,
  d12: D12Icon,
} as const;

//------------------------------------------------------------------------------
// I18n Context
//------------------------------------------------------------------------------

const i18nContext = {
  "dialog.update_hp_dice.cancel_text": {
    en: "Cancel",
    it: "Cancella",
  },

  "dialog.update_hp_dice.confirm_text": {
    en: "Save",
    it: "Salva",
  },

  "dialog.update_hp_dice.error.too_many": {
    en: "The total number of dice cannot be greater than 20.",
    it: "Il numero totale di dadi non può essere superiore a 20.",
  },

  "dialog.update_hp_dice.title": {
    en: "Update Hit Dice",
    it: "Aggiorna Dadi Vita",
  },

  "hp_dice.label": {
    en: "Hit Dice",
    it: "Dadi Vita",
  },
};
