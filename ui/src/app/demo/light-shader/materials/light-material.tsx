'use client';

import { forwardRef, useMemo } from 'react';

import { ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

import lightFragmentShader from '../shaders/light/fragment.glsl';
import lightVertexShader from '../shaders/light/vertex.glsl';

export type LightMaterialProps = Omit<ThreeElements['shaderMaterial'], 'uniforms'> & {
  uniforms: {
    time: number;
    color: string;
  };
};

export const LightMaterial = ({ uniforms, ...props }: LightMaterialProps) => {
  const staticUniforms = useMemo(() => {
    return {
      uTime: new THREE.Uniform(uniforms.time),
      uColor: new THREE.Uniform(new THREE.Color(uniforms.color)),
    };
  }, [uniforms]);

  return (
    <shaderMaterial
      {...props}
      // depthWrite={false}
      blending={THREE.NormalBlending}
      vertexColors={true}
      vertexShader={lightVertexShader}
      fragmentShader={lightFragmentShader}
      uniforms={staticUniforms}
      // transparent
      // side={THREE.DoubleSide}
    ></shaderMaterial>
  );
};
