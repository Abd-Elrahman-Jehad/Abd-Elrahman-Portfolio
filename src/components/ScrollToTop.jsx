import { useEffect, useState, useRef } from "react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const [flying, setFlying] = useState(false);
  const tickingRef = useRef(false);
  const shownRef = useRef(false);

  useEffect(() => {
    function compute() {
      const shouldShow = window.scrollY > 500;
      if (shouldShow !== shownRef.current) {
        shownRef.current = shouldShow;
        setShow(shouldShow);
      }
      tickingRef.current = false;
    }
    function onScroll() {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(compute);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    setFlying(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setFlying(false), 680);
  }

  return (
    <button
      id="to-top"
      type="button"
      aria-label="Scroll to top"
      className={`${show ? "show" : ""} ${flying ? "flying" : ""}`}
      onClick={handleClick}
    >
      ↑
    </button>
  );
}
