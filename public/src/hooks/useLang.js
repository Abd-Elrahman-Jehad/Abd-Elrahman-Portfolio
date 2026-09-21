import { useState, useEffect, useCallback } from "react";
import { getCookie, setCookie } from "./useCookie";
import translations from "../data/translations";

export default function useLang() {
  const [lang, setLangState] = useState(() => {
    if (typeof document !== "undefined") {
      const attr = document.documentElement.getAttribute("lang");
      if (attr === "ar" || attr === "en") return attr;
    }
    return getCookie("portfolio_lang") || "en";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    setCookie("portfolio_lang", lang);
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLangState((l) => (l === "ar" ? "en" : "ar"));
  }, []);

  const t = translations[lang];

  return { lang, t, toggleLang };
}
