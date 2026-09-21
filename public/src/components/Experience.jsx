import useReveal from "../hooks/useReveal";
import ieeeLogo from "../assets/ieee-logo.png";
import weburaLogo from "../assets/webura-logo.png";

export default function Experience({ t }) {
  const head = useReveal(0);
  const timeline = useReveal(60);

  return (
    <section id="experience">
      <div className="container">
        <div ref={head.ref} style={head.style} className={`section-head reveal ${head.inView ? "in" : ""}`}>
          <span className="section-tag">{t.exp_tag}</span>
          <h2>{t.exp_title}</h2>
        </div>
        <div ref={timeline.ref} style={timeline.style} className={`timeline reveal ${timeline.inView ? "in" : ""}`}>
          <div className="tl-item">
            <span className="tl-date mono">{t.exp0_date}</span>
            <h3>{t.exp0_title}</h3>
            <div className="org org-with-logo">
              <img src={ieeeLogo} alt="IEEE" className="org-logo" />
              <span>{t.exp0_org}</span>
            </div>
            <ul>
              <li>{t.exp0_l1}</li>
              <li>{t.exp0_l2}</li>
              <li>{t.exp0_l3}</li>
            </ul>
          </div>
          <div className="tl-item">
            <span className="tl-date mono">{t.exp1_date}</span>
            <h3>{t.exp1_title}</h3>
            <div className="org org-with-logo">
              <img src={weburaLogo} alt="Webura" className="org-logo org-logo-round" />
              <span>{t.exp1_org}</span>
            </div>
            <ul>
              <li>{t.exp1_l1}</li>
              <li>{t.exp1_l2}</li>
              <li>{t.exp1_l3}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
