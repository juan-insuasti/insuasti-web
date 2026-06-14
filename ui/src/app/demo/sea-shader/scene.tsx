'use client';

import { useEffect, useRef } from 'react';

import { Html, OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import { LucideCamera, LucideInfo } from 'lucide-react';
import * as THREE from 'three';

import SeaMaterial from './materials/sea-material';

export type SceneProps = {
  debug?: boolean;
};

export default function Scene({ debug }: SceneProps) {
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
      value: '#9bd8ff',
    },
    depthColor: {
      value: '#186691',
    },
    colorOffset: {
      value: 0.33,
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
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10, 256, 256]} />
        <SeaMaterial ref={seaMaterialRef} uniforms={{ ...seaShaderUniforms, time: 0 }} />
      </mesh>
    </>
  );
}
