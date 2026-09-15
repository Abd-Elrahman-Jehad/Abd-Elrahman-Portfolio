import { useState, useEffect, useCallback } from "react";
import { getCookie, setCookie } from "./useCookie";

export default function useTheme() {
  const [theme, setThemeState] = useState(() => {
    if (typeof document !== "undefined") {
      const attr = document.documentElement.getAttribute("data-theme");
      if (attr) return attr;
    }
    return getCookie("portfolio_theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    setCookie("portfolio_theme", theme);
  }, [theme]);

  const applyToggle = useCallback(() => {
    setThemeState((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  /**
   * Toggles the theme with a wipe that always matches the incoming mode:
   * switching to dark rises up from the bottom of the screen, switching to
   * light drops down from the top. Uses the native View Transitions API;
   * browsers without it (e.g. older Safari) just get an instant toggle — no
   * error, no broken UI, only the flourish is skipped.
   */
  const toggleTheme = useCallback(() => {
    if (typeof document !== "undefined" && document.startViewTransition) {
      const goingLight = document.documentElement.getAttribute("data-theme") === "dark";
      document.documentElement.classList.toggle("theme-target-light", goingLight);
      document.documentElement.classList.toggle("theme-target-dark", !goingLight);
      const transition = document.startViewTransition(() => {
        applyToggle();
      });
      transition.finished.finally(() => {
        document.documentElement.classList.remove("theme-target-light", "theme-target-dark");
      });
    } else {
      applyToggle();
    }
  }, [applyToggle]);

  return { theme, toggleTheme };
}
