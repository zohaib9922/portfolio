import labProject from "@/assets/projects/lab-mangement.webp";
import tourProject from "@/assets/projects/tour-management.webp";
import multiVendor from "@/assets/projects/multi-vendor-project.webp";
import wordpress from "@/assets/projects/wordpress.png";
import plugin from "@/assets/projects/plugin.webp";
import pluginTwo from "@/assets/projects/plugin-2.webp";

export interface Project {
  title: string;
  short: string;
  description: string | string[];
  image: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
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
    featured: true,
  },
  {
    title: "Portfolio Website",
    short: "Modern developer portfolio",
    description:
      "A high-performance personal portfolio built with React, smooth animations, glassmorphism UI, and fully responsive layouts. Designed to showcase skills, projects, and professional experience.",
    image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/zohaib9922/portfolio",
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
    githubUrl: "https://github.com/zohaib9922/smart-reading-progress",
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
    description: "Task management application with drag-and-drop, deadlines, reminders, and cloud sync.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    tech: ["React", "Firebase"],
  },
  {
    title: "Tour Management System",
    short: "Travel & booking platform",
    description: [
      "Built a complete tour booking and management platform enabling customers to browse, book, and manage travel packages.",
      "Developed with Laravel backend and Vue.js SPA frontend for seamless user experience and efficient booking workflows.",
    ],
    githubUrl: "https://github.com/zohaib9922/tour-booking-api",
    image: tourProject,
    tech: ["Laravel", "Vue.js", "MySQL", "Stripe", "RESTful APIs"],
  },
  {
    title: "Multi-Vendor Marketplace",
    short: "Enterprise e-commerce",
    description: [
      "Developed a scalable e-commerce platform supporting multiple vendors with comprehensive order and inventory management.",
      "Built with Laravel for backend scalability and integrated AWS S3 for efficient product image storage and retrieval.",
    ],
    image: multiVendor,
    tech: ["Laravel", "MySQL", "AWS S3", "Stripe", "PayPal", "REST APIs"],
  },
  {
    title: "WordPress Multi-Site Network",
    short: "Enterprise content management",
    description: [
      "Architected and deployed a WordPress multi-site network managing 20+ branded websites from a centralized dashboard.",
      "Built with custom theme development and shared component library for consistent branding and performance optimization.",
    ],
    image: wordpress,
    tech: ["WordPress", "PHP", "MySQL", "Custom Theme Development"],
  },
  {
    title: "Live Visitor Counter",
    short: "Real-time analytics plugin",
    description: [
      "Developed a lightweight live visitor counter plugin that tracks and displays real-time website visitors, helping website owners monitor engagement and traffic activity instantly.",
      "Built using PHP, JavaScript, and AJAX-based updates for smooth real-time counting, optimized performance, and seamless integration with WordPress websites.",
    ],
    image: pluginTwo,
    tech: ["WordPress", "PHP", "JavaScript", "AJAX", "MySQL"],
    githubUrl: "https://github.com/zohaib9922/live-visitor-counter",
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
    githubUrl: "https://github.com/zohaib9922/advanced-visitor-analytics",
  },
];
