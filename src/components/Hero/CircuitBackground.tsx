import { motion } from "framer-motion";

const WIRES = [
  {
    color: "#5eead4",
    d: "M -50,120 L 300,120 L 380,200 L 700,200 L 780,120 L 1200,120 L 1300,220 L 1500,220",
    duration: 6,
  },
  {
    color: "#f0abfc",
    d: "M -50,420 L 250,420 L 320,500 L 650,500 L 720,380 L 1050,380 L 1120,480 L 1500,480",
    duration: 7.5,
  },
  {
    color: "#fbbf24",
    d: "M -50,650 L 200,650 L 260,580 L 550,580 L 610,700 L 950,700 L 1010,600 L 1500,600",
    duration: 5.5,
  },
  {
    color: "#818cf8",
    d: "M 120,-50 L 120,150 L 200,230 L 200,550 L 280,630 L 280,850",
    duration: 8,
  },
] as const;

/** Full-bleed animated circuit-trace background: dim wire paths with a bright glowing pulse flowing along each. */
export default function CircuitBackground() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 800"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      {WIRES.map((wire, i) => (
        <g key={i}>
          <path d={wire.d} stroke={wire.color} strokeOpacity={0.16} strokeWidth={1.5} />
          <motion.path
            d={wire.d}
            stroke={wire.color}
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${wire.color})` }}
            initial={{ pathLength: 0.12, pathOffset: 0 }}
            animate={{ pathOffset: 1 }}
            transition={{ duration: wire.duration, repeat: Infinity, ease: "linear" }}
          />
        </g>
      ))}
    </svg>
  );
}
