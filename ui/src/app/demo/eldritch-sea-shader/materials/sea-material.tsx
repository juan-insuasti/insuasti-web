'use client';

import { useMemo } from 'react';

import { useTexture } from '@react-three/drei';
import { ThreeElements, useThree } from '@react-three/fiber';
import * as THREE from 'three';

import fragmentShader from '../shaders/sea/fragment.glsl';
import vertexShader from '../shaders/sea/vertex.glsl';

export type SeaMaterialProps = Omit<
  ThreeElements['shaderMaterial'],
  'vertexShader' | 'fragmentShader' | 'uniforms'
> & {
  debug?: boolean;
  uniforms: {
    time: number;
    frequency: number;
    waveElevation: number;
    waveFrequencyX: number;
    waveFrequencyZ: number;
    wavePhaseX: number;
    wavePhaseZ: number;
    surfaceColor: string;
    depthColor: string;
    colorOffset: number;
    colorMultiplier: number;
    smallWavesElevation: number;
    smallWavesFrequency: number;
    smallWavesSpeed: number;
    smallWavesIterations: number;
  };
};

export default function SeaMaterial({ debug, uniforms, ...props }: SeaMaterialProps) {
  const texture = useTexture('/textures/roof/albedo.webp');
  const size = useThree((state) => state.size);

  const staticUniforms = useMemo(() => {
    const {
      time,
      frequency,
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
    } = uniforms;
    return {
      ufrequency: new THREE.Uniform(frequency),
      uTime: new THREE.Uniform(time),
      uResolution: new THREE.Uniform(new THREE.Vector2(size.width, size.height)),
      uTexture: new THREE.Uniform(texture),
      uWaveElevation: new THREE.Uniform(waveElevation),
      uWaveFrequencyX: new THREE.Uniform(waveFrequencyX),
      uWaveFrequencyZ: new THREE.Uniform(waveFrequencyZ),
      uWavePhaseX: new THREE.Uniform(wavePhaseX),
      uWavePhaseZ: new THREE.Uniform(wavePhaseZ),
      uSurfaceColor: new THREE.Uniform(new THREE.Color(surfaceColor)),
      uDepthColor: new THREE.Uniform(new THREE.Color(depthColor)),
      uColorOffset: new THREE.Uniform(colorOffset),
      uColorMultiplier: new THREE.Uniform(colorMultiplier),
      uSmallWavesElevation: new THREE.Uniform(smallWavesElevation),
      uSmallWavesFrequency: new THREE.Uniform(smallWavesFrequency),
      uSmallWavesSpeed: new THREE.Uniform(smallWavesSpeed),
      uSmallWavesIterations: new THREE.Uniform(smallWavesIterations),
    };
  }, [size.height, size.width, texture, uniforms]);

  return (
    <>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        {...props}
        transparent
        uniforms={staticUniforms}
      />
    </>
  );
}
