precision mediump float;

#define PI 3.1415926535897932384626433832795

uniform float uTime;
uniform vec3 uMouse;
uniform vec2 uResolution;
uniform vec3 uPointerPosition;
uniform sampler2D uTexture;
uniform float uWaveElevation;
uniform vec3 uSurfaceColor;
uniform vec3 uDepthColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying vec4 vPosition;
varying vec2 vUv;
varying float vElevation;
varying vec3 vNormal;

#pragma glslify: directionalLight = require('../includes/directionalLight.glsl)
#pragma glslify: ambientLight = require('../includes/ambientLight.glsl)

void main() {
  // Definitions
  vec2 uv = vUv;

  // viewDiirection is vector from the camera to the fragment position
  vec3 viewDirection = normalize(cameraPosition - vPosition.xyz);

  // Directional Light
  vec3 light = vec3(0.0);
  light += pointLight(
    vec3(1.0),
    5.0,
    vec3(0.0, 2.0, 0.0),
    vNormal,
    vPosition.xyz,
    viewDirection,
    2000.0,
    2.0
  );

  // Base Color
  vec3 color = vec3(0.4);
  color *= light;

  float str = (vElevation + (2.0 - uColorOffset * sin(uTime))) * uColorMultiplier;
  str = smoothstep(0.0, 2.0, str);
  vec3 mixedColor = mix(uDepthColor, uSurfaceColor, str);
  mixedColor *= light;

  // Final Color
  gl_FragColor = vec4(mixedColor, 1.0);
  // gl_FragColor = vec4(color, 1.0);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
