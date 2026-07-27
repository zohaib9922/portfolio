import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import TiltCard from "@/components/ui/TiltCard";
import CursorGlow from "@/components/ui/CursorGlow";
import { SERVICES } from "@/data/services";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section id="services" ref={sectionRef} className="relative overflow-hidden bg-bg px-6 py-24 sm:px-10 lg:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/3 top-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
          animate={{ x: ["-50%", "-42%", "-50%"], y: [0, 22, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <CursorGlow />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div variants={fadeInUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-14">
          <div className="mb-4 flex items-center gap-3 text-sm font-medium text-text-2">
            <span className="h-px w-8 bg-accent" />
            What I Offer
          </div>
          <h2 className="flex flex-wrap items-baseline gap-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-text-1">Services &</span>
            <span className="text-transparent [-webkit-text-stroke:1.5px_var(--color-text-1)]">capabilities</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {SERVICES.map((service) => (
            <motion.div key={service.title} variants={fadeInUp}>
              <TiltCard className="h-full rounded-2xl border border-border bg-surface-1/60 p-8 backdrop-blur-md transition-colors hover:border-border-strong">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-2xl text-accent">
                  <service.icon />
                </div>
                <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-text-2">{service.description}</p>
                <ul className="flex flex-col gap-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-text-2">
                      <FiCheck className="flex-shrink-0 text-accent" /> {f}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
