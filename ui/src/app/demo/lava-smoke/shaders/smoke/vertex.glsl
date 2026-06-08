#define PI 3.1415926535897932384626433832795
uniform float uTime;

// varying float vTime;
varying vec4 vPosition;
varying vec2 vUv;

vec2 rotate2D(vec2 position, float angle) {
  mat2 rotationMatrix = mat2(cos(angle), sin(angle), -sin(angle), cos(angle));
  return rotationMatrix * position;
}

uniform sampler2D uPerlinTexture;

void main() {
  vec3 pos = position;

  float perlinValue = texture2D(uPerlinTexture, pos.xz + vec2(cos(uTime * 0.05))).r; // Sample the Perlin noise texture

  vec2 rotationPlane = rotate2D(pos.xz, perlinValue * 0.1 + cos(pos.y) * 0.3); // Rotate the smoke over time

  pos = vec3(rotationPlane.x, pos.y, rotationPlane.y); // Rotate the smoke over time

  //wind offset
  vec4 perlinWindValue = texture2D(uPerlinTexture, vec2(0.25, uTime * 0.01)); // Sample the Perlin noise texture for wind

  vec2 windOffset = vec2(perlinWindValue.x - 0.5, 0.0); // Calculate wind offset based on Perlin noise
  windOffset *= vec2(pow(position.y + 5.0, 2.0) * 0.5); // Increase wind effect with height

  pos.xz += windOffset; // Apply wind offset to the smoke

  vec4 modelPosition = modelMatrix * vec4(pos, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

  gl_Position = projectedPosition;

  //varying
  vPosition = modelPosition;
  vUv = uv;
}
