import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import { scrollState, prefersReducedMotion } from "../scroll/sharedState";
import { damp, segment } from "../scroll/interpolate";

const TECHNOLOGIES = [
  "React",
  "Vue.js",
  "Laravel",
  "Node.js",
  "PHP",
  "TypeScript",
  "Tailwind",
  "MySQL",
  "AWS",
  "Docker",
];

interface CardRefs {
  group: THREE.Group;
}

interface TechnologyRingProps {
  count?: number;
  offsetX?: number;
  maxCols?: number;
  colGap?: number;
  cardScale?: number;
  accentColor?: string;
}

export function TechnologyRing({
  count = TECHNOLOGIES.length,
  offsetX = 1.9,
  maxCols = 4,
  colGap = 1.05,
  cardScale = 0.62,
  accentColor = "#6366f1",
}: TechnologyRingProps) {
  const items = useMemo(() => TECHNOLOGIES.slice(0, count), [count]);
  const refs = useRef<CardRefs[]>([]);

  const layout = useMemo(() => {
    const cols = Math.min(maxCols, Math.ceil(Math.sqrt(items.length)));
    const rowCount = Math.ceil(items.length / cols);
    return items.map((name, i) => {
      const angle = (i / items.length) * Math.PI * 2;
      const row = Math.floor(i / cols);
      const col = i % cols;
      const gridX = (col - (cols - 1) / 2) * colGap + offsetX;
      const gridY = (row - (rowCount - 1) / 2) * (colGap * 0.78) + 0.2;
      return {
        name,
        angle,
        ringRadius: 2.1 + (i % 3) * 0.25,
        ringDepth: -1.8 - (i % 4) * 0.4,
        gridX,
        gridY,
        gridZ: -2.4,
      };
    });
  }, [items, offsetX, maxCols, colGap]);

  useFrame((state, delta) => {
    const p = scrollState.p;
    const t = state.clock.elapsedTime;

    const appear = segment(p, 0.42, 0.58);
    const settle = segment(p, 0.78, 1);

    layout.forEach((item, i) => {
      const entry = refs.current[i];
      if (!entry?.group) return;

      const orbitAngle = item.angle + t * (prefersReducedMotion ? 0.02 : 0.12);
      const ringX = Math.cos(orbitAngle) * item.ringRadius;
      const ringY = Math.sin(orbitAngle * 0.7) * 0.5;
      const ringZ = item.ringDepth + Math.sin(orbitAngle) * 0.6;

      const targetX = ringX + (item.gridX - ringX) * settle;
      const targetY = ringY + (item.gridY - ringY) * settle;
      const targetZ = ringZ + (item.gridZ - ringZ) * settle;

      entry.group.position.x = damp(entry.group.position.x, targetX, 4.5, delta);
      entry.group.position.y = damp(entry.group.position.y, targetY, 4.5, delta);
      entry.group.position.z = damp(entry.group.position.z, targetZ, 4.5, delta);

      entry.group.rotation.y = damp(
        entry.group.rotation.y,
        settle > 0.05 ? 0 : orbitAngle * 0.3,
        3,
        delta
      );

      const scale = Math.max(0.001, appear * (1 - settle * 0.15));
      entry.group.scale.setScalar(scale * cardScale);
    });
  });

  return (
    <group>
      {layout.map((item, i) => (
        <group
          key={item.name}
          ref={(el) => {
            if (el) refs.current[i] = { group: el };
          }}
        >
          <RoundedBox args={[1.5, 0.85, 0.05]} radius={0.1} smoothness={4}>
            <meshStandardMaterial
              color="#0d1119"
              roughness={0.42}
              metalness={0.25}
              emissive={accentColor}
              emissiveIntensity={0.07}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.026]}>
            <planeGeometry args={[1.42, 0.77]} />
            <meshBasicMaterial color={accentColor} transparent opacity={0.04} />
          </mesh>
          <Text position={[0, 0, 0.03]} fontSize={0.22} color="#eef0f6" anchorX="center" anchorY="middle">
            {item.name}
          </Text>
        </group>
      ))}
    </group>
  );
}
