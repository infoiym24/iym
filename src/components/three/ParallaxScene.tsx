import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Torus, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ScrollGroup = ({ children }: { children: React.ReactNode }) => {
  const group = useRef<THREE.Group>(null!);
  const scrollY = useRef(0);
  const target = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      target.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame((_, delta) => {
    scrollY.current += (target.current - scrollY.current) * Math.min(delta * 4, 1);
    if (group.current) {
      group.current.position.y = scrollY.current * 0.0015;
      group.current.rotation.z = scrollY.current * 0.0004;
    }
  });

  return <group ref={group}>{children}</group>;
};

type Variant = 'gold' | 'glass';

const ParallaxScene = ({ variant = 'gold' }: { variant?: Variant }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={1} />
        <directionalLight position={[-4, -2, 2]} intensity={0.35} color={'#c9a84c'} />
        <Suspense fallback={null}>
          <ScrollGroup>
            <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.9}>
              <Icosahedron args={[0.55, 0]} position={[-3.2, 1.4, -1]}>
                <meshStandardMaterial color={'#c9a84c'} roughness={0.25} metalness={0.5} />
              </Icosahedron>
            </Float>
            <Float speed={0.9} rotationIntensity={0.4} floatIntensity={0.7}>
              <Torus args={[0.55, 0.14, 24, 64]} position={[3.4, -0.8, -1.5]}>
                <meshStandardMaterial color={'#2d2d2d'} roughness={0.35} metalness={0.25} />
              </Torus>
            </Float>
            <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1}>
              <mesh position={[2.5, 2.1, -2]} scale={0.6}>
                <icosahedronGeometry args={[0.7, 4]} />
                {variant === 'glass' ? (
                  <MeshTransmissionMaterial
                    samples={4}
                    resolution={128}
                    thickness={0.4}
                    roughness={0.2}
                    transmission={1}
                    ior={1.3}
                    chromaticAberration={0.04}
                    color={'#f5f3ee'}
                    attenuationColor={'#e8d9a8'}
                    attenuationDistance={1.5}
                  />
                ) : (
                  <meshStandardMaterial color={'#c9a84c'} roughness={0.2} metalness={0.6} />
                )}
              </mesh>
            </Float>
            <Float speed={0.7} rotationIntensity={0.3} floatIntensity={0.6}>
              <mesh position={[-2.8, -1.8, -2]}>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial color={'#c9a84c'} roughness={0.3} metalness={0.4} />
              </mesh>
            </Float>
          </ScrollGroup>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ParallaxScene;
