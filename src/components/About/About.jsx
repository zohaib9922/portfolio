import { FaReact, FaLaravel, FaJs, FaAws, FaVuejs, FaNodeJs } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import "./About.css";
import AboutWavesCanvas from "../canvas/AboutWavesCanvas.jsx";

const MILESTONES = [
  { year: "2017", title: "Started Journey", desc: "Began full-stack development with JavaScript & PHP foundations." },
  { year: "2019", title: "React Specialist", desc: "Led frontend rewrites for 3 SaaS products using React & Vue.js." },
  { year: "2021", title: "Cloud & Scale", desc: "Architected AWS-hosted systems serving 100k+ monthly users." },
  { year: "2024", title: "Now", desc: "Open to new challenges — remote or on-site, worldwide." },
];

const STACK = [
  { icon: <FaReact />, name: "React.js",     color: "chip-blue"   },
  { icon: <FaVuejs />, name: "Vue.js",        color: "chip-green"  },
  { icon: <FaJs />,    name: "JavaScript",    color: "chip-orange" },
  { icon: <FaNodeJs />,name: "Node.js",       color: "chip-green"  },
  { icon: <FaLaravel />,name: "Laravel",      color: "chip-red"    },
  { icon: <FaAws />,   name: "AWS",           color: "chip-purple" },
];

export default function About() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [termLine, setTermLine] = useState(0);

  const TERM_LINES = [
    "$ whoami",
    "> Zohaib — Full Stack Developer",
    "$ experience --years",
    "> 7+ years building at scale",
    "$ projects --count",
    "> 50+ shipped · 200+ happy clients",
    "$ status",
    "> ✦ Open to work · Remote / On-site",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (!entry.isIntersecting) setTermLine(0);
      },
      { threshold: 0.18 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (termLine >= TERM_LINES.length) return;
    const t = setTimeout(() => setTermLine((n) => n + 1), 220);
    return () => clearTimeout(t);
  }, [visible, termLine]);

  return (
    <section
      id="about"
      className={`ab2-section ${visible ? "ab2-visible" : ""}`}
      ref={sectionRef}
    >
      <AboutWavesCanvas />

      {/* ── TOP: section header ── */}
      <div className="ab2-header">
        <span className="ab2-eyebrow">
          <span className="eyebrow-line" />
          ABOUT ME
        </span>
        <h2 className="ab2-title">
          <span className="ab2-t-solid">The Story</span>
          <span className="ab2-t-stroke">Behind</span>
          <span className="ab2-t-faint">The Code</span>
        </h2>
      </div>

      {/* ── MIDDLE: timeline + terminal ── */}
      <div className="ab2-body">

        {/* LEFT — vertical timeline */}
        <div className="ab2-timeline">
          {MILESTONES.map((m, i) => (
            <div
              className="ab2-milestone"
              key={m.year}
              style={{ transitionDelay: `${0.1 + i * 0.12}s` }}
            >
              <div className="ab2-ms-left">
                <div className="ab2-ms-year">{m.year}</div>
                <div className="ab2-ms-line" />
              </div>
              <div className="ab2-ms-body">
                <div className="ab2-ms-dot" />
                <div className="ab2-ms-content">
                  <div className="ab2-ms-title">{m.title}</div>
                  <div className="ab2-ms-desc">{m.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — terminal + stack */}
        <div className="ab2-right">

          {/* Terminal window */}
          <div className="ab2-terminal">
            <div className="ab2-term-bar">
              <span className="ab2-tb-dot ab2-tb-red" />
              <span className="ab2-tb-dot ab2-tb-yellow" />
              <span className="ab2-tb-dot ab2-tb-green" />
              <span className="ab2-tb-title">zohaib@portfolio ~ bash</span>
            </div>
            <div className="ab2-term-body">
              {TERM_LINES.slice(0, termLine).map((line, i) => (
                <div
                  key={i}
                  className={`ab2-term-line ${line.startsWith("$") ? "ab2-cmd" : "ab2-out"}`}
                >
                  {line}
                </div>
              ))}
              {termLine < TERM_LINES.length && (
                <span className="ab2-cursor">▌</span>
              )}
            </div>
          </div>

          {/* Stack chips */}
          <div className="ab2-stack-wrap">
            <div className="ab2-stack-label">TECH STACK</div>
            <div className="ab2-stack-grid">
              {STACK.map((s) => (
                <div className="ab2-stack-item" key={s.name}>
                  <span className="ab2-stack-icon">{s.icon}</span>
                  <span className={`ab2-chip ${s.color}`}>{s.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM: stat strip ── */}
      <div className="ab2-strip">
        {[
          { num: "7+", label: "Years Experience" },
          { num: "50+", label: "Projects Shipped" },
          { num: "200+", label: "Happy Clients" },
          { num: "∞", label: "Lines of Code" },
        ].map((s, i) => (
          <div
            className="ab2-strip-item"
            key={s.label}
            style={{ transitionDelay: `${0.4 + i * 0.08}s` }}
          >
            <span className="ab2-strip-num">{s.num}</span>
            <span className="ab2-strip-label">{s.label}</span>
          </div>
        ))}
        <a href="#contact" className="ab2-cta">
          Let's Work Together <span className="ab2-arrow">→</span>
        </a>
      </div>
    </section>
  );
}