"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// Main sphere with strong cursor interaction
function AnimatedSphere({ mousePos }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();

    // Strong position following
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      mousePos.current.x * 1.5,
      0.06
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      mousePos.current.y * 1.2,
      0.06
    );

    // Strong rotation reaction
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mousePos.current.y * 0.8 + Math.sin(time * 0.3) * 0.2,
      0.08
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mousePos.current.x * 0.8 + time * 0.15,
      0.08
    );

    // Scale on hover
    const targetScale = hovered ? 2.5 : 2.2;
    const currentScale = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
    meshRef.current.scale.setScalar(currentScale);
  });

  return (
    <Float 
      speed={2} 
      rotationIntensity={0.4} 
      floatIntensity={0.8}
    >
      <Sphere 
        args={[1, 64, 64]} 
        ref={meshRef}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <MeshDistortMaterial
          color={hovered ? "#c084fc" : "#a855f7"}
          attach="material"
          distort={hovered ? 0.55 : 0.45}
          speed={2.5}
          roughness={0.2}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
}

// Particles with strong cursor following
function AmbientParticles({ mousePos }) {
  const particlesRef = useRef();
  const count = 120;
  
  const [positions, basePositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
    }
    return [pos, base];
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const posArray = particlesRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Strong cursor influence - varies by particle
      const cursorStrength = 0.5 + (i % 8) * 0.15;
      
      posArray[i3] = basePositions[i3] 
        + mousePos.current.x * cursorStrength
        + Math.sin(time * 0.6 + i * 0.15) * 0.3;
        
      posArray[i3 + 1] = basePositions[i3 + 1] 
        + mousePos.current.y * cursorStrength
        + Math.cos(time * 0.5 + i * 0.15) * 0.3;
        
      posArray[i3 + 2] = basePositions[i3 + 2] 
        + Math.sin(time * 0.4 + i * 0.2) * 0.25
        + mousePos.current.x * mousePos.current.y * 0.3;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = time * 0.05 + mousePos.current.x * 0.3;
    particlesRef.current.rotation.x = mousePos.current.y * 0.3;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#a855f7"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Ring with strong tilt
function GlowRing({ mousePos }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (!ringRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Strong tilt with cursor
    ringRef.current.rotation.x = THREE.MathUtils.lerp(
      ringRef.current.rotation.x,
      Math.PI / 2 + mousePos.current.y * 0.7,
      0.08
    );
    ringRef.current.rotation.z = THREE.MathUtils.lerp(
      ringRef.current.rotation.z,
      mousePos.current.x * 0.7 + time * 0.15,
      0.08
    );
    
    // Position follows cursor
    ringRef.current.position.x = THREE.MathUtils.lerp(
      ringRef.current.position.x,
      mousePos.current.x * 0.5,
      0.06
    );
    ringRef.current.position.y = THREE.MathUtils.lerp(
      ringRef.current.position.y,
      mousePos.current.y * 0.4,
      0.06
    );
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.8, 0.015, 16, 100]} />
      <meshBasicMaterial
        color="#06b6d4"
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

// Second ring - opposite movement
function SecondRing({ mousePos }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (!ringRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    ringRef.current.rotation.x = THREE.MathUtils.lerp(
      ringRef.current.rotation.x,
      Math.PI / 3 + mousePos.current.y * -0.6,
      0.06
    );
    ringRef.current.rotation.y = THREE.MathUtils.lerp(
      ringRef.current.rotation.y,
      mousePos.current.x * -0.6 + time * -0.12,
      0.06
    );
    
    // Opposite position
    ringRef.current.position.x = THREE.MathUtils.lerp(
      ringRef.current.position.x,
      mousePos.current.x * -0.4,
      0.05
    );
    ringRef.current.position.y = THREE.MathUtils.lerp(
      ringRef.current.position.y,
      mousePos.current.y * -0.3,
      0.05
    );
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[3.3, 0.01, 16, 100]} />
      <meshBasicMaterial
        color="#a855f7"
        transparent
        opacity={0.45}
      />
    </mesh>
  );
}

// Third ring - different axis
function ThirdRing({ mousePos }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (!ringRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    ringRef.current.rotation.y = THREE.MathUtils.lerp(
      ringRef.current.rotation.y,
      Math.PI / 2 + mousePos.current.x * 0.5,
      0.07
    );
    ringRef.current.rotation.z = THREE.MathUtils.lerp(
      ringRef.current.rotation.z,
      mousePos.current.y * 0.5 + time * 0.1,
      0.07
    );
    
    ringRef.current.position.x = mousePos.current.x * 0.3;
    ringRef.current.position.z = mousePos.current.y * 0.3;
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.5, 0.008, 16, 100]} />
      <meshBasicMaterial
        color="#22d3ee"
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

// Scene wrapper
function Scene() {
  const mousePos = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mousePos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Faster smoothing for more responsive feel
  useFrame(() => {
    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mousePos.current.x, 0.12);
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, mousePos.current.y, 0.12);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, 2, 4]} intensity={0.7} color="#06b6d4" />
      <pointLight position={[3, -2, -4]} intensity={0.5} color="#a855f7" />
      
      <AnimatedSphere mousePos={smoothMouse} />
      <GlowRing mousePos={smoothMouse} />
      <SecondRing mousePos={smoothMouse} />
      <ThirdRing mousePos={smoothMouse} />
      <AmbientParticles mousePos={smoothMouse} />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="h-[400px] md:h-[600px] w-full flex items-center justify-center">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
