import useReveal from "../hooks/useReveal";
import profilePhoto from "../assets/hero-photo.webp";

export default function About({ t }) {
  const photo = useReveal(0);
  const text = useReveal(60);

  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div ref={photo.ref} style={photo.style} className={`about-card glass reveal ${photo.inView ? "in" : ""}`}>
            <div className="glow" />
            <div className="glow2" />
            <div className="about-photo-wrap">
              <div className="about-photo-ring">
                <img className="about-photo-img" src={profilePhoto} alt="Abd Elrahman Jehad" loading="eager" fetchPriority="high" decoding="async" />
              </div>
              <div className="about-badge b1">💻</div>
              <div className="about-badge b2">🎨</div>
              <div className="about-badge b3">⚡</div>
            </div>
          </div>

          <div ref={text.ref} style={text.style} className={`about-text reveal ${text.inView ? "in" : ""}`}>
            <span className="section-tag">{t.about_tag}</span>
            <h2 style={{ marginBottom: 22 }}>{t.about_title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.about_p1_html }} />
            <p>{t.about_p2}</p>
            <div className="about-meta-row">
              <div className="location-badge">📍 <span>{t.about_location}</span></div>
              <a href="Abd_Elrahman_Jehad_CV.pdf" download className="btn btn-primary">
                {t.about_cv_btn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
