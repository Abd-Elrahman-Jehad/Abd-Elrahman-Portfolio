let activeScrollCancel = null;

export function smoothScrollToId(id, options = {}) {
  const target = document.getElementById(id);
  if (!target) return;

  // Stop a previous programmatic scroll before starting another one.
  activeScrollCancel?.();

  const { duration = 650, updateHash = true, onStart, onComplete } = options;
  const width = window.innerWidth;
  const offset = width <= 430 ? 84 : width <= 860 ? 92 : 104;

  const startY = window.scrollY || window.pageYOffset || 0;
  const targetY = Math.max(
    0,
    target.getBoundingClientRect().top + startY - offset
  );
  const distance = targetY - startY;

  if (Math.abs(distance) < 2) {
    if (updateHash) window.history.replaceState(null, "", `#${id}`);
    onComplete?.();
    return;
  }

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: targetY, behavior: "auto" });
    if (updateHash) window.history.replaceState(null, "", `#${id}`);
    onComplete?.();
    return;
  }

  // CSS `scroll-behavior: smooth` would make every frame below animate again.
  // Temporarily disable it so this is exactly one controlled animation.
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";

  let raf = 0;
  let cancelled = false;
  const startTime = performance.now();

  const cleanup = () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("wheel", cancel, wheelOptions);
    window.removeEventListener("touchstart", cancel, wheelOptions);
    window.removeEventListener("pointerdown", cancelPointer);
    window.removeEventListener("keydown", cancelKey);
    root.style.scrollBehavior = previousScrollBehavior;
    if (activeScrollCancel === cancel) activeScrollCancel = null;
  };

  const cancel = () => {
    if (cancelled) return;
    cancelled = true;
    cleanup();
  };

  const cancelPointer = (event) => {
    // Ignore the click that may have started the navigation itself.
    if (event.button !== 0) return;
    cancel();
  };

  const cancelKey = (event) => {
    if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
      cancel();
    }
  };

  const wheelOptions = { passive: true };
  window.addEventListener("wheel", cancel, wheelOptions);
  window.addEventListener("touchstart", cancel, wheelOptions);
  window.addEventListener("pointerdown", cancelPointer);
  window.addEventListener("keydown", cancelKey);

  activeScrollCancel = cancel;
  onStart?.();

  // Smooth, quick, and deliberately without overshoot/bounce.
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const frame = (now) => {
    if (cancelled) return;

    const progress = Math.min(1, (now - startTime) / duration);
    const eased = easeOutCubic(progress);
    const currentY = startY + distance * eased;

    // Explicit `auto` prevents the browser's native smooth-scroll animation
    // from stacking on top of these frames.
    window.scrollTo({ top: currentY, behavior: "auto" });

    if (progress < 1) {
      raf = requestAnimationFrame(frame);
      return;
    }

    window.scrollTo({ top: targetY, behavior: "auto" });
    cleanup();

    if (updateHash) window.history.replaceState(null, "", `#${id}`);
    onComplete?.();
  };

  raf = requestAnimationFrame(frame);
}
