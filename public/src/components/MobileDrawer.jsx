import { useEffect } from "react";
import { NAV_ITEMS } from "./Navbar";
import ThemeSwitch from "./ThemeSwitch";
import profilePhoto from "../assets/hero-photo.webp";
import { smoothScrollToId } from "../utils_smooth_scroll";

function handleDrawerNavClick(e, id, onClose) {
  e.preventDefault();
  onClose();
  window.requestAnimationFrame(() => smoothScrollToId(id));
}

export default function MobileDrawer({ open, onClose, t, activeSection, theme, toggleTheme }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div className={`drawer-overlay ${open ? "open" : ""}`} onClick={onClose} />
      <div className={`drawer glass ${open ? "open" : ""}`} aria-hidden={!open}>
        {/* Top corner controls: close on one side, theme switch on the other. */}
        <div className="drawer-top">
          <button type="button" className="drawer-close" aria-label="Close menu" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <ThemeSwitch theme={theme} toggleTheme={toggleTheme} size="lg" />
        </div>

        <div className="drawer-profile">
          <div className="nav-avatar">
            <img src={profilePhoto} alt="Abd Elrahman Jehad" />
          </div>
          <div>
            <b>{t.nav_name}</b>
            <span>{t.nav_role}</span>
          </div>
        </div>

        <div className="drawer-links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? "active" : ""}
              onClick={(e) => handleDrawerNavClick(e, item.id, onClose)}
            >
              {t[item.key]}
            </a>
          ))}
        </div>

        <div className="drawer-actions">
          <a
            href="Abd_Elrahman_Jehad_CV.pdf"
            download
            className="btn btn-ghost"
            style={{ flex: 1, justifyContent: "center" }}
          >
            {t.nav_cv_full}
          </a>
        </div>
      </div>
    </>
  );
}
