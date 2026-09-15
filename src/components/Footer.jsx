import { LinkedInIcon, GitHubIcon, WhatsAppIcon } from "./BrandIcons";
import profilePhoto from "../assets/hero-photo.jpg";

const SECTION_LINKS = [
  { id: "about", key: "nav_about" },
  { id: "skills", key: "nav_skills" },
  { id: "experience", key: "nav_exp" },
  { id: "education", key: "nav_edu" },
  { id: "certificates", key: "nav_certs" },
  { id: "projects", key: "nav_projects" },
  { id: "contact", key: "nav_contact" },
];

export default function Footer({ t }) {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-row">
              <div className="nav-avatar">
                <img src={profilePhoto} alt="Abd Elrahman Jehad" />
              </div>
              <div className="nav-name">
                Abd Elrahman Jehad
                <span>{t.nav_role}</span>
              </div>
            </div>
            <p className="footer-tagline">{t.foot_tagline}</p>
            <div className="footer-socials">
              <a href="https://www.linkedin.com/in/abd-elrahman-jehad-aldasht" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon size={17} />
              </a>
              <a href="https://github.com/Abd-Elrahman-Jehad" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHubIcon size={17} />
              </a>
              <a href="https://wa.me/970592476126" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsAppIcon size={17} />
              </a>
              <a href="mailto:jehadbood@gmail.com" aria-label="Email">
                ✉️
              </a>
            </div>
          </div>

          <div className="footer-col footer-col-sections">
            <h4>{t.foot_sections}</h4>
            <div className="footer-links-col">
              {SECTION_LINKS.map((s) => (
                <a key={s.id} href={`#${s.id}`}>
                  {t[s.key]}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col footer-col-freelance">
            <h4>{t.foot_freelance}</h4>
            <div className="footer-links-col">
              <a href="https://mostaql.com/u/AbdelrahmanJ12" target="_blank" rel="noopener noreferrer">Mostaql</a>
              <a href="https://khamsat.com/user/abdjehaddt" target="_blank" rel="noopener noreferrer">Khamsat</a>
              <a href="https://www.upwork.com/freelancers/~015284180f9e2aab6a?mp_source=share" target="_blank" rel="noopener noreferrer">Upwork</a>
              <a href="https://brightgaza.com/en/freelancer/profile" target="_blank" rel="noopener noreferrer">Bright Gaza</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Abd Elrahman Jehad Aldasht — {t.foot_made}</p>
          <p className="footer-location">📍 {t.about_location}</p>
        </div>
      </div>
    </footer>
  );
}
