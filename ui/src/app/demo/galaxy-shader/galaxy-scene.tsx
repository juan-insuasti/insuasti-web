'use client';

import React, { useCallback } from 'react';

import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';

import { randomNormal } from '@/lib/randomNormal';

import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';

export default function GalaxyScene() {
  const [params] = useControls('galaxy', () => ({
    count: {
      value: 12200,
      min: 100,
      max: 1000000,
      step: 1000,
    },
    size: { value: 0.1, min: 0.001, max: 0.1, step: 0.001 },
    radius: { value: 13, min: 0.1, max: 20, step: 0.1 },
    angle: { value: Math.PI / 4, min: 0, max: Math.PI * 2, step: 0.01 },
    phase: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    branches: { value: 8, min: 2, max: 20, step: 1 },
    spin: { value: 0.38, min: -5, max: 5, step: 0.01 },
    normalSigma: { value: 1, min: 0.01, max: 10, step: 0.01 },
    normalMu: { value: 0, min: -1, max: 1, step: 0.01 },
    insideColor: '#ff6030',
    outsideColor: '#1b3984',
  }));

  const random = useCallback(() => randomNormal(0, 0.5)(), []);

  const getRandomPoints = useCallback(
    ({ count, branches }: { count: number; branches: number }) => {
      const pos = new Float32Array(count * 3 * branches);
      const color = new Float32Array(count * 3 * branches);
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

          pos[x] = r * Math.cos(a + spinAngle) + randomX;
          pos[y] = r * Math.sin(a + spinAngle) + randomY;
          pos[z] = 0 + randomZ;

          const insideColor = new THREE.Color(params.insideColor);
          const outsideColor = new THREE.Color(params.outsideColor);
          const mixedColor = insideColor.clone();
          mixedColor.lerp(outsideColor, r / params.radius);

          color[x] = mixedColor.r;
          color[y] = mixedColor.g;
          color[z] = mixedColor.b;
        }
      }
      return [pos, color];
    },
    [params, random],
  );

  const [position, color] = React.useMemo(() => {
    return getRandomPoints({ count: params.count, branches: params.branches });
  }, [params, getRandomPoints]);

  const pointsRef = React.useRef<THREE.Points>(null);
  useFrame((state, delta) => {
    // Update positions or colors if needed
    if (pointsRef.current) {
      pointsRef.current.rotation.z += delta * 0.1; // Rotate the galaxy slowly
    }
  });

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
        ></shaderMaterial>
      </points>
    </>
  );
}
