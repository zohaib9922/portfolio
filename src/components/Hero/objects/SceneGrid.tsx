import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import * as THREE from "three";
import { scrollState, prefersReducedMotion } from "../scroll/sharedState";
import { damp, segment } from "../scroll/interpolate";

export function SceneGrid() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    const p = scrollState.p;
    const recede = segment(p, 0.4, 0.8);
    const targetY = -2.2 - recede * 1.4;
    group.current.position.y = damp(group.current.position.y, targetY, 2.4, delta);
  });

  return (
    <group ref={group} position={[0, -2.2, -1]}>
      <Grid
        args={[24, 24]}
        cellSize={0.5}
        cellThickness={0.4}
        cellColor="#1c2030"
        sectionSize={2.5}
        sectionThickness={0.8}
        sectionColor="#2b7d8f"
        fadeDistance={prefersReducedMotion ? 8 : 16}
        fadeStrength={1.5}
        infiniteGrid
      />
    </group>
  );
}
