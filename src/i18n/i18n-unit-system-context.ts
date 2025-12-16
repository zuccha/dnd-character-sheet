import { useCallback } from "react";
import { useI18nUnitSystem } from "./i18n-unit-system";

//------------------------------------------------------------------------------
// Use I18n Unit System Context
//------------------------------------------------------------------------------

type UnitSystemConverter = {
  (squares: number, stringify?: false): number;
  (squares: number, stringify: true): string;
};

export function useI18nUnitSystemContext() {
  const [unitSystem] = useI18nUnitSystem();

  const squaresToUnits = useCallback(
    (squares: number, stringify = false) => {
      const [units, label] =
        unitSystem === "metric" ? [squares * 1.5, "m"] : [squares * 5, "ft"];

      return stringify ? `${units} ${label}` : units;
    },
    [unitSystem],
  ) as UnitSystemConverter;

  const unitsToSquares = useCallback(
    (units: number, stringify = false) => {
      const squares =
        unitSystem === "metric" ?
          Math.floor(units / 1.5)
        : Math.floor(units / 5);

      return stringify ? `${squares}` : units;
    },
    [unitSystem],
  ) as UnitSystemConverter;

  return { squaresToUnits, unitSystem, unitsToSquares };
}
