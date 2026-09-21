import useReveal from "../hooks/useReveal";
import platforms from "../data/platforms";

function PlatformPill({ p, delay }) {
  const { ref, inView, style } = useReveal(delay);
  return (
    <a
      ref={ref}
      style={style}
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`platform-pill glass reveal ${inView ? "in" : ""}`}
    >
      <div className="p-icon">{p.label}</div>
      <div>
        <b>{p.name}</b>
        <span>{p.sub}</span>
      </div>
    </a>
  );
}

export default function Platforms({ t }) {
  const head = useReveal(0);

  return (
    <section id="platforms">
      <div className="container">
        <div ref={head.ref} style={head.style} className={`section-head reveal ${head.inView ? "in" : ""}`}>
          <span className="section-tag">{t.plat_tag}</span>
          <h2>{t.plat_title}</h2>
        </div>
        <div className="platforms-strip">
          {platforms.map((p, i) => (
            <PlatformPill key={p.id} p={p} delay={i * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}
