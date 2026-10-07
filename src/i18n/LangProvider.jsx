import { useCallback, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { LangContext } from "./lang";
import strings from "./strings";

const initialLang = () => {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "fr") return saved;
  } catch { /* storage blocked */ }
  return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
};

export default function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("lang", lang); } catch { /* storage blocked */ }
  }, [lang]);

  /* cross-fades the whole page between languages where View Transitions exist */
  const setLang = useCallback((next) => {
    if (next === lang) return;
    const apply = () => flushSync(() => setLangState(next));
    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }
    document.startViewTransition(apply);
  }, [lang]);

  const value = useMemo(() => {
    const dict = strings[lang];
    const t = (key) => dict[key] ?? strings.en[key] ?? key;
    /* localized data fields look like { en: "...", fr: "..." }; plain values pass through */
    const tr = (v) => (v && typeof v === "object" && !Array.isArray(v) && "en" in v ? v[lang] ?? v.en : v);
    return { lang, setLang, t, tr };
  }, [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
