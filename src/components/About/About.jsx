import {
  FaReact,
  FaLaravel,
  FaJs,
  FaAws,
  FaVuejs
} from "react-icons/fa";

import { useEffect, useRef, useState } from "react";
import "./About.css";
import "../../App.css";
import AboutWavesCanvas from "../canvas/AboutWavesCanvas.jsx";

export default function About() {
  const aboutRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);  // Add animate class
        } else {
          setVisible(false); // Remove animate class when leaving viewport
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) observer.unobserve(aboutRef.current);
    };
  }, []);

  return (
    <section
      id="about"
      className={`about-section ${visible ? "animate" : ""}`}
      ref={aboutRef}
    >
      <AboutWavesCanvas />
      <div className="about-container">

        {/* LEFT */}
        <div className="about-text">
          <span className="about-subtitle">ABOUT ME</span>

          <h2>
            Building Digital <br /> Experiences With Code
          </h2>

          <p>
            I’m <strong>Zohaib</strong>, a Full Stack JavaScript Developer with 7+ years of experience building and scaling modern, responsive web applications using React.js, Vue.js, Node.js, and Express.js. Proven ability to lead end-to-end application development—from frontend component architecture to backend API design and database optimization. Specialized in creating intuitive, performant user interfaces while maintaining robust backend integrations. Focused on delivering scalable, maintainable code that drives measurable business outcomes and enhances user engagement
          </p>

          <div className="about-stats">
            <div>
              <h3>5+</h3>
              <span>Years Experience</span>
            </div>
            <div>
              <h3>50+</h3>
              <span>Projects Completed</span>
            </div>
            <div>
              <h3>200+</h3>
              <span>Happy Clients</span>
            </div>
          </div>

          <a href="#contact" className="about-btn">
            Let’s Work Together →
          </a>
        </div>

        {/* RIGHT */}
        <div className="about-visual">
          <div className="glass-card tech-3d">
            <div className="tech-item">
              <FaReact />
              <span>React</span>
            </div>

            <div className="tech-item">
              <FaLaravel />
              <span>Laravel</span>
            </div>

            <div className="tech-item">
              <FaJs />
              <span>JavaScript</span>
            </div>

            <div className="tech-item">
              <FaVuejs />
              <span>Vue.js</span>
            </div>

            <div className="tech-item">
              <FaAws />
              <span>AWS</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
