import { useState, useEffect } from "react";
import { certLinkedInUrl } from "../data/certificates";
import { localize } from "./Certificates";

export default function CertModal({ cert, lang, t, onClose }) {
  const [pulse, setPulse] = useState(false);
  const [imgOk, setImgOk] = useState(true);
  const open = !!cert;

  useEffect(() => {
    setImgOk(true);
  }, [cert]);

  function handleLinkedInClick() {
    setPulse(true);
    setTimeout(() => setPulse(false), 500);
  }

  return (
    <div className={`modal-overlay ${open ? "open" : ""}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box glass">
        <div className="modal-close" onClick={onClose}>
          ✕
        </div>
        {cert && (
          <>
            {cert.image && imgOk ? (
              <img
                className="modal-image show"
                src={cert.image}
                alt={localize(cert.title, lang)}
                onError={() => setImgOk(false)}
              />
            ) : (
              <div className="modal-icon">{cert.icon}</div>
            )}
            <h3>{localize(cert.title, lang)}</h3>
            <div className="modal-org">{cert.org}</div>
            <span className="modal-date" />
            <p className="modal-desc">{cert.desc[lang]}</p>
            <div className="modal-skills">
              {cert.skills[lang].map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
            <a
              href={certLinkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-primary modal-linkedin-btn ${pulse ? "pulse" : ""}`}
              onClick={handleLinkedInClick}
            >
              {t.modal_view_linkedin}
            </a>
          </>
        )}
      </div>
    </div>
  );
}
