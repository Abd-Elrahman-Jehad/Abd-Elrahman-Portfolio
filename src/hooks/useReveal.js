import { useEffect, useRef, useState } from "react";

/**
 * Scroll reveal that replays in both directions without observing the element's
 * transformed box.  The animation classes stay exactly the same; only the
 * visibility trigger is based on the element's layout position (offsetTop),
 * so translate/scale/blur cannot make the trigger rapidly enter/leave.
 */
export default function useReveal(delay = 0) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;

    const getLayoutRect = () => {
      let top = 0;
      let node = el;

      // offsetTop is layout geometry; unlike getBoundingClientRect(), it is not
      // changed by the reveal transform on the element itself.
      while (node) {
        top += node.offsetTop || 0;
        node = node.offsetParent;
      }

      return {
        top,
        bottom: top + el.offsetHeight,
      };
    };

    const update = () => {
      frame = 0;
      const { top, bottom } = getLayoutRect();
      const scrollTop = window.scrollY || window.pageYOffset || 0;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      // Wide enter/exit bands (hysteresis) prevent flicker at section/card edges.
      const enterTop = scrollTop + viewportHeight * 0.92;
      const enterBottom = scrollTop + viewportHeight * 0.08;
      const exitTop = scrollTop + viewportHeight * 1.04;
      const exitBottom = scrollTop - viewportHeight * 0.04;

      setInView((current) => {
        if (!current) {
          const shouldEnter = top < enterTop && bottom > enterBottom;
          return shouldEnter ? true : current;
        }

        const shouldExit = bottom < exitBottom || top > exitTop;
        return shouldExit ? false : current;
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("load", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("load", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const style = {
    transitionDelay: inView ? `${Math.min(delay, 420)}ms` : "0ms",
  };

  return { ref, inView, style };
}
