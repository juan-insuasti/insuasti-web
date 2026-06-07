attribute float aScale;
attribute vec4 aRandomness;
uniform float uPointSize;
uniform float uTime;
varying vec2 vUv;
varying vec3 vColor;

void main() {
  vec4 positionModel = modelMatrix * vec4(position, 1.0);

  float angle = atan(positionModel.x, positionModel.y);

  float positionToCenter = length(positionModel.xy);

  float angleOffset = 1.0 / positionToCenter * uTime * aRandomness.w; // Adjust the multiplier for tighter or looser spirals

  angle += angleOffset;
  positionModel.x = cos(angle) * positionToCenter;
  positionModel.y = sin(angle) * positionToCenter;

  positionModel.xy += aRandomness.xy;
  positionModel.z +=
    aRandomness.z + sin(uTime * aRandomness.w + length(positionModel.xyz) + aRandomness.z) * 0.1; // Add some vertical movement

  vec4 positionView = viewMatrix * positionModel;
  vec4 positionProjection = projectionMatrix * positionView;

  gl_Position = positionProjection;
  gl_PointSize = max(uPointSize * aScale * sin(uTime), uPointSize / 2.0); // Base point size with a minimum threshold
  gl_PointSize *= 1.0 / -positionView.z; // Perspective scaling

  // varyings
  vUv = uv;
  vColor = color;
}
