'use client';

import React, { useEffect } from 'react';

import { OrbitControls, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import fragmentShader from './shaders/test/fragment.glsl';
import vertexShader from './shaders/test/vertex.glsl';

export default function Scene() {
  const Texture = useTexture('/textures/roof/albedo.webp');
  const [time, setTime] = React.useState(0);
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
  const [meshPointerPosition, setMeshPointerPosition] = React.useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame((state) => {
    setTime(() => state.clock.getElapsedTime());
  });

  return (
    <>
      <OrbitControls />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <mesh
        onPointerMove={(e) => setMeshPointerPosition({ x: e.point.x, y: e.point.y, z: e.point.z })}
        onPointerOut={() => setMeshPointerPosition({ x: 100, y: 1000, z: 100 })}
      >
        <planeGeometry args={[10, 10, 32, 32]} />
        <rawShaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          uniforms={{
            ufrequency: { value: 1.5 },
            uTime: { value: time },
            uMouse: { value: new THREE.Vector2(mouse.x, mouse.y) },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uPointerPosition: {
              value: new THREE.Vector3(
                meshPointerPosition.x,
                meshPointerPosition.y,
                meshPointerPosition.z,
              ),
            },
            uTexture: { value: Texture },
          }}
        />
      </mesh>
    </>
  );
}
