import { z } from "zod";
import { createLocalStore } from "~/store/local-store";

//------------------------------------------------------------------------------
// I18n Lang
//------------------------------------------------------------------------------

export const i18nLangSchema = z.enum(["en", "it"]);

export type I18nLang = z.infer<typeof i18nLangSchema>;

//------------------------------------------------------------------------------
// I18n Lang Store
//------------------------------------------------------------------------------

export const i18nLangStore = createLocalStore<I18nLang>(
  "i18n.lang",
  "en",
  i18nLangSchema.parse,
);

//------------------------------------------------------------------------------
// Use I18n Lang
//------------------------------------------------------------------------------

export const useI18nLang = i18nLangStore.use;
