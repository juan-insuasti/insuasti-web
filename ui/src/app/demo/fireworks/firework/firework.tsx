import { useMemo, useState } from 'react';

import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Leva, useControls } from 'leva';
import * as THREE from 'three';

import fragmentShader from '../shaders/fireworks/fragment.glsl';
import vertexShader from '../shaders/fireworks/vertex.glsl';
import { useFirework } from './firework.hook';

export type FireworkProps = {
  random?: boolean;
  debug?: boolean;
  onComplete?: () => void;
  position?: [number, number, number];
  params?: FireworkParams;
  hue?: number;
};

type FireworkParams = {
  progress?: number;
  duration?: number;
  pointSize?: number;
  particles?: number;
  radius?: number;
  shellRatio?: number;
  minPointSize?: number;
  isSurface?: boolean;
  play?: boolean;
  color?: number;
};

const defaultParams: Required<FireworkParams> = {
  duration: 2,
  pointSize: 8,
  particles: 500,
  radius: 0.8,
  shellRatio: 0.6,
  minPointSize: 0.5,
  isSurface: false,
  play: true,
  progress: 0,
  color: 0,
};

const getRandomParams: () => Required<FireworkParams> = () => {
  return {
    duration: defaultParams.duration + Math.random() * 0.5 - 0.25,
    pointSize: defaultParams.pointSize + Math.random() * 2 - 1,
    particles: defaultParams.particles + Math.floor(Math.random() * 200 - 100),
    radius: defaultParams.radius + Math.random() * 0.1,
    shellRatio: defaultParams.shellRatio + Math.random() * 0.2 - 0.1,
    minPointSize: 0.5,
    isSurface: false,
    play: true,
    progress: 0,
    color: Math.random(),
  };
};

export function Firework({
  random,
  debug,
  onComplete,
  params = {},
  position = [0, 0, 0],
  hue,
}: FireworkProps) {
  const [time, setTime] = useState(0);

  const { size } = useThree();

  const [debugParams] = useControls(() => ({
    progress: {
      value: 0,
      max: 1,
      min: 0,
      step: 0.01,
    },
    pointSize: {
      value: 8,
      min: 1,
      max: 50,
      step: 0.2,
    },
    minPointSize: {
      value: 0.5,
      min: 0.01,
      max: 1,
      step: 0.01,
    },
    particles: {
      value: 1000,
      min: 100,
      max: 100000,
      step: 100,
    },
    radius: {
      value: 1,
      min: 0.1,
      max: 10,
      step: 0.1,
    },
    shellRatio: {
      value: 0.6,
      min: 0,
      max: 0.99,
      step: 0.01,
    },
    isSurface: false,
    duration: {
      value: 5,
      min: 1,
      max: 10,
      step: 0.1,
    },
    play: true,
    color: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.001,
    },
  }));

  const baseParams = useMemo(() => (random ? getRandomParams() : defaultParams), [random]);

  const {
    pointSize,
    particles,
    radius,
    isSurface,
    shellRatio,
    minPointSize,
    progress,
    duration,
    play,
  } = debug ? debugParams : ({ ...baseParams, ...params } as Required<FireworkParams>);

  useFrame((state, delta) => {
    setTime((t) => {
      if (play && t < 1) {
        return t + delta / duration;
      } else {
        return 0;
      }
    });

    if (time >= 1) {
      // set({ play: false });
      onComplete?.();
    }
  });

  const { positionsArray, sizesArray } = useFirework({
    particles,
    radius,
    isSurface,
    shellRatio,
    minPointSize,
  });

  const uHue = new THREE.Color();

  uHue.setHSL(baseParams.color, 1, 0.7);

  return (
    <>
      <points position={position}>
        <bufferGeometry>
          <bufferAttribute
            args={[positionsArray, 3]}
            attach="attributes-position"
            array={positionsArray}
            itemSize={3}
          />
          <bufferAttribute
            args={[sizesArray, 1]}
            attach="attributes-aSize"
            array={sizesArray}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors={true}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={THREE.UniformsUtils.clone({
            uTime: { value: time },
            uPointSize: new THREE.Uniform(pointSize),
            uProgress: new THREE.Uniform(play ? time : progress),
            uResolution: new THREE.Uniform(new THREE.Vector2(size.width, size.height)),
            uColor: new THREE.Uniform(uHue),
          })}
        ></shaderMaterial>
      </points>
    </>
  );
}
// uniforms={THREE.UniformsUtils.clone({
//   uTime: { value: time },
//   uColor: { value: new THREE.Color(colorSphere) },
// })}
