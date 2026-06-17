precision mediump float;

uniform float ufrequency;
uniform float uTime;
uniform vec3 uMouse;
uniform vec2 uResolution;
uniform vec3 uPointerPosition;

// varying float vTime;
varying vec4 vPosition;
varying vec2 vUv;
varying float vElevation;
varying vec3 vNormal;

// #include '../includes/perlinClassic3DNoise.glsl'
#pragma glslify: perlinClassic3D = require('../includes/perlinClassic3DNoise.glsl')

// custom uniforms
uniform float uWaveElevation;
uniform float uWaveFrequencyX;
uniform float uWaveFrequencyZ;
uniform float uWavePhaseX;
uniform float uWavePhaseZ;
uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallWavesIterations;

float calculateElevation(vec3 modelPosition) {
  float elevation =
    sin(modelPosition.x * uWaveFrequencyX + uTime * uWavePhaseX) *
    sin(modelPosition.z * uWaveFrequencyZ + uTime * uWavePhaseZ) *
    uWaveElevation;

  for (float i = 1.0; i <= uSmallWavesIterations; i++) {
    elevation -= abs(
      perlinClassic3D(vec3(modelPosition.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) *
        uSmallWavesElevation /
        i
    );
  }
  return elevation;
}

void main() {
  // Base Position

  vec4 newPosition = vPosition;
  // newPosition.y += sin(newPosition.x); // dopesn't work

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation = calculateElevation(modelPosition.xyz);

  modelPosition.y += elevation;

  // modelPosition.y += -abs(cnoise(vec3(modelPosition.xz * 1.2, uTime * 0.8)) * uWaveElevation * 0.5);

  // Final Position
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  //Varyings
  vPosition = modelPosition;
  vElevation = elevation;
  vUv = uv;

  // normal calculation
  vec4 BaseModelPosition = modelMatrix * vec4(position, 1.0);
  float delta = 0.1;
  vec3 posA = vec3(BaseModelPosition.x + delta, BaseModelPosition.y, BaseModelPosition.z);
  posA.y += calculateElevation(posA);
  vec3 posB = vec3(BaseModelPosition.xy, BaseModelPosition.z - delta);
  posB.y += calculateElevation(posB);
  vec3 toA = normalize(-modelPosition.xyz + posA);
  vec3 toB = normalize(-modelPosition.xyz + posB);
  vec3 newNormal = cross(toA, toB);

  vNormal = newNormal;
  // vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
}
