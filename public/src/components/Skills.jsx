import useReveal from "../hooks/useReveal";

const CATEGORIES = [
  { key: "skills_c1", tags: ["JavaScript", "PHP", "Java", "MySQL"] },
  { key: "skills_c2", tags: ["HTML5", "CSS3", "Responsive UI", "GSAP", "Three.js"] },
  { key: "skills_c3", tags: ["Git", "GitHub", "Docker", "Apache"] },
];

function SkillCard({ titleKey, tags, t, delay }) {
  const { ref, inView, style } = useReveal(delay);
  return (
    <div ref={ref} style={style} className={`skill-card glass reveal ${inView ? "in" : ""}`}>
      <h3>
        <span className="dot" /> <span>{t[titleKey]}</span>
      </h3>
      <div className="tag-row">
        {tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkillCardExtra({ t, delay }) {
  const { ref, inView, style } = useReveal(delay);
  return (
    <div ref={ref} style={style} className={`skill-card glass reveal ${inView ? "in" : ""}`}>
      <h3>
        <span className="dot" /> <span>{t.skills_c4}</span>
      </h3>
      <div className="tag-row">
        <span className="tag">{t.sk_oop}</span>
        <span className="tag">{t.sk_ui}</span>
        <span className="tag">{t.sk_auth}</span>
        <span className="tag">{t.sk_problem}</span>
      </div>
    </div>
  );
}

export default function Skills({ t }) {
  const head = useReveal(0);
  return (
    <section id="skills">
      <div className="container">
        <div ref={head.ref} style={head.style} className={`section-head reveal ${head.inView ? "in" : ""}`}>
          <span className="section-tag">{t.skills_tag}</span>
          <h2>{t.skills_title}</h2>
        </div>
        <div className="skills-grid">
          {CATEGORIES.map((cat, i) => (
            <SkillCard key={cat.key} titleKey={cat.key} tags={cat.tags} t={t} delay={i * 70} />
          ))}
          <SkillCardExtra t={t} delay={CATEGORIES.length * 70} />
        </div>
      </div>
    </section>
  );
}
