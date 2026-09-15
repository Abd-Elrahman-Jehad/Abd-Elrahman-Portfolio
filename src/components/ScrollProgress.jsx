import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    function update() {
      const h = document.documentElement;
      const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (barRef.current) {
        barRef.current.style.width = `${isFinite(scrolled) ? scrolled : 0}%`;
      }
      tickingRef.current = false;
    }
    function onScroll() {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(update);
      }
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div id="scroll-progress" ref={barRef} />;
}
