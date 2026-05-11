import React, { useState, useRef, useEffect } from "react";
import "./Projects.css";
import labProject from "../../assets//projects/lab-mangement.png";
import TourProject from "../../assets//projects/tour-management.png";
import MultiVendor from "../../assets//projects/multi-vendor-project.jpg";
import WordPress from "../../assets//projects/wordpress.png";
import plugin from "../../assets//projects/plugin.jpg";
import plugintwo from "../../assets//projects/plugin-2.jpg";

const projects = [
  {
    title: "Portfolio Website",
    short: "Modern developer portfolio",
    description:
      "A high-performance personal portfolio built with React, smooth animations, glassmorphism UI, and fully responsive layouts. Designed to showcase skills, projects, and professional experience.",
    image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546",
    tech: ["React", "CSS", "Framer Motion"],
    link: "https://github.com/zohaib9922/portfolio",
  },
  {
    title: "E-Commerce Platform",
    short: "Full-stack shopping experience",
    description:
      "A complete e-commerce solution with product listings, cart, checkout, authentication, and admin dashboard. Focused on performance, scalability, and clean UI.",
    image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514",
    tech: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "Smart Reading Progress – WordPress Reading Progress Plugin",
    short: "Lightweight reading progress bar for WordPress",
    description: [
      "Developed a lightweight WordPress plugin that adds a smart reading progress indicator to improve user engagement and reading experience on blog posts and long-form content.",
      "Built with clean PHP, JavaScript, and WordPress hooks, featuring customizable progress tracking, responsive behavior, and optimized frontend performance with minimal resource usage."
    ],
    image: plugin,
    tech: ["WordPress", "PHP", "JavaScript", "CSS", "Plugin Development"],
    link: "https://github.com/zohaib9922/smart-reading-progress",
  },
  {
    title: "SaaS Dashboard",
    short: "Analytics & management",
    description:
      "A modern SaaS dashboard with real-time data visualization, role-based access, charts, and secure APIs.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    tech: ["React", "REST API", "Charts"],
  },
  {
    title: "Task Manager App",
    short: "Productivity tool",
    description:
      "Task management application with drag-and-drop, deadlines, reminders, and cloud sync.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    tech: ["React", "Firebase"],
  },
  {
    title: "Lab Management System – Enterprise SaaS",
    short: "Healthcare workflow automation",
    description: [
      "Developed dynamic, responsive frontend interfaces using React.js and Vue.js, improving user engagement metrics by ~40% and reducing bounce rates by ~35%.",
      "Built robust API-driven architectures with Node.js and Express.js, enabling seamless frontend-backend communication and real-time data synchronization serving 10,000+ monthly active users.",
      "Implemented real-time analytics integration using Amplitude, providing actionable insights into user behavior patterns, feature adoption, and conversion funnels.",
      "Designed scalable microservice-style backend components supporting long-term growth with 99.9% uptime and sub-200ms response times.",
      "Integrated Elasticsearch for advanced search functionality, reducing search query times by ~75% and improving user search satisfaction.",
      "Developed comprehensive RESTful API endpoints handling authentication, data processing, and third party service integrations.",
      "Collaborated in Agile teams, contributing to sprint planning, code reviews, and delivering features on schedule with consistent velocity."
    ],
    image: labProject,
    tech: ["Laravel", "MySQL", "Elasticsearch", "Stripe API", "REST APIs"],
  },
  {
    title: "Tour Management System – Travel & Booking Platform",
    short: "Tour booking & management solution",
    description: [
      "Built a complete tour booking and management platform enabling customers to browse, book, and manage travel packages.",
      "Developed with Laravel backend and Vue.js SPA frontend for seamless user experience and efficient booking workflows."
    ],
    link: "https://github.com/zohaib9922/tour-booking-api",
    image: TourProject,
    tech: ["Laravel", "Vue.js", "MySQL", "Stripe", "RESTful APIs"],
  },
  {
    title: "Enterprise E-Commerce Platform – Multi-Vendor Marketplace",
    short: "Scalable multi-vendor e-commerce solution",
    description: [
      "Developed a scalable e-commerce platform supporting multiple vendors with comprehensive order and inventory management.",
      "Built with Laravel for backend scalability and integrated AWS S3 for efficient product image storage and retrieval."
    ],
    image: MultiVendor,
    tech: ["Laravel", "MySQL", "AWS S3", "Stripe", "PayPal", "REST APIs"],
  },
  {
    title: "WordPress Multi-Site Network – Enterprise Content Management",
    short: "Centralized WordPress multi-site setup",
    description: [
      "Architected and deployed a WordPress multi-site network managing 20+ branded websites from a centralized dashboard.",
      "Built with custom theme development and shared component library for consistent branding and performance optimization."
    ],
    image: WordPress,
    tech: ["WordPress", "PHP", "MySQL", "Custom Theme Development"],
  },
  {
    title: "Live Visitor Counter – Real-Time Website Analytics Plugin",
    short: "Real-time visitor tracking for websites",
    description: [
      "Developed a lightweight live visitor counter plugin that tracks and displays real-time website visitors, helping website owners monitor engagement and traffic activity instantly.",
      "Built using PHP, JavaScript, and AJAX-based updates for smooth real-time counting, optimized performance, and seamless integration with WordPress websites and custom web applications."
    ],
    image: plugintwo,
    tech: ["WordPress", "PHP", "JavaScript", "AJAX", "MySQL"],
    link: "https://github.com/zohaib9922/live-visitor-counter",
  },
  {
    title: "Advanced Visitor Analytics – Real-Time Website Traffic Insights",
    short: "Comprehensive visitor analytics and tracking system",
    description: [
      "Developed an advanced visitor analytics solution that tracks real-time website traffic, visitor behavior, page views, and engagement metrics through an intuitive analytics dashboard.",
      "Built with PHP, JavaScript, AJAX, and MySQL, featuring live traffic monitoring, session tracking, device and browser analytics, and performance-optimized data processing for WordPress and custom web applications."
    ],
    image: plugin,
    tech: ["WordPress", "PHP", "JavaScript", "AJAX", "MySQL", "Analytics Dashboard"],
    link: "https://github.com/zohaib9922/advanced-visitor-analytics",
  }
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const projectsRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    if (projectsRef.current) observer.observe(projectsRef.current);

    return () => {
      if (projectsRef.current) observer.unobserve(projectsRef.current);
    };
  }, []);

  return (
    <section
      className={`projects-section ${visible ? "animate" : ""}`}
      id="projects"
      ref={projectsRef}
    >
      <h2 className="projects-title">My Projects</h2>
      <p className="projects-subtitle">
        Selected work showcasing design, development, and problem solving
      </p>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            className={`project-card ${index === 0 ? "large" : ""}`}
            key={index}
            onClick={() => setActiveProject(project)}
            style={{ "--delay": `${index * 0.15}s` }}
          >
            <img src={project.image} alt={project.title} />
            <div className="project-overlay">
              <h3>{project.title}</h3>
              <p>{project.short}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn"
                >
                  🚀 View Code <span style={{ fontSize: "16px" }}>→</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {activeProject && (
        <div className="project-modal">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setActiveProject(null)}
            >
              ✕
            </button>

            <img src={activeProject.image} alt={activeProject.title} />

            <h3>{activeProject.title}</h3>

            <div className="project-description">
              {Array.isArray(activeProject.description)
                ? activeProject.description.map((d, i) => (
                    <p key={i}>{d}</p>
                  ))
                : <p>{activeProject.description}</p>}
            </div>

            <div className="tech-stack">
              {activeProject.tech.map((tech, i) => (
                <span key={i}>{tech}</span>
              ))}
            </div>

            {activeProject.link && (
              <a
                href={activeProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn modal-btn"
              >
                🚀 View Code <span>→</span>
              </a>
            )}

          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;