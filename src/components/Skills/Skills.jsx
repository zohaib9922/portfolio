import React, { useEffect, useRef, useState } from "react";
import {
  FaAws,
  FaReact,
  FaVuejs,
  FaLaravel,
  FaPhp,
  FaCode,
} from "react-icons/fa";
import "./Skills.css";

const techIcons = [
  { icon: FaReact, name: "React.js", color: "#61dafb" },
  { icon: FaVuejs, name: "Vue.js", color: "#42b883" },
  { icon: FaAws, name: "AWS Cloud", color: "#ff9900" },
  { icon: FaLaravel, name: "Laravel", color: "#ff2d20" },
  { icon: FaPhp, name: "PHP", color: "#787cb5" },
  { icon: FaCode, name: "Other Tools", color: "#6366f1" },
];

const syntaxSnippets = [
  "<React />",
  "{ useState }",
  "function App() {}",
  "axios.get()",
  "Route::get()",
  "<?php ?>",
  "Blade::component()",
  "npm start",
  "import React from 'react'",
];

const Skills = () => {
  const skillsRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => skillsRef.current && observer.unobserve(skillsRef.current);
  }, []);

  return (
    <section
      id="skills"
      className={`skills-section ${visible ? "animate" : ""}`}
      ref={skillsRef}
    >
      {/* Floating syntax snippets */}
      <div className="syntax-bg">
        {syntaxSnippets.map((snippet, i) => (
          <span
            key={i}
            style={{
              "--x": `${Math.random() * 100}%`,
              "--y": `${Math.random() * 100}%`,
              "--size": `${15 + Math.random() * 20}px`,
              "--duration": `${15 + Math.random() * 15}s`,
              "--delay": `${Math.random() * 5}s`,
              "--opacity": 0.05 + Math.random() * 0.2,
            }}
          >
            {snippet}
          </span>
        ))}
      </div>

      <div className="skills-header">
        <div className="skills-text">
          <span className="subtitle">My Expertise</span>
          <h2>Technologies I’ve Worked With</h2>
          <p>
            Over the years, I have built scalable, high-performance applications using
            modern frameworks, cloud services, and backend technologies. These are the
            tools I’m most confident in.
          </p>
        </div>

        <div className="skills-icons">
          {techIcons.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div
                key={i}
                className="icon-card"
                style={{
                  "--icon-color": tech.color,
                  "--delay": `${i * 0.15}s`,
                }}
              >
                <div className="icon-inner">
                  <div className="icon-circle">
                    <Icon />
                  </div>
                  <span>{tech.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
