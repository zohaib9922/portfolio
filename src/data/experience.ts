export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  tech: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Senior Full-Stack Developer",
    company: "Freelance / Contract",
    period: "2022 — Present",
    description:
      "Leading end-to-end delivery of custom web applications for clients across e-commerce, logistics, and SaaS, from architecture through deployment.",
    tech: ["React", "Laravel", "AWS", "MySQL"],
  },
  {
    role: "Frontend Engineer",
    company: "Digital Agency (placeholder)",
    period: "2020 — 2022",
    description:
      "Built and maintained component-driven React interfaces for multi-tenant SaaS products, improving load times and accessibility across the board.",
    tech: ["React", "TypeScript", "Tailwind"],
  },
  {
    role: "Backend Developer",
    company: "Startup (placeholder)",
    period: "2018 — 2020",
    description:
      "Designed REST APIs and relational schemas powering a marketplace platform, scaling the service to handle growing transaction volume.",
    tech: ["Laravel", "PHP", "MySQL"],
  },
  {
    role: "Junior Web Developer",
    company: "First role (placeholder)",
    period: "2017 — 2018",
    description:
      "Started my career building WordPress sites and small PHP applications, learning the fundamentals of full-stack web development.",
    tech: ["PHP", "WordPress", "JavaScript"],
  },
];
