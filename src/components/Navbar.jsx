import ThemeSwitch from "./ThemeSwitch";
import profilePhoto from "../assets/hero-photo.jpg";

const NAV_ITEMS = [
  { id: "about", key: "nav_about" },
  { id: "skills", key: "nav_skills" },
  { id: "experience", key: "nav_exp" },
  { id: "education", key: "nav_edu" },
  { id: "certificates", key: "nav_certs" },
  { id: "projects", key: "nav_projects" },
  { id: "contact", key: "nav_contact" },
];

export default function Navbar({
  t,
  lang,
  toggleLang,
  theme,
  toggleTheme,
  activeSection,
  onOpenDrawer,
  drawerOpen = false,
}) {
  return (
    <nav>
      <div className="nav-inner glass">
        <div className="nav-brand">
          <div className="nav-avatar">
            <img src={profilePhoto} alt="Abd Elrahman Jehad" />
          </div>
          <div className="nav-name">
            {t.nav_name}
            <span>{t.nav_role}</span>
          </div>
        </div>

        <div className="nav-links">
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? "active" : ""}>
              {t[item.key]}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          {/* Hidden on small screens — the drawer already offers "Download CV". */}
          <a
            href="Abd_Elrahman_Jehad_CV.pdf"
            download
            className="icon-btn lang-btn mono nav-only-desktop"
            id="nav-cv-btn"
          >
            {t.nav_cv}
          </a>

          <button type="button" className="icon-btn lang-btn mono" onClick={toggleLang}>
            <span className="swap" key={lang}>{lang === "ar" ? "EN" : "AR"}</span>
          </button>

          {/* On small screens this hides and its twin appears in the drawer. */}
          <ThemeSwitch theme={theme} toggleTheme={toggleTheme} className="nav-only-desktop" />

          <button
            type="button"
            className={`hamburger ${drawerOpen ? "open" : ""}`}
            aria-label="Menu"
            aria-expanded={drawerOpen}
            onClick={onOpenDrawer}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export { NAV_ITEMS };
