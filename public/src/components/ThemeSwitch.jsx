/**
 * Sliding sun/moon theme switch.
 *
 * The thumb is a single element that slides smoothly between the two ends —
 * it is never re-mounted on toggle (no `key` prop), so the browser can
 * interpolate the movement instead of popping it. Both icons live inside the
 * thumb and cross-fade + rotate into each other.
 *
 * `size="lg"` renders the larger variant used inside the mobile drawer.
 */
export default function ThemeSwitch({ theme, toggleTheme, size = "md", className = "" }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      onClick={toggleTheme}
      className={`theme-switch ${isDark ? "dark" : "light"} ${size === "lg" ? "lg" : ""} ${className}`.trim()}
    >
      {/* night sky */}
      <span className="ts-star s1" aria-hidden="true" />
      <span className="ts-star s2" aria-hidden="true" />
      <span className="ts-star s3" aria-hidden="true" />
      <span className="ts-star s4" aria-hidden="true" />

      {/* day sky */}
      <span className="ts-cloud c1" aria-hidden="true" />
      <span className="ts-cloud c2" aria-hidden="true" />

      <span className="ts-thumb" aria-hidden="true">
        <svg className="ts-icon ts-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.4v2.4M12 19.2v2.4M4.2 12H1.8M22.2 12h-2.4M6.5 6.5 4.8 4.8M19.2 19.2l-1.7-1.7M17.5 6.5l1.7-1.7M4.8 19.2l1.7-1.7" />
        </svg>
        <svg className="ts-icon ts-moon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.7 14.6A8.6 8.6 0 0 1 9.4 3.3a.85.85 0 0 0-1.15-1A10.3 10.3 0 1 0 21.7 15.75a.85.85 0 0 0-1-1.15Z" />
        </svg>
      </span>
    </button>
  );
}
