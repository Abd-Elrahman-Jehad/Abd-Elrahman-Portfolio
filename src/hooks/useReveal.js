import { useEffect, useRef, useState } from "react";

/**
 * Replays the reveal animation every time the element enters/leaves the
 * viewport — not just once on first load. Scroll away and scroll back and it
 * plays again, no page reload needed. The stagger `delay` only applies when
 * coming INTO view (so cards cascade in nicely); leaving is instant so the
 * exit doesn't feel sluggish.
 */
export default function useReveal(delay = 0) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = { transitionDelay: inView ? `${Math.min(delay, 420)}ms` : "0ms" };

  return { ref, inView, style };
}
