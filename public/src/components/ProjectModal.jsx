import { useState, useEffect } from "react";
import { localize } from "./Projects";

const ICONS = { p1: "🏎️", p2: "🚴", p3: "🚘", p4: "🦷", p5: "🔐", p6: "📦" };

function LinkRow({ label, url, copyTitle }) {
  const [copied, setCopied] = useState(false);

  function handleCopy(e) {
    e.stopPropagation();
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(() => fallbackCopy(url) || done());
    } else {
      fallbackCopy(url);
      done();
    }
  }

  return (
    <div className="modal-link-row">
      <span className="link-label">{label}</span>
      <a className="link-url" href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
      <button type="button" className={`copy-btn ${copied ? "copied" : ""}`} title={copyTitle} onClick={handleCopy}>
        {copied ? "✓" : "⧉"}
      </button>
    </div>
  );
}

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } catch (e) {
    /* ignore */
  }
  document.body.removeChild(ta);
}

export default function ProjectModal({ project, lang, t, onClose }) {
  const open = !!project;
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    setImgOk(true);
  }, [project]);

  return (
    <div className={`modal-overlay ${open ? "open" : ""}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box glass">
        <div className="modal-close" onClick={onClose}>
          ✕
        </div>
        {project && (
          <>
            {project.image && imgOk ? (
              <img
                className="modal-image show"
                src={project.image}
                alt={localize(project.title, lang)}
                onError={() => setImgOk(false)}
              />
            ) : (
              <div className="modal-icon">{ICONS[project.id] || "🚀"}</div>
            )}
            <h3>{localize(project.title, lang)}</h3>
            <p className="modal-desc">{project.desc[lang]}</p>
            <div className="modal-skills">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="modal-link-rows">
              {project.live && (
                <LinkRow label={t.live} url={project.live} copyTitle={lang === "ar" ? "نسخ الرابط" : "Copy link"} />
              )}
              {project.code && (
                <LinkRow
                  label={project.live ? "GitHub" : t.code_only}
                  url={project.code}
                  copyTitle={lang === "ar" ? "نسخ الرابط" : "Copy link"}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
