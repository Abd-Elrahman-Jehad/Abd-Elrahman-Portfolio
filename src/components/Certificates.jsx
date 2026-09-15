import useReveal from "../hooks/useReveal";
import certificates from "../data/certificates";

function localize(field, lang) {
  if (typeof field === "string") return field;
  return field[lang];
}

function CertCard({ cert, lang, delay, onOpen }) {
  const { ref, inView, style } = useReveal(delay);
  return (
    <div
      ref={ref}
      style={style}
      className={`cert-card glass reveal ${inView ? "in" : ""}`}
      tabIndex={0}
      onClick={() => onOpen(cert)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen(cert);
      }}
    >
      <div className="cert-icon">{cert.icon}</div>
      <h3>{localize(cert.title, lang)}</h3>
      <div className="org">{cert.org}</div>
    </div>
  );
}

export default function Certificates({ t, lang, onOpenCert }) {
  const head = useReveal(0);

  return (
    <section id="certificates">
      <div className="container">
        <div ref={head.ref} style={head.style} className={`section-head reveal ${head.inView ? "in" : ""}`}>
          <span className="section-tag">{t.cert_tag}</span>
          <h2>{t.cert_title}</h2>
        </div>
        <div className="cert-grid">
          {certificates.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} lang={lang} delay={i * 70} onOpen={onOpenCert} />
          ))}
        </div>
        <p
          style={{
            textAlign: "center",
            marginTop: 18,
            fontSize: 12.5,
            color: "var(--text-dim)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {t.cert_hint}
        </p>
      </div>
    </section>
  );
}

export { localize };
