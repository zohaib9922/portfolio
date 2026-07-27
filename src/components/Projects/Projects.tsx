import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { FiGithub, FiExternalLink, FiX, FiArrowRight } from "react-icons/fi";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import TechBadge from "@/components/ui/TechBadge";
import TiltCard from "@/components/ui/TiltCard";
import CursorGlow from "@/components/ui/CursorGlow";
import { PROJECTS, type Project } from "@/data/projects";

const featuredProject = PROJECTS.find((p) => p.featured);
const restProjects = PROJECTS.filter((p) => !p.featured);

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.05 });

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden bg-bg px-6 py-24 sm:px-10 lg:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
          animate={{ x: [0, -28, 0], y: [0, 22, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        />
        <CursorGlow />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div variants={fadeInUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-14">
          <div className="mb-4 flex items-center gap-3 text-sm font-medium text-text-2">
            <span className="h-px w-8 bg-accent" />
            Selected Work
          </div>
          <h2 className="mb-4 flex flex-wrap items-baseline gap-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-text-1">Things</span>
            <span className="text-transparent [-webkit-text-stroke:1.5px_var(--color-text-1)]">I've</span>
            <span className="text-text-3">built</span>
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-text-2">
            A curated set of projects spanning web apps, SaaS platforms, and WordPress ecosystems.
          </p>
        </motion.div>

        {featuredProject && (
          <motion.div variants={fadeInUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-6">
            <TiltCard
              onClick={() => setActiveProject(featuredProject)}
              className="group grid cursor-pointer grid-cols-1 overflow-hidden rounded-3xl border border-border bg-surface-1 md:grid-cols-2"
            >
              <div className="relative h-64 overflow-hidden md:h-auto">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center gap-4 p-8 lg:p-12">
                <span className="w-fit rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                  Featured Project
                </span>
                <h3 className="text-2xl font-bold sm:text-3xl">{featuredProject.title}</h3>
                <p className="text-sm text-text-2">{featuredProject.short}</p>
                <div className="flex flex-wrap gap-2">
                  {featuredProject.tech.slice(0, 4).map((t) => (
                    <TechBadge key={t} label={t} />
                  ))}
                </div>
                <span className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent">
                  View details <FiArrowRight />
                </span>
              </div>
            </TiltCard>
          </motion.div>
        )}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {restProjects.map((project) => (
            <motion.div key={project.title} variants={fadeInUp}>
              <TiltCard
                onClick={() => setActiveProject(project)}
                className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-surface-1"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <p className="text-xs font-medium text-text-3">{project.short}</p>
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t) => (
                      <TechBadge key={t} label={t} />
                    ))}
                    {project.tech.length > 3 && <TechBadge label={`+${project.tech.length - 3}`} />}
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      View details <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </span>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="View on GitHub"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-2 transition-colors hover:border-border-strong hover:text-text-1"
                      >
                        <FiGithub size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-surface-1 shadow-glow"
            >
              <button
                onClick={() => setActiveProject(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg/80 text-text-1 backdrop-blur"
              >
                <FiX />
              </button>

              <div className="relative h-56 overflow-hidden sm:h-72">
                <img src={activeProject.image} alt={activeProject.title} className="h-full w-full object-cover" />
              </div>

              <div className="p-6 sm:p-8">
                <p className="mb-1 text-xs font-medium text-text-3">{activeProject.short}</p>
                <h3 className="mb-4 text-2xl font-bold">{activeProject.title}</h3>

                <div className="mb-5 space-y-3 text-sm leading-relaxed text-text-2">
                  {Array.isArray(activeProject.description)
                    ? activeProject.description.map((d, i) => <p key={i}>{d}</p>)
                    : <p>{activeProject.description}</p>}
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                  {activeProject.tech.map((t) => (
                    <TechBadge key={t} label={t} />
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                  )}
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-text-1"
                    >
                      <FiGithub /> View on GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
