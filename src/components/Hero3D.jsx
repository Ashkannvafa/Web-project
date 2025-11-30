import { Canvas } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float, OrbitControls } from '@react-three/drei';
import { useState } from 'react';
import MouseReactiveModel from './MouseReactiveModel';

function AnimatedSphere() {
  const [hovered, setHover] = useState(false);

  return (
    <MouseReactiveModel intensity={0.3} smoothness={0.08}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere
          args={[1, 100, 200]}
          scale={hovered ? 2.4 : 2.2}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true); }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false); }}
        >
          <MeshDistortMaterial
            color={hovered ? "#06b6d4" : "#a855f7"} // Changes color on hover (Purple -> Cyan)
            attach="material"
            distort={hovered ? 0.6 : 0.5}       // More distortion on hover
            speed={hovered ? 4 : 2}             // Faster wobble on hover
            roughness={0.2}
            metalness={0.9}     // Shiny metallic look
          />
        </Sphere>
      </Float>
    </MouseReactiveModel>
  );
}

export default function Hero3D() {
  return (
    <div className="h-[400px] md:h-[600px] w-full flex items-center justify-center">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1.5} color="#06b6d4" />
        <pointLight position={[-3, -3, 2]} intensity={0.5} color="#a855f7" />
        <AnimatedSphere />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}











