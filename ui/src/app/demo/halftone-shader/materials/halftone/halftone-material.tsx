'use client';

import { ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

import halftoneFragmentShader from '../../shaders/halftone/fragment.glsl';
import halftoneVertexShader from '../../shaders/halftone/vertex.glsl';

type HalftoneEffect = {
  shade: string;
  repetition: number;
  direction: {
    x: number;
    y: number;
    z: number;
  };
  maxIntensity: number;
};

export type HalftoneMaterialProps = Omit<ThreeElements['shaderMaterial'], 'uniforms'> & {
  uniforms: {
    time: number;
    color: string;
    resolution: {
      x: number;
      y: number;
    };
    dark: HalftoneEffect;
    light: HalftoneEffect;
  };
};

export const HalftoneMaterial = ({ uniforms, ...props }: HalftoneMaterialProps) => {
  return (
    <shaderMaterial
      {...props}
      // depthWrite={false}
      blending={THREE.NoBlending}
      vertexColors={true}
      vertexShader={halftoneVertexShader}
      fragmentShader={halftoneFragmentShader}
      uniforms={{
        uTime: { value: uniforms.time },
        uColor: { value: new THREE.Color(uniforms.color) },
        uResolution: new THREE.Uniform(
          new THREE.Vector2(uniforms.resolution?.x, uniforms.resolution?.y),
        ),
        uLightShade: new THREE.Uniform(new THREE.Color(uniforms.light.shade)),
        uLightRepetition: new THREE.Uniform(uniforms.light.repetition),
        uLightDirection: new THREE.Uniform(
          new THREE.Vector3(
            uniforms.light.direction?.x,
            uniforms.light.direction?.y,
            uniforms.light.direction?.z,
          ),
        ),
        uLightMaxIntensity: new THREE.Uniform(uniforms.light.maxIntensity),
        uDarkShade: new THREE.Uniform(new THREE.Color(uniforms.dark.shade)),
        uDarkRepetition: new THREE.Uniform(uniforms.dark.repetition),
        uDarkDirection: new THREE.Uniform(
          new THREE.Vector3(
            uniforms.dark.direction?.x,
            uniforms.dark.direction?.y,
            uniforms.dark.direction?.z,
          ),
        ),
        uDarkMaxIntensity: new THREE.Uniform(uniforms.dark.maxIntensity),
      }}
      // transparent
      // side={THREE.DoubleSide}
    ></shaderMaterial>
  );
};
