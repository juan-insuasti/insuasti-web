'use client';

import React, { useCallback } from 'react';

import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';

import { randomNormal } from '@/lib/randomNormal';

import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function GalaxyScene() {
  const [params] = useControls('galaxy', () => ({
    count: {
      value: 5000,
      min: 100,
      max: 1000000,
      step: 1000,
    },
    size: { value: 80.0, min: 1.0, max: 100.0, step: 0.1 },
    radius: { value: 15, min: 0.1, max: 100, step: 0.1 },
    angle: { value: Math.PI / 4, min: 0, max: Math.PI * 2, step: 0.01 },
    phase: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    branches: { value: 12, min: 2, max: 20, step: 1 },
    spin: { value: 0.15, min: 0, max: 0.2, step: 0.01 },
    normalSigma: { value: 0.28, min: 0.01, max: 0.5, step: 0.01 },
    normalMu: { value: 0.28, min: -1, max: 1, step: 0.01 },
    insideColor: '#13aa2e',
    outsideColor: '#8120be',
    animationSpeed: { value: 0.2, min: 0, max: 2, step: 0.01 },
    lerp: { value: 0.9, min: 0.9, max: 1.1, step: 0.001 },
  }));

  const random = useCallback(
    () => randomNormal(params.normalMu, params.normalSigma)(),
    [params.normalMu, params.normalSigma],
  );

  const getRandomPoints = useCallback(
    ({ count, branches }: { count: number; branches: number }) => {
      const pos = new Float32Array(count * 3 * branches);
      const color = new Float32Array(count * 3 * branches);
      const scale = new Float32Array(count * 1 * branches);

      const randomness = new Float32Array(count * 4 * branches);

      for (let i = 0; i < count; i++) {
        for (let j = 0; j < branches; j++) {
          const index = (i * branches + j) * 3;
          const x = index + 0;
          const y = index + 1;
          const z = index + 2;

          const r = Math.random() * params.radius;
          const a = params.angle + j * ((2 * Math.PI) / branches) + params.phase;
          const spinAngle = r * params.spin;

          // const randomX =
          //   Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
          // const randomY =
          //   Math.pow(Math.random(), params.randomnessPower) * (Math.random() < 0.5 ? 1 : -1);
          const randomX = random();
          const randomY = random();
          const randomZ = random();
          const randomW = 1 - Math.random() * 0.3;

          const rIndex = (i * branches + j) * 4;
          randomness[rIndex] = randomX;
          randomness[rIndex + 1] = randomY;
          randomness[rIndex + 2] = randomZ;
          randomness[rIndex + 3] = randomW;

          pos[x] = r * Math.cos(a + spinAngle);
          pos[y] = r * Math.sin(a + spinAngle);
          pos[z] = 0;

          const insideColor = new THREE.Color(params.insideColor);
          const outsideColor = new THREE.Color(params.outsideColor);
          const mixedColor = insideColor.clone();
          mixedColor.lerp(outsideColor, r / Math.pow(params.radius, params.lerp));

          color[x] = mixedColor.r;
          color[y] = mixedColor.g;
          color[z] = mixedColor.b;

          scale[i * branches + j] = Math.random() * 1;
        }
      }
      return [pos, color, scale, randomness];
    },
    [params, random],
  );

  const [position, color, scale, randomness] = React.useMemo(() => {
    return getRandomPoints({ count: params.count, branches: params.branches });
  }, [params, getRandomPoints]);

  const [time, setTime] = React.useState(0);

  const pointsRef = React.useRef<THREE.Points>(null);
  useFrame((state, delta) => {
    // Update positions or colors if needed
    setTime((t) => t + delta);
    if (pointsRef.current) {
      // pointsRef.current.rotation.z += delta * 0.1; // Rotate the galaxy slowly
    }
  });

  const { gl: renderer } = useThree();

  return (
    <>
      <OrbitControls />
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            args={[position, 3]}
            attach="attributes-position"
            array={position}
            count={params.count * params.branches}
            itemSize={3}
          />
          <bufferAttribute
            args={[color, 3]}
            attach="attributes-color"
            array={color}
            count={params.count * params.branches}
            itemSize={3}
          />
          <bufferAttribute
            args={[scale, 1]}
            attach="attributes-aScale"
            array={scale}
            count={params.count * params.branches}
            itemSize={3}
          />
          <bufferAttribute
            args={[randomness, 4]}
            attach="attributes-aRandomness"
            array={randomness}
            count={params.count * params.branches}
            itemSize={4}
          />
        </bufferGeometry>
        {/* <sphereGeometry args={[1, 32, 32]} /> */}
        {/* <pointsMaterial
          size={params.size}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors={true}
        ></pointsMaterial> */}
        <shaderMaterial
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors={true}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uPointSize: {
              value:
                params.size * renderer.getPixelRatio() * clamp(window.innerHeight / 1080, 0.1, 1),
            },
            uTime: { value: time * params.animationSpeed },
          }}
        ></shaderMaterial>
      </points>
    </>
  );
}
