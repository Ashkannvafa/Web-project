"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei';
import { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// Main sphere with cursor/touch interaction
function AnimatedSphere({ inputPos, isTouching }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const active = hovered || isTouching.current;

    // Strong position following
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      inputPos.current.x * 1.5,
      0.06
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      inputPos.current.y * 1.2,
      0.06
    );

    // Strong rotation reaction
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      inputPos.current.y * 0.8 + Math.sin(time * 0.3) * 0.2,
      0.08
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      inputPos.current.x * 0.8 + time * 0.15,
      0.08
    );

    // Scale on hover/touch
    const targetScale = active ? 2.5 : 2.2;
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
          color={hovered || isTouching.current ? "#c084fc" : "#a855f7"}
          attach="material"
          distort={hovered || isTouching.current ? 0.55 : 0.45}
          speed={2.5}
          roughness={0.2}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
}

// Particles with cursor/touch following
function AmbientParticles({ inputPos }) {
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
      const cursorStrength = 0.5 + (i % 8) * 0.15;
      
      posArray[i3] = basePositions[i3] 
        + inputPos.current.x * cursorStrength
        + Math.sin(time * 0.6 + i * 0.15) * 0.3;
        
      posArray[i3 + 1] = basePositions[i3 + 1] 
        + inputPos.current.y * cursorStrength
        + Math.cos(time * 0.5 + i * 0.15) * 0.3;
        
      posArray[i3 + 2] = basePositions[i3 + 2] 
        + Math.sin(time * 0.4 + i * 0.2) * 0.25
        + inputPos.current.x * inputPos.current.y * 0.3;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y = time * 0.05 + inputPos.current.x * 0.3;
    particlesRef.current.rotation.x = inputPos.current.y * 0.3;
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
function GlowRing({ inputPos }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (!ringRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    ringRef.current.rotation.x = THREE.MathUtils.lerp(
      ringRef.current.rotation.x,
      Math.PI / 2 + inputPos.current.y * 0.7,
      0.08
    );
    ringRef.current.rotation.z = THREE.MathUtils.lerp(
      ringRef.current.rotation.z,
      inputPos.current.x * 0.7 + time * 0.15,
      0.08
    );
    
    ringRef.current.position.x = THREE.MathUtils.lerp(
      ringRef.current.position.x,
      inputPos.current.x * 0.5,
      0.06
    );
    ringRef.current.position.y = THREE.MathUtils.lerp(
      ringRef.current.position.y,
      inputPos.current.y * 0.4,
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
function SecondRing({ inputPos }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (!ringRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    ringRef.current.rotation.x = THREE.MathUtils.lerp(
      ringRef.current.rotation.x,
      Math.PI / 3 + inputPos.current.y * -0.6,
      0.06
    );
    ringRef.current.rotation.y = THREE.MathUtils.lerp(
      ringRef.current.rotation.y,
      inputPos.current.x * -0.6 + time * -0.12,
      0.06
    );
    
    ringRef.current.position.x = THREE.MathUtils.lerp(
      ringRef.current.position.x,
      inputPos.current.x * -0.4,
      0.05
    );
    ringRef.current.position.y = THREE.MathUtils.lerp(
      ringRef.current.position.y,
      inputPos.current.y * -0.3,
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
function ThirdRing({ inputPos }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (!ringRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    ringRef.current.rotation.y = THREE.MathUtils.lerp(
      ringRef.current.rotation.y,
      Math.PI / 2 + inputPos.current.x * 0.5,
      0.07
    );
    ringRef.current.rotation.z = THREE.MathUtils.lerp(
      ringRef.current.rotation.z,
      inputPos.current.y * 0.5 + time * 0.1,
      0.07
    );
    
    ringRef.current.position.x = inputPos.current.x * 0.3;
    ringRef.current.position.z = inputPos.current.y * 0.3;
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

// Scene wrapper with mouse and touch support
function Scene({ inputPos, isTouching }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, 2, 4]} intensity={0.7} color="#06b6d4" />
      <pointLight position={[3, -2, -4]} intensity={0.5} color="#a855f7" />
      
      <AnimatedSphere inputPos={inputPos} isTouching={isTouching} />
      <GlowRing inputPos={inputPos} />
      <SecondRing inputPos={inputPos} />
      <ThirdRing inputPos={inputPos} />
      <AmbientParticles inputPos={inputPos} />
    </>
  );
}

// Input handler component inside Canvas
function InputHandler({ inputPos, smoothInput, isTouching }) {
  useFrame(() => {
    smoothInput.current.x = THREE.MathUtils.lerp(smoothInput.current.x, inputPos.current.x, 0.12);
    smoothInput.current.y = THREE.MathUtils.lerp(smoothInput.current.y, inputPos.current.y, 0.12);
  });
  
  return null;
}

export default function Hero3D() {
  const containerRef = useRef(null);
  const inputPos = useRef({ x: 0, y: 0 });
  const smoothInput = useRef({ x: 0, y: 0 });
  const isTouching = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Mouse events
    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      inputPos.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      inputPos.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    // Touch events
    const handleTouchStart = (event) => {
      isTouching.current = true;
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = container.getBoundingClientRect();
        inputPos.current.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        inputPos.current.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const rect = container.getBoundingClientRect();
        inputPos.current.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        inputPos.current.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    const handleTouchEnd = () => {
      isTouching.current = false;
      // Gradually return to center
      inputPos.current.x *= 0.5;
      inputPos.current.y *= 0.5;
    };

    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchcancel', handleTouchEnd);

    // Also listen to window mouse move for when cursor is outside but we want smooth return
    const handleWindowMouseMove = (event) => {
      if (!container.contains(event.target)) {
        // Slowly return to center when mouse leaves
        inputPos.current.x *= 0.98;
        inputPos.current.y *= 0.98;
      }
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="h-[400px] md:h-[600px] w-full flex items-center justify-center touch-none"
    >
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <InputHandler inputPos={inputPos} smoothInput={smoothInput} isTouching={isTouching} />
        <Scene inputPos={smoothInput} isTouching={isTouching} />
      </Canvas>
    </div>
  );
}
