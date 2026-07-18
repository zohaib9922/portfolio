import type { IconType } from "react-icons";
import { FiCode, FiServer, FiLayout, FiCloud } from "react-icons/fi";

export interface Service {
  icon: IconType;
  title: string;
  description: string;
  features: string[];
}

export const SERVICES: Service[] = [
  {
    icon: FiLayout,
    title: "Web Application Development",
    description:
      "End-to-end React applications with clean architecture, smooth animations, and pixel-perfect responsive design.",
    features: ["React & TypeScript", "Component architecture", "Performance optimization"],
  },
  {
    icon: FiServer,
    title: "Backend & API Development",
    description: "Secure, scalable REST APIs and database design built to handle real production traffic.",
    features: ["Laravel & Node.js", "MySQL & Elasticsearch", "Third-party integrations"],
  },
  {
    icon: FiCode,
    title: "WordPress & Plugin Development",
    description:
      "Custom WordPress themes and plugins built for performance, from single sites to multi-site networks.",
    features: ["Custom plugin development", "Theme development", "Multi-site architecture"],
  },
  {
    icon: FiCloud,
    title: "Cloud & Deployment",
    description: "Reliable cloud infrastructure and deployment pipelines so your product ships fast and stays up.",
    features: ["AWS infrastructure", "CI/CD pipelines", "Monitoring & scaling"],
  },
];
