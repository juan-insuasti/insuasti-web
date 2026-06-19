uniform float uTime;
uniform vec3 uColor;
uniform vec2 uResolution;

//halftone Uniforms
uniform vec3 uLightShade;
uniform float uLightRepetition;
uniform vec3 uLightDirection;
uniform float uLightMaxIntensity;
uniform vec3 uDarkShade;
uniform float uDarkRepetition;
uniform vec3 uDarkDirection;
uniform float uDarkMaxIntensity;

varying vec4 vPosition;
varying vec3 vNormal;

#pragma glslify: directionalLight = require('../includes/directionalLight.glsl)
#pragma glslify: ambientLight = require('../includes/ambientLight.glsl)

vec3 halftone(
  vec2 uv,
  vec3 color,
  vec3 normal,
  float effectRepetition,
  vec3 effectDirection,
  vec3 effectColor,
  float effectMaxIntensity
) {
  vec2 _uv = uv;
  _uv *= effectRepetition;
  _uv = fract(_uv);

  vec3 halftoneDirection = normalize(effectDirection);
  float halftoneIntensity = dot(normal, halftoneDirection);
  halftoneIntensity = clamp(halftoneIntensity, 0.0, 1.0);

  halftoneIntensity = smoothstep(-0.0, 1.5, halftoneIntensity);
  halftoneIntensity = max(halftoneIntensity, 0.0);

  float r = length((_uv - 0.5) * 2.0);
  float str = 1.0 - step(effectMaxIntensity * halftoneIntensity, r);

  return mix(color, effectColor, str);

}
void main() {
  float repetition = 100.0;
  vec3 normal = normalize(vNormal);
  // gl_FragCoord is a vec4 which contains the screen coordinates of the current fragment. xy are screen coordinates, zw depth.
  vec2 uv = gl_FragCoord.xy / uResolution.y;
  // uv = (uv - 0.5) * 2.0;
  // uv *= repetition;
  // uv = fract(uv);

  // vec3 halftoneDirection = normalize(vec3(-1.0, -1.0, 1.0));
  // float halftoneIntensity = dot(vNormal, halftoneDirection);
  // halftoneIntensity = clamp(halftoneIntensity, 0.0, 1.0);

  // halftoneIntensity = smoothstep(-0.8, 1.5, halftoneIntensity);
  // halftoneIntensity = max(halftoneIntensity, 0.0);

  // float r = length((uv - 0.5) * 2.0);
  // float str = 1.0 - step(0.8 * halftoneIntensity, r);

  // float str =

  vec3 viewDirection = normalize(cameraPosition - vPosition.xyz);
  vec3 light = vec3(0.0);
  // Ambient Light
  light += ambientLight(vec3(1.0), 0.8);
  // // Directional Light
  light += directionalLight(
    vec3(1.0),
    1.0,
    vec3(1.0, 1.0, 1.0),
    normal,
    vPosition.xyz,
    viewDirection,
    1.0
  );

  vec3 color = uColor;
  color *= light;

  color = halftone(
    uv,
    color,
    normal,
    uDarkRepetition,
    uDarkDirection,
    uDarkShade,
    uDarkMaxIntensity
  );

  color = halftone(
    uv,
    color,
    normal,
    uLightRepetition,
    uLightDirection,
    uLightShade,
    uLightMaxIntensity
  );

  gl_FragColor = vec4(vNormal, 1.0);
  gl_FragColor = vec4(uColor, 1.0);
  gl_FragColor = vec4(color, 1.0);
  gl_FragColor = vec4(color, 1.0);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>

}
