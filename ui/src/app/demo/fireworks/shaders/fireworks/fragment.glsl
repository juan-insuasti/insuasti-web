varying vec2 vUv;
varying vec3 vColor;
varying vec3 vPosition;
uniform vec3 uColor;

void main() {
  // Local UV coords
  vec2 uv = gl_PointCoord * 2.0 - 1.0; // Convert from [0, 1] to [-1, 1]s
  float dist = length(uv);
  dist = dist; // Invert distance for better color blending
  if (dist > 1.0) {
    discard; // Discard fragments outside the circle
  }
  dist = pow(dist, 2.0); // Emphasize center of points
  dist = 1.0 - dist; // Invert distance for better color blending

  vec3 finalColor = mix(uColor, vPosition, dist);

  gl_FragColor = vec4(finalColor, dist);
  #include <colorspace_fragment>
}
