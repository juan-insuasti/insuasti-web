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

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  // varying
  vPosition = modelPosition;
  vUv = uv;
  vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
  // vNormal = normal;
}

