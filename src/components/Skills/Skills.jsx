import React, { useEffect, useRef, useState } from "react";
import {
  FaAws,
  FaReact,
  FaVuejs,
  FaLaravel,
  FaPhp,
  FaCode,
  FaNodeJs,
  FaDocker,
} from "react-icons/fa";
import {
  SiMysql,
  SiTypescript,
  SiTailwindcss,
  SiElasticsearch,
} from "react-icons/si";
import "./Skills.css";

const skills = [
  { icon: FaReact,         name: "React.js",      color: "#61dafb", chip: "chip-blue"   },
  { icon: FaVuejs,         name: "Vue.js",         color: "#42b883", chip: "chip-green"  },
  { icon: FaLaravel,       name: "Laravel",        color: "#ff2d20", chip: "chip-red"    },
  { icon: FaNodeJs,        name: "Node.js",        color: "#68a063", chip: "chip-green"  },
  { icon: FaPhp,           name: "PHP",            color: "#787cb5", chip: "chip-purple" },
  { icon: FaAws,           name: "AWS",            color: "#ff9900", chip: "chip-orange" },
  { icon: SiMysql,         name: "MySQL",          color: "#4479a1", chip: "chip-blue"   },
  { icon: SiElasticsearch, name: "Elasticsearch",  color: "#00bfb3", chip: "chip-blue"   },
  { icon: SiTypescript,    name: "TypeScript",     color: "#3178c6", chip: "chip-blue"   },
  { icon: SiTailwindcss,   name: "Tailwind CSS",   color: "#38bdf8", chip: "chip-blue"   },
  { icon: FaDocker,        name: "Docker",         color: "#2496ed", chip: "chip-blue"   },
  { icon: FaCode,          name: "REST APIs",      color: "#b8b0ff", chip: "chip-purple" },
];

const snippets = [
  "<React />", "{ useState }", "Route::get()", "<?php ?>",
  "npm start", "SELECT * FROM", "docker run", "async/await",
  "v-model", "git commit", ".env", "composer install",
];

const Skills = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  return (
    <section
      id="skills"
      className={`sk-section${visible ? " sk-visible" : ""}`}
      ref={sectionRef}
    >
      {/* floating code snippets */}
      <div className="sk-syntax-bg" aria-hidden="true">
        {snippets.map((s, i) => (
          <span key={i} className="sk-snippet" style={{ "--si": i }}>{s}</span>
        ))}
      </div>

      <div className="sk-inner">
        {/* Header */}
        <div className="sk-header">
          <div className="sk-eyebrow">
            <span className="eyebrow-line" />
            My Expertise
          </div>
          <h2 className="sk-title">
            <span className="sk-t-solid">Technologies</span>
            <span className="sk-t-stroke">I've</span>
            <span className="sk-t-faint">mastered</span>
          </h2>
          <p className="sk-subtitle">
            Scalable frontends, robust backends, and cloud infrastructure —
            built with the tools that matter.
          </p>
        </div>

        {/* Grid */}
        <div className="sk-grid">
          {skills.map((sk, i) => {
            const Icon = sk.icon;
            return (
              <div
                key={i}
                className="sk-card"
                style={{ "--i": i, "--c": sk.color }}
              >
                <div className="sk-card-glow" />
                <div className="sk-card-icon">
                  <Icon />
                </div>
                <p className="sk-card-name">{sk.name}</p>
                <span className={`sk-card-chip ab2-chip ${sk.chip}`}>{sk.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;