import { createContext, useContext } from "react";

export const LangContext = createContext({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
  tr: (v) => v,
});

/* { lang, setLang, t("key"), tr(localizedValue) } */
export const useLang = () => useContext(LangContext);
