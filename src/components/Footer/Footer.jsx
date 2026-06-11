import React from "react";
import { FaGithub, FaLinkedin, FaGitlab } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="ftr-section">
      <div className="ftr-glow-top" />

      <div className="ftr-container">
        <div className="ftr-top">

          {/* Brand */}
          <div className="ftr-brand">
            <div className="ftr-logo">
              <span className="ftr-logo-bracket">&lt;</span>
              ZH
              <span className="ftr-logo-bracket">/&gt;</span>
            </div>
            <p className="ftr-brand-name">Zohaib Hassan</p>
            <p className="ftr-brand-role">Full Stack Developer</p>
            <p className="ftr-brand-bio">
              Building performant web experiences with clean code and thoughtful design.
            </p>
          </div>

          {/* Nav */}
          <div className="ftr-col">
            <p className="ftr-col-label">Navigation</p>
            <ul className="ftr-nav">
              {["Home", "Skills", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="ftr-nav-link">
                    <span className="ftr-nav-arrow">→</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="ftr-col">
            <p className="ftr-col-label">Contact</p>
            <div className="ftr-contact-list">
              <a href="mailto:hzuhaib57@gmail.com" className="ftr-contact-item">
                <span className="ftr-contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M2 7l10 7 10-7"/>
                  </svg>
                </span>
                hzuhaib57@gmail.com
              </a>
              <a href="tel:+923114277133" className="ftr-contact-item">
                <span className="ftr-contact-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.51-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </span>
                +92 311 4277133
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="ftr-col">
            <p className="ftr-col-label">Connect</p>
            <div className="ftr-social">
              <a href="https://github.com/zohaib9922" target="_blank" rel="noopener noreferrer" className="ftr-social-link" aria-label="GitHub">
                <FaGithub />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/zohaibhasann" target="_blank" rel="noopener noreferrer" className="ftr-social-link" aria-label="LinkedIn">
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a href="https://gitlab.com/hzuhaib57" target="_blank" rel="noopener noreferrer" className="ftr-social-link" aria-label="GitLab">
                <FaGitlab />
                <span>GitLab</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="ftr-bottom">
          <p className="ftr-copy">© {new Date().getFullYear()} Zohaib Hassan. All rights reserved.</p>
          <p className="ftr-made">Crafted with React &amp; passion</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;