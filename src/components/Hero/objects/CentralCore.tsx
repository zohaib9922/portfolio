import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState, prefersReducedMotion } from "../scroll/sharedState";
import { damp, segment } from "../scroll/interpolate";

interface CentralCoreProps {
  position?: [number, number, number];
  shardCount?: number;
  settleDrift?: [number, number, number];
  accentColor?: string;
}

/**
 * The signature motif of the hero: a wireframe shell of scattered fragments
 * that converge into a solid glowing core mid-scroll ("compiling"), then
 * dims and shrinks as the technology stack takes over the composition.
 */
export function CentralCore({
  position = [1.4, 0, -0.6],
  shardCount = 16,
  settleDrift = [2.1, 1.8, 1.6],
  accentColor = "#6366f1",
}: CentralCoreProps) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const wireframe = useRef<THREE.Mesh>(null);
  const shardGroup = useRef<THREE.Group>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);

  const shardData = useMemo(
    () =>
      Array.from({ length: shardCount }, (_, i) => {
        const phi = Math.acos(-1 + (2 * i) / shardCount);
        const theta = Math.sqrt(shardCount * Math.PI) * phi;
        return {
          scatterRadius: 2.4 + Math.random() * 1.4,
          theta,
          phi,
          spin: Math.random() * Math.PI * 2,
          speed: 0.15 + Math.random() * 0.25,
        };
      }),
    [shardCount]
  );

  useFrame((state, delta) => {
    if (!group.current || !inner.current || !wireframe.current) return;
    const p = scrollState.p;
    const t = state.clock.elapsedTime;

    const idleSpeed = prefersReducedMotion ? 0.02 : 0.12;
    group.current.rotation.y += delta * idleSpeed;

    const compile = segment(p, 0.15, 0.5);
    const expand = segment(p, 0.5, 0.72);
    const settle = segment(p, 0.75, 1);

    const bob = Math.sin(t * 0.5) * 0.08;
    group.current.position.x = damp(
      group.current.position.x,
      position[0] - settle * settleDrift[0],
      2.6,
      delta
    );
    group.current.position.y = damp(
      group.current.position.y,
      position[1] + bob - settle * settleDrift[1],
      2.6,
      delta
    );
    group.current.position.z = damp(
      group.current.position.z,
      position[2] - settle * settleDrift[2],
      2.6,
      delta
    );

    const targetScale = 1 + compile * 0.32 + expand * 0.18 - settle * 0.55;
    const currentScale = group.current.scale.x;
    const nextScale = damp(currentScale, Math.max(0.35, targetScale), 3, delta);
    group.current.scale.setScalar(nextScale);

    if (material.current) {
      const targetIntensity = 0.4 + compile * 0.55 + expand * 0.2 - settle * 0.4;
      material.current.emissiveIntensity = damp(
        material.current.emissiveIntensity,
        Math.max(0.2, targetIntensity),
        3,
        delta
      );
    }

    wireframe.current.rotation.x = t * 0.08;
    wireframe.current.rotation.y = -t * 0.1;

    if (shardGroup.current) {
      const convergence = compile - settle * 0.4;
      shardGroup.current.children.forEach((child, i) => {
        const d = shardData[i];
        const scatter = 1 - Math.min(1, Math.max(0, convergence));
        const radius = d.scatterRadius * (0.15 + scatter * 0.85);
        const angle = d.theta + t * d.speed * 0.3;
        child.position.set(
          Math.sin(d.phi) * Math.cos(angle) * radius,
          Math.cos(d.phi) * radius * 0.7,
          Math.sin(d.phi) * Math.sin(angle) * radius
        );
        child.rotation.x = t * d.speed + d.spin;
        child.rotation.y = t * d.speed * 0.7;
        const s = 0.05 + scatter * 0.05;
        child.scale.setScalar(s);
      });
    }
  });

  return (
    <group ref={group} position={position}>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          ref={material}
          color="#3f7fb8"
          emissive={accentColor}
          emissiveIntensity={0.4}
          roughness={0.45}
          metalness={0.15}
          transparent
          opacity={0.82}
        />
      </mesh>
      <mesh ref={wireframe} scale={1.35}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial color={accentColor} wireframe transparent opacity={0.35} />
      </mesh>
      <pointLight color="#7bb8ff" intensity={1.4} distance={4.5} decay={2} />

      <group ref={shardGroup}>
        {shardData.map((_, i) => (
          <mesh key={i}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={accentColor}
              emissive="#2b7d8f"
              emissiveIntensity={0.8}
              roughness={0.4}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
