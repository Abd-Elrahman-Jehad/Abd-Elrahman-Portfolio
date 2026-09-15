import { useEffect, useRef, useState } from "react";
import useCountUp from "../hooks/useCountUp";
import heroPhoto from "../assets/its-me.jpeg";

function Typewriter({ words }) {
  const [text, setText] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const word = words[wordIndex];
      if (!deleting) {
        charIndex++;
        setText(word.slice(0, charIndex));
        if (charIndex === word.length) {
          deleting = true;
          timeoutRef.current = setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        setText(word.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      timeoutRef.current = setTimeout(tick, deleting ? 40 : 80);
    }

    tick();
    return () => clearTimeout(timeoutRef.current);
  }, [words]);

  return (
    <div className="typewriter mono">
      {text}
      <span className="cursor-blink">|</span>
    </div>
  );
}

function StatCard({ icon, target, suffix, label }) {
  const { ref, display } = useCountUp(target, suffix);
  return (
    <div className="stat-card glass" ref={ref}>
      <span className="stat-icon">{icon}</span>
      <div>
        <b>{display}</b>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  );
}

export default function Hero({ t }) {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="eyebrow glass"><span className="eyebrow-text">{t.hero_eyebrow}</span></div>
          <Typewriter words={t.tw_words} />
          <h1 dangerouslySetInnerHTML={{ __html: t.hero_title_html }} />
          <p className="sub">{t.hero_sub}</p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              {t.hero_cta1}
            </a>
            <a href="#contact" className="btn btn-ghost">
              {t.hero_cta2}
            </a>
          </div>
          <div className="hero-stats-row">
            <StatCard icon="🚀" target={9} suffix="+" label={t.stat1} />
            <StatCard icon="🌐" target={5} suffix="" label={t.stat2} />
            <StatCard icon="🎓" target={2026} suffix="" label={t.stat3} />
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-visual-card glass">
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
            <div className="hero-avatar-wrap">
              <div className="hero-avatar-ring">
                <img src={heroPhoto} alt="Abd Elrahman Jehad" loading="eager" fetchPriority="high" decoding="async" />
              </div>
              <div className="hero-status-pill">
                <span className="dot-live" /> {t.hero_available}
              </div>
            </div>
            <div className="hero-float-badge hf1">💻 Front-End</div>
            <div className="hero-float-badge hf2">⚛️ React</div>
            <div className="hero-float-badge hf3">🏆 IEEE</div>
          </div>
        </div>
      </div>

      <a href="#about" className="scroll-hint" aria-label="Scroll down">
        <div className="scroll-mouse">
          <span className="scroll-dot" />
        </div>
        <span className="scroll-label">{t.scroll}</span>
        <svg className="scroll-chevron" width="14" height="8" viewBox="0 0 14 8" fill="none">
          <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
