uniform float uTime;
uniform vec3 uColor;

varying vec2 vUv;
varying vec4 vPosition;
varying vec3 vNormal;

void main() {
  vec2 uv = vPosition.xy;
  uv *= 4.0;
  float str = fract(uv.y - uTime * 0.9);
  str = pow(str, 4.0);

  // gl_FragColor = vec4(vec3(str), 1.0);
  vec3 blackColor = vec3(0.0);
  vec3 greenColor = vec3(0.0, 1.0, 0.2);
  vec3 color = mix(blackColor, greenColor, str);

  vec3 normal = normalize(vNormal);
  if (!gl_FrontFacing) {
    normal *= -1.0;
  }
  vec3 viewDirection = normalize(vPosition.xyz - cameraPosition);
  float fresnel = dot(normalize(normal), viewDirection) + 1.0;
  fresnel = pow(fresnel, 1.5);

  float falloff = smoothstep(0.8, 0.0, fresnel);

  float holographic = str * fresnel;
  holographic += fresnel;
  holographic *= falloff;

  gl_FragColor = vec4(uColor, holographic);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
