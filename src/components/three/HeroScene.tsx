import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial, Icosahedron, Torus } from '@react-three/drei';
import * as THREE from 'three';

const CentralBlob = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.08;
    mesh.current.rotation.y += delta * 0.12;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={mesh} position={[0, 0, 0]} scale={1.6}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshTransmissionMaterial
          samples={6}
          resolution={256}
          thickness={0.8}
          roughness={0.15}
          transmission={1}
          ior={1.3}
          chromaticAberration={0.05}
          backside
          color={'#f5f3ee'}
          attenuationColor={'#e8d9a8'}
          attenuationDistance={2}
        />
      </mesh>
    </Float>
  );
};

const Accents = () => (
  <>
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1}>
      <Icosahedron args={[0.35, 0]} position={[-2.6, 1.2, -0.5]}>
        <meshStandardMaterial color={'#c9a84c'} roughness={0.25} metalness={0.4} />
      </Icosahedron>
    </Float>
    <Float speed={1} rotationIntensity={0.4} floatIntensity={0.8}>
      <Torus args={[0.4, 0.12, 24, 64]} position={[2.6, -1.1, -1]}>
        <meshStandardMaterial color={'#2d2d2d'} roughness={0.3} metalness={0.2} />
      </Torus>
    </Float>
    <Float speed={0.9} rotationIntensity={0.3} floatIntensity={0.7}>
      <mesh position={[2.2, 1.6, -1.5]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color={'#c9a84c'} roughness={0.2} metalness={0.6} />
      </mesh>
    </Float>
  </>
);

const HeroScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} color={'#ffffff'} />
        <directionalLight position={[-4, -2, 2]} intensity={0.4} color={'#c9a84c'} />
        <Suspense fallback={null}>
          <CentralBlob />
          <Accents />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
