import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState, pointerState, prefersReducedMotion } from "../scroll/sharedState";

interface ParticlesProps {
  count?: number;
}

export function Particles({ count = 240 }: ParticlesProps) {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.PointsMaterial>(null);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      seeds[i] = Math.random() * Math.PI * 2;
    }
    return { positions, seeds };
  }, [count]);

  const basePositions = useMemo(() => positions.slice(), [positions]);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    const geom = points.current.geometry;
    const posAttr = geom.getAttribute("position") as THREE.BufferAttribute;
    const p = scrollState.p;

    const driftSpeed = prefersReducedMotion ? 0.02 : 0.15;

    for (let i = 0; i < count; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];
      const seed = seeds[i];

      const depthFactor = THREE.MathUtils.clamp((bz + 12) / 12, 0.15, 1);

      posAttr.setXYZ(
        i,
        bx + Math.sin(t * driftSpeed + seed) * 0.35,
        by + Math.cos(t * driftSpeed * 0.8 + seed) * 0.3 - p * depthFactor * 1.2,
        bz + Math.sin(t * 0.05 + seed) * 0.2
      );
    }
    posAttr.needsUpdate = true;

    if (!prefersReducedMotion) {
      points.current.rotation.y = pointerState.x * 0.05;
    }

    if (material.current) {
      material.current.opacity = prefersReducedMotion ? 0.32 : 0.32 + Math.sin(t * 0.6) * 0.06;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        color="#5ee6ff"
        size={0.015}
        transparent
        opacity={0.32}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
