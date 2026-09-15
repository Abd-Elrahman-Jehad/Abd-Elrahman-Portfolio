import { useState, useRef, useEffect } from "react";
import useReveal from "../hooks/useReveal";
import { LinkedInIcon, GitHubIcon, WhatsAppIcon } from "./BrandIcons";

const AUTO_DISMISS_MS = 4500;
const EXIT_ANIM_MS = 380;

export default function Contact({ t, lang }) {
  const head = useReveal(0);
  const infoCard = useReveal(0);
  const formCard = useReveal(60);

  // A ready-made subject + greeting so the visitor's mail app opens with a
  // real starting point instead of a blank compose window.
  const mailSubject = lang === "ar" ? "تواصل من خلال موقعك الشخصي" : "Hello from your portfolio";
  const mailBody =
    lang === "ar"
      ? "مرحباً عبد الرحمن،\n\nشفت موقعك الشخصي وحابب أتواصل معك بخصوص:\n\n"
      : "Hi Abd Elrahman,\n\nI came across your portfolio and wanted to reach out about:\n\n";
  const mailtoHref = `mailto:jehadbood@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  const [status, setStatus] = useState(null);
  const [leaving, setLeaving] = useState(false);
  const [sending, setSending] = useState(false);
  const dismissTimer = useRef(null);
  const leaveTimer = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(dismissTimer.current);
      clearTimeout(leaveTimer.current);
    };
  }, []);

  function showStatus(next) {
    clearTimeout(dismissTimer.current);
    clearTimeout(leaveTimer.current);
    setLeaving(false);
    setStatus(next);
    dismissTimer.current = setTimeout(() => {
      setLeaving(true);
      leaveTimer.current = setTimeout(() => setStatus(null), EXIT_ANIM_MS);
    }, AUTO_DISMISS_MS);
  }

  function dismissNow() {
    clearTimeout(dismissTimer.current);
    clearTimeout(leaveTimer.current);
    setLeaving(true);
    leaveTimer.current = setTimeout(() => setStatus(null), EXIT_ANIM_MS);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    const form = e.target;
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        showStatus({ type: "success", message: t.f_success });
        form.reset();
      } else {
        throw new Error("failed");
      }
    } catch (err) {
      showStatus({ type: "error", message: t.f_error });
    }
    setSending(false);
  }

  return (
    <section id="contact">
      <div className="container">
        <div ref={head.ref} style={head.style} className={`section-head reveal ${head.inView ? "in" : ""}`}>
          <span className="section-tag">{t.contact_tag}</span>
          <h2>{t.contact_title}</h2>
          <p>{t.contact_sub}</p>
        </div>
        <div className="contact-wrap">
          <div
            ref={infoCard.ref}
            style={infoCard.style}
            className={`contact-info-card glass reveal ${infoCard.inView ? "in" : ""}`}
          >
            <h3>{t.contact_channels}</h3>
            <p>{t.contact_channels_sub}</p>

            <a
              className="contact-channel"
              href={mailtoHref}
              onClick={(e) => {
                // Keep the native mailto fallback while explicitly navigating
                // to it for browsers that do not reliably follow dynamic mailto hrefs.
                e.preventDefault();
                window.location.href = mailtoHref;
              }}
            >
              <div className="c-icon">✉️</div>
              <div>
                <b>{t.ch_email}</b>
                <span>jehadbood@gmail.com</span>
              </div>
            </a>
            <a className="contact-channel" href="https://wa.me/970592476126" target="_blank" rel="noopener noreferrer">
              <div className="c-icon brand-whatsapp">
                <WhatsAppIcon />
              </div>
              <div>
                <b>{t.ch_whatsapp}</b>
                <span>+970 592 476 126</span>
              </div>
            </a>
            <a
              className="contact-channel"
              href="https://www.linkedin.com/in/abd-elrahman-jehad-aldasht"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="c-icon brand-linkedin">
                <LinkedInIcon />
              </div>
              <div>
                <b>LinkedIn</b>
                <span>abd-elrahman-jehad-aldasht</span>
              </div>
            </a>
            <a
              className="contact-channel"
              href="https://github.com/Abd-Elrahman-Jehad"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="c-icon brand-github">
                <GitHubIcon />
              </div>
              <div>
                <b>GitHub</b>
                <span>Abd-Elrahman-Jehad</span>
              </div>
            </a>
          </div>

          <form
            ref={formCard.ref}
            style={formCard.style}
            className={`glass reveal ${formCard.inView ? "in" : ""}`}
            action="https://formsubmit.co/jehadbood@gmail.com"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="_subject" value="رسالة جديدة من البورتفوليو" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div className="form-group">
              <label>{t.f_name}</label>
              <input type="text" name="name" required placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label>{t.f_email}</label>
              <input type="email" name="email" required placeholder="you@email.com" />
            </div>
            <div className="form-group">
              <label>{t.f_message}</label>
              <textarea name="message" required placeholder="..." />
            </div>
            <button type="submit" className="btn btn-primary" style={{ justifyContent: "center" }} disabled={sending}>
              {sending ? t.f_sending : t.f_send}
            </button>
            {status && (
              <div className={`form-status form-status-${status.type} ${leaving ? "leaving" : ""}`}>
                <span className="form-status-icon">{status.type === "success" ? "✓" : "!"}</span>
                <span className="form-status-text">{status.message}</span>
                <button
                  type="button"
                  className="form-status-close"
                  aria-label="dismiss"
                  onClick={dismissNow}
                >
                  ✕
                </button>
                <span className="form-status-bar" />
              </div>
            )}
            <span className="form-note">{t.f_note}</span>
          </form>
        </div>
      </div>
    </section>
  );
}
