varying vec2 vUv;

void main() {
  vec4 positionModel = modelMatrix * vec4(position, 1.0);
  vec4 positionView = viewMatrix * positionModel;
  vec4 positionProjection = projectionMatrix * positionView;

  gl_Position = positionProjection;
  gl_PointSize = 2.0;

  vUv = uv;
}
