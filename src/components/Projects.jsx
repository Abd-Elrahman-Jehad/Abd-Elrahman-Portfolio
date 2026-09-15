import { useState } from "react";
import useReveal from "../hooks/useReveal";
import projects from "../data/projects";

function localize(field, lang) {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang];
}

function ProjectCard({ project, lang, t, delay, onOpen }) {
  const { ref, inView, style } = useReveal(delay);
  const [imgOk, setImgOk] = useState(true);
  const showImage = project.image && imgOk;

  return (
    <div
      ref={ref}
      style={style}
      className={`project-card glass reveal ${inView ? "in" : ""}`}
      onClick={() => onOpen(project)}
    >
      <div className="project-thumb" style={showImage ? undefined : { background: project.gradient }}>
        {showImage ? (
          <img
            src={project.image}
            alt={localize(project.title, lang)}
            className="project-thumb-img"
            onError={() => setImgOk(false)}
          />
        ) : (
          project.icon
        )}
      </div>
      <div className="project-body">
        <h3>{localize(project.title, lang)}</h3>
        <p>{project.desc[lang]}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="project-links">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              {t.live}
            </a>
          )}
          {project.code && (
            <a href={project.code} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              {project.live ? "GitHub" : t.code_only}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ t, lang, onOpenProject }) {
  const head = useReveal(0);

  return (
    <section id="projects">
      <div className="container">
        <div ref={head.ref} style={head.style} className={`section-head reveal ${head.inView ? "in" : ""}`}>
          <span className="section-tag">{t.proj_tag}</span>
          <h2>{t.proj_title}</h2>
          <p>{t.proj_sub}</p>
        </div>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} lang={lang} t={t} delay={i * 70} onOpen={onOpenProject} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { localize };
