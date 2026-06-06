'use client';

import React from 'react';

import { OrbitControls, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';

import fragmentShader from './shaders/test/fragment.glsl';
import vertexShader from './shaders/test/vertex.glsl';

export default function Scene() {
  const Texture = useTexture('/textures/roof/albedo.webp');
  const [time, setTime] = React.useState(0);

  useFrame((state) => {
    setTime(() => state.clock.getElapsedTime());
  });

  const {
    waveElevation,
    waveFrequencyX,
    waveFrequencyZ,
    wavePhaseX,
    wavePhaseZ,
    surfaceColor,
    depthColor,
    colorOffset,
    colorMultiplier,
    smallWavesElevation,
    smallWavesFrequency,
    smallWavesSpeed,
    smallWavesIterations,
  } = useControls('Sea Shader', {
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

  return (
    <>
      <OrbitControls />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {/* <TransformControls position={[0, 0, 0]} /> */}
      {/* <Grid args={[10, 10]} position={[0, 0.01, 0]} /> */}
      <mesh
        // onPointerMove={(e) => setMeshPointerPosition({ x: e.point.x, y: e.point.y, z: e.point.z })}
        // onPointerOut={() => setMeshPointerPosition({ x: 100, y: 1000, z: 100 })}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[10, 10, 256, 256]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          uniforms={{
            ufrequency: { value: 1.5 },
            uTime: { value: time },
            // uMouse: { value: new THREE.Vector2(mouse.x, mouse.y) },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            // uPointerPosition: {
            //   value: new THREE.Vector3(
            //     meshPointerPosition.x,
            //     meshPointerPosition.y,
            //     meshPointerPosition.z,
            //   ),
            // },
            uTexture: { value: Texture },
            uWaveElevation: { value: waveElevation },
            uWaveFrequencyX: { value: waveFrequencyX },
            uWaveFrequencyZ: { value: waveFrequencyZ },
            uWavePhaseX: { value: wavePhaseX },
            uWavePhaseZ: { value: wavePhaseZ },
            uSurfaceColor: { value: new THREE.Color(surfaceColor) },
            uDepthColor: { value: new THREE.Color(depthColor) },
            uColorOffset: { value: colorOffset },
            uColorMultiplier: { value: colorMultiplier },
            uSmallWavesElevation: { value: smallWavesElevation },
            uSmallWavesFrequency: { value: smallWavesFrequency },
            uSmallWavesSpeed: { value: smallWavesSpeed },
            uSmallWavesIterations: { value: smallWavesIterations },
          }}
        />
      </mesh>
    </>
  );
}
