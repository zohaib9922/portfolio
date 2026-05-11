import React from "react";
import { FaGithub, FaLinkedin, FaGitlab, FaEnvelope, FaPhone } from "react-icons/fa";
import "./Footer.css";
import "../../App.css";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>Zohaib Hassan</h3>
            <p>Full Stack Developer </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact Me</h4>
            <p><FaEnvelope /><a href="mailto:hzuhaib57@gmail.com"> hzuhaib57@gmail.com</a></p>
            <p className="phone-icon"><FaPhone /><a href="tel:+923114277133"> +92 311 4277133</a></p>
          </div>

          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://github.com/zohaib9922" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://www.linkedin.com/in/zohaibhasann" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://gitlab.com/hzuhaib57" target="_blank" rel="noopener noreferrer"><FaGitlab /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Zohaib Hassan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
