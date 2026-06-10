'use client';

import { useState } from 'react';

import { Grid, useGLTF } from '@react-three/drei';
import { ThreeElements, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import holographicFragmentShader from './shaders/holographic/fragment.glsl';
import holographicVertexShader from './shaders/holographic/vertex.glsl';

export type GhostProps = ThreeElements['group'] & {
  debug?: boolean;
  useCustomShader?: boolean;
  color?: string;
};

export function Ghost({ debug, useCustomShader, color, ...props }: GhostProps) {
  const gltf = useGLTF('/models/ghost.glb');
  const { meshes: nodes, materials } = gltf;
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    setTime((prev) => prev + delta);
  });

  return (
    <>
      <group {...props}>
        {debug && (
          <>
            <Grid args={[10, 10]} position={[0, 0, 0]} side={THREE.DoubleSide} />
            <Grid
              args={[10, 10]}
              position={[0, 0, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              side={THREE.DoubleSide}
            />
            <Grid
              args={[10, 10]}
              position={[0, 0, 0]}
              rotation={[0, 0, Math.PI / 2]}
              side={THREE.DoubleSide}
            />
          </>
        )}
        {nodes &&
          Object.keys(nodes).map((key) => {
            const node = nodes[key];
            const materialName = node.name.split('_')[1]; // Assuming material name is the first part of the node name
            if (node.type === 'Mesh') {
              return (
                <mesh
                  key={key}
                  geometry={node.geometry}
                  // material={useCustomShader ? new THREE.ShaderMaterial() : materials[materialName]}
                  position={[node.position.x, node.position.y - 5.8, node.position.z + 1.3]}
                  rotation={[node.rotation.x, node.rotation.y - Math.PI / 2, node.rotation.z]}
                  scale={node.scale}
                >
                  <shaderMaterial
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    vertexColors={true}
                    vertexShader={holographicVertexShader}
                    fragmentShader={holographicFragmentShader}
                    uniforms={{
                      uTime: { value: time },
                      uColor: { value: new THREE.Color(color) },
                    }}
                    transparent
                    // side={THREE.DoubleSide}
                  ></shaderMaterial>
                </mesh>
              );
            }
          })}
      </group>
    </>
  );
}
