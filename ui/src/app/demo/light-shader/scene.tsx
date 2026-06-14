'use client';

import React, { useRef } from 'react';

import { OrbitControls, useHelper } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';
import { DirectionalLightHelper, PointLightHelper, ShaderMaterial } from 'three';

import { LightMaterial } from './materials/light-material';
import { Rose } from './models/rose';

export type SceneProps = {
  debug?: boolean;
};

export default function Scene({ debug }: SceneProps) {
  const { colorSphere, colorRose, colorTorus } = useControls('hologram', {
    colorSphere: '#00ff00',
    colorRose: '#636363',
    colorTorus: '#636363',
  });

  const lightMaterialRef = useRef<ShaderMaterial>(null);
  const roseRef = useRef<THREE.Group>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  //@ts-expect-error - useHelper uses different types
  useHelper(pointLightRef, PointLightHelper, 0.25);
  //@ts-expect-error - useHelper uses different types
  useHelper(directionalLightRef, DirectionalLightHelper, 1.0);

  useFrame((state, delta) => {
    roseRef.current?.rotateY(delta);
    if (lightMaterialRef.current?.uniforms) {
      lightMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <>
      <OrbitControls />
      {/* <Grid args={[10, 10]} position={[0, 0, 0]} /> */}
      <group position={[0, 0, 0]}></group>
      <Rose ref={roseRef} position={[0, -5, 0]} scale={0.5}>
        <LightMaterial ref={lightMaterialRef} uniforms={{ time: 0, color: colorRose }} />
      </Rose>
      <mesh position={[-5, 0, 0]}>
        <octahedronGeometry args={[1, 0]} />
        <LightMaterial ref={lightMaterialRef} uniforms={{ time: 0, color: colorTorus }} />
      </mesh>
      <mesh position={[5, 0, 0]}>
        <dodecahedronGeometry args={[1, 0]} />
        <LightMaterial ref={lightMaterialRef} uniforms={{ time: 0, color: colorTorus }} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry />
        <LightMaterial ref={lightMaterialRef} uniforms={{ time: 0, color: colorTorus }} />
      </mesh>
      <mesh position={[0, 0, -50]}>
        <planeGeometry args={[50, 50]} />
        <LightMaterial ref={lightMaterialRef} uniforms={{ time: 0, color: colorTorus }} />
      </mesh>
      <ambientLight intensity={0.2} color={new THREE.Color(0, 2, 0)} />
      <directionalLight
        ref={directionalLightRef}
        color={new THREE.Color(0, 0, 2)}
        intensity={1}
        position={[0, 5, 0]}
      />
      <pointLight
        ref={pointLightRef}
        color={new THREE.Color(5, 0, 0)}
        position={[0, 0, 5]}
        intensity={10}
      />
    </>
  );
}
