#define PI 3.1415926535897932384626433832795

uniform float uTime;
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  uv.x *= 0.5;
  uv.y *= 0.3;
  // Animation
  uv.y -= uTime * 0.05;

  float smoke = texture2D(uPerlinTexture, uv).r;
  smoke = smoothstep(0.4, 1.0, smoke); // Adjust the thresholds to control the density of the smoke

  float smokeAlphaMaskX = min(smoothstep(0.0, 0.2, vUv.x), 1.0 - smoothstep(0.8, 1.0, vUv.x)); // Adjust the thresholds to control the density of the smoke
  float smokeAlphaMaskY = 1.0 - smoothstep(0.1, 0.8, vUv.y); // Adjust the thresholds to control the density of the smoke

  float smokeAlphaMask = min(smokeAlphaMaskX, smokeAlphaMaskY); // Adjust the thresholds to control the density of the smoke

  smoke = min(smoke, smokeAlphaMask); // Adjust the thresholds to control the density of the smoke

  gl_FragColor = vec4(vec3(1.0), smoke);
  // gl_FragColor = vec4(vUv, 1.0, 1.0); // Colorize the smoke based on UV coordinates
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
