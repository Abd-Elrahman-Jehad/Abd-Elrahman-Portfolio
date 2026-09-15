import { useEffect, useRef, useState } from "react";
import profilePhoto from "../assets/hero-photo.jpg";

const MIN_INITIAL_MS = 1800;
const RING_RADIUS = 54;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

// Keep both profile images warm in the browser cache before the loader exits.
// This prevents the hero/about photos from appearing a moment late after the
// loading overlay disappears, especially on a cold first visit.
const CRITICAL_IMAGES = [
  new URL("../assets/its-me.jpeg", import.meta.url).href,
  new URL("../assets/hero-photo.jpg", import.meta.url).href,
];

export default function LoadingScreen({ lang }) {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [percent, setPercent] = useState(0);
  const dismissedRef = useRef(false);

  // Animates a believable progress readout (0 → ~92%) across the minimum
  // display window, then only jumps to 100% once the page has actually
  // finished loading — a small touch, but it's what makes it read as a real
  // loading sequence instead of a decorative spinner.
  useEffect(() => {
    let raf;
    const start = performance.now();
    function tick(now) {
      const elapsed = now - start;
      const p = Math.min(92, (elapsed / MIN_INITIAL_MS) * 92);
      setPercent(p);
      if (p < 92) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const start = Date.now();
    let imageReady = false;
    let pageReady = document.readyState === "complete";

    const waitForImages = Promise.all(
      CRITICAL_IMAGES.map((src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = async () => {
            try { await img.decode(); } catch (_) {}
            resolve();
          };
          img.onerror = resolve;
          img.src = src;
        })
      )
    ).then(() => {
      imageReady = true;
      tryDismiss();
    });

    function tryDismiss() {
      if (dismissedRef.current || !pageReady || !imageReady) return;
      dismissedRef.current = true;
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_INITIAL_MS - elapsed);
      setTimeout(() => {
        setPercent(100);
        setTimeout(() => {
          setLeaving(true);
          setTimeout(() => setVisible(false), 550);
        }, 320);
      }, wait);
    }

    function onLoad() {
      pageReady = true;
      tryDismiss();
    }

    if (pageReady) tryDismiss();
    else window.addEventListener("load", onLoad, { once: true });

    // Do not leave a user behind if a browser blocks an image or the load event.
    const safety = setTimeout(() => {
      imageReady = true;
      pageReady = true;
      tryDismiss();
    }, 5000);

    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(safety);
      void waitForImages;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  const isAr = lang === "ar";
  const subtitle = isAr ? "جاري تحميل البورتفوليو" : "Loading portfolio";
  const dashOffset = RING_CIRCUMFERENCE * (1 - percent / 100);

  return (
    <div className={`loading-screen ${leaving ? "leaving" : ""}`}>
      <div className="loading-orb l-orb-1" />
      <div className="loading-orb l-orb-2" />
      <div className="loading-grid" />

      <div className="loading-ring-wrap">
        <svg className="loading-progress-svg" viewBox="0 0 120 120">
          <defs>
            <linearGradient id="loadingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "var(--accent)" }} />
              <stop offset="100%" style={{ stopColor: "var(--accent-2)" }} />
            </linearGradient>
          </defs>
          <circle className="loading-progress-track" cx="60" cy="60" r={RING_RADIUS} />
          <circle
            className="loading-progress-bar"
            cx="60"
            cy="60"
            r={RING_RADIUS}
            style={{
              strokeDasharray: RING_CIRCUMFERENCE,
              strokeDashoffset: dashOffset,
            }}
          />
        </svg>
        <div className="loading-ring">
          <img src={profilePhoto} alt="Abd Elrahman Jehad" />
        </div>
      </div>

      <span className="loading-percent">{Math.round(percent)}%</span>
      <h2 className="loading-title">Abd Elrahman Jehad</h2>
      <p className="loading-subtitle">
        {subtitle}
        <span className="loading-dots" />
      </p>
    </div>
  );
}
