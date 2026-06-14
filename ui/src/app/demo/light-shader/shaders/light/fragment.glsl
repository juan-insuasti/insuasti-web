uniform float uTime;
uniform vec3 uColor;

varying vec2 vUv;
varying vec4 vPosition;
varying vec3 vNormal;

vec3 ambientLight(vec3 lightColor, float lightIntensity) {
  return lightColor * lightIntensity;
}

vec3 directionalLight(
  vec3 lightColor,
  float lightIntensity,
  vec3 vNormal,
  vec3 lightPosition,
  vec3 viewPosition,
  vec3 viewDirection,
  float specularPower
) {
  vec3 normal = normalize(vNormal);
  // Light direction is the vector from the light position to the object position. (view position)
  // vec3 lightDirection = normalize(lightPosition - viewPosition);
  vec3 lightDirection = normalize(lightPosition);

  // Reflection of the incidence from the light direction and the normal
  vec3 lightReflection = reflect(-normalize(lightPosition), normal);

  // Specular (shining)
  float specular = -dot(viewDirection, lightReflection);
  specular = max(specular, 0.0);
  specular = pow(specular, specularPower);
  // specular = clamp(specular, 0.0, 1.0);

  // Shading
  float shading = dot(normal, lightDirection);
  shading = max(shading, 0.0);
  // return vec3(specular);
  return lightColor * lightIntensity * shading + lightColor * lightIntensity * specular;
}

vec3 pointLight(
  vec3 lightColor,
  float lightIntensity,
  vec3 vNormal,
  vec3 lightPosition,
  vec3 viewPosition,
  vec3 viewDirection,
  float specularPower,
  float decayFactor
) {
  vec3 normal = normalize(vNormal);
  // Light direction is the vector from the light position to the object position. (view position)
  vec3 lightDelta = lightPosition - viewPosition;
  float lightDistance = length(lightDelta);

  // Reflection of the incidence from the light direction and the normal
  vec3 lightReflection = reflect(-normalize(lightPosition), normal);

  // Specular (shining)
  float specular = -dot(viewDirection, lightReflection);
  specular = max(specular, 0.0);
  specular = pow(specular, specularPower);
  // specular = clamp(specular, 0.0, 1.0);

  // Shading
  float shading = dot(normal, lightDelta);
  shading = max(shading, 0.0);

  // Decay
  float decay = 1.0 / (1.0 + pow(lightDistance, 2.0) * decayFactor);
  // return vec3(decay);

  return lightColor * lightIntensity * decay * (shading + specular);
}

void main() {
  vec3 viewDirection = normalize(vPosition.xyz - cameraPosition);
  vec3 color = uColor;
  vec3 light = vec3(0.0);
  light += ambientLight(vec3(0.1, 0.1, 0.1), 0.2);
  light += directionalLight(
    vec3(0.0, 0.0, 2.0),
    1.0,
    vNormal,
    vec3(0.0, 5.0, 0.0),
    vPosition.xyz,
    viewDirection,
    20.0
  );
  light += pointLight(
    vec3(2.0, 0.0, 0.0),
    1.0,
    vNormal,
    vec3(0.0, 0.0, 5.0),
    vPosition.xyz,
    viewDirection,
    20.0,
    2.0
  );

  color *= light;

  gl_FragColor = vec4(color, 1.0);

  // #include <tonemapping_fragment>
  #include <colorspace_fragment>

}
