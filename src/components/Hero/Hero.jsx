import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import HeroCanvas from "./HeroCanvas";
import heroImgOne from "../../assets/image-one.png";
import heroImgTwo from "../../assets/image-two.png";
import heroImgThree from "../../assets/image-three.png";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import "./Hero.css";

const slides = [
  {
    eyebrow: "Full-Stack Developer",
    title: ["ZOHAIB", "HASSAN", "DEV"],
    titleStyles: ["", "stroke", "fade"],
    roles: [
      { label: "React", cls: "role-react" },
      { label: "Laravel", cls: "role-laravel" },
      { label: "Cloud", cls: "role-cloud" },
    ],
    desc: "Building scalable, high-performance web applications with React, Laravel, and cloud-native architectures that handle real-world traffic.",
    image: heroImgOne,
  },
  {
    eyebrow: "Frontend Engineer",
    title: ["REACT", "SPECIALIST", "UI/UX"],
    titleStyles: ["", "stroke", "fade"],
    roles: [
      { label: "Next.js", cls: "role-react" },
      { label: "Tailwind", cls: "role-cloud" },
      { label: "GSAP", cls: "role-laravel" },
    ],
    desc: "Designing fast, responsive, and accessible user interfaces using modern React architecture and animation-forward design principles.",
    image: heroImgTwo,
  },
  {
    eyebrow: "Backend Engineer",
    title: ["LARAVEL", "ENGINEER", "API"],
    titleStyles: ["", "stroke", "fade"],
    roles: [
      { label: "Laravel", cls: "role-laravel" },
      { label: "MySQL", cls: "role-react" },
      { label: "AWS", cls: "role-cloud" },
    ],
    desc: "Developing secure, performant backend systems with Laravel, REST APIs, and optimized relational databases built for scale.",
    image: heroImgThree,
  },
];

const skills = [
  { label: "React / Next.js", pct: 95 },
  { label: "Laravel / PHP", pct: 90 },
  { label: "Node.js / APIs", pct: 82 },
  { label: "AWS / DevOps", pct: 75 },
];

export default function Hero({ darkMode, setDarkMode }) {
  const [current, setCurrent] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const slideRef = useRef(null);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    setCurrent(idx);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      8000
    );
  };

  useEffect(() => {
    timerRef.current = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      8000
    );
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (!slideRef.current) return;
    const el = slideRef.current;
    const targets = [
      el.querySelector(".hero-eyebrow"),
      ...el.querySelectorAll(".hero-h1 span"),
      el.querySelector(".hero-roles"),
      el.querySelector(".hero-desc"),
      el.querySelector(".hero-actions"),
      el.querySelector(".hero-stats"),
      el.querySelector(".hero-image img"),
    ].filter(Boolean);

    gsap.killTweensOf(targets);
    gsap.set(targets, { opacity: 0, y: 18 });
    gsap.timeline()
      .to(targets[0], { opacity: 1, y: 0, duration: 0.35 })
      .to(targets.slice(1, 4), { opacity: 1, y: 0, stagger: 0.07, duration: 0.35 }, "-=0.15")
      .to(targets.slice(4), { opacity: 1, y: 0, stagger: 0.06, duration: 0.35 }, "-=0.2");
  }, [current]);

  useEffect(() => {
  const hero = document.querySelector(".hero-section");
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (!hero || !dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  // Hide initially
  dot.style.opacity = "0";
  ring.style.opacity = "0";

  const enter = () => {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  };

  const leave = () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  };

  const move = (e) => {
    const rect = hero.getBoundingClientRect();

    mx = e.clientX - rect.left;
    my = e.clientY - rect.top;

    dot.style.left = `${mx}px`;
    dot.style.top = `${my}px`;
  };

  const animate = () => {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;

    ring.style.left = `${rx}px`;
    ring.style.top = `${ry}px`;

    requestAnimationFrame(animate);
  };

  hero.addEventListener("mouseenter", enter);
  hero.addEventListener("mouseleave", leave);
  hero.addEventListener("mousemove", move);

  animate();

  return () => {
    hero.removeEventListener("mouseenter", enter);
    hero.removeEventListener("mouseleave", leave);
    hero.removeEventListener("mousemove", move);
  };
}, []);

  const slide = slides[current];

  return (
    <div className={`hero-wrapper ${darkMode ? "dark" : "light"}`}>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-logo">
          <div className="nav-logomark">Z</div>
          <span className="nav-wordmark">
            Zohaib<em>.dev</em>
          </span>
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {["Home", "Projects", "Skills", "About"].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <div className="avail-pill">
            <span className="avail-dot" />
            Available for work
          </div>

          {/* <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            {darkMode ? <FiMoon /> : <FiSun />}
          </button> */}

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* ── HERO BODY ── */}
      <section className="hero-section">
        <div className="cursor-dot" />
        <div className="cursor-ring" />
        <HeroCanvas darkMode={darkMode} />

        <div className="hero-inner">

          {/* LEFT — slides */}
          <div className="hero-left">
            {slides.map((s, i) => (
              <div
                key={i}
                ref={i === current ? slideRef : null}
                className={`hero-slide ${i === current ? "active" : ""}`}
              >
                {/* eyebrow */}
                <div className="hero-eyebrow">
                  <span className="eyebrow-line" />
                  {s.eyebrow}
                </div>

                {/* heading */}
                <h1 className="hero-h1">
                  {s.title.map((word, wi) => (
                    <span key={wi} className={`h1-word h1-${s.titleStyles[wi]}`}>
                      {word}
                    </span>
                  ))}
                </h1>

                {/* role tags */}
                <div className="hero-roles">
                  {s.roles.map((r, ri) => (
                    <span key={ri} className={`role-tag ${r.cls}`}>
                      {r.label}
                    </span>
                  ))}
                </div>

                {/* description */}
                <p className="hero-desc">{s.desc}</p>

                {/* CTA buttons */}
                <div className="hero-actions">
                  <a href="#projects" className="btn-primary">
                    View my work
                  </a>
                  <a href="/cv.pdf" className="btn-secondary" download>
                    Download CV
                  </a>
                </div>

                {/* stats strip */}
                <div className="hero-stats">
                  {[
                    { n: "4+", l: "Years exp." },
                    { n: "35+", l: "Projects" },
                    { n: "12+", l: "Clients" },
                  ].map((st, si) => (
                    <div className="stat-item" key={si}>
                      <span className="stat-num">{st.n}</span>
                      <span className="stat-label">{st.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — profile card + mini cards */}
          <div className="hero-right">
            {/* profile card */}
            <div className="profile-card">
              <div className="card-top">
                <div className="card-avatar">ZH</div>
                <div>
                  <div className="card-name">Zohaib Hassan</div>
                  <div className="card-role-label">Full-Stack Developer · 4 yrs</div>
                </div>
              </div>

              <div className="skill-list">
                {skills.map((sk) => (
                  <div className="skill-row" key={sk.label}>
                    <div className="skill-meta">
                      <span>{sk.label}</span>
                      <span>{sk.pct}%</span>
                    </div>
                    <div className="skill-track">
                      <div className="skill-bar" style={{ width: `${sk.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="card-footer">
                <div className="social-links">
                  {[
                    { href: "https://github.com", icon: "github", label: "GitHub" },
                    { href: "https://linkedin.com", icon: "linkedin", label: "LinkedIn" },
                    { href: "mailto:zohaib@example.com", icon: "mail", label: "Email" },
                  ].map((s) => (
                    <a key={s.icon} href={s.href} className="social-btn" aria-label={s.label} target="_blank" rel="noreferrer">
                      <i className={`fi fi-brands-${s.icon}`} />
                    </a>
                  ))}
                </div>
                <div className="open-badge">✓ Open to hire</div>
              </div>
            </div>

            {/* mini cards */}
            <div className="mini-cards">
              <div className="mini-card">
                <div className="mini-label">Response rate</div>
                <div className="mini-val">98%</div>
                <div className="mini-sub">Avg. reply &lt; 2h</div>
              </div>
              <div className="mini-card">
                <div className="mini-label">Current stack</div>
                <div className="tech-chips">
                  {[
                    { t: "React", c: "chip-blue" },
                    { t: "Node", c: "chip-green" },
                    { t: "TS", c: "chip-purple" },
                    { t: "Laravel", c: "chip-orange" },
                  ].map((ch) => (
                    <span key={ch.t} className={`tech-chip ${ch.c}`}>{ch.t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* current slide image (hidden on mobile, shows on large screens) */}
            <div className="hero-image">
              <img src={slide.image} alt={slide.eyebrow} />
            </div>
          </div>
        </div>

        {/* slide counter dots */}
        <div className="slide-nav">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`slide-dot ${i === current ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
          <span className="slide-count">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        <div className="scroll-hint">
          <span className="scroll-line" />
          Scroll to explore
        </div>
      </section>
    </div>
  );
}