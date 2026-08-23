import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { HeroCamera } from "./HeroCamera";
import { DeveloperWorld } from "./DeveloperWorld";
import type { DeviceTier } from "../scroll/sharedState";

interface HeroSceneProps {
  tier: DeviceTier;
  accentColor?: string;
}

export function HeroScene({ tier, accentColor }: HeroSceneProps) {
  return (
    <Canvas
      className="hero-canvas"
      dpr={[1, tier === "mobile" ? 1.5 : 2]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
      camera={{ fov: 42, near: 0.1, far: 30, position: [0.4, 0.2, 6.2] }}
      onCreated={({ gl }) => {
        gl.setClearColor("#06070a", 1);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      <HeroCamera />
      <DeveloperWorld tier={tier} accentColor={accentColor} />
    </Canvas>
  );
}
