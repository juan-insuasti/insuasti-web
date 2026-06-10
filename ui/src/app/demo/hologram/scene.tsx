'use client';

import React from 'react';

import { Grid, OrbitControls, useCubeTexture, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';

import { Ghost } from './ghost';
import holographicFragmentShader from './shaders/holographic/fragment.glsl';
import holographicVertexShader from './shaders/holographic/vertex.glsl';

export function Scene() {
  const gltf = useGLTF('/models/ghost.glb');
  const { meshes: nodes, materials } = gltf;
  const [time, setTime] = React.useState(0);

  useFrame((state, delta) => {
    setTime((prev) => prev + delta);
  });

  const { colorSphere, colorGhost, colorTorus } = useControls('hologram', {
    colorSphere: '#00ff00',
    colorGhost: '#ff0000',
    colorTorus: '#0000ff',
  });

  return (
    <>
      <OrbitControls />
      {/* <Grid args={[10, 10]} position={[0, 0, 0]} /> */}
      <group position={[0, 0, 0]}></group>
      <Ghost scale={0.5} useCustomShader color={colorGhost} />
      <mesh position={[-5, 0, 0]}>
        <sphereGeometry args={[1, 32, 32, 1]} />
        <shaderMaterial
          key="hologram-sphere"
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors={true}
          vertexShader={holographicVertexShader}
          fragmentShader={holographicFragmentShader}
          // uniforms={THREE.UniformsUtils.clone({
          //   uTime: { value: time },
          //   uColor: { value: new THREE.Color(colorSphere) },
          // })}
          uniforms={{
            uTime: { value: time },
            uColor: { value: new THREE.Color(colorSphere) },
          }}
          transparent
        />
      </mesh>
      <mesh position={[5, 0, 0]}>
        <torusKnotGeometry args={[1, 0.4, 64, 8]} />
        <shaderMaterial
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexColors={true}
          vertexShader={holographicVertexShader}
          fragmentShader={holographicFragmentShader}
          // uniforms={THREE.UniformsUtils.clone({
          //   uTime: { value: time },
          //   uColor: { value: new THREE.Color(colorTorus) },
          // })}
          uniforms={{
            uTime: { value: time },
            uColor: { value: new THREE.Color(colorTorus) },
          }}
          transparent
        />
      </mesh>
      <ambientLight intensity={1} />
    </>
  );
}
