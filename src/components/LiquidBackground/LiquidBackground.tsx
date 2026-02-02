"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import gsap from 'gsap';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  MeshTransmissionMaterial, 
  Environment, 
  Float, 
  OrbitControls
} from '@react-three/drei';
import * as THREE from 'three';
import IridescentShader from './IridescentShader';

const LiquidRing = React.memo(({ currentIndex }: { currentIndex: number }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const iridescentRef = useRef<THREE.ShaderMaterial>(null!);
  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  // Shared geometry to save memory and processing
  const geometry = useMemo(() => new THREE.TorusKnotGeometry(1, 0.35, 128, 32), []);

  // Calculate responsive scale: smaller on mobile, larger on desktop
  const scaling = useMemo(() => {
    const baseScale = Math.min(viewport.width, viewport.height) * 0.45;
    return Math.max(0.4, Math.min(baseScale, 1.2));
  }, [viewport]);

  // Handle transition animation
  useEffect(() => {
    if (iridescentRef.current) {
      gsap.fromTo(iridescentRef.current.uniforms.uTransition, 
        { value: 1.0 }, 
        { value: 0.0, duration: 1.5, ease: "power2.out" }
      );
    }
  }, [currentIndex]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Smooth Mouse Inertia
    targetMouse.current.lerp(state.mouse, 0.05);
    
    if (iridescentRef.current) {
      iridescentRef.current.uniforms.uTime.value = t;
    }

    if (meshRef.current) {
      // Smoother rotation based on mouse
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, t * 0.2 + targetMouse.current.y * 0.5, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, t * 0.3 + targetMouse.current.x * 0.5, 0.05);
    }
  });

  return (
    <group scale={scaling}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* The Main Glass Ring */}
        <mesh ref={meshRef} geometry={geometry}>
          <MeshTransmissionMaterial
            backside
            samples={2} // Efficient samples for dark mode
            thickness={0.2}
            chromaticAberration={0.04}
            anisotropy={0.2}
            distortion={0.3}
            distortionScale={0.3}
            temporalDistortion={0.5}
            clearcoat={1}
            attenuationDistance={1}
            attenuationColor="#fafafa"
            color="#fafafa"
            resolution={64}
          />
        </mesh>

        {/* Iridescent Layer/Sheen */}
        <mesh scale={1.01} geometry={geometry}>
          <shaderMaterial
            ref={iridescentRef}
            vertexShader={IridescentShader.vertexShader}
            fragmentShader={IridescentShader.fragmentShader}
            uniforms={THREE.UniformsUtils.clone(IridescentShader.uniforms)}
            transparent
            depthWrite={false}
            opacity={0.3}
          />
        </mesh>
      </Float>
    </group>
  );
});

const LiquidBackground = React.memo(({ currentIndex = 0 }: { currentIndex?: number }) => {
  return (
    <div className="fixed inset-0 w-full h-screen -z-10 bg-[#0a0a0a]">
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Suspense fallback={null}>
          <LiquidRing currentIndex={currentIndex} />
          <Environment preset="night" />
        </Suspense>
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
});

export default LiquidBackground;

// Helper to handle Suspense in client component
function Suspense({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return <>{fallback}</>;
  return <React.Suspense fallback={fallback}>{children}</React.Suspense>;
}
