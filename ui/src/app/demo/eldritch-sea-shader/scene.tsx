'use client';

import { useRef } from 'react';

import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';

import SeaMaterial from './materials/sea-material';

export type SceneProps = {
  debug?: boolean;
};

export default function Scene({}: SceneProps) {
  const seaMaterialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (seaMaterialRef.current) {
      seaMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const seaShaderUniforms = useControls('Sea Shader', {
    frequency: { value: 1.5, min: 0.1, max: 10, step: 0.1 },
    waveElevation: {
      value: 0.31,
      min: 0,
      max: 1,
      step: 0.01,
    },
    waveFrequencyX: {
      value: 0.6,
      min: -Math.PI * 2,
      max: Math.PI * 2,
      step: Math.PI / 180,
    },
    waveFrequencyZ: {
      value: 1.5,
      min: -Math.PI * 2,
      max: Math.PI * 2,
      step: Math.PI / 180,
    },
    wavePhaseX: {
      value: 0.1,
      min: -Math.PI * 2,
      max: Math.PI * 2,
      step: Math.PI / 180,
    },
    wavePhaseZ: {
      value: -0.4,
      min: -Math.PI * 2,
      max: Math.PI * 2,
      step: Math.PI / 180,
    },
    surfaceColor: {
      value: '#151c37',
    },
    depthColor: {
      value: '#ff4000',
    },
    colorOffset: {
      value: 0.2,
      min: -10,
      max: 10,
      step: 0.01,
    },
    colorMultiplier: {
      value: 0.86,
      min: 0,
      max: 2,
      step: 0.001,
    },
    smallWavesElevation: {
      value: 0.24,
      min: 0,
      max: 1,
      step: 0.01,
    },
    smallWavesFrequency: {
      value: 0.98,
      min: -Math.PI * 2,
      max: Math.PI * 2,
      step: Math.PI / 180,
    },
    smallWavesSpeed: {
      value: 0.38,
      min: -10,
      max: 10,
      step: 0.01,
    },
    smallWavesIterations: {
      value: 4,
      min: 0,
      max: 8,
      step: 1,
    },
  });

  const camera = useThree((state) => state.camera);

  return (
    <>
      <OrbitControls />
      {/* <directionalLight position={[5, 5, 5]} intensity={1} /> */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10, 256, 256]} />
        {/* <sphereGeometry args={[2, 32, 32]} /> */}
        <SeaMaterial
          ref={seaMaterialRef}
          uniforms={{ ...seaShaderUniforms, time: 0 }}
          // depthTest={false}
          // blending={THREE.NormalBlending}
          vertexColors={true}
          // side={THREE.DoubleSide}
        ></SeaMaterial>
      </mesh>
      {/* <mesh position={[0.0, 0.0, 0.0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color="#ffff00" side={THREE.DoubleSide} />
      </mesh> */}
      <mesh position={[0.0, 10.0, 4.0]}>
        <sphereGeometry args={[0.1]} />
        <meshBasicMaterial color="#f000f0" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}
