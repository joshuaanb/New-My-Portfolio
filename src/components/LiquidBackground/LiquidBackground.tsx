"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import gsap from 'gsap';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  MeshTransmissionMaterial, 
  Environment, 
  Float, 
  OrbitControls,
  AdaptiveDpr,
  AdaptiveEvents
} from '@react-three/drei';
import * as THREE from 'three';
import IridescentShader from './IridescentShader';

const LiquidRing = React.memo(function LiquidRing({ currentIndex }: { currentIndex: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const iridescentRef = useRef<THREE.ShaderMaterial>(null!);
  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const isMobile = useMemo(() => viewport.width < 5, [viewport.width]);

  // Shared geometry to save memory - Significantly lower on mobile
  const geometry = useMemo(() => {
    const radialSegments = isMobile ? 64 : 128; // Increased from 32 to fix "bumps"
    const tubularSegments = isMobile ? 24 : 32; // Increased from 12 to fix "bumps"
    return new THREE.TorusKnotGeometry(1, 0.35, radialSegments, tubularSegments);
  }, [isMobile]);

  // Calculate responsive scale
  const scaling = useMemo(() => {
    const baseScale = Math.min(viewport.width, viewport.height) * 0.45;
    return isMobile ? Math.max(0.35, baseScale * 0.8) : Math.max(0.4, Math.min(baseScale, 1.2));
  }, [viewport.width, viewport.height, isMobile]);

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
    targetMouse.current.lerp(state.mouse, 0.05);
    
    if (iridescentRef.current) {
      iridescentRef.current.uniforms.uTime.value = t;
    }

    if (meshRef.current) {
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
            backside={!isMobile} // Disable backside on mobile to save a full rendering pass
            samples={isMobile ? 2 : 4}
            thickness={0.2}
            chromaticAberration={0.08}
            anisotropy={0.3}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.5}
            clearcoat={1}
            attenuationDistance={1}
            attenuationColor="#fafafa"
            color="#fafafa"
            resolution={isMobile ? 128 : 256} // High quality buffer to fix graininess
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
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </Float>
    </group>
  );
});

const LiquidBackground = React.memo(function LiquidBackground({ currentIndex = 0 }: { currentIndex?: number }) {
  return (
    <div className="fixed inset-0 w-full h-screen -z-10 bg-[#0a0a0a]">
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 45 }}
        // Force 1x DPR on all mobile devices to prevent GPU overload from high-res screens
        // Desktop remains at high quality
        dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : [1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={1.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2.5} />
        
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
