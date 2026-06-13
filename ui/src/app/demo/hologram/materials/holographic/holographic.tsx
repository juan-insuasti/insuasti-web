'use client';

import { ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

import holographicFragmentShader from '../../shaders/holographic/fragment.glsl';
import holographicVertexShader from '../../shaders/holographic/vertex.glsl';

export type HolographicMaterialProps = Omit<ThreeElements['shaderMaterial'], 'uniforms'> & {
  uniforms: {
    time: number;
    color: string;
  };
};

export const HolographicMaterial = ({ uniforms, ...props }: HolographicMaterialProps) => {
  return (
    <shaderMaterial
      {...props}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
      vertexColors={true}
      vertexShader={holographicVertexShader}
      fragmentShader={holographicFragmentShader}
      uniforms={{
        uTime: { value: uniforms.time },
        uColor: { value: new THREE.Color(uniforms.color) },
      }}
      transparent
      // side={THREE.DoubleSide}
    ></shaderMaterial>
  );
};
