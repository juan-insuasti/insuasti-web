'use client';

import React, { useRef } from 'react';

import { OrbitControls, useHelper } from '@react-three/drei';
import { ThreeElements, useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';

import { HalftoneMaterial } from './materials/halftone/halftone-material';
import { Ghost } from './models/ghost';

export function Scene({ debug }: { debug: boolean }) {
  const state = useThree();
  const resolution = {
    x: state.gl.domElement.clientWidth * state.gl.getPixelRatio(),
    y: state.gl.domElement.clientHeight * state.gl.getPixelRatio(),
  };

  const { colorSphere, colorGhost, colorTorus, ...params } = useControls('halftone', {
    colorSphere: '#00ff00',
    colorGhost: '#ff0000',
    colorTorus: '#0000ff',
    darkShade: '#000000',
    darkRepetition: 100,
    darkDirection: {
      x: -2,
      y: -2,
      z: 2,
    },
    darkMaxIntensity: { value: 0.41, min: 0, max: 1, step: 0.01 },
    lightShade: '#fff',
    lightRepetition: 100,
    lightDirection: {
      x: 2,
      y: 2,
      z: 2,
    },
    lightMaxIntensity: { value: 0.86, min: 0, max: 1, step: 0.01 },
  });

  const halftoneMaterialRef = useRef<ThreeElements['shaderMaterial']>(null);
  const ghostRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  const pointLightRef = useRef<THREE.PointLight>(null);
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  //@ts-expect-error - useHelper uses different types
  useHelper(pointLightRef, THREE.PointLightHelper, 0.25);
  //@ts-expect-error - useHelper uses different types
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1.0);

  useFrame((state, delta) => {
    ghostRef.current?.rotateY(-delta * 0.25);
    torusRef.current?.translateY(
      2.0 * Math.cos(state.clock.elapsedTime * 0.5) - torusRef.current?.position.y,
    );
    const radius = 8;
    sphereRef.current?.translateX(
      radius * Math.sin(state.clock.elapsedTime) - sphereRef.current?.position.x,
    );
    sphereRef.current?.translateZ(
      radius * Math.cos(state.clock.elapsedTime) - sphereRef.current?.position.z,
    );
    // sphereRef.current?.rotateY(-delta * 0.25);

    if (halftoneMaterialRef.current?.uniforms) {
      halftoneMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <>
      <OrbitControls />
      {/* <Grid args={[10, 10]} position={[0, 0, 0]} /> */}
      <group position={[0, 0, 0]}></group>
      <Ghost ref={ghostRef} scale={0.5} useCustomShader>
        <HalftoneMaterial
          uniforms={{
            time: 0,
            color: colorGhost,
            resolution,
            light: {
              shade: params.lightShade,
              direction: params.lightDirection,
              maxIntensity: params.lightMaxIntensity,
              repetition: params.lightRepetition,
            },
            dark: {
              shade: params.darkShade,
              direction: params.darkDirection,
              maxIntensity: params.darkMaxIntensity,
              repetition: params.darkRepetition,
            },
          }}
        />
      </Ghost>
      <mesh position={[-5, 0, 0]} ref={sphereRef}>
        <sphereGeometry args={[1, 32, 32, 1]} />
        <HalftoneMaterial
          uniforms={{
            time: 0,
            color: colorGhost,
            resolution,
            light: {
              shade: params.lightShade,
              direction: params.lightDirection,
              maxIntensity: params.lightMaxIntensity,
              repetition: params.lightRepetition,
            },
            dark: {
              shade: params.darkShade,
              direction: params.darkDirection,
              maxIntensity: params.darkMaxIntensity,
              repetition: params.darkRepetition,
            },
          }}
        />
      </mesh>
      <mesh position={[5, 0, 0]} ref={torusRef}>
        <torusKnotGeometry args={[1, 0.4, 64, 8]} />
        <HalftoneMaterial
          uniforms={{
            time: 0,
            color: colorGhost,
            resolution,
            light: {
              shade: params.lightShade,
              direction: params.lightDirection,
              maxIntensity: params.lightMaxIntensity,
              repetition: params.lightRepetition,
            },
            dark: {
              shade: params.darkShade,
              direction: params.darkDirection,
              maxIntensity: params.darkMaxIntensity,
              repetition: params.darkRepetition,
            },
          }}
        />
      </mesh>
      {debug && (
        <>
          <mesh
            position={[params.lightDirection.x, params.lightDirection.y, params.lightDirection.z]}
          >
            <sphereGeometry args={[params.lightMaxIntensity * 0.5, 32, 3]} />
            <meshBasicMaterial color={new THREE.Color(params.lightShade)} />
          </mesh>
          <mesh position={[params.darkDirection.x, params.darkDirection.y, params.darkDirection.z]}>
            <sphereGeometry args={[params.darkMaxIntensity * 0.5, 32, 3]} />
            <meshBasicMaterial color={new THREE.Color(params.darkShade)} />
          </mesh>
          <ambientLight intensity={1} />
        </>
      )}
    </>
  );
}
