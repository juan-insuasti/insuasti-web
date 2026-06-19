vec3 pointLight(
  vec3 lightColor,
  float lightIntensity,
  vec3 lightPosition,
  vec3 vNormal,
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
  vec3 lightReflection = reflect(lightPosition, normal);

  // Specular (shining)
  float specular = -dot(normalize(viewDirection), normalize(lightReflection));
  specular = max(specular, 0.0);
  specular = pow(specular, specularPower);
  // specular = clamp(specular, 0.0, 1.0);

  // Shading
  float shading = dot(normal, lightDelta);
  shading = max(shading, 0.0);

  // Decay
  float decay = 1.0 / (1.0 + pow(lightDistance, 2.0) * decayFactor);
  // return vec3(decay);

  return lightColor * lightIntensity * (shading + specular) * decay;
}

#pragma glslify: export(pointLight)
