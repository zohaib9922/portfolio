import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Soft radial-gradient glow that trails the cursor within its nearest
 * <section>/<footer> ancestor. Drop inside a section's existing
 * `pointer-events-none absolute inset-0 overflow-hidden` decorative wrapper.
 */
export default function CursorGlow() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const active = canHover && !shouldReduceMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 80, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (!active) return;
    const container = wrapperRef.current?.closest("section, footer") as HTMLElement | null;
    if (!container) return;

    const handleMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };

    container.addEventListener("pointermove", handleMove);
    return () => container.removeEventListener("pointermove", handleMove);
  }, [active, x, y]);

  if (!active) return null;

  return (
    <motion.div
      ref={wrapperRef}
      aria-hidden
      className="pointer-events-none absolute h-72 w-72 rounded-full opacity-[0.12]"
      style={{
        left: springX,
        top: springY,
        x: "-50%",
        y: "-50%",
        background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
      }}
    />
  );
}
