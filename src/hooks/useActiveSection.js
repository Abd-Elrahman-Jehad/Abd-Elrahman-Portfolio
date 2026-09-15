import { useState, useEffect, useRef } from "react";

export default function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0] || null);
  const tickingRef = useRef(false);
  const activeRef = useRef(active);

  useEffect(() => {
    function compute() {
      let current = null;
      const scrollPos = window.scrollY + 140;
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) current = id;
      });
      if (current !== activeRef.current) {
        activeRef.current = current;
        setActive(current);
      }
      tickingRef.current = false;
    }
    function onScroll() {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(compute);
      }
    }
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("load", compute);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", compute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(",")]);

  return active;
}
