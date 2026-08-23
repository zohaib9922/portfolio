import { CentralCore } from "./CentralCore";
import { CodePanel } from "./CodePanel";
import { Terminal } from "./Terminal";
import { FloatingSymbol } from "./FloatingSymbol";
import { TechnologyRing } from "./TechnologyRing";
import { Particles } from "./Particles";
import { AmbientShapes } from "./AmbientShapes";
import { SceneGrid } from "./SceneGrid";
import type { DeviceTier } from "../scroll/sharedState";

const SYMBOLS = [
  { symbol: "{ }", orbitRadius: 2.4, orbitSpeed: 0.18, baseAngle: 0.3, depth: -1, height: 0.9 },
  { symbol: "</>", orbitRadius: 2.15, orbitSpeed: -0.22, baseAngle: 2.35, depth: -0.5, height: -0.6 },
  { symbol: "[ ]", orbitRadius: 2.75, orbitSpeed: 0.14, baseAngle: 4.4, depth: -1.6, height: 0.35 },
  { symbol: "< >", orbitRadius: 1.95, orbitSpeed: -0.16, baseAngle: 5.5, depth: -0.8, height: -0.15 },
];

interface DeveloperWorldProps {
  tier: DeviceTier;
  accentColor?: string;
}

export function DeveloperWorld({ tier, accentColor = "#6366f1" }: DeveloperWorldProps) {
  const symbolCount = tier === "mobile" ? 2 : tier === "tablet" ? 3 : SYMBOLS.length;
  const particleCount = tier === "mobile" ? 70 : tier === "tablet" ? 140 : 240;
  const shapeCount = tier === "mobile" ? 8 : tier === "tablet" ? 14 : 22;
  const techCount = tier === "mobile" ? 6 : tier === "tablet" ? 8 : 10;

  const worldOffset: [number, number, number] =
    tier === "mobile" ? [1.3, -0.3, -0.6] : tier === "tablet" ? [0.5, -0.1, -0.2] : [0, 0, 0];
  const worldScale = tier === "mobile" ? 0.72 : tier === "tablet" ? 0.88 : 1;

  const coreSettleDrift: [number, number, number] =
    tier === "mobile" ? [1.3, 2.6, 1.4] : tier === "tablet" ? [1.6, 2.4, 1.5] : [2.1, 1.8, 1.6];

  return (
    <group>
      <ambientLight intensity={0.18} />
      <hemisphereLight args={["#5ee6ff", "#06070a", 0.25]} />
      <directionalLight position={[3, 4, 2]} intensity={0.32} color="#eef0f6" />
      <directionalLight position={[-4, -1.5, -3]} intensity={0.14} color="#7bb8ff" />
      <fog attach="fog" args={["#06070a", 3, 12.5]} />

      <group position={worldOffset} scale={worldScale}>
        <CentralCore settleDrift={coreSettleDrift} accentColor={accentColor} />
        <CodePanel />
        {tier !== "mobile" && <Terminal />}

        {SYMBOLS.slice(0, symbolCount).map((s) => (
          <FloatingSymbol key={s.symbol} {...s} />
        ))}
      </group>

      <TechnologyRing
        count={techCount}
        offsetX={tier === "mobile" ? 0.4 : tier === "tablet" ? 0.65 : 1.6}
        maxCols={tier === "mobile" ? 2 : tier === "tablet" ? 3 : 4}
        colGap={tier === "mobile" ? 0.85 : tier === "tablet" ? 0.95 : 1.05}
        cardScale={tier === "mobile" ? 0.5 : tier === "tablet" ? 0.56 : 0.62}
        accentColor={accentColor}
      />
      <Particles count={particleCount} />
      {tier !== "mobile" && <AmbientShapes count={shapeCount} />}
      <SceneGrid />
    </group>
  );
}
