"use client";
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils } from 'three';

/**
 * MouseReactiveModel component
 * Wraps any 3D model and makes it react smoothly to mouse movement
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The 3D model to wrap
 * @param {number} [props.intensity=0.5] - How much the model reacts to mouse position (0-1)
 * @param {number} [props.smoothness=0.1] - Lerp factor for smooth transitions (0-1, lower = smoother)
 * @param {boolean} [props.enabled=true] - Enable/disable mouse reactivity
 * @returns {JSX.Element}
 */
export default function MouseReactiveModel({
    children,
    intensity = 0.5,
    smoothness = 0.1,
    enabled = true
}) {
    const groupRef = useRef();
    const { mouse, viewport } = useThree();

    useFrame(() => {
        if (!groupRef.current || !enabled) return;

        // Target rotation based on mouse position
        // mouse.x and mouse.y range from -1 to 1
        const targetRotationY = mouse.x * intensity;
        const targetRotationX = -mouse.y * intensity;

        // Smoothly interpolate (lerp) to the target rotation
        groupRef.current.rotation.y = MathUtils.lerp(
            groupRef.current.rotation.y,
            targetRotationY,
            smoothness
        );
        groupRef.current.rotation.x = MathUtils.lerp(
            groupRef.current.rotation.x,
            targetRotationX,
            smoothness
        );
    });

    return <group ref={groupRef}>{children}</group>;
}
