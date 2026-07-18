import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import TechBadge from "@/components/ui/TechBadge";
import { EXPERIENCE } from "@/data/experience";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative overflow-hidden bg-bg px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <div className="mb-4 flex items-center gap-3 text-sm font-medium text-text-2">
            <span className="h-px w-8 bg-accent" />
            Experience
          </div>
          <h2 className="flex flex-wrap items-baseline gap-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-text-1">Where I've</span>
            <span className="text-transparent [-webkit-text-stroke:1.5px_var(--color-text-1)]">worked</span>
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          <div className="absolute bottom-2 left-2 top-2 w-px bg-border" />
          <motion.div
            className="absolute left-2 top-2 w-px bg-accent"
            style={{ scaleY: lineScale, transformOrigin: "top", height: "calc(100% - 16px)" }}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-col gap-12"
          >
            {EXPERIENCE.map((exp) => (
              <motion.div key={exp.role} variants={fadeInUp} className="relative pl-10">
                <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-accent bg-bg shadow-glow" />
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">{exp.period}</div>
                <h3 className="mb-1 text-xl font-bold">{exp.role}</h3>
                <div className="mb-3 text-sm text-text-2">{exp.company}</div>
                <p className="mb-4 max-w-xl text-sm leading-relaxed text-text-2">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <TechBadge key={t} label={t} />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
