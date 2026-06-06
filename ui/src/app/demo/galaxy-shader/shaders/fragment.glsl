varying vec2 vUv;

void main() {
  vec2 uv = vUv * 2.0 - 1.0; // Convert from [0, 1] to [-1, 1]
  gl_FragColor = vec4(uv, 1.0, 1.0);
}
