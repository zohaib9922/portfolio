import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaReact, FaLaravel, FaJs, FaAws, FaVuejs, FaNodeJs } from "react-icons/fa";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import TechBadge from "@/components/ui/TechBadge";

const MILESTONES = [
  { year: "2017", title: "Started Journey", desc: "Began full-stack development with JavaScript & PHP foundations." },
  { year: "2019", title: "React Specialist", desc: "Led frontend rewrites for 3 SaaS products using React & Vue.js." },
  { year: "2021", title: "Cloud & Scale", desc: "Architected AWS-hosted systems serving 100k+ monthly users." },
  { year: "2024", title: "Now", desc: "Open to new challenges — remote or on-site, worldwide." },
] as const;

const STACK = [
  { icon: FaReact, name: "React.js" },
  { icon: FaVuejs, name: "Vue.js" },
  { icon: FaJs, name: "JavaScript" },
  { icon: FaNodeJs, name: "Node.js" },
  { icon: FaLaravel, name: "Laravel" },
  { icon: FaAws, name: "AWS" },
] as const;

const TERM_LINES = [
  "$ whoami",
  "> Zohaib — Full Stack Developer",
  "$ experience --years",
  "> 7+ years building at scale",
  "$ projects --count",
  "> 50+ shipped · 200+ happy clients",
  "$ status",
  "> ✦ Open to work · Remote / On-site",
] as const;

const STATS = [
  { num: "7+", label: "Years Experience" },
  { num: "50+", label: "Projects Shipped" },
  { num: "200+", label: "Happy Clients" },
  { num: "∞", label: "Lines of Code" },
] as const;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [termLine, setTermLine] = useState(0);

  useEffect(() => {
    if (!inView || termLine >= TERM_LINES.length) return;
    const t = setTimeout(() => setTermLine((n) => n + 1), 220);
    return () => clearTimeout(t);
  }, [inView, termLine]);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden bg-bg px-6 py-24 sm:px-10 lg:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-14"
        >
          <div className="mb-4 flex items-center gap-3 text-sm font-medium text-text-2">
            <span className="h-px w-8 bg-accent" />
            About Me
          </div>
          <h2 className="flex flex-wrap items-baseline gap-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-text-1">The Story</span>
            <span className="text-transparent [-webkit-text-stroke:1.5px_var(--color-text-1)]">Behind</span>
            <span className="text-text-3">The Code</span>
          </h2>
        </motion.div>

        <div className="mb-14 grid gap-12 lg:grid-cols-[1fr_420px]">
          {/* timeline */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {MILESTONES.map((m, i) => (
              <motion.div key={m.year} variants={fadeInUp} className="grid grid-cols-[72px_1fr]">
                <div className="flex flex-col items-end pr-4 pt-1">
                  <div className="mb-2 text-xs font-bold text-accent">{m.year}</div>
                  {i < MILESTONES.length - 1 && <div className="w-px flex-1 bg-border-strong" style={{ minHeight: 40 }} />}
                </div>
                <div className="flex gap-3.5 pb-9">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full border-2 border-accent bg-bg shadow-glow" />
                  <div>
                    <div className="mb-1 text-base font-bold">{m.title}</div>
                    <div className="max-w-sm text-sm leading-relaxed text-text-2">{m.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* terminal + stack */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-3.5"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-surface-1">
              <div className="flex items-center gap-2 border-b border-border px-3.5 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                <span className="ml-1.5 font-mono text-[11px] text-text-3">zohaib@portfolio ~ bash</span>
              </div>
              <div className="min-h-[200px] px-5 py-4 font-mono text-sm leading-loose">
                {TERM_LINES.slice(0, termLine).map((line, i) => (
                  <div key={i} className={line.startsWith("$") ? "text-accent" : "pl-0.5 text-text-2"}>
                    {line}
                  </div>
                ))}
                {termLine < TERM_LINES.length && <span className="motion-safe:animate-pulse text-accent">▌</span>}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface-1 p-5 transition-colors hover:border-border-strong">
              <div className="mb-3.5 text-[10px] font-semibold uppercase tracking-wide text-text-3">Tech Stack</div>
              <div className="grid grid-cols-2 gap-2">
                {STACK.map((s) => (
                  <div key={s.name} className="flex items-center gap-2">
                    <s.icon className="text-accent" />
                    <TechBadge label={s.name} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* stat strip */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-wrap items-stretch overflow-hidden rounded-2xl border border-border bg-surface-1"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeInUp}
              className="flex flex-1 basis-1/2 flex-col items-center gap-1 border-r border-border px-3 py-5 last:border-r-0 sm:basis-auto"
            >
              <span className="text-2xl font-extrabold tracking-tight">{s.num}</span>
              <span className="text-[10.5px] font-semibold uppercase tracking-wide text-text-3">{s.label}</span>
            </motion.div>
          ))}
          <motion.a
            variants={fadeInUp}
            href="#contact"
            className="group flex flex-1 items-center justify-center gap-2 whitespace-nowrap border-t border-border bg-accent-soft px-7 py-5 text-sm font-semibold text-accent sm:flex-none sm:border-l sm:border-t-0"
          >
            Let's Work Together
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
