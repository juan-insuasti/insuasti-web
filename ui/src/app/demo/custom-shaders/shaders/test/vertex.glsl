precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform float ufrequency;
uniform float uTime;
uniform vec3 uMouse;
uniform vec2 uResolution;
uniform vec3 uPointerPosition;

attribute vec3 position;
attribute vec2 uv;

// varying float vTime;
varying vec4 vPosition;
varying vec2 vUv;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  // modelPosition.z += sin(position.x * 200.1 * ufrequency + uTime) * 1.5;
  // modelPosition.z += cos(position.y * 240.1 * ufrequency + uTime) * 1.5;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

  gl_Position = projectedPosition;

  //varying
  vPosition = modelPosition;
  vUv = uv;
}
