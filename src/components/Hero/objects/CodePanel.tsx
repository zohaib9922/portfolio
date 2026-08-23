import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import { scrollState, prefersReducedMotion } from "../scroll/sharedState";
import { damp, interpolateKeyframes, type Vec3Keyframe } from "../scroll/interpolate";

const CODE_LINES: { text: string; color: string }[] = [
  { text: "function build(idea) {", color: "#7bb8ff" },
  { text: "  const stack = [React,", color: "#eef0f6" },
  { text: "    Laravel, AWS]", color: "#eef0f6" },
  { text: "  return ship(stack)", color: "#5ee6ff" },
  { text: "}", color: "#7bb8ff" },
];

const POSITION_KEYFRAMES: Vec3Keyframe[] = [
  { p: 0, x: 2.6, y: 0.4, z: -1.4 },
  { p: 0.25, x: 1.6, y: 0.55, z: -1 },
  { p: 0.5, x: -0.1, y: 0.5, z: -0.4 },
  { p: 0.75, x: -1.6, y: 0.9, z: -2.6 },
  { p: 1, x: -1.2, y: 1.6, z: -3.2 },
];

const ROTATION_KEYFRAMES: Vec3Keyframe[] = [
  { p: 0, x: 0, y: -0.35, z: 0 },
  { p: 0.25, x: 0.05, y: -0.15, z: 0.02 },
  { p: 0.5, x: 0, y: 0.1, z: -0.02 },
  { p: 0.75, x: -0.05, y: 0.3, z: 0 },
  { p: 1, x: 0, y: 0.4, z: 0 },
];

export function CodePanel() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const p = scrollState.p;
    const pos = interpolateKeyframes(p, POSITION_KEYFRAMES);
    const rot = interpolateKeyframes(p, ROTATION_KEYFRAMES);
    const t = state.clock.elapsedTime;

    const bob = prefersReducedMotion ? 0 : Math.sin(t * 0.45) * 0.05;

    group.current.position.x = damp(group.current.position.x, pos.x, 3, delta);
    group.current.position.y = damp(group.current.position.y, pos.y + bob, 3, delta);
    group.current.position.z = damp(group.current.position.z, pos.z, 3, delta);

    group.current.rotation.x = damp(group.current.rotation.x, rot.x, 3, delta);
    group.current.rotation.y = damp(group.current.rotation.y, rot.y, 3, delta);
    group.current.rotation.z = damp(group.current.rotation.z, rot.z, 3, delta);

    const fadeOut = p > 0.62 ? 1 - Math.min(1, (p - 0.62) / 0.2) : 1;
    group.current.scale.setScalar(Math.max(0.001, fadeOut));
  });

  return (
    <group ref={group}>
      <RoundedBox args={[2.1, 1.35, 0.06]} radius={0.06} smoothness={4}>
        <meshStandardMaterial color="#0b0d13" roughness={0.6} metalness={0.15} />
      </RoundedBox>
      <mesh position={[0, 0, 0.032]}>
        <planeGeometry args={[2.02, 1.27]} />
        <meshBasicMaterial color="#06070a" transparent opacity={0.4} />
      </mesh>
      {["#ff6b6b", "#ffb15e", "#5ee6ff"].map((c, i) => (
        <mesh key={c} position={[-0.85 + i * 0.14, 0.56, 0.04]}>
          <circleGeometry args={[0.035, 16]} />
          <meshBasicMaterial color={c} />
        </mesh>
      ))}
      {CODE_LINES.map((line, i) => (
        <Text
          key={i}
          position={[-0.92, 0.32 - i * 0.19, 0.04]}
          fontSize={0.115}
          color={line.color}
          anchorX="left"
          anchorY="middle"
        >
          {line.text}
        </Text>
      ))}
    </group>
  );
}
