attribute float aScale;
attribute vec4 aRandomness;
attribute float aSize;

uniform float uPointSize;
uniform float uTime;
uniform vec2 uResolution;
uniform float uProgress;

varying vec2 vUv;
varying vec3 vColor;
varying vec3 vPosition;

float remap(
  float value, // original signal
  float originMin, // min trigger value of the input signal
  float originMax, // max trigger value of the input signal
  float destinationMin, // min value of the output signal
  float destinationMax // min value of the output signal
) {
  return destinationMin +
  (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

void main() {
  vec3 pos = position;

  // Exploding
  float explodingProgress = remap(uProgress, 0.0, 0.1, 0.0, 1.0);
  explodingProgress = clamp(explodingProgress, 0.0, 1.0);
  explodingProgress = 1.0 - pow(1.0 - explodingProgress, 6.0);
  pos *= explodingProgress;

  // Falling
  float fallingProgress = remap(uProgress, 0.1, 1.0, 0.0, 1.0);
  fallingProgress = clamp(fallingProgress, 0.0, 1.0);
  fallingProgress = 1.0 - pow(1.0 - fallingProgress, 2.0);
  pos.y -= fallingProgress * 0.2;

  // Scaling
  float scalingProgress = min(
    remap(uProgress, 0.0, 0.09, 0.0, 1.0),
    remap(uProgress, 0.09, 1.0, 1.0, 0.0)
  );
  scalingProgress = clamp(scalingProgress, 0.0, 1.0);

  // Twinkling
  float randomness = 1.0 - aSize; // since aSize is a random value [0.0, 1.0]
  float TwinklingProgress = remap(uProgress, 0.2, 0.8, 0.0, 1.0);
  TwinklingProgress = clamp(TwinklingProgress, 0.0, 1.0);
  float twinkle =
    abs(
      sin(20.0 * uProgress * randomness) +
        sin(40.0 * uProgress * randomness) +
        cos(120.0 * uProgress * randomness)
    ) /
    3.0;
  twinkle = 1.0 - TwinklingProgress * twinkle;

  vec4 positionModel = modelMatrix * vec4(pos, 1.0);
  vec4 positionView = viewMatrix * positionModel;
  vec4 positionProjection = projectionMatrix * positionView;

  gl_Position = positionProjection;

  gl_PointSize = uPointSize * uResolution.y * aSize * scalingProgress * twinkle / 100.0; // Base point size with a minimum threshold
  gl_PointSize *= 1.0 / -positionView.z; // Perspective scaling
  // varyings
  vUv = uv;
  // vColor = color;
  vPosition = position.xyz;
}
