#define PI 3.1415926535897932384626433832795
uniform float uTime;

// varying float vTime;
varying vec3 vNormal;
varying vec4 vPosition;
varying vec2 vUv;

float random2D(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec3 pos = position;

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);

  float glitchTime = uTime - modelPosition.y;
  float glitchStrength = sin(glitchTime) + sin(glitchTime * 3.45) + sin(glitchTime * 8.76);
  glitchStrength /= 3.0;
  glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
  glitchStrength *= 0.25;
  modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchStrength;
  modelPosition.z += (random2D(modelPosition.zy + uTime) - 0.5) * glitchStrength;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  // varying
  vPosition = modelPosition;
  vUv = uv;
  vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
}

