import React, { useState, useRef, useEffect } from "react";
import "./Projects.css";
import labProject from "../../assets/projects/lab-mangement.png";
import TourProject from "../../assets/projects/tour-management.png";
import MultiVendor from "../../assets/projects/multi-vendor-project.jpg";
import WordPress from "../../assets/projects/wordpress.png";
import plugin from "../../assets/projects/plugin.jpg";
import plugintwo from "../../assets/projects/plugin-2.jpg";

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
    title: "Smart Reading Progress",
    short: "WordPress reading progress plugin",
    description: [
      "Developed a lightweight WordPress plugin that adds a smart reading progress indicator to improve user engagement and reading experience on blog posts and long-form content.",
      "Built with clean PHP, JavaScript, and WordPress hooks, featuring customizable progress tracking, responsive behavior, and optimized frontend performance with minimal resource usage.",
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
    title: "Lab Management System",
    short: "Enterprise SaaS · Healthcare",
    description: [
      "Developed dynamic, responsive frontend interfaces using React.js and Vue.js, improving user engagement metrics by ~40% and reducing bounce rates by ~35%.",
      "Built robust API-driven architectures with Node.js and Express.js, enabling seamless frontend-backend communication and real-time data synchronization serving 10,000+ monthly active users.",
      "Integrated Elasticsearch for advanced search functionality, reducing search query times by ~75% and improving user search satisfaction.",
    ],
    image: labProject,
    tech: ["Laravel", "MySQL", "Elasticsearch", "Stripe API", "REST APIs"],
  },
  {
    title: "Tour Management System",
    short: "Travel & booking platform",
    description: [
      "Built a complete tour booking and management platform enabling customers to browse, book, and manage travel packages.",
      "Developed with Laravel backend and Vue.js SPA frontend for seamless user experience and efficient booking workflows.",
    ],
    link: "https://github.com/zohaib9922/tour-booking-api",
    image: TourProject,
    tech: ["Laravel", "Vue.js", "MySQL", "Stripe", "RESTful APIs"],
  },
  {
    title: "Multi-Vendor Marketplace",
    short: "Enterprise e-commerce",
    description: [
      "Developed a scalable e-commerce platform supporting multiple vendors with comprehensive order and inventory management.",
      "Built with Laravel for backend scalability and integrated AWS S3 for efficient product image storage and retrieval.",
    ],
    image: MultiVendor,
    tech: ["Laravel", "MySQL", "AWS S3", "Stripe", "PayPal", "REST APIs"],
  },
  {
    title: "WordPress Multi-Site Network",
    short: "Enterprise content management",
    description: [
      "Architected and deployed a WordPress multi-site network managing 20+ branded websites from a centralized dashboard.",
      "Built with custom theme development and shared component library for consistent branding and performance optimization.",
    ],
    image: WordPress,
    tech: ["WordPress", "PHP", "MySQL", "Custom Theme Development"],
  },
  {
    title: "Live Visitor Counter",
    short: "Real-time analytics plugin",
    description: [
      "Developed a lightweight live visitor counter plugin that tracks and displays real-time website visitors, helping website owners monitor engagement and traffic activity instantly.",
      "Built using PHP, JavaScript, and AJAX-based updates for smooth real-time counting, optimized performance, and seamless integration with WordPress websites.",
    ],
    image: plugintwo,
    tech: ["WordPress", "PHP", "JavaScript", "AJAX", "MySQL"],
    link: "https://github.com/zohaib9922/live-visitor-counter",
  },
  {
    title: "Advanced Visitor Analytics",
    short: "Traffic insights dashboard",
    description: [
      "Developed an advanced visitor analytics solution that tracks real-time website traffic, visitor behavior, page views, and engagement metrics through an intuitive analytics dashboard.",
      "Built with PHP, JavaScript, AJAX, and MySQL, featuring live traffic monitoring, session tracking, device and browser analytics.",
    ],
    image: plugin,
    tech: ["WordPress", "PHP", "JavaScript", "AJAX", "MySQL", "Analytics Dashboard"],
    link: "https://github.com/zohaib9922/advanced-visitor-analytics",
  },
];

const chipColors = [
  "chip-purple",
  "chip-blue",
  "chip-green",
  "chip-orange",
  "chip-red",
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeProject]);

  return (
    <section
      className={`prj-section${visible ? " prj-visible" : ""}`}
      id="projects"
      ref={sectionRef}
    >
      {/* ambient + grid handled via ::before/::after in CSS */}

      <div className="prj-header">
        <div className="prj-eyebrow">
          <span className="eyebrow-line" />
          Selected Work
        </div>
        <h2 className="prj-title">
          <span className="prj-t-solid">Things</span>
          <span className="prj-t-stroke">I've</span>
          <span className="prj-t-faint">built</span>
        </h2>
        <p className="prj-subtitle">
          A curated set of projects spanning web apps, SaaS platforms, and WordPress ecosystems.
        </p>
      </div>

      <div className="prj-grid">
        {projects.map((project, index) => (
          <div
            className="prj-card"
            key={index}
            onClick={() => setActiveProject(project)}
            style={{ "--i": index }}
          >
            <div className="prj-card-img-wrap">
              <img src={project.image} alt={project.title} className="prj-card-img" />
              <div className="prj-card-img-overlay" />
            </div>

            <div className="prj-card-body">
              <p className="prj-card-short">{project.short}</p>
              <h3 className="prj-card-title">{project.title}</h3>

              <div className="prj-card-tech">
                {project.tech.slice(0, 3).map((t, i) => (
                  <span key={i} className={`ab2-chip ${chipColors[i % chipColors.length]}`}>{t}</span>
                ))}
                {project.tech.length > 3 && (
                  <span className="ab2-chip chip-purple">+{project.tech.length - 3}</span>
                )}
              </div>

              <div className="prj-card-footer">
                <button className="prj-details-btn">
                  View details
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="prj-gh-btn"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="View on GitHub"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {activeProject && (
        <div className="prj-modal-backdrop" onClick={() => setActiveProject(null)}>
          <div className="prj-modal" onClick={(e) => e.stopPropagation()}>
            <button className="prj-modal-close" onClick={() => setActiveProject(null)} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="prj-modal-img-wrap">
              <img src={activeProject.image} alt={activeProject.title} />
              <div className="prj-modal-img-fade" />
            </div>

            <div className="prj-modal-body">
              <p className="prj-modal-short">{activeProject.short}</p>
              <h3 className="prj-modal-title">{activeProject.title}</h3>

              <div className="prj-modal-desc">
                {Array.isArray(activeProject.description)
                  ? activeProject.description.map((d, i) => <p key={i}>{d}</p>)
                  : <p>{activeProject.description}</p>}
              </div>

              <div className="prj-modal-tech">
                {activeProject.tech.map((t, i) => (
                  <span key={i} className={`ab2-chip ${chipColors[i % chipColors.length]}`}>{t}</span>
                ))}
              </div>

              {activeProject.link && (
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prj-modal-link"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  View on GitHub
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;