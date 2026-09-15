import useReveal from "../hooks/useReveal";
import universityLogo from "../assets/university-logo.png";

export default function Education({ t }) {
  const head = useReveal(0);
  const card = useReveal(60);

  return (
    <section id="education">
      <div className="container">
        <div ref={head.ref} style={head.style} className={`section-head reveal ${head.inView ? "in" : ""}`}>
          <span className="section-tag">{t.edu_tag}</span>
          <h2>{t.edu_title}</h2>
        </div>
        <div className="edu-grid">
          <div ref={card.ref} style={card.style} className={`edu-card glass reveal ${card.inView ? "in" : ""}`}>
            <div className="edu-icon edu-icon-logo">
              <img src={universityLogo} alt="Islamic University of Gaza" />
            </div>
            <div>
              <span className="tl-date mono">{t.edu1_date}</span>
              <h3>{t.edu1_degree}</h3>
              <div className="org">{t.edu1_org}</div>
              <div className="edu-grade">{t.edu1_grade}</div>
              <p>{t.edu1_desc}</p>
              <p className="edu-activities">{t.edu1_activities}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
