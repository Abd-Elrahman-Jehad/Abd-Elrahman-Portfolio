import { useEffect, useRef, useState } from "react";

export default function useCountUp(target, suffix = "", duration = 1300) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
            function tick(now) {
              const p = Math.min((now - start) / duration, 1);
              setValue(Math.round(easeOutExpo(p) * target));
              if (p < 1) requestAnimationFrame(tick);
              else setValue(target);
            }
            requestAnimationFrame(tick);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return { ref, display: `${value}${suffix}` };
}
