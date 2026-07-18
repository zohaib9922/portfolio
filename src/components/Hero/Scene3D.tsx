import { useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface Scene3DProps {
  accentColor: string;
}

function createCodeTexture(accentColor: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#0b0b12";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const colors = [accentColor, "#5eead4", "#f0abfc", "#94a3b8", "#fbbf24"];
  let y = 22;
  let seed = 0;
  const rand = () => {
    seed += 1;
    return (Math.sin(seed * 12.9898) * 43758.5453) % 1;
  };

  while (y < canvas.height - 14) {
    const indentRoll = Math.abs(rand());
    const indent = indentRoll < 0.25 ? 44 : indentRoll < 0.55 ? 22 : 0;
    const width = 36 + Math.abs(rand()) * 170;
    ctx.fillStyle = colors[Math.floor(Math.abs(rand()) * colors.length)];
    ctx.globalAlpha = 0.85;
    ctx.fillRect(24 + indent, y, width, 9);
    y += 19;
  }

  return canvas;
}

function Laptop({ accentColor }: { accentColor: string }) {
  const texture = useMemo(() => {
    const canvas = createCodeTexture(accentColor);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, [accentColor]);

  useFrame((state) => {
    texture.offset.y = (state.clock.elapsedTime * 0.03) % 1;
  });

  return (
    <group rotation={[0.12, -0.55, 0]}>
      {/* base / keyboard deck */}
      <RoundedBox args={[2.2, 0.12, 1.5]} radius={0.05} smoothness={2} position={[0, -0.55, 0.1]}>
        <meshStandardMaterial color="#4b4b56" roughness={0.35} metalness={0.4} />
      </RoundedBox>
      <mesh position={[0, -0.485, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.9, 1.2]} />
        <meshStandardMaterial color="#2a2a32" roughness={0.6} />
      </mesh>

      {/* hinged screen */}
      <group position={[0, -0.48, -0.65]} rotation={[-0.22, 0, 0]}>
        <RoundedBox args={[2.2, 1.4, 0.07]} radius={0.05} smoothness={2} position={[0, 0.7, 0]}>
          <meshStandardMaterial color="#4b4b56" roughness={0.35} metalness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0.7, 0.04]}>
          <planeGeometry args={[1.96, 1.22]} />
          <meshStandardMaterial
            map={texture}
            emissive="#ffffff"
            emissiveMap={texture}
            emissiveIntensity={0.7}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function Scene3D({ accentColor }: Scene3DProps) {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} gl={{ alpha: true, antialias: true }} dpr={[1, 1.5]}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 3, 3]} intensity={1.8} />
      <directionalLight position={[-3, -1, -2]} intensity={0.6} />
      <pointLight position={[0, 1, 4]} intensity={0.8} />
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
        <Laptop accentColor={accentColor} />
      </Float>
    </Canvas>
  );
}
