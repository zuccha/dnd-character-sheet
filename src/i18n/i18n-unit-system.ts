import { z } from "zod";
import { createLocalStore } from "~/store/local-store";

//------------------------------------------------------------------------------
// I18n Unit System
//------------------------------------------------------------------------------

export const i18nUnitSystemSchema = z.enum(["imperial", "metric"]);

export type I18nUnitSystem = z.infer<typeof i18nUnitSystemSchema>;

export const i18nUnitSystems = i18nUnitSystemSchema.options;

//------------------------------------------------------------------------------
// I18n Unit System Context
//------------------------------------------------------------------------------

export type I18nUnitSystemContext = Record<
  string,
  Record<I18nUnitSystem, string>
>;

//------------------------------------------------------------------------------
// I18n Unit System Store
//------------------------------------------------------------------------------

export const i18nUnitSystemStore = createLocalStore(
  "i18n.unit_system",
  "imperial",
  i18nUnitSystemSchema.parse,
);

//------------------------------------------------------------------------------
// Use I18n Unit System
//------------------------------------------------------------------------------

export const useI18nUnitSystem = i18nUnitSystemStore.use;
