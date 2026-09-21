import { useEffect } from "react";
import { getCookie, setCookie } from "./useCookie";

/**
 * Keeps the visitor at the same scroll position across a manual page reload.
 */
export default function useScrollMemory() {
  useEffect(() => {
    const saved = parseInt(getCookie("portfolio_scroll") || "0", 10);

    if (saved > 0) {
      const original = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";

      const restore = () => window.scrollTo(0, saved);
      restore();
      const t1 = setTimeout(restore, 150);
      const t2 = setTimeout(() => {
        restore();
        document.documentElement.style.scrollBehavior = original || "";
      }, 400);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, []);

  useEffect(() => {
    let timer;
    const save = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setCookie("portfolio_scroll", String(window.scrollY)), 200);
    };
    const saveNow = () => setCookie("portfolio_scroll", String(window.scrollY));

    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("beforeunload", saveNow);
    return () => {
      window.removeEventListener("scroll", save);
      window.removeEventListener("beforeunload", saveNow);
      clearTimeout(timer);
    };
  }, []);
}
