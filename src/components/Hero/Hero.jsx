import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import HeroCanvas from "./HeroCanvas";
import heroImgOne from "../../assets/image-one.png";
import heroImgTwo from "../../assets/image-two.png";
import heroImgThree from "../../assets/image-three.png";
import { FiSun, FiMoon } from "react-icons/fi";
import "./Hero.css";

const slides = [
  {
    subtitle: "FULL STACK DEVELOPER",
    title: "ZOHAIB HASSAN\nDEVELOPER",
    desc:
      "Building scalable, high-performance web applications with React, Laravel, and cloud-native architectures.",
    image: heroImgOne,
  },
  {
    subtitle: "FRONTEND ENGINEER",
    title: "REACT\nSPECIALIST",
    desc:
      "Designing fast, responsive, and accessible user interfaces using modern React architecture.",
    image: heroImgTwo,
  },
  {
    subtitle: "BACKEND EXPERT",
    title: "LARAVEL\nENGINEER",
    desc:
      "Developing secure backend systems with Laravel, REST APIs, and optimized databases.",
    image: heroImgThree,
  },
];

export default function Hero({ darkMode, setDarkMode }) {
  const [current, setCurrent] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    if (!slideRef.current) return;

    const el = slideRef.current;
    const subtitle = el.querySelector(".hero-subtitle");
    const title = el.querySelectorAll("h1 span");
    const desc = el.querySelector("p");
    const btn = el.querySelector(".hero-btn");
    const img = el.querySelector("img");

    gsap.set([subtitle, title, desc, btn, img], { opacity: 0 });

    gsap.timeline()
      .to(subtitle, { y: 0, opacity: 1, duration: 0.4 })
      .to(title, { y: 0, opacity: 1, stagger: 0.08 }, "-=0.2")
      .to(desc, { opacity: 1 }, "-=0.2")
      .to(btn, { opacity: 1 }, "-=0.2")
      .fromTo(img, { scale: 0.95 }, { scale: 1, opacity: 1, duration: 0.8 }, "-=0.4");
  }, [current]);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      9000
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", moveCursor);
    animateRing();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);


  return (
    <header className={`hero-wrapper ${darkMode ? "dark" : "light"}`}>
      <nav className="navbar">
        <div className="logo">Z</div>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#about">About</a></li>
        </ul>

        <button
          className={`theme-toggle ${darkMode ? "dark" : "light"}`}
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle theme"
        >
          {darkMode ? <FiMoon /> : <FiSun />}
        </button>
      </nav>

      <section className="hero">
        <div className="cursor-dot"></div>
        <div className="cursor-ring"></div>
        <div className="slides-wrapper">
          {slides.map((slide, index) => (
            <div
              key={index}
              ref={index === current ? slideRef : null}
              className={`slide ${index === current ? "active" : ""}`}
            >
              <div className="hero-content">
                <HeroCanvas darkMode={darkMode} />
                <span className="hero-subtitle">{slide.subtitle}</span>
                <h1>
                  {slide.title.split("\n").map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </h1>
                <p>{slide.desc}</p>
                <a href="#projects" className="hero-btn">View My Work</a>
              </div>

              <div className="hero-image">
                <img src={slide.image} alt="Hero" />
              </div>
            </div>
          ))}
        </div>

        <div className="hero-slider">
          <span>{String(current + 1).padStart(2, "0")}</span>
          <span className="line"></span>
          <span>{String(slides.length).padStart(2, "0")}</span>
        </div>
      </section>
    </header>
  );
}
