import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaAws, FaReact, FaVuejs, FaLaravel, FaPhp, FaCode, FaNodeJs, FaDocker } from "react-icons/fa";
import { SiMysql, SiTypescript, SiTailwindcss, SiElasticsearch } from "react-icons/si";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const SKILLS = [
  { icon: FaReact, name: "React.js", color: "#61dafb" },
  { icon: FaVuejs, name: "Vue.js", color: "#42b883" },
  { icon: FaLaravel, name: "Laravel", color: "#ff2d20" },
  { icon: FaNodeJs, name: "Node.js", color: "#68a063" },
  { icon: FaPhp, name: "PHP", color: "#787cb5" },
  { icon: FaAws, name: "AWS", color: "#ff9900" },
  { icon: SiMysql, name: "MySQL", color: "#4479a1" },
  { icon: SiElasticsearch, name: "Elasticsearch", color: "#00bfb3" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178c6" },
  { icon: SiTailwindcss, name: "Tailwind CSS", color: "#38bdf8" },
  { icon: FaDocker, name: "Docker", color: "#2496ed" },
  { icon: FaCode, name: "REST APIs", color: "#8b8cf0" },
] as const;

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="skills" ref={sectionRef} className="relative overflow-hidden bg-bg px-6 py-24 sm:px-10 lg:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-14"
        >
          <div className="mb-4 flex items-center gap-3 text-sm font-medium text-text-2">
            <span className="h-px w-8 bg-accent" />
            My Expertise
          </div>
          <h2 className="mb-4 flex flex-wrap items-baseline gap-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-text-1">Technologies</span>
            <span className="text-transparent [-webkit-text-stroke:1.5px_var(--color-text-1)]">I've</span>
            <span className="text-text-3">mastered</span>
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-text-2">
            Scalable frontends, robust backends, and cloud infrastructure — built with the tools that matter.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4"
        >
          {SKILLS.map((sk) => (
            <motion.div
              key={sk.name}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col items-center gap-2.5 overflow-hidden rounded-2xl border border-border bg-surface-1 px-4 py-7 text-center transition-colors"
            >
              <div
                className="pointer-events-none absolute -inset-[40%] rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle, ${sk.color}22 0%, transparent 65%)` }}
              />
              <div
                className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border text-2xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
                style={{ color: sk.color, background: `${sk.color}1f`, borderColor: `${sk.color}45` }}
              >
                <sk.icon />
              </div>
              <p className="relative z-10 text-sm font-bold">{sk.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
